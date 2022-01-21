self.addEventListener('fetch', event => {

    /*if ( event.request.url.includes('style.css') ) {
        event.respondWith( null );
    
    } else {
        event.respondWith( fetch( event.request ) );

    } */

    if ( event.request.url.includes('.jpg') ) {
        
        // let fotoRequest = fetch( event.request.url );
        
        let fotoRequest = fetch( event.request );
        event.respondWith( fotoRequest ); 
    }

    // event.respondWith( fetch( event.request ) );
});