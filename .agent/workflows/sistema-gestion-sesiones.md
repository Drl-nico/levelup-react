# Sistema de Gestión de Sesiones - Level Up Gamer

## 📋 Resumen Ejecutivo

El sistema de gestión de sesiones implementado en **Level Up Gamer** utiliza **localStorage** del navegador para mantener el estado de autenticación del usuario en el frontend. Este enfoque permite persistir la sesión incluso después de cerrar y reabrir el navegador.

---

## 🏗️ Arquitectura del Sistema

### 1. **Componentes Principales**

```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND (React)                      │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────────┐      ┌──────────────┐                │
│  │   Login.jsx  │──────│ UserService  │                │
│  └──────────────┘      └──────────────┘                │
│         │                      │                         │
│         │                      ▼                         │
│         │              ┌──────────────┐                 │
│         │              │   Backend    │                 │
│         │              │   API REST   │                 │
│         │              └──────────────┘                 │
│         │                      │                         │
│         ▼                      │                         │
│  ┌──────────────────────────────────┐                  │
│  │       localStorage               │                  │
│  │  { email, role }                 │                  │
│  └──────────────────────────────────┘                  │
│         │                                                │
│         ▼                                                │
│  ┌──────────────┐                                       │
│  │ Navbar.jsx   │                                       │
│  │ Admin.jsx    │                                       │
│  │ Otras páginas│                                       │
│  └──────────────┘                                       │
└─────────────────────────────────────────────────────────┘
```

---

## 🔐 Flujo de Autenticación

### **Paso 1: Inicio de Sesión**

#### Archivo: `src/pages/Login.jsx`

```javascript
const iniciarSesion = async () => {
  setMensaje("");

  try {
    // 1. Llamada al servicio de autenticación
    const user = await loginUser(email, password);

    // 2. Validación de credenciales
    if (!user) {
      setMensaje(`<div class="alert alert-danger">Usuario o contraseña incorrectos.</div>`);
      return;
    }

    // 3. ALMACENAMIENTO EN LOCALSTORAGE
    localStorage.setItem(
      "currentUser",
      JSON.stringify({ email: user.email, role: user.role })
    );

    // 4. Redirección según rol
    if (user.role === "admin") {
      window.location.href = "/administrador";
    } else {
      window.location.href = "/";
    }
  } catch (err) {
    console.error(err);
    setMensaje(`<div class="alert alert-danger">Error en el servidor.</div>`);
  }
};
```

**Características clave:**
- ✅ **Validación de credenciales** contra el backend
- ✅ **Almacenamiento seguro** de datos mínimos (email y rol)
- ✅ **Redirección basada en roles** (admin vs usuario regular)
- ✅ **Manejo de errores** con mensajes al usuario

---

### **Paso 2: Servicio de Autenticación**

#### Archivo: `src/services/UserService.js`

```javascript
// Obtener usuario por email con manejo de 404
export const getUserByEmail = async (email) => {
  try {
    const response = await axios.get(`${API_URL}/email`, {
      params: { email },
    });
    return response.data;
  } catch (err) {
    if (err.response && err.response.status === 404) {
      return null; // Usuario no existe
    }
    throw err;
  }
};

// Login usando backend
export const loginUser = async (email, password) => {
  const user = await getUserByEmail(email);
  if (!user) return null;
  if (user.password !== password) return null;
  return user;
};
```

**Características:**
- 🔍 **Búsqueda de usuario** por email en la base de datos
- 🔒 **Validación de contraseña** (actualmente en texto plano - ver sección de mejoras)
- 📡 **Comunicación con backend** en `http://localhost:8081/api/users`
- ⚠️ **Manejo de errores 404** cuando el usuario no existe

---

### **Paso 3: Registro de Usuarios**

#### Archivo: `src/pages/Registro.jsx`

```javascript
const validarFormulario = async (e) => {
  e.preventDefault();

  const { nombre, email, edad, clave1, clave2, region, comuna } = form;
  const errores = [];

  // Validaciones del lado del cliente
  if (nombre.trim() === "") errores.push("El nombre no puede estar vacío.");
  if (!email.includes("@")) errores.push("El correo no es válido.");
  if (!edad || edad <= 0) errores.push("Edad inválida.");
  if (!region) errores.push("Seleccione región.");
  if (!comuna) errores.push("Seleccione comuna.");
  if (clave1.length < 6) errores.push("Contraseña mínima 6 caracteres.");
  if (clave1 !== clave2) errores.push("Las contraseñas no coinciden.");

  if (errores.length > 0) {
    setMensajes(errores);
    return;
  }

  try {
    // Registro en el backend
    await registerUser({
      nombre,
      email,
      edad: parseInt(edad, 10),
      region,
      comuna,
      password: clave1,
      role: "user", // Por defecto todos son usuarios regulares
    });

    setSuccess(true);
    setMensajes([]);

    // Redirección automática al login
    setTimeout(() => navigate("/login"), 800);
  } catch (err) {
    console.error(err);
    setMensajes(["Error al registrar usuario."]);
  }
};
```

