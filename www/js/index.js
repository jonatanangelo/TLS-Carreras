var production = true;

var diseno;
var audio;
var progra;

var eleccion="";

var app = {
    // Application Constructor
    initialize: function() {
        if(production) document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        else $(document).ready(iniciar);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        iniciar();
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        
    }
};

app.initialize();
var alumno = 1;

function iniciar(){
   

    diseno = new Diseno();
    
    audio = new Audio();

    progra = new Progra();


    new Boton($("#inicio .c1"),function(bt){
        $("#inicio").hide();
        $("#diseno").fadeIn(300);
        eleccion = "diseno";
    });
    new Boton($("#inicio .c2"),function(bt){
        $("#inicio").hide();
        $("#audio").fadeIn(300);
        eleccion = "audio";
    });
    new Boton($("#inicio .c3"),function(bt){
        $("#inicio").hide();
        $("#progra").fadeIn(300);
        eleccion = "progra";
    });
    new Boton($("#enviar .opc .cb"),function(bt){
        $("#enviar .opc .cb").removeClass("sel");
        bt.addClass("sel");
        alumno = bt.data("val");
    })


    new Boton($(".pantalla .botones .bt.enviar"),function(bt){

        //$(".container").addClass('blur');
        $("#cubre").fadeIn(300);
        $("#enviar").show();
        $("#carga").hide();
        $("#gracias").hide();

        $("#enviar .bt.enviar").unbind();

        new Boton($("#enviar .bt.enviar"),function(){
            

            if($("#enviar input[name=nombre]").val()!="" && $("#enviar input[name=email]").val()!="" && $("#enviar input[name=celular]").val()!=""){

                $("#enviar").hide();
                $("#carga").fadeIn(300);

                switch(eleccion){
                    case "diseno":
                        html2canvas($("#crea"),{
                            onrendered:function(canvas){
                                var img = canvas.toDataURL();
                                $.ajax({
                                    url:"http://vivecreando.us/enviar/",
                                    data:{
                                        nombre:$("#enviar input[name=nombre]").val(),
                                        email:$("#enviar input[name=email]").val(),
                                        carrera:"diseno",
                                        celular:$("#enviar input[name=celular]").val(),
                                        alumno:alumno,
                                        img:img
                                    },
                                    type:"POST",
                                    success:function(res){
                                        if(res=="ok"){
                                            $("#enviar input[name=nombre]").val("");
                                            $("#enviar input[name=email]").val("");
                                            $("#enviar input[name=celular]").val("");
                                            $("#carga").hide();
                                            $("#gracias").fadeIn(300);
                                        }
                                       
                                        
                                    }
                                })
                            }
                        });
                        break;
                    case "audio":
                        $.ajax({
                            url:"http://vivecreando.us/enviar/",
                            data:{
                                nombre:$("#enviar input[name=nombre]").val(),
                                email:$("#enviar input[name=email]").val(),
                                carrera:"audio",
                                celular:$("#enviar input[name=celular]").val(),
                                alumno:alumno,
                                audios:canales.join(",")
                            },
                            type:"POST",
                            success:function(res){
                                if(res=="ok"){
                                    $("#enviar input[name=nombre]").val("");
                                    $("#enviar input[name=email]").val("");
                                    $("#enviar input[name=celular]").val("");
                                    $("#carga").hide();
                                    $("#gracias").fadeIn(300);
                                }
                               
                                
                            }
                        })
                        break;
                    case "progra":
                        $.ajax({
                            url:"http://vivecreando.us/enviar/",
                            data:{
                                nombre:$("#enviar input[name=nombre]").val(),
                                email:$("#enviar input[name=email]").val(),
                                carrera:"progra",
                                celular:$("#enviar input[name=celular]").val(),
                                alumno:alumno,
                                comandos:acciones.join(",")
                            },
                            type:"POST",
                            success:function(res){
                                if(res=="ok"){
                                    $("#enviar input[name=nombre]").val("");
                                    $("#enviar input[name=email]").val("");
                                    $("#enviar input[name=celular]").val("");
                                    $("#carga").hide();
                                    $("#gracias").fadeIn(300);
                                }
                               
                                
                            }
                        })
                        break;
                }

            }

        });

    });

    
    new Boton($("#enviar .bt.cancelar"),function(bt){
        $("#cubre").hide();
        $(".container").removeClass("blur");
    })
    new Boton($("#gracias .bt.cancelar"),function(bt){
        $("#cubre").hide();
        $(".container").removeClass("blur");
    });


}


var Boton = function(dom,callback){

   
   
        dom.bind({
            "touchstart":function(){
                $(this).addClass("over");
            },
            "touchend":function(){
                $(this).removeClass("over");
                //callback($(this));
            },
            "click":function(){
                callback($(this));
            }
        });

};

