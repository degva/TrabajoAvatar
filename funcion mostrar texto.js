function mostrartexto(textocuy) { 
    var texto
    texto.src="textocuy.txt"
    var canvas=document.getElementById('canvastexto')
     var context = canvas.getContext('2d');

      context.font = 'italic 20pt Calibri';
      context.fillText(texto, 500, 200);
      return context
    }