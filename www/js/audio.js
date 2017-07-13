var listaaudios = new Array("","v1.wav","v2.wav","v3.wav");
var audionombres = new Array("-","CABALLO","MOTO","CARRO");

var canales = new Array(0,0,0,0);

var timer;

var itemsnd;


function parar(){
	document.getElementById("video").pause();
			
			document.getElementById("video").currentTime = 0;
	document.getElementById("ch1").pause();
	document.getElementById("ch2").pause();
	document.getElementById("ch3").pause();
	document.getElementById("ch4").pause();

	document.getElementById("ch1").currentTime = 0;
	document.getElementById("ch2").currentTime = 0;
	document.getElementById("ch3").currentTime = 0;
	document.getElementById("ch4").currentTime = 0;

	document.getElementById("video").currentTime = 0;

	clearInterval(timer);

	$("#audio .current").css("left",0);

	$("#audio .area .play").removeClass("stop");

}
var Audio = function(){

	document.addEventListener("fullscreenchange", function(){alert("fs")}, false);

	document.getElementById('video').addEventListener('ended',function(){
		parar();
		//alert(1);

	},false);
	

	

	for(var i=0;i<listaaudios.length-1;i++){

		var it = new ItemAudio(i+1);

		if(i%2==0) $("#audio .objetos .lista table").append('<tr></tr>');

		var numtr = Math.ceil((i+1)/2) - 1;

		$("#audio .objetos .lista table tr").eq(numtr).append(it);

	}

	new Boton($("#audio .area .play"),function(bt){

		onPlay(bt);
	});

	

	new Boton($("#audio .lineas .li .ant"),function(bt){
		var num = bt.parent().data("l");
		canales[num-1]--;
		if(canales[num-1]<0) canales[num-1]=listaaudios.length-1;
		$("#audio .lineas .l"+num+" .nom").html(audionombres[canales[num-1]]);

		$("#ch"+num).attr("src","elementos/audio/"+listaaudios[canales[num-1]]);

		//document.getElementById("ch"+num).src("elementos/audio/"+canales[num-1]);
		parar();
	});
	new Boton($("#audio .lineas .li .sig"),function(bt){
		var num = bt.parent().data("l");
		canales[num-1]++;
		if(canales[num-1]==listaaudios.length) canales[num-1]=0; 
		$("#audio .lineas .l"+num+" .nom").html(audionombres[canales[num-1]]);

		$("#ch"+num).attr("src","elementos/audio/"+listaaudios[canales[num-1]]);
		parar();
	});


	new Boton($("#audio .botones .bt.cancelar"),function(){

		
		
		$("#audio").hide();
		$("#inicio").fadeIn(300);



		$("#audio .area .play").removeClass("stop");

		document.getElementById("video").pause();
		
		document.getElementById("video").currentTime = 0;

		clearInterval(timer);

		$("#audio .current").css("left",0);

		document.getElementById("ch1").pause();
		document.getElementById("ch2").pause();
		document.getElementById("ch3").pause();
		document.getElementById("ch4").pause();

		document.getElementById("ch1").currentTime = 0;
		document.getElementById("ch2").currentTime = 0;
		document.getElementById("ch3").currentTime = 0;
		document.getElementById("ch4").currentTime = 0;


		canales = new Array(0,0,0,0);
		$("#ch1").attr("src","");
		$("#ch2").attr("src","");
		$("#ch3").attr("src","");
		$("#ch4").attr("src","");
		
		$("#audio .lineas .l1 .nom").html("-");
		$("#audio .lineas .l2 .nom").html("-");
		$("#audio .lineas .l3 .nom").html("-");
		$("#audio .lineas .l4 .nom").html("-");


		if(itemsnd!=null){
			itemsnd.pause();
			itemsnd.currentTime=0;
		}

		$(".carrera .objetos .item").addClass("p");
		$(".carrera .objetos .item img").attr("src","img/play.png")

	});

	

}

function onPlay(bt){

	if(bt.hasClass("stop")){

			bt.removeClass("stop");

			document.getElementById("video").pause();
			
			document.getElementById("video").currentTime = 0;

			clearInterval(timer);

			$("#audio .current").css("left",0);

			document.getElementById("ch1").pause();
			document.getElementById("ch2").pause();
			document.getElementById("ch3").pause();
			document.getElementById("ch4").pause();

			document.getElementById("ch1").currentTime = 0;
			document.getElementById("ch2").currentTime = 0;
			document.getElementById("ch3").currentTime = 0;
			document.getElementById("ch4").currentTime = 0;

		}else{

			if(itemsnd!=null){
				itemsnd.pause();
				itemsnd.currentTime=0;
			}

			$(".carrera .objetos .item").addClass("p");
			$(".carrera .objetos .item img").attr("src","img/play.png");

			bt.addClass("stop");

			document.getElementById("video").play();


			document.getElementById("ch1").play();
			document.getElementById("ch2").play();
			document.getElementById("ch3").play();
			document.getElementById("ch4").play();


			timer = setInterval(function(){

				var current = document.getElementById("video").currentTime;

				var pos = current*$("#audio .lineas .li").innerWidth()/10;

				console.log(pos);

				$("#audio .current").css("left",pos);

			},50);
		}

}

var ItemAudio = function(num){
	var html = $('<td class="item p"><audio id="a'+num+'"><source src="elementos/audio/'+listaaudios[num]+'" type="audio/wav"></audio><img src="img/play.png" width="50" height="auto" alt=""><div class="nom">'+audionombres[num]+'</div></td>');
	
	new Boton(html,function(bt){

		if(bt.hasClass("p")){
			$(".carrera .objetos .item").addClass("p");
			$(".carrera .objetos .item img").attr("src","img/play.png")
			bt.removeClass("p");
			bt.find("img").attr("src","img/stop.png");

			if(itemsnd!=null){
				itemsnd.pause();
				itemsnd.currentTime=0;
			}
			itemsnd = document.getElementById("a"+num);
			itemsnd.play();

			parar();


		}else{
			bt.addClass("p");
			bt.find("img").attr("src","img/play.png");
			document.getElementById("a"+num).pause();
			document.getElementById("a"+num).currentTime = 0;
		}
		//alert(1);
		

		

	})

	return html;
}

