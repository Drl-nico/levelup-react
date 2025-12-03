import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/admin.css";

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
				<header>
					¡HOLA Administrador!
				</header>
				<main>
					<section className="content-top">
						{/* Aquí puedes agregar contenido superior */}
					</section>
					<section className="content-bottom">
						{/* Aquí puedes agregar contenido inferior */}
					</section>
				</main>
			</div>
		</div>
	);
}

