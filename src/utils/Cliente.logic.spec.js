function isAdminUser() {
  try {
    const current = JSON.parse(localStorage.getItem("currentUser") || "null");
    return current && current.role === "admin";
  } catch (err) {
    return false;
  }
}

// --- Función para obtener lista de usuarios desde localStorage ---
function getUsuarios() {
  try {
    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    return Array.isArray(usuarios) ? usuarios : [];
  } catch (err) {
    return [];
  }
}

// --- Función para eliminar usuario por email ---
function deleteUsuario(email) {
  const usuarios = getUsuarios();
  const nuevos = usuarios.filter((u) => u.email !== email);
  try {
    localStorage.setItem("usuarios", JSON.stringify(nuevos));
  } catch (err) {
    console.error("No se pudo guardar en localStorage", err);
  }
  return nuevos;
}

// Exponer las funciones globalmente para Jasmine + Karma
window.clienteLogic = {
  isAdminUser,
  getUsuarios,
  deleteUsuario,
};