self.addEventListener('fetch', event => {
    if ( event.request.url.includes('style.css') ) {
        let response = new Response(`
            body {
                background-color: red !important;
                color: pink !important;
            }
        `, {
            headers: {
                'Content-Type': 'text/css'
            }
        });

        event.respondWith( response );
    
    } else {
        event.respondWith( fetch( event.request ) )

    }
});