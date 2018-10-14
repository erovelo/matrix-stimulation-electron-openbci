(function ($) {
    jQuery.fn.matrixStimulation = function () {

        var settings = arguments[0];
        var id = $(this).attr("id");
        var tmp = $.fn.matrixStimulation.tmp[id];

        var config = {
            elements: [
                { id: 0, img: 'assets/img/galleta.png' },
                { id: 1, img: 'assets/img/cereal.png' },
                { id: 2, img: 'assets/img/refresco.png' },
                { id: 3, img: 'assets/img/cocina.png' },
                { id: 4, img: 'assets/img/sala.png' },
                { id: 5, img: 'assets/img/dormitorio.png' },
                { id: 6, img: 'assets/img/persona1.png' },
                { id: 7, img: 'assets/img/persona2.png' },
                { id: 8, img: 'assets/img/persona3.png' },
                { id: 9, img: 'assets/img/telefono.png' },
                { id: 10, img: 'assets/img/tv.png' },
                { id: 11, img: 'assets/img/medicina.png' },
            ],
            repeat: true, // Repite ciclo
            delay: 300, //Intervalo en ms
            onSelected: undefined,
            timeOut: -1,
        };


        // Tiempos
        var preRunTime = 2000;
        var postRunTime = 0500;
        var preSeqTime =  2000;
        var postSeqTime = 2000; //
        var stimulationTime = 62.5; // Flash
        var isiTime = 125; // ISI
        var rep = 5; // Num de repeticiones
        var ite; // Iteracion en la que esta
        var stimulationArray; //Array a iterar
        var i;
        var callback; // Funcion que se manda a llamar cuando termine la estimulacion

        // Inicia las sequencias
        var preRun = () => {
            // Inicializamos iteracion
            ite = 0;

            // Iniciara en unos momentos la sequencia
            setTimeout(() => {
                preSeq();
            }, preRunTime);
        }

        // Presecuencia
        var preSeq = () => {
            if(ite < rep) {
                // Obtiene secuencias de flash
                stimulationArray = getRandom(tmp.elements.length);
                console.log('Secuencia de la matriz:');
                console.log(stimulationArray);
                setTimeout(() => {
                    i = 0;
                    stimulation();
                }, preSeqTime);
            }
            else postRun();
        }

        // Inicia stimulacion por cada elemento
        var stimulation = () => {
            if(i < stimulationArray.length){
                var row = stimulationArray[i];
                $($(`#${id} .row`)[row]).addClass('selected');
                setTimeout(() => {
                    isi();
                }, stimulationTime);
            }
            else postSeq(); // Ejecuta proSequence
        }

        var isi = () => {
            $("#"+id+" .selected").removeClass('selected');
            i++;
            setTimeout(() => {
                stimulation();
            }, isiTime);
        }

        var postSeq = () => {
            // Reinicia estimulacion
            setTimeout(()=>{
                ite++;
                preSeq(); // Ejecuta preSeq
            }, postSeqTime);
        }

        var postRun = () => {
            setTimeout(() => {
                if(callback != undefined) callback();
            }, postRunTime);
        }

        var getRandom = (len) => {
            var array = [];
            for(let i = 0; i < len; i++){
                var random;
                do {
                    random =  Math.floor(Math.random() * len);                
                } while (array.indexOf(random) >= 0);
                array.push(random);
            }
            return array;
        }

        // element-specific code here
        switch (settings) {
            case 'destroy':
                break;

            case 'disable':
                break;

            case 'getLengthMatrix':
                return tmp.elements.length;
                break;

            case 'setDelay':
                tmp.delay(arguments[1]);
                break;

            case 'start':
                callback = arguments[1];
                // Inicia preRun
                preRun();

            /*
                tmp.timeOut = setInterval(() => {
                    var random = Math.floor(Math.random() * tmp.elements.length); // Regresa un entero entre el 0 y el numero de elementos -1
                    //console.log("sig" + random);
                    $("#"+id+" .selected").removeClass('selected');
                    $($(`#${id} .row`)[random]).addClass('selected');
                }, tmp.delay);
            */
                break;

            case 'stop':
                clearTimeout(tmp.timeOut);
                break;

            default:
                // Si ya esta creado retorna
                if($("#"+id).hasClass('table')) return;
                $("#"+id).addClass('table');

                // Guardo datos temporalmente
                var opts = $.extend(true, {}, config, settings);

                // Agregando rows a la tabla
                opts.elements.forEach(row => {
                    var $row = $('<div></div>');
                    $row.addClass('row');
                    $row.css('background-image', `url("${row.img}")`)
                    $(`#${id}`).append($row);
                });

                // Guardando configuraciones
                $.fn.matrixStimulation.tmp[id] = opts;
                //console.log($.fn.matrixStimulation.tmp[id]);
                break;
        }
    };
    $.fn.matrixStimulation.tmp = new Array();
})(jQuery);