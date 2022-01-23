self.addEventListener('fetch', event => {

    let request = fetch( event.request )
        .then( response => {

            // console.log( response );

            return response.ok ? response : fetch('img/main.jpg'); 
        });

   event.respondWith( request );
});