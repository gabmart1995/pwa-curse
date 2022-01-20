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
        setTimeout(() => { 
            // resolve( number + 1 )
            reject('error, en sumar rapido');
        }, 1000);
    });
}

// permite ejecutar todas las promesas la que responda primero es la que se ejecuta 
// en el then
Promise.race([ sumSlow(5), sumFast(10) ])
    .then( response => {
        console.log( response );
    })
    .catch(( error ) => {
        console.log( error );
    });

    
/* 
sumSlow( 5 ).then( console.log );
sumFast( 10 ).then( console.log ); 
*/