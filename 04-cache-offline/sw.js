'use strict'

const APP_SHELL = {
    CACHE_NAME: 'cache-v1',
    CACHE_STATIC: 'static-v2',
    CACHE_DYNAMIC: 'dynamic-v1',
    CACHE_INMUTABLE: 'inmutable-v1'
};

async function cleanCache( cacheName, numberItems ) {

    const cache = await caches.open( cacheName );
    const keys = await cache.keys();

    // console.log( keys );

    if ( keys.length > numberItems ) {
        
        await cache.delete( keys[0] );
        
        cleanCache( cacheName, numberItems );
    }
}

// implementacion ES5
/* function cleanCache( cacheName, numberItems ) {

    caches.open( cacheName ).then( cache => {
        
        cache.keys().then( keys => {
            
            if ( keys.length > numberItems ) {
                
                cache.delete( keys[0] ).then( removed => {
                    cleanCache( cacheName, numberItems );
                });
            }
        });
    });
}*/

self.addEventListener('install', event => {
    
    // abrir el cache
    const cachePromise = caches.open( APP_SHELL.CACHE_STATIC )
        .then( cache => {

            const files = [
                './',
                './index.html',
                './css/style.css',
                './img/main.jpg',
                './js/app.js'
            ];

            // debe devolver una promesa
            return cache.addAll( files );
        });

    const cacheInmutablePromise = caches.open( APP_SHELL.CACHE_INMUTABLE )
        .then( cache => {
            return cache.add('https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css');
        })

    event.waitUntil( Promise.all([ cachePromise, cacheInmutablePromise ]) );
});


// ESTRATEGIAS DEL CACHE
self.addEventListener('fetch', event => {
    
    // 1. cache-only: el cache maneja toda la interaccion sin acceder a la web
    // event.respondWith( caches.match( event.request ) );

    // 2. cache with network fallback: busca los archivos en el cache, sino accede a la web
    const cacheNetwork = caches.match( event.request )
        .then( response => {

            console.log( event.request );

            if ( response && response.ok ) {
                return response;
            }

            // no existe va a la web
            // console.log( 'No existe ', event.request.url );

            return fetch( event.request ).then( newResponse => {
                
                caches.open( APP_SHELL.CACHE_DYNAMIC ).then( cache => {
                    cache.put( event.request, newResponse );
                    
                    cleanCache( APP_SHELL.CACHE_DYNAMIC, 50 );
                });
                
                return newResponse.clone();   
            });
        });

    event.respondWith( cacheNetwork );
});


