
var Diseno = function(){

	this.total = 12;

	for(var i=0;i<12;i++){

		var it = new ItemDiseno(i+1);

		if(i%2==0) $("#diseno .objetos .lista table").append('<tr></tr>');

		var numtr = Math.ceil((i+1)/2) - 1;

		console.log();

		$("#diseno .objetos .lista table tr").eq(numtr).append(it);
		//$("#diseno .objetos .lista").append(it);

	}


	new Boton($("#diseno .base .item"),function(bt){

		$("#diseno .base .item").removeClass("ac");
		bt.addClass('ac');

		var num = bt.data("num");

		$("#diseno .area").css("background-image","url(elementos/diseno/e"+num+".png)");

	});

	
	

	new Boton($("#diseno .botones .bt.cancelar"),function(){

		$("#diseno .app .area").html("");
		$("#diseno").hide();
		$("#inicio").fadeIn(300);
		numobj=0;
	});

	this.iniciar = function(){



	}


	
}


var numobj = 0;


var ItemDiseno = function(num){


	var path = "elementos/diseno/"+num+".png";

	//var html = $('<div class="item"><div class="img"></div></div>');


	var html = $('<td class="item p"><div class="img"></div></td>');
	

	html.find(".img").css("background-image","url("+path+")");


	var add = html.find(".add");

	new Boton(html.find(".img"),function(bt){
		
		

		numobj++;

		var obj = $('<div class="drag" id="d'+numobj+'"><img src="elementos/diseno/'+num+'.png" id="o'+numobj+'"></div>');


		

		$("#diseno .area").append(obj);

		
		var scale = 1;
		var scaleElement = document.getElementById('o'+numobj);
	    var resetTimeout;

	    var angle = 0;
		
		interact('#d'+numobj)
		  .draggable({
		    // enable inertial throwing
		    inertia: true,
		    // keep the element within the area of it's parent
		    restrict: {
		      restriction: "parent",
		      endOnly: true,
		      elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
		    },
		    // enable autoScroll
		    autoScroll: true,

		    // call this function on every dragmove event
		    onmove: dragMoveListener,
		    // call this function on every dragend event
		    onend: function (event) {
		      var textEl = event.target.querySelector('p');

		      textEl && (textEl.textContent =
		        'moved a distance of '
		        + (Math.sqrt(event.dx * event.dx +
		                     event.dy * event.dy)|0) + 'px');
		    }
		  })
		  .gesturable({
		    onstart: function (event) {
		      clearTimeout(resetTimeout);
		      scaleElement.classList.remove('reset');
		    },
		    onmove: function (event) {
		      scale = scale * (1 + event.ds);

		      angle += event.da;

		      scaleElement.style.webkitTransform =
		      scaleElement.style.transform =
		        'scale(' + scale + ') rotate('+angle+'deg)';

		      dragMoveListener(event);



		      


		    },
		    onend: function (event) {
		      //resetTimeout = setTimeout(reset, 1000);
		      scaleElement.classList.add('reset');
		    }
		  })
		  .on('doubletap', function (event) {
		    $(event.currentTarget).remove();
		  })

		  function dragMoveListener (event) {
		    var target = event.target,
		        // keep the dragged position in the data-x/data-y attributes
		        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
		        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

		    // translate the element
		    target.style.webkitTransform =
		    target.style.transform =
		      'translate(' + x + 'px, ' + y + 'px)';

		    // update the posiion attributes
		    target.setAttribute('data-x', x);
		    target.setAttribute('data-y', y);
		  }

		  function reset () {
			  scale = 1;
			  scaleElement.style.webkitTransform =
			  scaleElement.style.transform =
			    'scale(1)';
			}
		  // this is used later in the resizing and gesture demos
		  window.dragMoveListener = dragMoveListener;


	})


	

	return html;

}


