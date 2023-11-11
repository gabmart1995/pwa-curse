const db = new PouchDB('messages');

// utilidades para guardar en DB
const saveMessage = (message) => {
    message._id = new Date().toISOString();

    // salvamos los datos
    return db.put(message)
        .then(() => {
            // registramos en el syncManager la nueva tarea
            self.registration.sync.register('new-post');

            const newResponse = {
                ok: true,
                offline: true,
            };

            // devolvemos la respuesta
            return new Response(JSON.stringify(newResponse));
        });
};

/**
 * Postea los mensaje cuando hay conexion a internet
 * @returns Array<Promise<any>>
 */
const postMessages = () => {

    /** @type Array<Promise<any>> */
    const postsPromises = [];

    return db.allDocs({include_docs: true})
        .then(docs => {
            docs.rows.forEach(row => {
                // obtenemos la informacion que se va a postear y hacemos fetch
                const doc = row.doc;
                const fetchPromise = fetch('api', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(doc),
                })
                    .then(() => {
                        // borramos el posteo local de la base de datos
                        return db.remove(doc);
                    });

                postsPromises.push(fetchPromise);
            });

            return Promise.all(postsPromises);
        });  
};