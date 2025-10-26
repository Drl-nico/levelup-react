import React from "react";
import "../styles/admin.css";

export default function Administrador() {
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
							<li>Inventario</li>
							<li>Reportes</li>
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

