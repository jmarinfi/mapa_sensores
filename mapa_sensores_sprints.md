# Plan de Sprints: Aplicación de Visualización de Sensores

Este documento detalla el plan de implementación iterativo para el desarrollo de la aplicación de visualización de sensores. El proyecto seguirá una metodología ágil basada en Sprints, permitiendo la entrega de valor de forma incremental y la adaptación continua.

---

## Sprint 0: Configuración y Cimientos

* **Duración:** 1 semana
* **Objetivo Principal:** Establecer un entorno de desarrollo robusto y una base de proyecto sólida que permita al equipo empezar a construir funcionalidades de manera eficiente.

### Tareas Clave

* **Inicialización del Proyecto**: Crear el proyecto con el framework web seleccionado y configurar el sistema de control de versiones (Git).
* **Gestión de Dependencias**: Instalar todas las librerías primarias necesarias (driver de base de datos, librería de renderizado de mapas, etc.).
* **Configuración del Entorno**: Definir y documentar el uso de variables de entorno para gestionar configuraciones sensibles, como las credenciales de la base de datos.
* **Prueba de Conexión a BD**: Implementar un script o módulo inicial en la Capa de Acceso a Datos (DAL) para verificar que la conexión con la base de datos remota es exitosa.
* **Estructura del Proyecto**: Crear la estructura de directorios lógicos definidos en el documento de arquitectura para albergar las diferentes capas (servicios, DAL, componentes, etc.).

---

## Sprint 1: Visualización Mínima Viable (MVP)

* **Duración:** 2 semanas
* **Objetivo Principal:** Demostrar el flujo de datos completo (end-to-end), desde la consulta a la base de datos hasta la renderización en el mapa, utilizando un conjunto de datos predefinido.

### Historias de Usuario / Tareas Clave

* **Backend**: Implementar un endpoint en la API que obtenga datos de sensores para una **obra y un tipo fijos** (hardcoded).
* **Backend**: Desarrollar la lógica necesaria en las capas de Servicio y DAL para ejecutar la consulta correspondiente.
* **Frontend**: Crear un componente de mapa reutilizable.
* **Frontend**: Integrar el componente de mapa en la página principal.
* **Frontend**: Realizar una llamada desde la página al endpoint de la API para obtener los datos y pasarlos como propiedades al componente del mapa.
* **Frontend**: Renderizar los sensores recibidos como marcadores básicos en el mapa.

### Resultado Esperado al Final del Sprint

Una página web funcional que muestra un mapa con la ubicación de un conjunto específico de sensores, validando que toda la arquitectura está conectada correctamente.

---

## Sprint 2: Interactividad y Selección Dinámica

* **Duración:** 2 semanas
* **Objetivo Principal:** Dotar a la aplicación de interactividad, permitiendo que el usuario final pueda seleccionar y filtrar los sensores que desea visualizar.

### Historias de Usuario / Tareas Clave

* **Backend**: Crear un endpoint de API para obtener y devolver la lista completa de obras disponibles.
* **Backend**: Crear un endpoint de API para obtener y devolver todos los tipos de sensores existentes.
* **Frontend**: Crear componentes de UI reutilizables para los menús de selección (selector de obra, selector de tipo de sensor).
* **Frontend**: Poblar dinámicamente los menús de selección utilizando los nuevos endpoints.
* **Frontend**: Modificar el endpoint principal de sensores para que acepte parámetros de filtrado (ID de obra, tipo de sensor).
* **Frontend**: Implementar la lógica para que, al cambiar la selección del usuario, se realice una nueva petición a la API con los filtros seleccionados y se actualice el mapa.

### Resultado Esperado al Final del Sprint

Una aplicación interactiva donde el usuario puede elegir cualquier combinación de obra y tipo de sensor, y ver los resultados actualizados en el mapa en tiempo real.

---

## Sprint 3: Refinamiento y Experiencia de Usuario (UX)

* **Duración:** 2 semanas
* **Objetivo Principal:** Mejorar la usabilidad y robustez de la aplicación, haciéndola más intuitiva y agradable de usar.

### Historias de Usuario / Tareas Clave

* **UX**: Implementar indicadores de estado de carga (ej. spinners) que se muestren mientras se esperan los datos de la API.
* **UX**: Mostrar mensajes informativos en la interfaz cuando una selección no arroje resultados ("No se encontraron sensores para esta selección").
* **Mapa**: Al hacer clic sobre un marcador, mostrar un popup con detalles adicionales del sensor (ej: nombre, ID, última lectura).
* **Mapa**: Implementar una función de auto-ajuste de zoom y centro del mapa (fitBounds) para encuadrar todos los marcadores visibles tras una consulta.
* **Manejo de Errores**: Implementar un sistema de gestión de errores para manejar fallos en las llamadas a la API o problemas en el servidor, mostrando notificaciones amigables al usuario.

### Resultado Esperado al Final del Sprint

Una aplicación pulida, que comunica claramente su estado al usuario, gestiona los errores de forma elegante y proporciona una experiencia de uso fluida y profesional.

---

## Sprint 4: Preparación para Despliegue

* **Duración:** 1 semana
* **Objetivo Principal:** Asegurar que la aplicación esté completamente probada, optimizada y empaquetada para su despliegue en un entorno de producción.

### Tareas Clave

* **Pruebas**: Realizar una ronda completa de pruebas de regresión y de usuario para asegurar la calidad y estabilidad de la aplicación.
* **Optimización**: Revisar el rendimiento general, optimizar consultas lentas si las hubiera y minimizar el tamaño de los recursos del frontend.
* **Documentación**: Completar la documentación técnica del proyecto (README, configuración de entorno, etc.).
* **Build de Producción**: Generar la compilación final y optimizada de la aplicación.
* **Plan de Despliegue**: Definir y documentar los pasos necesarios para desplegar la aplicación en el servidor de producción.

### Resultado Esperado al Final del Sprint

Un artefacto de software listo para ser desplegado, acompañado de la documentación necesaria para su puesta en marcha y mantenimiento.
