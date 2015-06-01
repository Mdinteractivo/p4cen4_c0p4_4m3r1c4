(function(window)
 {
    function Bases(nodo)
    {
        var self = this;
        var animando = false;
        var array_items = [];
        var delay = 200;		
        var ALTO_HEADER = 180;
        var altoItems = 65;
        var dataXml;
        var mostrandoCategorias = true;

        var altoPantalla = (window.innerHeight - ALTO_HEADER) -5;

        self.div = document.createElement('div');
        self.div.className = 'class-cero';
        $(self.div).css({'-webkit-transform' : 'translate3d(0,0,0)'});

        var holderItems = document.createElement('div');
        $(self.div).append(holderItems);
        $(holderItems).css({'width' : 320, 'float' : 'left'});

        /*titulo*/
        var holderTituloNoticiaGral = document.createElement('div');
        holderTituloNoticiaGral.className = 'wrapper-titulo-noticia';
        $(holderTituloNoticiaGral).css({'background' : 'url(img/general/menu/item-background.png) no-repeat'});
        $(holderTituloNoticiaGral).css({'background-size' : '320px 60px'});
        $(holderItems).append(holderTituloNoticiaGral);

        var divVolverGral = document.createElement('div');
        divVolverGral.className = 'btn-volver-inicio';
        $(holderTituloNoticiaGral).append(divVolverGral);
        $(divVolverGral).css({'background' : 'url(img/general/volver_white.png) no-repeat'});
        $(divVolverGral).css({'background-size' : '16px', 'background-position' : 'left'});			
        $(divVolverGral).css({'color':'#FFF'});
        //$(divVolverGral).text('INICIO');
        $(divVolverGral).bind('click' , doBack);

        var titulo = document.createElement('h1');
        $(titulo).text('BASES Y CONDICIONES DEL JUEGO');
        $(titulo).css({'color' : '#FFF', 'margin-left' : 50, 'font-size' : 14,' margin-top': 10});
        $(holderTituloNoticiaGral).append(titulo);

        var icono = new Image();
        icono.width = 30;
        icono.src = 'img/general/menu/bases.png?ac=1';
        $(holderTituloNoticiaGral).append(icono);	
        $(icono).css({'position' : 'absolute' , 'right' : 13, 'top' : 13});
        /*titulo*/

        var divScroll = document.createElement('div');
        divScroll.className = 'divScroll';
        $(holderItems).append(divScroll);
        $(divScroll).css({'height' : altoPantalla-45, 'margin-top' : 0, 'background' :'rgba(255,255,255,0.6)'});						


        $.get('reglas/reglas.html', function(html){
            $(divScroll).append(html);
        });

        function doBack()
        {
            objApp.Navigate('inicio', null);
        }

        function showBases()
        {
            try
            {
                window.open('https://dejavivirlo.com/reglas/', '_system');
            }
            catch(e)
            {
                window.open('https://dejavivirlo.com/reglas/', '_blank');
            }
        }

        objApp.ocultarCargador();			
    }

    window.Bases = Bases;

})(window);