**Validaciones implementadas:**
- ✅ Nombre no vacío
- ✅ Email válido (contiene @)
- ✅ Edad positiva
- ✅ Región y comuna seleccionadas
- ✅ Contraseña mínima de 6 caracteres
- ✅ Confirmación de contraseña

---

## 💾 Estructura de Datos en localStorage

### **Clave:** `currentUser`

### **Valor almacenado:**
```json
{
  "email": "usuario@example.com",
  "role": "user" // o "admin"
}
```

### **Ejemplo de uso:**

```javascript
// Guardar sesión
localStorage.setItem("currentUser", JSON.stringify({ email: "juan@mail.com", role: "user" }));

// Recuperar sesión
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

// Verificar si hay sesión activa
if (currentUser) {
  console.log(`Usuario logueado: ${currentUser.email}`);
  console.log(`Rol: ${currentUser.role}`);
}

// Cerrar sesión
localStorage.removeItem("currentUser");
```

---

## 🔄 Persistencia de Sesión

### **Ventajas del uso de localStorage:**

1. **✅ Persistencia:** La sesión se mantiene incluso después de cerrar el navegador
2. **✅ Simplicidad:** No requiere configuración de cookies o tokens complejos
3. **✅ Accesibilidad:** Fácil de leer desde cualquier componente de React
4. **✅ Capacidad:** Hasta 5-10MB de almacenamiento

### **Desventajas:**

1. **⚠️ Seguridad limitada:** Vulnerable a ataques XSS (Cross-Site Scripting)
2. **⚠️ No expira automáticamente:** La sesión permanece indefinidamente
3. **⚠️ Solo del lado del cliente:** No hay validación del servidor en cada petición

---

## 🛡️ Control de Acceso Basado en Roles

### **Roles implementados:**

| Rol     | Descripción                          | Acceso                                    |
|---------|--------------------------------------|-------------------------------------------|
| `user`  | Usuario regular                      | Catálogo, Carrito, Blogs, Contacto        |
| `admin` | Administrador del sistema            | Panel de administración, Inventario, etc. |

### **Redirección según rol:**

```javascript
if (user.role === "admin") {
  window.location.href = "/administrador";
} else {
  window.location.href = "/";
}
```

### **Página de Administrador:**

#### Archivo: `src/pages/Administrador.jsx`

```javascript
export default function Administrador() {
  const navigate = useNavigate();

  return (
    <div className="admin-page-root">
      <aside className="sidebar">
        <div className="top-section">
          <div className="logo mb-3">Company</div>
          <nav>
            <ul>
              <a href="/cliente">
                <li>Clientes </li>
              </a>
              <li onClick={() => navigate("/inventario")}>Inventario</li>
              <li onClick={() => navigate("/Boleta")}>Boletas</li>
              <li>Empleados</li>
              <li>Customisacion</li>
            </ul>
          </nav>
        </div>
        <div className="bottom-section">
          <ul>
            <li>Settings</li>
            <li>Profile</li>
            <li>Search</li>
            <li>Help</li>
            <li>Logout</li>
          </ul>
        </div>
      </aside>

      <div className="main-content">
        <header>¡HOLA Administrador!</header>
        <main>
          {/* Contenido del panel */}
        </main>
      </div>
    </div>
  );
}
```

---

## 🔧 Implementación Actual vs. Mejores Prácticas

### **Estado Actual:**

| Aspecto                    | Implementación Actual                      | Estado |
|----------------------------|--------------------------------------------|--------|
| Almacenamiento             | localStorage                               | ✅     |
| Validación de credenciales | Backend (MySQL)                            | ✅     |
| Encriptación de contraseña | Texto plano                                | ⚠️     |
| Tokens de sesión           | No implementado                            | ❌     |
| Expiración de sesión       | No implementado                            | ❌     |
| Protección de rutas        | No implementado                            | ❌     |
| Refresh tokens             | No implementado                            | ❌     |

---

## 🚀 Mejoras Recomendadas

### **1. Implementar JWT (JSON Web Tokens)**

```javascript
// Backend: Generar token al hacer login
const jwt = require('jsonwebtoken');

const token = jwt.sign(
  { email: user.email, role: user.role },
  'SECRET_KEY',
  { expiresIn: '24h' }
);

// Frontend: Guardar token
localStorage.setItem('authToken', token);

// Frontend: Enviar token en cada petición
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
```

### **2. Encriptar contraseñas con bcrypt**

```javascript
// Backend: Al registrar usuario
const bcrypt = require('bcrypt');
const hashedPassword = await bcrypt.hash(password, 10);

// Backend: Al validar login
const isValid = await bcrypt.compare(password, user.password);
```

### **3. Protección de rutas privadas**

