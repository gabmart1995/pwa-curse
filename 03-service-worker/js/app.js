

// Detectar si podemos usar Service Workers
if ( navigator.serviceWorker ) {
    navigator.serviceWorker.register('./sw.js')
        .then( register => {
            /*setTimeout(() => {
                register.sync.register('post-cats');
                console.log('se enviaron el post de gatitos al servidor');
            }, 3000);*/


            // envia una notificacion con el permiso del usuario
            Notification.requestPermission()
                .then( result => {
                    console.log( result );
                    register.showNotification('Hola mundo!!');
                });
        })    
    
}


// if ( window.SyncManager ) {}
