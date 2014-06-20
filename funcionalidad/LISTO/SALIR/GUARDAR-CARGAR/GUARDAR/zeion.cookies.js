/**
 * Zeion Software
 * Utilerias para manejo de cookies
 *
 * Una parte del código lo he tomado de un framework publicado en el sitio del grupo Mozilla:
 * https://developer.mozilla.org/en-US/docs/DOM/document.cookie
 *
 * Fecha    : 11.05.2013
 * uid      : eferron
 */


/**
 * Class: CookieManager
 * Este objeto es un administrador de Cookies para el documento activo.
 * 
 * [eferron]  11.05.2013  Created.
 */
function zs_CookieManager()
{ 
}
zs_CookieManager.prototype =
{
	/**
	 * Verifica si la cookie indicada ya existe en la coleccion.
	 *
	 * [eferron]	11.05.2013 Created.
	 */
	contains: function (name)
	{
		return (new RegExp("(?:^|;\\s*)" + escape(name).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
	},

	/**
	 * Recupera el valor para la cookie especificada.
	 *
	 * [eferron]	11.05.2013 Created.
	 */
	item: function (name)
	{
		return unescape(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + escape(name).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
	},

	/**
	 * Agregamos un valor a la coleccion de cookies del documento.
	 * 
	 * @param name
	 *    El nombre de la cookie.
	 * 
	 * @param value
	 *    El valor a almacenar en la cookie.
	 * 
	 * @param expiration (opcional)
	 *    Indica el tiempo de expiracion de la cookie. Si este no se especifica, la cookie se mantendrá
	 *		mientras no se cierre el explorador.
	 *
	 *		Puedes especificar una fecha en un string o la cantidad de segundos que la cookie permanecera vigente.
	 *		Por ejemplo:
	 *			manager.add("lacookie", 5, Infinity);													// para que no expire
	 *			manager.add("lacookie", 5, 31536e3);													// para que expire dentro de un año
	 *			manager.add("lacookie", 5, "Sat, 25 May 2013 08:00:00 GMT")		// para que expire en el Towel Day 2013
	 * 
	 * @param path (opcional)
	 *    La ruta (url) para la cual esta cookie aplica. El valor por default es '', lo cual indica
	 *		que la cookie aplica solo para el directorio en el dominio actual.
	 * 
	 * @param domain (opcional)
	 *    Puedes cambiar el dominio sobre la cual aplica la cookie. Por defaul es el del
	 *    servidor que sirviá este documento.
	 * 
	 * @param secure (opcional)
	 *    Inidca si la cookie solo debe transmitirse si estamos sobre una conexión SSL.
	 *
	 * [eferron]	11.05.2013 Created.
	 */
	add: function (name, value, expiration, path, domain, secure)
	{
		if (!name || /^(?:expires|max\-age|path|domain|secure)$/i.test(name)) return false;
		var expires = "";
		if (expiration)
		{
			switch (expiration.constructor)
			{
				case Number:
					expires = expiration === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + expiration;
					break;
				case String:
					expires = "; expires=" + expiration;
					break;
				case Date:
					expires = "; expires=" + expiration.toGMTString();
					break;
			}
		}
		document.cookie = escape(name) + "=" + escape(value) + expires + (domain ? "; domain=" + domain : "") + (path ? "; path=" + path : "") + (secure ? "; secure" : "");
		return true;
	},

	/**
	 * Eliminamos la cookie especificada.
	 *
	 * @param name
	 *    El nombre de la cookie a eliminar.
	 * @param path (opcional)
	 *    De especificarse, indica que se debe eliminar la cookie según la ruta indicada.
	 * 
	 * [eferron]	11.05.2013 Created.
	 */
	remove: function (name, path)
	{
		if (!name || !this.contains(name)) return false;
		document.cookie = escape(name) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (path ? "; path=" + path : "");
		return true;
	},
	
	/**
	 * Eliminamos la cookie según el botón seleccionado (NO USAR).
	 * 
	 * [eferron]	16.05.2013 Created.
	 */
	_remove: function (event)
	{
		var $me = $(event.target);
		var name = $me.data("cookie");
		
		// eliminamos la cookie
		if (this.remove(name))
		{
			// y el panel en la interfaz
			$me.parent().remove();
			return true;
		}
		
		return false;
	},

	/**
	 * Crea un panel con la información de las cookies en el documento.
	 *
	 * @param container
	 *    Este debe ser un selector válido para jQuery. Si no se especifica uno, la información se anexa en la parte inferior del documento.
	 *
	 * [eferron]	11.05.2013 Created.
	 */
	showCookies: function (container)
	{
		var $container;
		if (!container) 
			$container = $(document.body);
		else
			$container = $(container).empty();

		// agregamos el panel al documento
		var $div = $("<div />").appendTo($container);

		// vamos a crear una lista con la información de las cookies en el documento
		var cookies = document.cookie.split(';');
		var lastCookie = null;
		var list = [];
		for (var i = 0; i < cookies.length; i++)
		{
			// tenemos que analizar cada parte de la cadena para recuperar la información adicional
			var aCrumb = cookies[i].split("=");
			if (aCrumb.length == 2)
			{
				switch ($.trim(aCrumb[0]))
				{
					case 'path':
						if (lastCookie)
							lastCookie.Path = aCrumb[1];
						break;

					case 'expires':
						if (lastCookie)
							lastCookie.Expiration = aCrumb[1];
						break;

					case 'domain':
						if (lastCookie)
							lastCookie.Domain = aCrumb[1];
						break;

					default:

						// creamos una cookie y la anexamos a la coleccion
						lastCookie = {
							Name: unescape($.trim(aCrumb[0])),
							Value: unescape($.trim(aCrumb[1]))
						};
						list.push(lastCookie);

				} // switch
			}
			else if (lastCookie && aCrumb[0] && aCrumb[0].equals && aCrumb[0].equals('secure'))
				lastCookie.Secure  = true;

		} // next

		// ahora si, colocaremos cada cookie en una tabla
		var cookie, $tabla, $button;
		for (var i in list)
		{
			var cookie = list[i];

			$tabla = $("<table />").wrap("<div class='cookieContainer' />").appendTo($div);
			$tabla.append("<tr><td>Nombre:</td><td>" + cookie.Name + "</td></tr>");
			$tabla.append("<tr><td>Valor:</td><td>" + cookie.Value + "</td></tr>");
			$tabla.append("<tr><td>Ruta:</td><td>" + (cookie.Path ? cookie.Path : "") + "</td></tr>");
			$tabla.append("<tr><td>Expira:</td><td>" + (cookie.Expiration ? cookie.Expiration : "") + "</td></tr>");
			$tabla.append("<tr><td>Dominio:</td><td>" + (cookie.Domain ? cookie.Domain : "") + "</td></tr>");
			$tabla.append("<tr><td>SSL:</td><td>" + (cookie.Secure ? "Si" : "No") + "</td></tr>");
			
			$button = $("<button type='button' data-cookie='" + cookie.Name + "'>eliminar</button>").click(this.createDelegate(this, this._remove));
			
			$("<div class='cookieContainer' />").append($tabla).append($button).appendTo($div);
		}
	},
	
	/**
	 * Crea un function que será ejecutada en el contexto del objeto especificado.
	 * 
	 * [eferron]	16.05.2013	Created.
	 */
	createDelegate: function(obj, method)
	{
		return function () { return method.apply(obj, arguments); };
	},

} // End of class: zs_CookieManager