$(document).ready( function() {

	/* Esta es la funcion para correr la peli
	 * Jojo
	 */
	console.log('Comenzando movimiento...');

	setTimeout( function() {
		for (i = 0; i < 10; i++) {
			$('#smallBox').animate({'top': "+=20px"}, 'fast');
			$('#smallBox').animate({'left': "+=20px"}, 'fast');
		}
	}, 2000);

	setTimeout( function() {
		for (i = 0; i < 10; i++) {
			$('#smallBox2').animate({'top': "+=20px"}, 'fast');
			$('#smallBox2').animate({'left': "-=20px"}, 'fast');
		}
	}, 2000);

	console.log('Movido 10px hacia abajo D:');
	
});
