function init() {
    scroll();
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


init();