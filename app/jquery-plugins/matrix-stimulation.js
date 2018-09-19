(function ($) {
    jQuery.fn.matrixStimulation = function () {
        var settings = arguments[0];
        var id = $(this).attr("id");
        var tmp = $.fn.matrixStimulation.tmp[id];

        var config = {
            elements: [
                { id: 0, img: '../img/img.jpg' },
                { id: 1, img: '../img/img.jpg' },
                { id: 2, img: '../img/img.jpg' },
                { id: 3, img: '../img/img.jpg' },
                { id: 4, img: '../img/img.jpg' },
                { id: 5, img: '../img/img.jpg' },
                { id: 6, img: '../img/img.jpg' },
                { id: 7, img: '../img/img.jpg' },
                { id: 8, img: '../img/img.jpg' },
            ],
            repeat: true, // Repite ciclo
            delay: 300, //Intervalo en ms
            onSelected: undefined,
            timeOut: -1,
        };

        // element-specific code here
        switch (settings) {
            case 'destroy':
                break;

            case 'disable':
                break;

            case 'setDelay':
                tmp.delay(arguments[1]);
                break;

            case 'start':
                tmp.timeOut = setInterval(() => {
                    var random = Math.floor(Math.random() * tmp.elements.length); // Regresa un entero entre el 0 y el numero de elementos -1
                    console.log("sig" + random);
                    $("#"+id+" .selected").removeClass('selected');
                    $($(`#${id} .row`)[random]).addClass('selected');
                }, tmp.delay);
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