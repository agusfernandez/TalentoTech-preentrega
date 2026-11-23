# NÓRDICO — E-Commerce de Decoración y Objetos para el Hogar

Aplicación web de e-commerce enfocada en diseño y decoración para el hogar con estética nórdica cálida, materiales nobles y navegación simple. Incluye catálogo de productos, detalle de pieza, carrito de compras y un panel administrativo para gestionar inventario y cupones.

> **Nota:** Este proyecto forma parte de mi aprendizaje y crecimiento continuo en desarrollo frontend con React y servicios de Firebase.

## Características principales

* **Catálogo y exploración:** Navegación por categorías y piezas de decoración para el hogar con diseño limpio y responsive.
* **Detalle de producto:** Visualización de información de cada ítem y agregado al carrito.
* **Carrito de compras:** Gestión de cantidades, subtotal y flujo de compra.
* **Panel administrativo:** Módulo de gestión de inventario y administración de cupones.
* **Autenticación y persistencia:** Integración con Firebase para autenticación y almacenamiento de datos en Firestore.

## Tecnologías utilizadas

* **Frontend:** React, Vite, React Router
* **Estilos y UI:** CSS Modules / CSS, Lucide Icons
* **Backend / BaaS:** Firebase (Authentication, Cloud Firestore)
* **Deploy:** Netlify

## Estructura del proyecto (referencia)

```text
src/
├── assets/          # Íconos, avatares e imágenes del catálogo
├── components/      # Componentes reutilizables y formularios
├── pages/           # Vistas principales (Home, Catálogo, Contacto, Admin, etc.)
├── firebase/        # Configuración e inicialización de Firebase
└── App.jsx          # Rutas y estructura general

```


## Cómo levantar el servidor en local

Una vez instaladas las dependencias (`npm install`) y configuradas las variables de entorno en `.env`, ejecutá:

```bash
npm run dev

```


## Autora

Agustina Fernandez — Diseñadora freelance orientada a productos digitales y web, en formación continua en desarrollo frontend con React.


GitHub: @agusfernandez
Linkedin: https://www.linkedin.com/in/maria-agustina-fernandez/