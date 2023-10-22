/***
 * IndexDB es una base de datos local que almacena datos estructurados
 * en el navegador de forma local, este es un API experimental usar con precausion
 */

if (window.indexedDB) {
    // indexedDB: Reforzamiento
    // creamos la base de datos
    const request = window.indexedDB.open('test-database', 1);
    // console.log(request);

    // Evento: se ejecuta cuando se actualiza la base de datos
    request.onupgradeneeded = event => {
        console.log('actualizacion a la base de datos');

        // referencia a la base de datos
        let db = event.target.result;
        db.createObjectStore('heroes', { keyPath: 'id', });
    };

    // Evento: manejo de errores 
    request.onerror = event => {
        console.log('DB error: ', event.target.error);
    };

    // insertar datos
    request.onsuccess = event => {
        const heroesData = [
            { id: '1111', heroe: 'Spiderman', message: 'Aqui su amigo Spiderman' },
            { id: '1112', heroe: 'Iron Man', message: 'Aqui en mi nuevo mark 50' },
        ];
        
        // referencia a la base de datos
        const db = event.target.result;

        // ejecutamos la transaccion
        const heroesTransaction = db.transaction('heroes', 'readwrite');
        
        // Evento: error en la transaccion
        heroesTransaction.onerror = event => {
            console.log('Error guardando en la BD', event.target.error);
        };

        // Evento: inserccion exitosa
        heroesTransaction.oncomplete = event => {
            console.log('Transaccion realizada', event);
        };

        // obtenemos una referencia al store del indexedDB
        const heroesStore = heroesTransaction.objectStore('heroes');

        // inserccion de los datos
        heroesData.forEach(heroe => heroesStore.add(heroe));

        // Evento: insercion del store
        heroesStore.onsuccess = event => {
            console.log('Nuevo Item agregado a la base de datos');
        };
    };
}

