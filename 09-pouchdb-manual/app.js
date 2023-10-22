

// Entrenamiento PouchDB

// 1- Crear la base de datos
// Nombre:  mensajes
const db = new PouchDB('mensajes');

// Objeto a grabar en base de datos
/*let mensaje = {
    _id: new Date().toISOString(),
    user: 'spiderman',
    mensaje: 'Mi tía hizo unos panqueques muy buenos',
    sincronizado: false
};*/
// inserta de forma individual
/*db.put(mensaje)
    .then(console.log('Mensaje colocado'))
    .catch(error => console.log(error));*/

let messages = [
    {
        _id: window.crypto.randomUUID(),
        user: 'spiderman',
        mensaje: 'Mi tía hizo unos panqueques muy buenos',
        sincronizado: false
    },
    {
        _id: window.crypto.randomUUID(),
        user: 'iron-man',
        mensaje: 'excelente, vamos para alla',
        sincronizado: false
    },
    {
         _id: window.crypto.randomUUID(),
        user: 'capitan-america',
        mensaje: 'muy bien',
        sincronizado: false
    },
    {
        _id: window.crypto.randomUUID(),
        user: 'thor',
        mensaje: 'por la barbas de odin, panqueques',
        sincronizado: false
    },
    {
        _id: window.crypto.randomUUID(),
        user: 'hulk',
        mensaje: 'tengo hambre',
        sincronizado: false
    },
];

// 2- Insertar en la base de datos
// insertar en conjunto (Promise all)
Promise.all(messages.map(message => db.put(message)))
    .catch(console.error);


// 3- Leer todos los mensajes offline
db.allDocs({include_docs: true, descending: false,})
    .then(({rows}) => console.log(rows))
    .catch(console.error);


// 4- Cambiar el valor 'sincronizado' de todos los objetos
//  en la BD a TRUE
db.allDocs({include_docs: true, descending: false,})
    .then(({rows}) => {
    
        // extraemos el documento de indexDB en cada fila
        // cambiamos el valor seleccionado
        // volvemos a insertar
        rows.forEach(({doc}) => {
            // console.log(doc);

            doc.sincronizado = true;
            db.put(doc)
                .then(console.log('Valor actualizado'))
                .catch(console.error);
        });
    })
    .catch(console.error);


// 5- Borrar todos los registros, uno por uno, evaluando
// cuales estan sincronizados
// deberá de comentar todo el código que actualiza
// el campo de la sincronización 

db.allDocs({include_docs: true, descending: false,})
    .then(({rows}) => {
        
        // por cada elemento sincronizado lo elimina
        rows.forEach(({doc}) => {

            if (doc.sincronizado) {
                db.remove(doc)
                    .then(console.log('Valor eliminado'))
                    .catch(console.error);
            }
        });
    })
    .catch(console.error);