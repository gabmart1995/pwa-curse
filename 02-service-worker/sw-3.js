self.addEventListener('fetch', event => {

    if ( event.request.url.includes('main.jpg') ) {

        const request = fetch('img/main-patas-arriba.jpg')

        event.respondWith( request );
    }
});