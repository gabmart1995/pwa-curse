// https://reqres.in/api/users

let user = {
    nombre: 'Gabriel',
    edad: 26
};

// put and post
fetch('https://reqres.in/api', {
    // props fetch
    method: 'POST',
    body: JSON.stringify( user ), 
    headers: {
        'Content-Type': 'application/json'
    }
})
    .then( response => response.json() )
    .then( console.log )
    .catch( error => {
        console.log('error de la peticion');
        console.log( error );
    });

