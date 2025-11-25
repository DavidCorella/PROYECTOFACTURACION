class FacturaAPI {

  static async getFacturas() {
    try {
      const response = await fetch(`${CONFIG.API_URL}/facturas/`, API_OPTIONS);
      return await response.json();
    } catch (error) {
      console.error('Error al obtener facturas:', error);
      return [];
    }
  }

  static async getFacturaById(id) {
    try {
      const response = await fetch(`${CONFIG.API_URL}/facturas/${id}`, API_OPTIONS);
      return await response.json();
    } catch (error) {
      console.error('Error al obtener factura:', error);
      return null;
    }
  }


  static async crearFactura(datos) {
    try {
      const response = await fetch(`${CONFIG.API_URL}/facturas/`, {
        method: 'POST',
        headers: API_OPTIONS.headers,
        body: JSON.stringify(datos)
      });
      return await response.json();
    } catch (error) {
      console.error('Error al crear factura:', error);
      return null;
    }
  }

  static async modificarFactura(id, datos) {
    try {
      const response = await fetch(`${CONFIG.API_URL}/facturas/${id}`, {
        method: 'PUT',
        headers: API_OPTIONS.headers,
        body: JSON.stringify(datos)
      });
      return await response.json();
    } catch (error) {
      console.error('Error al modificar factura:', error);
      return null;
    }
  }

  static async eliminarFactura(id) {
    try {
      const response = await fetch(`${CONFIG.API_URL}/facturas/${id}`, {
        method: 'DELETE',
        headers: API_OPTIONS.headers
      });
      return await response.json();
    } catch (error) {
      console.error('Error al eliminar factura:', error);
      return null;
    }
  }
}