var HeaderComponent = ( function () {
  function headerComponent () {

    var mobileNavHandle, toggleMobileMenu;



    var initializeComponent = function () {
      mobileNavHandle.on( 'click', function () {
        $( this ).toggleClass( 'active' );
        toggleMobileMenu.toggleClass( 'active' );
      } );
    };
    
    var initializeElements = function () {
      mobileNavHandle = $( '#mobile-menu-toggle' );
      toggleMobileMenu = $( '.wrap-mobile-nav .menu' );
      initializeComponent();
    };

    this.init = function () {
      initializeElements();
    };
  }

  return headerComponent;

} )();
var headerComponent = new HeaderComponent();
$( document ).ready( function () {
  headerComponent.init();
} );
