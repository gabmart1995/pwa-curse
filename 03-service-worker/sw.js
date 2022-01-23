
// Ciclo de vida del SW
self.addEventListener('install', event => {
    
    // descargar assets
    // inicializamos el cache
    console.log('SW: Instalando SW');

    const instalation = new Promise(( resolve ) => {

        setTimeout(() => {
            console.log('SW: instalaciones terminadas');
            
            // se monta inmediatamente al momento de instalar
           self.skipWaiting();
            
            resolve();

        }, 1);
        
    });
    
    // controla los eventos asincronos
    event.waitUntil( instalation );
});

// se activa el SW
self.addEventListener('activate', event => {
    
    // borrar cache viejo
    console.log('SW: listo y activado');
});

// intercepta llamadas web
self.addEventListener('fetch', event => {
    // aplicar las estrategias del cache
    
    console.log('SW: ' + event.request.url );

    /*if ( event.request.url.includes('https://reqres.in') ) {
        const response = new Response(`
            {
                "ok": false,
                "message": "jajaja"
            }
        `, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        event.respondWith( response );
    }*/

    event.respondWith( fetch( event.request ) );
});

// evento de recuperar la conexion
self.addEventListener('sync', event => {
   //  console.log('tenemos conexion');
   //  console.log( event );
});

// manejar push notifications
self.addEventListener('push', event => {
    console.log('Notificacion recibida');
});