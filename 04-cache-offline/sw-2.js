self.addEventListener('fetch', event => {
    
    /*const offlineResponse = new Response(`
        Bienvenido a mi pagina web,

        para utilizarla necesitas internet
    `);*/

    /* const offlineResponse = new Response(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Necesitas conexion</title>
        </head>
        <body>
            <h1>Offline mode</h1>
        </body>
        </html>
    `, {
        headers: {
            'Content-Type': 'text/html'
        }
    });*/

    const offlineResponse = fetch('./pages/offline.html')
        
    const request = fetch( event.request )
        .catch( error => {
            return offlineResponse;
        });
    
    event.respondWith( request );
});


