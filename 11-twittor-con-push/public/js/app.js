
var url = window.location.href;
var swLocation = '/twittor/sw.js';
var swRegister;

if ( navigator.serviceWorker ) {


    if ( url.includes('localhost') ) {
        swLocation = '/sw.js';
    }

    // iniciamos la suscripcion a push server cuando
    // haya cargado todo el contendo web
    window.addEventListener('load', () => {
        navigator.serviceWorker.register( swLocation )
            .then(register => {
                // obtenemos el estado de la suscripcion
                // y ocultamos los mensajes
                swRegister = register;
                swRegister.pushManager.getSubscription()
                    .then(verifySubscription);
            });
    });
}

// Referencias de jQuery

var titulo      = $('#titulo');
var nuevoBtn    = $('#nuevo-btn');
var salirBtn    = $('#salir-btn');
var cancelarBtn = $('#cancel-btn');
var postBtn     = $('#post-btn');
var avatarSel   = $('#seleccion');
var timeline    = $('#timeline');

var modal       = $('#modal');
var modalAvatar = $('#modal-avatar');
var avatarBtns  = $('.seleccion-avatar');
var txtMensaje  = $('#txtMensaje');

var btnActivadas    = $('.btn-noti-activadas');
var btnDesactivadas = $('.btn-noti-desactivadas');

// El usuario, contiene el ID del hÃ©roe seleccionado
var usuario;




// ===== Codigo de la aplicación

function crearMensajeHTML(mensaje, personaje) {

    var content =`
    <li class="animated fadeIn fast">
        <div class="avatar">
            <img src="img/avatars/${ personaje }.jpg">
        </div>
        <div class="bubble-container">
            <div class="bubble">
                <h3>@${ personaje }</h3>
                <br/>
                ${ mensaje }
            </div>
            
            <div class="arrow"></div>
        </div>
    </li>
    `;

    timeline.prepend(content);
    cancelarBtn.click();

}



// Globals
function logIn( ingreso ) {

    if ( ingreso ) {
        nuevoBtn.removeClass('oculto');
        salirBtn.removeClass('oculto');
        timeline.removeClass('oculto');
        avatarSel.addClass('oculto');
        modalAvatar.attr('src', 'img/avatars/' + usuario + '.jpg');
    } else {
        nuevoBtn.addClass('oculto');
        salirBtn.addClass('oculto');
        timeline.addClass('oculto');
        avatarSel.removeClass('oculto');

        titulo.text('Seleccione Personaje');
    
    }

}


// Seleccion de personaje
avatarBtns.on('click', function() {

    usuario = $(this).data('user');

    titulo.text('@' + usuario);

    logIn(true);

});

// Boton de salir
salirBtn.on('click', function() {

    logIn(false);

});

// Boton de nuevo mensaje
nuevoBtn.on('click', function() {

    modal.removeClass('oculto');
    modal.animate({ 
        marginTop: '-=1000px',
        opacity: 1
    }, 200 );

});


// Boton de cancelar mensaje
cancelarBtn.on('click', function() {
    if ( !modal.hasClass('oculto') ) {
        modal.animate({ 
            marginTop: '+=1000px',
            opacity: 0
         }, 200, function() {
             modal.addClass('oculto');
             txtMensaje.val('');
         });
    }
});

// Boton de enviar mensaje
postBtn.on('click', function() {

    var mensaje = txtMensaje.val();
    if ( mensaje.length === 0 ) {
        cancelarBtn.click();
        return;
    }

    var data = {
        mensaje: mensaje,
        user: usuario
    };


    fetch('api', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( data )
    })
    .then( res => res.json() )
    .then( res => console.log( 'app.js', res ))
    .catch( err => console.log( 'app.js error:', err ));



    crearMensajeHTML( mensaje, usuario );

});



// Obtener mensajes del servidor
function getMensajes() {

    fetch('api')
        .then( res => res.json() )
        .then( posts => {

            console.log(posts);
            posts.forEach( post =>
                crearMensajeHTML( post.mensaje, post.user ));


        });


}

getMensajes();



// Detectar cambios de conexión
function isOnline() {

    if ( navigator.onLine ) {
        // tenemos conexión
        // console.log('online');
        $.mdtoast('Online', {
            interaction: true,
            interactionTimeout: 1000,
            actionText: 'OK!'
        });


    } else{
        // No tenemos conexión
        $.mdtoast('Offline', {
            interaction: true,
            actionText: 'OK',
            type: 'warning'
        });
    }

}

window.addEventListener('online', isOnline );
window.addEventListener('offline', isOnline );

isOnline();

// Notificaciones push seccion
/**
 * Verifica la suscripcion
 * @param {boolean} isActivated determina si el clente esta suscrito a push notifications
 */
const verifySubscription = (isActivated) => {
    if (isActivated) {
       btnActivadas.removeClass('oculto');
       btnDesactivadas.addClass('oculto');

    } else {
       btnActivadas.addClass('oculto');
       btnDesactivadas.removeClass('oculto');
    
    }
};

const notifyMe = () => {
    // preguntamos si el navegador posse notificaciones
    if (!window.Notification) {
        console.warn('Este navegador no soporta notificaciones');
        return;
    }

    if (Notification.permission === 'granted') {
        // new Notification('Hola mundo! - granted');
        sendNotification();
        return;
    } 

    Notification.requestPermission(permission => {
        console.log(permission);
        
        if (permission === 'granted') {
            // new Notification('Hola mundo! - aswer');
            sendNotification();
        } 
    });
};

const sendNotification = () => {
    const options = {
        body: 'Este es el cuerpo de una notificacion',
        icon: 'img/icons/icon-72x72.png',
    }
    
    const notification = new Notification('Hola mundo', options);
    notification.addEventListener('click', event => {
        console.log('click');
    });
}

// notifyMe();

const getPublicKey = () => {
    return fetch('api/key')
        .then(response => response.arrayBuffer())
        .then(key => new Uint8Array(key))
};

// eventos boton
btnDesactivadas.on('click', () => {
    if (!swRegister) {
        console.log('No hay registro de SW');
        return;
    }

    // NOTA: debes notificar al usuario antes de realizar
    // la suscriptcion con un modal de confirmacion si confirma
    // generas la clave publica y la suscripcion

    // obtenemos la clave publica
    getPublicKey()
        .then(key => {
            
            // el usuario se subscribe
            swRegister.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: key,
            })
                .then(response => response.toJSON())
                .then(subscription => {
                    console.log(subscription);
                    verifySubscription(subscription);
                });
        });
});