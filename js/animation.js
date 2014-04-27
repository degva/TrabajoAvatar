$(document).ready( function() {
	/* Esta es la funcion para correr la peli
	 * Jojo
	 */
	console.log('Comenzando movimiento...');
	setTimeout( function() {
		// move5('#smallBox', 'top', 20);
		$('#smallBox').animate({'top': "+=20px"}, 'slow');

	}, 2000);
	console.log('Movido 10px hacia abajo D:');
	
});
