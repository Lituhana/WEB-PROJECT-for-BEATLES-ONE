# Beatles One - A Beatles Tribuite in Uruguay 🇺🇾

Official website for **Beatles One**, a tribute band based in Montevideo, Uruguay.

This project was developed as a responsive website using HTML5, CSS and JavaScript, it was built with a focus on clean structure, usability and content management.

## 🚀 Live Demo
[https://beatlesone.com](https://beatles-one.netlify.app/)

## 🛠️ Tecnologías Utilizadas
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=black)
![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7)

## 🧠 Desafíos Técnicos y Soluciones

Durante el desarrollo, nos enfocamos en resolver problemas críticos de UX y arquitectura de datos:

* **Gestión Dinámica de Shows (CMS sin servidor)**: Implementamos una integración con **Google Sheets API**. Esto permite que la banda actualice su agenda desde una planilla de cálculo, impactando en la web instantáneamente mediante un fetch de datos JSON.
* **Optimización del Hero Video**: Resolvimos problemas de visualización en dispositivos móviles (el famoso "500% de zoom"). Aplicamos una solución de `aspect-ratio` y `object-fit: contain` para asegurar que el material audiovisual se vea correctamente en cualquier pantalla sin recortes forzados.
* **Sistema Bilingüe (i18n)**: Desarrollamos un motor de traducción en Vanilla JS que utiliza atributos `data-section`. Esto permite cambiar entre Español e Inglés de forma dinámica, manteniendo el estado de la página sin recargas innecesarias.
* **Arquitectura de Estilos**: Se aplicaron reglas estrictas de CSS para mantener la legibilidad de los textos, forzando saltos de línea inteligentes y manejando la semántica de párrafos para una presentación profesional.

## 📋 Características Principales
* **Dynamic Agenda**: Sincronización automática con Google Sheets.
* **Mobile-First Design**: UI adaptada meticulosamente para celulares.
* **Video Gallery**: Carrusel interactivo de videos de YouTube.
* **Performance**: Carga ultra rápida al no depender de librerías externas pesadas.

## ✒️ Autor
**Camilo Celi** - *Desarrollador, Músico y Líder del proyecto*