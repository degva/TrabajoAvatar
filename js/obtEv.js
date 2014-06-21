// Obtener Evento Informacion
/* Sirve para recoger la informacion
 * guardada en eventos.js
 */

//$(document).ready(function() {
	
	var eact = 1;
	var eventos;
	var masterJson;

	function obtEventos(nxtEv) {
		/* Esta function descargara el archivo json con
		 * toda la informacion dentro
		 */
		eact = 1;																						// esto es para regresar todo a la normalidad

		$.get('json/' + nxtEv, function(data) { 						// Por ahora solo es para el primer cuadro

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
				console.log(e)
				return;
			}
			console.log('SUCCESS!');

			var minEventos = [];
			$.each(json, function(key, value) {
				minEventos.push(key);
			});

			eventos = minEventos;
			masterJson = json;

		}, 'text');
	}


	function sgteEv() {
		/* Esta funcion mostrara la informacion del siguiente evento
		 * dentro de cada cuadro
		 */
		if (typeof(eventos) !== 'undefined') {
			if (eact != -1) {
				if (eact <= eventos[eventos.length - 2 ]) { // Si estamos antes del 'f'
					// Devolver texto y movimientos
					var array = ['e', masterJson[eact]['texto'], masterJson[eact]['moves']['A'], masterJson[eact]['moves']['B']];
					eact += 1;
					return array;
				} else {
					// Devolver preguntas y respuestas
					var array = ['f', masterJson['f']['pregu'], masterJson['f']['r1'], masterJson['f']['r2'], masterJson['f']['r3']];
					eact = -1;
					return array;
				}
			} else {
				// Ya no hay mas eventos
				return -1;
			}
		} else {
			// NO se descargo json
			return -2;
		}
	}


//});
