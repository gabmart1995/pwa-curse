// leer como archivo
const imgElement = document.querySelector('img');

// put and post
fetch('superman.png')
    .then( response => response.blob())
    .then( imageBlob => {
        // console.log( imageBlob );

        // crea un url que sea valido para la web
        let imgPath = URL.createObjectURL( imageBlob )
        imgElement.src = imgPath;
    });
