/** 
 * Guarda en cache dinamico 
 * @param {Response} response
 * @param {Request} request
 * @param {string} dynamicCache nombre del cache dinamico
 * @returns {Promise<Cache>|Response}
 * */
function updateDynamicCache(dynamicCache, request, response) {
    if ( response.ok ) {
        return caches.open( dynamicCache )
            .then( cache => {
                cache.put( request, response.clone() );
                
                // devuelve un clon de la respuesta
                return response.clone();
            });
    }

    return response;
}