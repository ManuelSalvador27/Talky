# Talky
Repositorio del Proyecto de mensajería Talky

## Estructura del Repositorio
- Entregables   
    - Talky-DiagramaDeClases.png: Diagrama de clases del proyecto Talky, elaborado en la materia de Desarrollo de Software. Este diagrama ilustra las principales clases del sistema y sus relaciones.
    - usuario.java: Implementación de la clase Usuario.
    - mensaje.java: Implementación de la clase Mensaje.
    - chat.java: Implementación de la clase Chat.
    - grupo.java: Implementación de la clase Grupo.
    - autenticacion.java: Implementación de la clase Autenticación.
- README.md: Este archivo que estás leyendo.

## Instalación y Uso
### Requisitos
* Node.js version `v14.21.3` 
* npm (Node Package Manager)
* VS Code
* Git
* Firebase Account

#### Configuración del Proyecto
1. Clona el repositorio a tu máquina local:
```clojure
git clone https://github.com/tu_usuario/talky.git
```
2. Navega al directorio del proyecto:

```clojure
cd talky
cd talky_v2
```

3. Instala las dependencias del proyecto:

```clojure
npm install
```

### Ejecución del Proyecto
Ejecuta el comando para iniciar el servidor de desarrollo:

```clojure
npm run dev
```

Abre tu navegador y visita `http://localhost:8080` para ver la aplicación en funcionamiento.

## Historial de cambios

<details>
    <summary>Miércoles, 06 de Agosto de 2024</summary>
    Nuevas Funcionalidades:
        - Se han agregado los enlaces al proyecto de Firebase.
        - Se ha implementado la funcionalidad de login y registro de usuarios.
        - Ahora es posible editar el perfil de usuario desde la aplicación.
        - Se ha implementado la funcionalidad de verificar email, emitido por medio de firebase.
</details>

<details>
    <summary>Sábado, 10 de Agosto de 2024</summary>
    Nuevas Funcionalidades:
        - Se ha implementado la funcionalidad de cambio de conrseña, con un temporizador.
        - Cambios para la ejecución del código [Entorno desarrollo].
        - Se anexa un historial de cambios del archivo README.md
</details>

## Contribución
Las contribuciones son bienvenidas. Si deseas contribuir, por favor sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama con tu funcionalidad: `git checkout -b mi-funcionalidad`
3. Realiza tus cambios y haz un commit: `git commit -m 'Añadir mi funcionalidad'`
4. Sube tus cambios a tu fork: `git push origin mi-funcionalidad`
5. Crea un **Pull Request** en GitHub.

## Licencia
Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

## Contacto
Para cualquier pregunta o sugerencia, por favor contacta a manuelsalvador2799@gmail.com
