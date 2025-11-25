class App {
  static init() {
    const esLogin = window.location.pathname.includes('login.html') || 
                    window.location.pathname.endsWith('/');

    if (!esLogin && !Utils.estaLogueado()) {
      window.location.href = 'pages/login.html';
      return;
    }

    const nombreArchivo = window.location.pathname.split('/').pop() || 'index.html';

    if (nombreArchivo === 'login.html') {
      App.initLogin();
    } else if (nombreArchivo === 'facturas.html') {
      App.initFacturas();
    } else if (nombreArchivo === 'factura-form.html') {
      App.initFacturaForm();
    }

    App.inicializarNavbar();
  }

  static initLogin() {
    const form = document.getElementById('formLogin');
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const usuario = document.getElementById('usuario').value;
        const password = document.getElementById('password').value;

        if (usuario === 'user' && password === '1234') {

          Utils.guardarLocal(CONFIG.STORAGE_USER_KEY, {
            nombre: usuario
          });

          window.location.href = 'facturas.html';

        } else {
          Utils.mostrarNotificacion('Usuario o contraseña incorrectos', 'error');
        }
      });
    }
  }

  static initFacturas() {
    App.cargarFacturas();
    
    const btnAgregar = document.getElementById('btnAgregar');
    if (btnAgregar) {
      btnAgregar.addEventListener('click', () => {
        window.location.href = 'factura-form.html';
      });
    }

    const inputFiltro = document.getElementById('inputFiltro');
    if (inputFiltro) {
      inputFiltro.addEventListener('keyup', (e) => {
        App.filtrarFacturas(e.target.value);
      });
    }
  }

  static async cargarFacturas() {
    const facturas = await FacturaAPI.getFacturas();
    const tbody = document.getElementById('tbodyFacturas');
    
    if (!tbody) return;

    tbody.innerHTML = '';

    if (facturas.length === 0) {
      tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;">No existen facturas</td></tr>';
      return;
    }

    facturas.forEach(factura => {
      const fila = document.createElement('tr');
      fila.innerHTML = `
        <td>${factura.numFactura}</td>
        <td>${factura.nomCliente}</td>
        <td>${factura.dirCliente}</td>
        <td>${factura.telCliente}</td>
        <td style="text-align: right;">
          <button class="btn-icon editar" data-id="${factura._id}" title="Editar">✏️</button>
          <button class="btn-icon eliminar" data-id="${factura._id}" title="Eliminar">🗑️</button>
        </td>
      `;
      tbody.appendChild(fila);
    });

    document.querySelectorAll('.btn-icon.editar').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const id = e.target.dataset.id;
        await App.editarFactura(id);
      });
    });

    document.querySelectorAll('.btn-icon.eliminar').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const id = e.target.dataset.id;
        await App.eliminarFactura(id);
      });
    });
  }

  static filtrarFacturas(busqueda) {
    const filas = document.querySelectorAll('#tbodyFacturas tr');
    busqueda = busqueda.toLowerCase();

    filas.forEach(fila => {
      const texto = fila.textContent.toLowerCase();
      fila.style.display = texto.includes(busqueda) ? '' : 'none';
    });
  }

  static async editarFactura(id) {
    const confirmado = await Utils.confirmar(`¿Desea modificar esta factura?`);
    if (confirmado) {
      sessionStorage.setItem('factura_id', id);
      window.location.href = 'factura-form.html';
    }
  }

  static async eliminarFactura(id) {
    const factura = await FacturaAPI.getFacturaById(id);
    const confirmado = await Utils.confirmar(
      `¿Desea eliminar la factura #${factura.numFactura} a nombre de ${factura.nomCliente}?`
    );

    if (confirmado) {
      await FacturaAPI.eliminarFactura(id);
      Utils.mostrarNotificacion('Factura eliminada correctamente', 'success');
      App.cargarFacturas();
    }
  }

  static initFacturaForm() {
    const idFactura = sessionStorage.getItem('factura_id');
    const form = document.getElementById('formFactura');
    const titulo = document.getElementById('tituloFormulario');
    const btnGuardar = document.getElementById('btnGuardar');
    const btnModificar = document.getElementById('btnModificar');

    if (idFactura) {
      App.cargarFacturaEnFormulario(idFactura);
      if (titulo) titulo.textContent = 'Modificar factura';
      if (btnGuardar) btnGuardar.style.display = 'none';
      if (btnModificar) btnModificar.style.display = 'inline-block';
    } else {

      if (titulo) titulo.textContent = 'Crear factura';
      if (btnGuardar) btnGuardar.style.display = 'inline-block';
      if (btnModificar) btnModificar.style.display = 'none';
    }

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (idFactura) {
          App.modificarFactura(idFactura);
        } else {
          App.guardarFactura();
        }
      });
    }

    const btnRegresar = document.getElementById('btnRegresar');
    if (btnRegresar) {
      btnRegresar.addEventListener('click', () => {
        sessionStorage.removeItem('factura_id');
        window.location.href = 'facturas.html';
      });
    }
  }

  static async cargarFacturaEnFormulario(id) {
    const factura = await FacturaAPI.getFacturaById(id);
    if (factura) {
      document.getElementById('numFactura').value = factura.numFactura;
      document.getElementById('nomCliente').value = factura.nomCliente;
      document.getElementById('dirCliente').value = factura.dirCliente;
      document.getElementById('telCliente').value = factura.telCliente;
    }
  }

  static async guardarFactura() {
    const datos = {
      numFactura: Number(document.getElementById('numFactura').value),
      nomCliente: document.getElementById('nomCliente').value,
      dirCliente: document.getElementById('dirCliente').value,
      telCliente: Number(document.getElementById('telCliente').value)
    };

    const resultado = await FacturaAPI.crearFactura(datos);
    if (resultado) {
      Utils.mostrarNotificacion('Factura creada exitosamente', 'success');
      setTimeout(() => {
        window.location.href = 'facturas.html';
      }, 1500);
    } else {
      Utils.mostrarNotificacion('Error al crear factura', 'error');
    }
  }

  static async modificarFactura(id) {
    const datos = {
      numFactura: Number(document.getElementById('numFactura').value),
      nomCliente: document.getElementById('nomCliente').value,
      dirCliente: document.getElementById('dirCliente').value,
      telCliente: Number(document.getElementById('telCliente').value)
    };

    const resultado = await FacturaAPI.modificarFactura(id, datos);
    if (resultado) {
      Utils.mostrarNotificacion('Factura modificada exitosamente', 'success');
      setTimeout(() => {
        sessionStorage.removeItem('factura_id');
        window.location.href = 'facturas.html';
      }, 1500);
    } else {
      Utils.mostrarNotificacion('Error al modificar factura', 'error');
    }
  }

  static inicializarNavbar() {
    const usuario = Utils.obtenerUsuarioActual();
    const navbarUsuario = document.getElementById('navbarUsuario');
    const btnLogout = document.getElementById('btnLogout');

    if (navbarUsuario && usuario) {
      navbarUsuario.textContent = usuario.nombre;
    }

    if (btnLogout) {
      btnLogout.addEventListener('click', () => {
        Utils.logout();
      });
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