```javascript
// src/components/PrivateRoute.jsx
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children, requiredRole }) {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && currentUser.role !== requiredRole) {
    return <Navigate to="/" />;
  }

  return children;
}

// Uso en App.jsx
<Route 
  path="/administrador" 
  element={
    <PrivateRoute requiredRole="admin">
      <Administrador />
    </PrivateRoute>
  } 
/>
```

### **4. Context API para gestión global de sesión**

```javascript
// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    setCurrentUser(user);
  }, []);

  const login = (user) => {
    localStorage.setItem('currentUser', JSON.stringify(user));
    setCurrentUser(user);
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
```

### **5. Expiración automática de sesión**

```javascript
// Guardar timestamp al hacer login
const sessionData = {
  user: { email: user.email, role: user.role },
  timestamp: Date.now(),
  expiresIn: 24 * 60 * 60 * 1000 // 24 horas
};

localStorage.setItem('session', JSON.stringify(sessionData));

// Verificar expiración
const session = JSON.parse(localStorage.getItem('session'));
if (session && Date.now() - session.timestamp > session.expiresIn) {
  localStorage.removeItem('session');
  window.location.href = '/login';
}
```

---

## 📊 Diagrama de Flujo Completo

```
┌─────────────────────────────────────────────────────────────┐
│                    USUARIO ACCEDE AL SITIO                   │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
              ┌──────────────────────┐
              │ ¿Tiene sesión activa?│
              │ (localStorage)       │
              └──────────┬───────────┘
                         │
          ┌──────────────┴──────────────┐
          │                             │
          ▼                             ▼
    ┌─────────┐                   ┌─────────┐
    │   SÍ    │                   │   NO    │
    └────┬────┘                   └────┬────┘
         │                             │
         ▼                             ▼
┌────────────────┐            ┌────────────────┐
│ Cargar datos   │            │ Redirigir a    │
│ de usuario     │            │ /login         │
└────────┬───────┘            └────────┬───────┘
         │                             │
         ▼                             ▼
┌────────────────┐            ┌────────────────┐
│ Verificar rol  │            │ Usuario ingresa│
└────────┬───────┘            │ credenciales   │
         │                    └────────┬───────┘
         │                             │
         │                             ▼
         │                    ┌────────────────┐
         │                    │ Validar con    │
         │                    │ Backend        │
         │                    └────────┬───────┘
         │                             │
         │                    ┌────────┴────────┐
         │                    │                 │
         │                    ▼                 ▼
         │              ┌──────────┐      ┌──────────┐
         │              │ VÁLIDO   │      │ INVÁLIDO │
         │              └────┬─────┘      └────┬─────┘
         │                   │                 │
         │                   ▼                 ▼
         │          ┌─────────────────┐  ┌──────────┐
         │          │ Guardar en      │  │ Mostrar  │
         │          │ localStorage    │  │ error    │
         │          └────┬────────────┘  └──────────┘
         │               │
         └───────────────┘
                 │
                 ▼
        ┌────────────────┐
        │ ¿Rol = admin?  │
        └────────┬───────┘
                 │
     ┌───────────┴───────────┐
     │                       │
     ▼                       ▼
┌─────────┐           ┌─────────────┐
│ Admin   │           │ Usuario     │
│ Panel   │           │ Regular     │
└─────────┘           └─────────────┘
```

---

## 🧪 Testing del Sistema de Sesiones

### **Pruebas manuales recomendadas:**

1. **✅ Login exitoso con usuario regular**
   - Verificar redirección a `/`
   - Verificar datos en localStorage

2. **✅ Login exitoso con admin**
   - Verificar redirección a `/administrador`
   - Verificar acceso a panel de administración

3. **✅ Login fallido**
   - Verificar mensaje de error
   - Verificar que NO se guarda nada en localStorage

4. **✅ Persistencia de sesión**
   - Cerrar navegador
   - Reabrir navegador
   - Verificar que la sesión sigue activa

5. **✅ Registro de nuevo usuario**
   - Completar formulario
   - Verificar creación en base de datos
   - Verificar redirección a login

---

## 📝 Conclusión

El sistema de gestión de sesiones implementado en **Level Up Gamer** es **funcional y simple**, utilizando `localStorage` para mantener el estado de autenticación. Sin embargo, para un entorno de producción, se recomienda implementar las mejoras sugeridas, especialmente:

1. **JWT para tokens seguros**
2. **Encriptación de contraseñas con bcrypt**
3. **Protección de rutas privadas**
4. **Context API para gestión global**
5. **Expiración automática de sesiones**

---

## 📚 Referencias

- [MDN - Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)
- [JWT.io - Introduction to JSON Web Tokens](https://jwt.io/introduction)
- [React Router - Protected Routes](https://reactrouter.com/en/main/start/tutorial)
- [OWASP - Session Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html)

---

**Última actualización:** 2025-12-03  
**Autor:** Sistema de documentación Level Up Gamer
