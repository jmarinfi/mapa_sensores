# Arquitectura de la Aplicación de Visualización de Sensores

## 1. Resumen Ejecutivo

Este documento describe la arquitectura de software para una aplicación web diseñada para visualizar sensores georeferenciados en un mapa. El objetivo es crear un sistema **modular**, **mantenible** y **escalable**.

La arquitectura seleccionada es una **Arquitectura en Capas (Layered Architecture)**. Este patrón separa la aplicación en distintos niveles lógicos, donde cada capa tiene una responsabilidad específica y solo se comunica con las capas adyacentes. Este diseño promueve un alto nivel de **desacoplamiento** y facilita el desarrollo, las pruebas y la evolución del sistema.

La aplicación se estructura en cuatro capas principales:

1.  **Capa de Presentación (Frontend)**
2.  **Capa de Aplicación (API Endpoints)**
3.  **Capa de Lógica de Negocio (Servicios)**
4.  **Capa de Acceso a Datos (DAL)**



---

## 2. Descripción de las Capas

### 2.1. Capa de Presentación (Frontend)

Esta es la única capa con la que el usuario interactúa directamente. Su responsabilidad es renderizar la interfaz de usuario (UI) y capturar las acciones del usuario.

* **Responsabilidades**:
    * Mostrar los controles de selección (obra, tipo de sensor).
    * Renderizar el mapa y la ubicación de los sensores.
    * Gestionar el estado de la UI.
    * Iniciar peticiones de datos a la Capa de Aplicación en respuesta a las interacciones del usuario.
* **Principios Clave**:
    * **Basada en componentes**: La interfaz se construye a partir de piezas modulares y reutilizables (selectores, el mapa, etc.).
    * **Agnóstica a la lógica de negocio**: Esta capa no sabe cómo se obtienen o procesan los datos; simplemente los solicita y los muestra.

### 2.2. Capa de Aplicación (API Endpoints)

Actúa como una fachada o puerta de entrada al sistema backend. Expone las funcionalidades de la aplicación al mundo exterior de una manera controlada y segura.

* **Responsabilidades**:
    * Definir los puntos de entrada (endpoints) que la Capa de Presentación puede consumir.
    * Recibir y validar las peticiones entrantes.
    * Gestionar la autenticación y autorización (si fuera necesario).
    * Delegar la ejecución de las tareas a la Capa de Lógica de Negocio.
    * Formatear y devolver las respuestas a la Capa de Presentación.
* **Principios Clave**:
    * **Contrato de API bien definido**: Expone una interfaz clara y estable (por ejemplo, siguiendo un estilo RESTful).
    * **Seguridad**: Es el punto de control para proteger el acceso a los datos y la lógica del sistema. El cliente nunca accede directamente a las capas inferiores.

### 2.3. Capa de Lógica de Negocio (Servicios)

Esta capa es el cerebro de la aplicación. Contiene las reglas, procesos y algoritmos que definen el comportamiento del sistema.

* **Responsabilidades**:
    * Implementar los casos de uso de la aplicación (ej: "obtener sensores filtrados por obra y tipo").
    * Orquestar las llamadas a la Capa de Acceso a Datos para obtener o modificar la información.
    * Realizar cálculos, transformaciones o agregaciones de datos si es necesario.
* **Principios Clave**:
    * **Independencia de la tecnología**: Esta capa no debe tener conocimiento de la base de datos subyacente ni del formato de las peticiones HTTP. Se centra exclusivamente en la lógica del dominio.
    * **Reutilización**: La lógica definida aquí puede ser utilizada por múltiples endpoints de la Capa de Aplicación.

### 2.4. Capa de Acceso a Datos (DAL - Data Access Layer)

Es la capa más baja de la arquitectura y la única responsable de la comunicación con la base de datos.

* **Responsabilidades**:
    * Gestionar la conexión con la base de datos.
    * Ejecutar las operaciones de persistencia de datos (consultas, inserciones, actualizaciones, etc.).
    * Mapear los datos entre el formato de la base de datos y las estructuras de objetos que utiliza la Capa de Lógica de Negocio.
* **Principios Clave**:
    * **Abstracción de la persistencia**: Aísla al resto de la aplicación de los detalles específicos del motor de base de datos. Si se cambia de proveedor de base de datos, esta es la única capa que necesitaría ser modificada.
    * **Repositorio único de consultas**: Centraliza todo el código de acceso a datos, facilitando su optimización y mantenimiento.

---

## 3. Flujo de Datos Típico

Para ilustrar cómo interactúan las capas, consideremos el flujo de una petición para ver sensores en el mapa:

1.  **Usuario**: El usuario selecciona una obra y un tipo de sensor en la **Capa de Presentación**.
2.  **Capa de Presentación**: Realiza una petición (ej: `GET /api/sensores?obra=X&tipo=Y`) a la **Capa de Aplicación**.
3.  **Capa de Aplicación**: El endpoint correspondiente recibe la petición, valida los parámetros `obra` y `tipo`, y llama a la función apropiada en la **Capa de Lógica de Negocio**.
4.  **Capa de Lógica de Negocio**: El servicio correspondiente invoca a la **Capa de Acceso a Datos**, solicitando los sensores que cumplan con los criterios.
5.  **Capa de Acceso a Datos**: Construye y ejecuta la consulta SQL contra la base de datos y devuelve los resultados a la capa de servicios.
6.  **Flujo de Retorno**: Los datos viajan de vuelta a través de las capas (DAL -> Servicios -> API -> Presentación).
7.  **Capa de Presentación**: Recibe los datos de los sensores y actualiza el componente del mapa para mostrar los nuevos marcadores.

---

## 4. Ventajas de esta Arquitectura

* **Mantenibilidad**: Al estar las responsabilidades claramente separadas, encontrar y modificar el código es mucho más sencillo y seguro.
* **Testabilidad**: Cada capa puede ser probada de forma aislada. Se puede probar la lógica de negocio sin una interfaz de usuario o una base de datos real.
* **Flexibilidad**: Es fácil reemplazar una capa sin afectar al resto. Por ejemplo, se puede cambiar la base de datos (modificando la DAL) o construir una nueva interfaz de usuario (una app móvil) que consuma la misma API.
* **Desarrollo en Paralelo**: Diferentes equipos o desarrolladores pueden trabajar en distintas capas simultáneamente una vez que se ha definido la interfaz entre ellas.
