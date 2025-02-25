# PROYECTO MUNICIPALIDAD
- Crear contexto para la autenticacion de usuario
- Investigar sobre axios
- Interceptores de axios en la solicitud
- Consumir componentes de Material UI (Stepper, TextField, Loading)

## Responsabilidades
- Crear componentes
- Rediseño del formulario
- Creacion de la vista final
- Crear los servicios para consumir:
    * Datos de ingreso ('/codigo-de-pago' -> genera token )
        - Vista: Representante legal depende de lo que marque el ciudadano     
        - Terminos y condiciones (Modal -> PDF)
    * Solicitante
        - end point: '/consultar-ruc o dni'
        - end point: '/guardar-datos-ciudadano'
    * Representante legal
        - end point: '/guardar-datos-representante'
    * Establecimiento
        - end point: '/giros-codigo ciiu'
        - end point: '/obtener-zonificacion'
        - end point: '/guardar-datos-establecimiento'
    * Croquis
        - api de mapas -> Google maps / Leaflet / OpenStreetMap
            - Al hacer click nos de las coordenadas
            - Empezar en Nuevo Chimbote
        - end point: '/enviar-coordenadas'
        - end point: '/area-total'
    * Declaracion jurada
        - end point: '/crear-declaracion-jurada' (Manual)
        - end point: '/obtener-declaracion'
        - Las 2 primeras opciones son obligatorias
        - La tercera opcion dependia del giro del establecimiento
    * Vista General
        - Mostrar todos los datos obtenidos de los campos
        - Finalizar el formulario
        - Consumir todos los endpoints de guardado de datos
        - Actualizar estado de codigo de pago ('/codigo-de-pago')

