// https://reqres.in/api/users


// example fetch
fetch('https://reqres.in/api/users')
    .then( response => response.json() )
    .then( data => {
        console.log( data );
        console.log( data.page );
    });


// cors error
/*fetch('https://www.wikipedia.org')
    .then( response => {
        console.log( response );
    });
*/

