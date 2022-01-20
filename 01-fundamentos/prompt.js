function sum( number, callback ) {

    if ( number >= 7 ) {
        callback('Número muy alto');
        return;
    }


    setTimeout(function() {
        // return number + 1;
        callback( null, number + 1 ); 
    }, 800 );
}

// callback hell
sum( 5, function( error, newValue ) {

    if ( error ) {
        console.log( error );
        return;
    }

    sum( newValue, function( error, newValue2 ) {

        if ( error ) {
            console.log( error );
            return;
        }

        sum( newValue2, function( error, newValue3 ) {

            if ( error ) {
                console.log( error );
                return;
            }

            console.log( newValue3 );
        })
    });
});