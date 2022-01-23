

if ( navigator.serviceWorker ) {
    navigator.serviceWorker.register('./sw.js');
}

/*if ( window.caches ) {
    
    // abre los caches
    caches.open('test-1');
    caches.open('test-2');
    caches.open('cache-v1.1')
        .then( cache => {

            const files = [
                './index.html',
                './css/style.css',
                './img/main.jpg'
            ];

            // leer lista de archivos
            cache.addAll( files ).then( confirm => {
                
                // borra un elemento del cache
                // cache.delete('./css/style.css');

                // sobre escribe el valor del cache
                cache.put('./index.html', new Response('Hola mundo'));
            });

            // selecciona un elemento del cache
            cache.match('./index.html')
                .then( response => {
                    return response.text();
                })
                .then( console.log );
        });

    // validar si existe el cache
    // caches.has('test-1').then( exists => console.log( exists ) );

    // borra el cache
    // caches.delete('test-2').then( console.log );

    // toma todos los caches
    // caches.keys().then( console.log );
}*/