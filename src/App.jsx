import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import Registro from "./pages/Registro";
import Administrador from "./pages/Administrador";
import Cliente from "./pages/Cliente";
import NuevoCliente from "./pages/NuevoCliente";
import "./styles/admin.css";
import Catalogo from "./pages/Catalogo";
import Detalle from "./pages/Detalle";
import Detalle2 from "./pages/Detalle2";
import Detalle3 from "./pages/Detalle3";
import Blog from "./pages/Blog";
import DetalleBlog1 from "./pages/Detalle-blog1";
import DetalleBlog2 from "./pages/Detalle-blog2";
import Carrito from "./pages/Carrito";

export default function App() {
  return (
    <div className="app-root">
      <Navbar /> {/* <-- Componente cerrado */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/administrador" element={<Administrador />} />
          <Route path="/cliente" element={<Cliente />} />
          <Route path="/nuevo-cliente" element={<NuevoCliente />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/Catalogo" element={<Catalogo/>} />
          <Route path="/Detalle" element={<Detalle/>} />
          <Route path="/Detalle2" element={<Detalle2/>} />
          <Route path="/Detalle3" element={<Detalle3/>} />
          <Route path="/Blog" element={<Blog/>} />
          <Route path="/DetalleBlog1" element={<DetalleBlog1/>} />
          <Route path="/DetalleBlog2" element={<DetalleBlog2/>} />
          <Route path="/Carrito" element={<Carrito/>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

/*import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>
      </header>
    </div>
  );
}

export default App;*/
