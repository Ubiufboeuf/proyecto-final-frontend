# Proyecto Final - Frontend

Web del proyecto.
Inspirado en el diseño de Berrutti, con mejoras como el seguimiento de los ómnibus, y con un stack rápido potente: Astro, Preact, Tailwind y TypeScript.

Equipo:
- Matías Iturralde
- Luis Quevedo
- Matías Giménez
- Federico Artencio

## Comandos del proyecto

```sh
dev # Levanta el proyecto en el puerto 4321
build # Compila el proyecto en dist/, y genera todo lo necesario para desplegar en cloudflare pages
```

## 📍 Leaflet
Leaflet es la biblioteca que usaremos para el seguimiento de los ómnibus.

Algunos ejemplos de código básicos para usarlo son:

### Marcadores fijos
```javascript
const marker = L.marker([LATITUD, LONGITUD])
  .addTo(map)
  // .bindPopup("Nombre del lugar") // <- agrega un popup al marcador
  // .openPopup() // <- si quieres abrir el popup al momento

// O también:
const marker = L.marker([LATITUD, LONGITUD])
marker
  .addTo(map)
  .bindPopup("Nombre del lugar")
  .openPopup()
```

### Marcadores en movimiento 
```javascript
const busMarker = L.marker([LATITUD_0, LONGITUD_0]).addTo(map)

setInterval(() => {
  busMarker.setLatLng([LATITUD_N, LONGITUD_N])
}, 30)
```


## Enlaces
- [Documento de entrega](https://docs.google.com/document/d/1_Y1R1E1OG2PVn79fYFMBiSY__FAvEOf6Qnb7Yd-YyUY/edit?usp=sharing)
- [Documentación del proyecto](#)
- [Repositorio del Frontend](https://github.com/Ubiufboeuf/proyecto-final-frontend)
- [Repositorio del Backend](https://github.com/Ubiufboeuf/proyecto-final-backend)
