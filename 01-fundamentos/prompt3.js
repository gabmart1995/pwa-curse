function returnTrue() {
    return true;
}

function sumSlow( number ) {

    return new Promise( function( resolve, reject ) {

        setTimeout( function() {
            resolve( number + 1 ); 
        }, 800 );
    });
}

let sumFast = ( number ) => {
    return new Promise( ( resolve, reject ) => {
        setTimeout(() => resolve( number + 1 ), 300);
    });
}

// permite ejecutar todas las promesas en secuencia
Promise.all([ sumSlow(5), sumFast(10), true, 'hola mundo', returnTrue() ])
    .then( responses => {
        console.log( responses );
    })
    .catch(( error ) => {
        console.log( error );
    });

    
/* 
sumSlow( 5 ).then( console.log );
sumFast( 10 ).then( console.log ); 
*/