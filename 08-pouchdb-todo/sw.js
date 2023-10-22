importScripts('js/sw-utils.js');

const CACHES = {
    CACHE_STATIC_NAME: 'static-v1',
    CACHE_INMUTABLE_NAME: 'inmutable-v1',
    CACHE_DYNAMIC_NAME: 'dynamic-v1',
};

const APP_SHELL = [
    '/',
    'index.html',
    'style/base.css',
    'style/bg.png',
    'js/base.js',
    'js/app.js',
    'js/sw-utils.js',
];

const APP_SHELL_INMUTABLE = [
    'https://cdn.jsdelivr.net/npm/pouchdb@8.0.1/dist/pouchdb.min.js',
];

/**
 * Estategia utilizada: cache or network fallback
 */

// eventos de instalacion SW
// instalacion de los caches
self.addEventListener('install', event => {
    const cacheStaticPromise = caches.open(CACHES.CACHE_STATIC_NAME)
        .then(cache => cache.addAll(APP_SHELL))
        .catch(error => console.error(error));

    const cacheInmutablePromise = caches.open(CACHES.CACHE_INMUTABLE_NAME)
        .then(cache => cache.addAll(APP_SHELL_INMUTABLE))
        .catch(error => console.error(error));
    
    
    event.waitUntil(Promise.all([cacheStaticPromise, cacheInmutablePromise]));
});

// evento de activacion del SW
// borramos el cache viejo si el cache estatico cambia
self.addEventListener('activate', event => {
    const cacheStaticDeletePromise = caches.keys()
        .then(keys => {
            keys.forEach(key => {
                if (key !== CACHES.CACHE_STATIC_NAME && key.includes('static')) {
                    return caches.delete(key);
                } 
            });
        })
        .catch(error => console.error(error));

    event.waitUntil(cacheStaticDeletePromise);
});

// evento fetch del sw
// interceptamos las peticiones con la informacion
// almacenada en cache en caso de no tener conexion
self.addEventListener('fetch', event => { 
    const cachesMatchPromise = caches.match(event.request)
        .then(responseCache => {
            if (responseCache) {
                return responseCache;
            }

            return fetch(event.request)
                .then(response => updateDynamicCache(CACHES.CACHE_DYNAMIC_NAME, event.request, response))
                .catch(error => console.error(error));
        });  
    
    // no olvidar la respuesta del fetch con un respondWith
    event.respondWith(cachesMatchPromise);
});