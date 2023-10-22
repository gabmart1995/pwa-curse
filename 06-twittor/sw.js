// imports
importScripts('js/sw-utils.js');

const STATIC_CACHE = 'static_v2';
const DYNAMIC_CACHE = 'dynamic_v1';
const INMUTABLE_CACHE = 'inmutable_v1';

const APP_SHELL = [
    '/',
    'index.html',
    'css/style.css',
    'img/favicon.ico',
    'img/avatars/hulk.jpg',
    'img/avatars/ironman.jpg',
    'img/avatars/spiderman.jpg',
    'img/avatars/thor.jpg',
    'img/avatars/wolverine.jpg',
    'js/app.js',
    'js/sw-utils.js',
];

const APP_SHELL_INMUTABLE = [
    'https://fonts.googleapis.com/css?family=Quicksand:300,400',
    'https://fonts.googleapis.com/css?family=Lato:400,300',
    // 'https://use.fontawesome.com/releases/v5.3.1/css/all.css',
    'css/all.css',
    'css/animate.css',
    'js/libs/jquery.js',
];


// instalation
self.addEventListener('install', event => {
    
    const cacheStatic = caches.open( STATIC_CACHE )
        .then( cache => cache.addAll( APP_SHELL ));

    
    const cacheInmutable = caches.open( INMUTABLE_CACHE )
        .then( cache => cache.addAll( APP_SHELL_INMUTABLE ));
    
    // esperamos el inicio de instalacion
    event.waitUntil( Promise.all([ cacheStatic, cacheInmutable ]) );
});

// activate
self.addEventListener('activate', event => {
    
    const response = caches.keys()
        .then( keys => {

            keys.forEach( key => {
            
                if ( key !== STATIC_CACHE && key.includes('static') ) {
                    return caches.delete( key );
                }
            });
        });

    event.waitUntil( response );
});

self.addEventListener('fetch', event => {

    const promiseResponse = caches.match( event.request )
        .then( response => {
            
            if ( response ) {
                return response;
            }

            // fetch al recurso nuevo inicializacion de cache dinamico
            return fetch( event.request )
                .then( newResponse => {
                    return updateDynamicCache( DYNAMIC_CACHE, event.request, newResponse );
                });
        });
    
    // no olvidar la respuesta del fetch con un respondWith
    event.respondWith( promiseResponse );
});