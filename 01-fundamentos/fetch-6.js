fetch('./not_found.html')
    .then( response => { 

        if ( response.ok ) {
            return response.text();
        }

        throw new Error('Error al leer archivo');
    })
    .then( html => {
        
        
        // console.log( html );

        let body = document.querySelector('body');
        body.innerHTML = html;
    })
    .catch( error => {
        console.log('error en la peticion');
        console.log( error );
    });
    
