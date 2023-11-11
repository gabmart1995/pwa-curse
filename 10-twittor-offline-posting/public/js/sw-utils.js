

// Guardar  en el cache dinamico
function actualizaCacheDinamico( dynamicCache, req, res ) {


    if ( res.ok ) {

        return caches.open( dynamicCache ).then( cache => {

            cache.put( req, res.clone() );
            
            return res.clone();

        });

    } else {
        return res;
    }

}

// Cache with network update
function actualizaCacheStatico( staticCache, req, APP_SHELL_INMUTABLE ) {


    if ( APP_SHELL_INMUTABLE.includes(req.url) ) {
        // No hace falta actualizar el inmutable
        // console.log('existe en inmutable', req.url );

    } else {
        // console.log('actualizando', req.url );
        return fetch( req )
                .then( res => {
                    return actualizaCacheDinamico( staticCache, req, res );
                });
    }



}

// network with cache fallback and update
const handleApiMessages = (cacheName, request) => {
    
    // manejo de peticiones POST
    if (request.clone().method === 'POST') {
        
        // indica si el navegador posse syncManager
        // console.log(self.registration.sync)
        if (self.registration.sync) {
            // POSTEO de un nuevo mensaje
            // hay que almacenar en la indexedBD
            const requestClone = request.clone();
            return requestClone.text()
                .then(body => {
                    const bodyObject = JSON.parse(body);
                    return saveMessage(bodyObject); 
                });
        
        } else {
            return fetch(request);
        
        }

    } else {
        return fetch(request)
            .then(response => {
                if (response.ok) {
                    actualizaCacheDinamico(cacheName, request, response.clone());
                    return response;
                }
    
                return caches.match(request);
            })
            .catch(error => {
                return caches.match(request);
            });
    }
};
