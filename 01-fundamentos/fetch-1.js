// XMLHttpRequest antes del Ajax y fetch
var request = new XMLHttpRequest();

request.open('GET', 'https://reqres.in/api/users', true );
request.send( null );

request.onreadystatechange = function( state ) {
    
    if ( request.readyState === 4 ) {
        
        // extraemos la respuesta (string)
        var response = request.response;
        response = JSON.parse( response );

        console.log( response );
    }
};