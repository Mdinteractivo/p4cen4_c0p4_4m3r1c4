function LightBoxVersus(nodo, parent)
{
    var self = this;

    self.div = document.createElement('div');
    $(self.div).css({'width' : 320, 'min-height' : 100, '-webkit-transform' : 'translate3d(0,0,0)'});

    var holderIndicadores = document.createElement('div');
    $(self.div).append(holderIndicadores);
    $(holderIndicadores).css({'width' : '100%', 'height' : 50, 'float' : 'left', 'position' : 'relative', 'margin-top' : 10});

    /*var indicadorLeft = document.createElement('div');
		indicadorLeft.className = 'marcador-pronostico';
		$(holderIndicadores).append(indicadorLeft);
		$(indicadorLeft).css({'position' : 'absolute', 'left' : 25, 'top' : 15});
		$(indicadorLeft).text('GANADOR');

	var indicadorCentro = document.createElement('div');
		indicadorCentro.className = 'marcador-pronostico';
		$(holderIndicadores).append(indicadorCentro);
		$(indicadorCentro).css({'position' : 'absolute', 'left' : 122, 'top' : 15, 'display' : 'none'});
		$(indicadorCentro).text('EMPATE');

	var indicadorRight = document.createElement('div');
		indicadorRight.className = 'marcador-pronostico';
		$(holderIndicadores).append(indicadorRight);
		$(indicadorRight).css({'position' : 'absolute', 'left' : 215, 'top' : 15});
		$(indicadorRight).text('GANADOR');*/

    var holderDataPartido = document.createElement('div');
    $(holderDataPartido).css({'width' : '100%', 'height' : 50, 'float' : 'left', 'position' : 'relative'});

    var holderLocal = document.createElement('div');
    $(self.div).append(holderLocal);
    $(holderLocal).css({'width' : 120, 'height' : 50, 'float' : 'left'});

    var imgLocal = new Image();
    imgLocal.width = 71;
    imgLocal.src = objApp.SERVER+'global/img/banderas/bandera'+$(nodo).find('idLocal').text()+'.png?ac=2';
    $(holderLocal).append(imgLocal);
    $(imgLocal).css({'margin-left' : 28, 'margin-top' : 5});

    var holderVersus = document.createElement('div');
    $(self.div).append(holderVersus);
    holderVersus.className = 'texto-versus-red';
    $(holderVersus).text('VS');
    $(holderVersus).css({'width' : 80, 'height' : 45, 'float' : 'left', 'text-align' : 'center'});

    var holderVisitante = document.createElement('div');
    $(self.div).append(holderVisitante);
    $(holderVisitante).css({'width' : 120, 'height' : 50, 'float' : 'left'});

    var imgVisita = new Image();
    imgVisita.width = 71;
    imgVisita.src = objApp.SERVER+'global/img/banderas/bandera'+$(nodo).find('idVisita').text()+'.png?ac=2';
    $(holderVisitante).append(imgVisita);
    $(imgVisita).css({'margin-left' : 19, 'margin-top' : 5});

    var holderInputs = document.createElement('div');
    $(self.div).append(holderInputs);
    $(holderInputs).css({'width' : '100%', 'height' : 35, 'float' : 'left', 'position' : 'relative', 'margin-top' : 5});

    var inputLocal = document.createElement('input');
    inputLocal.type = 'number';
    inputLocal.maxLength = 2;
    $(holderInputs).append(inputLocal);
    $(inputLocal).css({'width' : 71, 'height' : 25,margin:0, padding:0, 'box-sizing':'border-box', 'margin-left' : 28, 'border' : 'none', 'text-align' : 'center'});
    $(inputLocal).numeric();
    $(inputLocal).bind('keyup' , checkUp);

    var inputVisitante = document.createElement('input');
    inputVisitante.type = 'number';
    inputVisitante.maxLength = 2;
    $(holderInputs).append(inputVisitante);
    $(inputVisitante).css({'width' : 71, 'height' : 25,margin:0, padding:0, 'box-sizing':'border-box', 'margin-left' : 121, 'border' : 'none', 'text-align' : 'center'});		
    $(inputVisitante).numeric();
    $(inputVisitante).bind('keyup' , checkUp);

    var holderDetails = document.createElement('div');
    holderDetails.className = 'holder-detalles-partido';
    $(self.div).append(holderDetails);
    $(holderDetails).css({'width' : '100%', 'height' : 'auto', 'float' : 'left', 'position' : 'relative', 'text-align' : 'center', 'padding-bottom' : 10, 'font-weight' : 'bold'});

    $(holderDetails).append('<p>'+$(nodo).find('local').text()+' VS '+$(nodo).find('visitante').text()+'</p>');
    $(holderDetails).append('<p class="grey">'+getStringFecha($(nodo).find('fecha').text())+'</p>');
    $(holderDetails).append('<p class="grey">'+$(nodo).find('estadio').text()+'</p>');

    var holderBotones = document.createElement('div');
    holderBotones.className = 'holder-detalles-partido';
    $(self.div).append(holderBotones);
    $(holderBotones).css({'width' : '100%', 'height' : 'auto', 'float' : 'left', 'position' : 'relative', 'padding-bottom' : 10});	

    var btnEnviar = document.createElement('div'); 
    btnEnviar.id = 'btn-enviar-pronostico';
    $(holderBotones).append(btnEnviar);
    $(btnEnviar).text('GUARDAR');

    if(objApp.isTouch())
        $(btnEnviar).bind('touchstart' , doCheckResultado);
    else
        $(btnEnviar).bind('click' , doCheckResultado);	

    var btnEditar = document.createElement('div'); 
    btnEditar.id = 'btn-editar-pronostico';
    $(holderBotones).append(btnEditar);
    $(btnEditar).text('GUARDAR');
    $(btnEditar).css({'display' : 'none'});

    if(objApp.isTouch())
        $(btnEditar).bind('touchstart' , doEditar);
    else
        $(btnEditar).bind('click' , doEditar);	

    var btnCompartir = document.createElement('div'); 
    btnCompartir.id = 'btn-compartir';
    $(holderBotones).append(btnCompartir);

    if(objApp.isTouch())
        $(btnCompartir).bind('click' , compartir);
    else
        $(btnCompartir).bind('click' , compartir);	

    if(parseInt($(nodo).find('apuesta').find('aposto').text()) == 1)
    {
        $(inputLocal).val($(nodo).find('apuesta').find('apuestasLocalGoles').text());
        $(inputVisitante).val($(nodo).find('apuesta').find('apuestasVisitantesGoles').text());

        $(btnEnviar).css({'display' : 'none'});
        $(btnEditar).css({'display' : 'block'});
        $(btnCompartir).css({'display':'block'});

        //	$(inputLocal).attr('disabled' ,'disabled');
        //	$(inputVisitante).attr('disabled' ,'disabled');

        //checkUp();
    }		

    function checkUp()
    {
        console.log('up');
        var golesLocal = $(inputLocal).val();
        var golesVisitante = $(inputVisitante).val();

        if(golesLocal.length != 0 && golesVisitante.length != 0)
        {
            console.log('entro al if ---------------');
            console.log('Goles local : '+golesLocal+'---------------');
            console.log('Goles visita : '+golesVisitante+'---------------');

            if(parseInt(golesLocal) > parseInt(golesVisitante))
            {
                $(indicadorLeft).css({'background' : '#e11913'});
                $(indicadorCentro).css({'background' : '#7c7b7a'});
                $(indicadorRight).css({'background' : '#7c7b7a'});
            }
            else if(parseInt(golesLocal) == parseInt(golesVisitante))
            {
                $(indicadorLeft).css({'background' : '#7c7b7a'});
                $(indicadorCentro).css({'background' : '#e11913'});
                $(indicadorRight).css({'background' : '#7c7b7a'});
            }
            else if(parseInt(golesLocal) < parseInt(golesVisitante))
            {
                $(indicadorLeft).css({'background' : '#7c7b7a'});
                $(indicadorCentro).css({'background' : '#7c7b7a'});
                $(indicadorRight).css({'background' : '#e11913'});
            }
        }
        else
        {
            console.log('entro al else ---------------');
            console.log('Goles local : '+golesLocal+'---------------');
            console.log('Goles visita : '+golesVisitante+'---------------');

            $(indicadorLeft).css({'background' : '#7c7b7a'});
            $(indicadorCentro).css({'background' : '#7c7b7a'});
            $(indicadorRight).css({'background' : '#7c7b7a'});
        }
    }

    function doCheckResultado()
    {
        if($(inputLocal).val().length == 0 || $(inputVisitante).val().length == 0)
        {
            objApp.error('Debes ingresar los goles para apostar');
        }else if($(inputLocal).val() == $(inputVisitante).val()){
            objApp.error('El resultado no puede ser un empate.');
        }
        else
        {
            objApp.mostrarCargador();

            $.ajax
            ({
                url  : objApp.SERVER+'ws/ws-guardarApuesta.php',
                type : 'POST',
                data : 
                {
                    'id' : objApp.idUsuario, 
                    'local' : $(inputLocal).val(), 
                    'visita' : $(inputVisitante).val(),
                    'partido' : $(nodo).find('partidoId').text(),
                    'plataforma' : 'APP',
                    'horaPartido' : $(nodo).find('fecha').text()

                },
                success : onCompleteApuesta
            });			
        }
    }

    function onCompleteApuesta(xml)
    {
        objApp.ocultarCargador();
        var estado = parseInt($(xml).find('estado').text());

        if(estado == 1)
        {
            $(btnCompartir).css({'display' : 'block'});	
            $(btnEnviar).css({'display' : 'none'});
            $(btnEditar).css({'display' : 'block'});

            //$(inputLocal).attr('disabled' ,'disabled');
            //$(inputVisitante).attr('disabled' ,'disabled');

            objApp.error('Tu apuesta ha sido guardada correctamente');

            parent.refrescarLista();
        }
        else if(estado == 2)
            objApp.error('No puedes apostar en este momento, el partido ya ha comenzado');
        else if(estado == 3)
            objApp.error('Error, por favor verifica los datos');
        else
            objApp.error('Ha ocurrido un error, por favor intenta más tarde.');
    }

    function doEditar()
    {
        $(btnCompartir).css({'display' : 'none'});	
        $(btnEnviar).css({'display' : 'block'});
        $(btnEditar).css({'display' : 'none'});

        //$(inputLocal).attr('disabled' ,'');
        //$(inputVisitante).attr('disabled' ,'');
    }	

    function compartir()
    {
        objApp.mostrarCargador();

        $.ajax
        ({
            url  : objApp.SERVER+'global/process/create_post_image.php',
            type : 'POST',
            data : 
            {
                'idUsuario' : objApp.idUsuario, 
                'idLocatario' : $(nodo).find('idLocal').text(), 
                'idVisitante' : $(nodo).find('idVisita').text(),
                'golesLoc' : $(inputLocal).val(),
                'golesVis' : $(inputVisitante).val()
            },
            success : onCompleteCompartir
        });
    }

    function onCompleteCompartir(response)
    {
        objApp.ocultarCargador();
        response = JSON.parse(response);
        console.log("el response es ", response);
        var url = response.url.replace("\\", "");
        console.log("la url es ", url);
        facebookConnectPlugin.login(["public_profile"],function(){
            facebookConnectPlugin.showDialog({
                method: 'feed',
                name: objApp.nombreUsuario + ' pronosticó este resultado',
                link: 'http://www.appcopera.com',
                picture: url,
                description: "Participa tú también, descarga la app copera de Paceña y haz tus propios pronósticos"
            }, function(){
                objApp.error('Gracias por compartir tu pronóstico');	
            }, function(error){
                console.log("No se pudo compartir", error);
            });
        },function (error) { alert("" + error) });

    }	
}