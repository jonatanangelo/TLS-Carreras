var acnombres = new Array("GIRA 90º","ARRIBA","ABAJO","DERECHA","IZQUIERDA","GIRA 180º","DESAPARECE","APARECE");
var desarrollo="";
var acciones = new Array();

function getCodigo(){

	var codigo='class Nave extend Objeto{\n'+
'\n'+
'    construct(){\n'+
'\n'+
'    }\n'+
'\n'+
'    public function play(){\n'+
'\n'+
desarrollo+
'\n'+
'    }\n'+
'\n'+
'}\n'+
'\n'+
'var nave = new Nave();\n'+
'nave.play();';

return codigo;
}

var flag=true;

var Progra = function(){

	for(var i=0;i<acnombres.length;i++){

		var it = new ItemProgra(i);

		if(i%2==0) $("#progra .objetos .lista table").append('<tr></tr>');

		var numtr = Math.ceil((i+1)/2) - 1;
		

		$("#progra .objetos .lista table tr").eq(numtr).append(it);


		

	}



	new Boton($("#progra .btns .reload"),function(bt){

		desarrollo="";
		$("#progra pre").html(getCodigo());

		$("#nave").remove();
		
		$("#progra .area .mov").append('<img src="elementos/progra/nave.png" alt="" id="nave">');

		acciones = new Array();

		$("#progra .btns .play").removeClass("stop");

	})

	new Boton($("#progra .btns .play"),function(bt){
		bt.addClass("stop");

		$("#nave").remove();

		$("#progra .area .mov").append('<img src="elementos/progra/nave.png" alt="" id="nave">');

		setTimeout(function(){
			$.each(acciones,function(k,v){
				mover(v,false);
			});
		},1000);

		setTimeout(function(){
			flag=true;
			bt.removeClass("stop");
		},1000*acciones.length + 2000);
		flag=false;
	});


	new Boton($("#progra .botones .bt.cancelar"),function(){

		desarrollo="";
		$("#progra pre").html(getCodigo());

		$("#nave").remove();
		
		$("#progra .area .mov").append('<img src="elementos/progra/nave.png" alt="" id="nave">');

		acciones = new Array();

		$("#progra .btns .play").removeClass("stop");

		$("#progra").hide();
		$("#inicio").fadeIn(300);

	});

}

var ItemProgra = function(num){

	var html = $('<td class="item p"><div class="nom">'+acnombres[num]+'</div></td>');
	new Boton(html,function(bt){
		
		if(flag && acciones.length<15){
			acciones.push(num);
					
			mover(num,true);

			$("pre").html(getCodigo());
		}

	});
	return html;

}

	function mover(num,add){
	switch(num){

			case 0:
				$("#nave").transition({rotate:"+=90deg"},1000);
				if(add) desarrollo+='\tnave.rotate="90deg";\n';
				break;
			case 1:
				$("#nave").transition({marginTop:"-=100px"},1000);
				if(add) desarrollo+='\tnave.moveUp="100m";\n';
				break;
			case 2:
				$("#nave").transition({marginTop:"+=100px"},1000);
				if(add) desarrollo+='\tnave.moveDown="100m";\n';
				break;
			case 3:
				$("#nave").transition({marginLeft:"+=100px"},1000);
				if(add) desarrollo+='\tnave.moveLeft="100m";\n';
				break;
			case 4:
				$("#nave").transition({marginLeft:"-=100px"},1000);
				if(add) desarrollo+='\tnave.moveRight="100m";\n';
				break;
			case 5:
				$("#nave").transition({rotate:"+=180deg"},1000);
				if(add) desarrollo+='\tnave.rotate="180deg";\n';
				break;
			case 6:
				$("#nave").transition({opacity:0.2},2000);
				if(add) desarrollo+='\tnave.fadeOut()";\n';
				break;
			case 7:
				$("#nave").transition({opacity:1},2000);
				if(add) desarrollo+='\tnave.fadeIn()";\n';
				break;
		}
}