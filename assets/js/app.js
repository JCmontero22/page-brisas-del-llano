function init() {
    scroll();
    configuracionTostada();
    listadoDeComentarios();
    $("#formularioComentarios").on("submit", function (e) {
        e.preventDefault();
        registroComentario();
    });
}


function scroll() {
   $( window ).scroll( function () {
       if ( $( document ).scrollTop() > 50 ) {
           $( ".navbar" ).addClass( "navbar-scrolled" );
       } else {
           $( ".navbar" ).removeClass( "navbar-scrolled" );
       }
   } );
}

function listadoDeComentarios() {
    $("#comentarios-lista").empty();
    $.ajax({
        url: "ajax/listadoComentario.php",
        type: "GET",
        success: function (response) {
            response = JSON.parse(response);
            console.log(response);
            response.forEach(element => {
                // Generar estrellas dinámicamente basándose en la puntuación
                const estrellas = generarEstrellas(element.puntuacion_comentario);
                
                $("#comentarios-lista").append(`
                    <div class="swiper-slide">
                        <div class="testimonial-card">
                            <h4>${element.nombre_usuario_comentario}</h4>
                            <div class="stars mb-2">
                                ${estrellas}
                            </div>
                            <p class="fst-italic">
                                "${element.comentario_comentario}"
                            </p>
                        </div>
                    </div>
                `);
            });
            
            // Inicializar o actualizar el slider después de cargar los comentarios
            inicializarSlider();
        },
        error: function (xhr, status, error) {
            console.error(error);
        }
    });
}

// Función para inicializar el slider de comentarios
function inicializarSlider() {
    // Destruir slider existente si existe
    if (window.comentariosSwiper) {
        window.comentariosSwiper.destroy(true, true);
    }
    
    // Crear nuevo slider
    window.comentariosSwiper = new Swiper('.comentarios-slider', {
        slidesPerView: 1,
        slidesPerGroup: 1, 
        spaceBetween: 20,
        loop: true,
        speed: 1000, // Transición más lenta y suave
        centeredSlides: false,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 20,
            },
            992: {
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 30,
            },
            1200: {
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 30,
            }
        }
    });
}

// Función para generar estrellas basándose en la puntuación
function generarEstrellas(puntuacion) {
    let estrellas = '';
    const puntuacionNum = parseInt(puntuacion);
    
    // Agregar estrellas llenas
    for (let i = 1; i <= puntuacionNum; i++) {
        estrellas += '<i class="fas fa-star"></i>';
    }
    
    // Agregar estrellas vacías para completar hasta 5
    for (let i = puntuacionNum + 1; i <= 5; i++) {
        estrellas += '<i class="far fa-star"></i>';
    }
    
    return estrellas;
}

function registroComentario() {
    let parametros = new FormData($("#formularioComentarios")[0]);

    $.ajax({
        url: "ajax/registroComentario.php",
        type: "POST",
        data: parametros,
        processData: false,
        contentType: false,
        success: function (response) {
            response = JSON.parse(response);
            if (response.status === 'success') {
                toastr["success"](response.message);
                $("#formularioComentarios")[0].reset();
                listadoDeComentarios(); 
            } else {
                toastr["error"](response.message);
            }
        },
        error: function (xhr, status, error) {
            console.error(error);
        }
    })
}

function configuracionTostada() {
     toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "5000",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
}



init();