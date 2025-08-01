# Introducción

Este proyecto es una versión mejorada de la web de Berrutti Turismo. Tiene como objetivo permitir la compra de boletos en línea, seguimiento en tiempo real de los ómnibus, y ofrecer una experiencia rápida y moderna. Para esto, se integran tecnologías como WebSockets, una pasarela de pago con MercadoPago y la generación de comprobantes con códigos QR.

# 📖 Manual del sistema

A continuación, se detallan las distintas partes del proyecto, **frontend** y **backend** para explicar qué incluye cada una, qué función cumple y cómo se utilizan.

## 🌐 Frontend

El frontend está hecho con Astro, Preact (TSX), TypeScript y TailwindCSS.

- Astro es la base del proyecto: genera las páginas rápido y solo envía al navegador lo necesario.
- Preact ayuda a crear y manejar la interfaz de forma rápida y ligera.
- TailwindCSS permite dar estilo fácil y rápido.
- TypeScript facilita programar con menos errores.

Se usan rutas dinámicas, componentes reutilizables y llamadas a la API para mostrar datos en tiempo real y crear páginas personalizadas, como los comprobantes QR.

La mayoría de las páginas comparten estructura: header, menú lateral y footer. La excepción son la página de seguimiento y de viajes personalizados, que tienen diseño propio.

### Terminadas
- Inicio
- Rutas: Permite ver y comprar boletos para los viajes fijos
- Servicios: Todos los servicios que ofrece Berrutti

### En proceso
- Seguimiento: Para ver la ubicación de los ómnibus

### Pendientes
- Viajes personalizados: Por ejemplo para viajes escolares
- Pago: Toda la pasarela de pago
- QR: El comprobante de compra

También está planeado implementar un Dashboard para la administración de pagos y reservas. Sin embargo, por cuestiones de tiempo, no está incluido en esta versión.

## 💻 Backend

El backend se encarga de gestionar la lógica del sistema, incluyendo la autenticación, la gestión de pagos, el estado de los asientos y la conexión en tiempo real para el seguimiento. Se divide en:

### HTTP
- Sesión de usuario:
  - Inicio de sesión
  - Registro
  - Para pedir datos de un usuario

- Pago online
  - **Registrar la compra:** Esto es para saber: qué asiento se eligió, en qué ómnibus, y para qué viaje. Esta información se debería guardar temporalmente para antes de mercadopago.

  - Confirmar la compra: Una vez que MercadoPago aprueba el pago, envía una notificación (IPN/Webhook) al backend. Ejemplo de endpoint: `POST /webhooks/mercadopago.php`.
  El proceso incluye:

    - Recibir la confirmación del pago.
    - Marcar el asiento como ocupado.
    - Guardar el boleto en la base de datos.
    - Generar un **ID único de compra propio**, que se usará para mostrar el comprobante QR desde el frontend.

### WebSockets
- Seguimiento en tiempo real
  - Para pedir información de todos los ómnibus
  - Para pedir información de uno solo

### 📌 Notas
La generación del QR se hace en el frontend a partir del ID de compra que devuelve el backend.

El QR apunta a una página dinámica que, al cargar, consulta a un endpoint para obtener los detalles del viaje y mostrar el comprobante.

# 🛒 ¿Cómo funciona la compra?

La compra se realiza mediante MercadoPago, en un entorno seguro y protegido. No se almacenan datos sensibles en el sitio, y el pago solo se confirma cuando MercadoPago aprueba la transacción. Así se garantiza que el asiento quede reservado únicamente si el pago fue exitoso.

Los pasos para comprar un boleto son:
1. Elegís tu viaje, cantidad de pasajeros y asiento/s.
2. Confirmás la selección.
3. Se abre MercadoPago para hacer el pago.
4. Una vez confirmado, se genera un comprobante con un código QR.
5. Ese QR funciona como boleto y debe escanearse en el ómnibus con el lector del chofer.
