
class Utils {
  static mostrarNotificacion(mensaje, tipo = 'success') {
    const notif = document.createElement('div');
    notif.className = `notificacion notificacion-${tipo}`;
    notif.textContent = mensaje;
    document.body.appendChild(notif);

    setTimeout(() => {
      notif.classList.add('visible');
    }, 100);

    setTimeout(() => {
      notif.classList.remove('visible');
      setTimeout(() => notif.remove(), 300);
    }, 3000);
  }

  static confirmar(mensaje) {
    return new Promise((resolve) => {
      const modal = document.createElement('div');
      modal.className = 'modal-confirmacion';
      modal.innerHTML = `
        <div class="modal-contenido">
          <h3>${mensaje}</h3>
          <div class="botones">
            <button class="btn btn-danger" id="btn-cancelar">Cancelar</button>
            <button class="btn btn-primary" id="btn-confirmar">Confirmar</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);

      document.getElementById('btn-cancelar').onclick = () => {
        modal.remove();
        resolve(false);
      };

      document.getElementById('btn-confirmar').onclick = () => {
        modal.remove();
        resolve(true);
      };
    });
  }

  static guardarLocal(clave, valor) {
    localStorage.setItem(clave, JSON.stringify(valor));
  }

  static obtenerLocal(clave) {
    const valor = localStorage.getItem(clave);
    return valor ? JSON.parse(valor) : null;
  }

  static limpiarLocal(clave) {
    localStorage.removeItem(clave);
  }

  static estaLogueado() {
    return !!Utils.obtenerLocal(CONFIG.STORAGE_USER_KEY);
  }

  static obtenerUsuarioActual() {
    return Utils.obtenerLocal(CONFIG.STORAGE_USER_KEY);
  }

  static logout() {
    Utils.limpiarLocal(CONFIG.STORAGE_USER_KEY);
    window.location.href = 'login.html'; 
}
}