fetch('https://reqres.in/api/users/10000')
    .then( response => { 
        
        // console.log( response );

        if ( response.ok ) {
            return response.json();

        } else {
            throw new Error('No existe el usuario 10000')
        }
    })
    .then( user => {
        console.log( user );
    })
    .catch( error => {
        console.log('error en la peticion');
        console.log( error );
    });
    
