// Obtener Evento Informacion
/* Sirve para recoger la informacion
 * guardada en eventos.js
 */

$(document).ready(function() {
	
	var eact = 1;
	var eventos;
	var masterJson;

	$('#down-ev').on('click', function() {
		$.get('json/event1.json', function(data) {

			if ( !data || data === "") {
				// Error
				console.log('No se percibio informacion proveniente del archivo');
				return;
			}
			var json;

			try {
				json = jQuery.parseJSON(data);
			} catch (e) {
				// otro error
				console.log('--');
				console.log(e)
				console.log('--');
				return;
			}
			console.log('SUCCESS!');

			console.log('--');
			console.log(json);
			console.log('--');

			var minEventos = [];
			$.each(json, function(key, value) {
				minEventos.push(key);
			});

			eventos = minEventos;
			masterJson = json;

		}, 'text');


	});

	$('#sig-ev').on('click', function() {
		if (typeof(eventos) !== 'undefined') {
			if (eact != -1) {
				if (eact <= eventos[eventos.length - 2 ]) { // Si estamos antes del 'f'
					var cont = '<p>'+masterJson[eact]['texto']+'</p>';
					cont = cont + '<br><p><b>El obj A hara:</b>' + masterJson[eact]['moves']['A'] + '</p>';
					cont = cont + '<br><p><b>El obj B hara:</b>' + masterJson[eact]['moves']['B'] + '</p>';
					$('#ev-cont').html(cont);
					eact += 1;
				} else {
					var cont = '<p>' + masterJson['f']['pregu'] + '</p>';
					cont = cont + '<br>' + '<p>' + masterJson['f']['r1'] + '</p';
					cont = cont + '<br>' + '<p>' + masterJson['f']['r2'] + '</p';
					cont = cont + '<br>' + '<p>' + masterJson['f']['r3'] + '</p';
					$('#ev-cont').html(cont);
					eact = -1;
				}
			} else {
				var cont = '<p>NO HAY MAS CONTENIDO!</p>';
				$('#ev-cont').html(cont);
			}
		} else {
			var cont = '<p>Hazle click al Descargar archivo, no esta definido el evento</p>';
			$('#ev-cont').html(cont);
		}
	});


});
