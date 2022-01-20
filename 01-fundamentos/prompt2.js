function sum( number ) {

    var promise = new Promise(function( resolve, reject ) {
        
        console.log( number );

        if ( number >= 7 ) {
            reject('El número es muy alto');
            return;
        }


        setTimeout(function() {
            resolve( number + 1 ); 
        }, 800 );
    });

    return promise;
}

// encadenamientos de promesas
/* sum(5)
    .then( newValue => {
    
        console.log( newValue );
    
        return sum( newValue );
    })
    .then( newValue => {
        console.log( newValue );

        return sum( newValue );
    })
    .then( newValue => {
        console.log( newValue );
    }); */

/* forma legible y recomendada */    
sum(5)
    .then( sum )
    .then( sum )
    .then( sum )
    .then( sum )
    .catch( error => {
        console.log('ERROR en promesa');
        console.log( error );
    });

    /* .then( sum )
    .then( newValue => {
        console.log( newValue );
    }); */