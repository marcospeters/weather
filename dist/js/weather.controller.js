$(function(){
	
	/* Configuração */
	var DEG = 'c';		// c para celsius, f para fahrenheit
	var cityInit, codeInit;
	
	var weatherIconMap = [
		'storm', 'lightning', 'snow', 'hail',
		'drizzle', 'rain', 'fog', 'wind', 'snowflake',
		'cloud', 'cloud_moon', 'cloud_sun', 'moon', 'sun', 'lightning'		
	];

	var ywcc_ptbr = {
    '0':  'tornado',                       
    '1':  'tempestade tropical',          
    '2':  'furacão',                       
    '3':  'tempestade severa',             
    '4':  'trovoadas',                     
    '5':  'chuva e neve',                   
    '6':  'chuva e granizo fino',           
    '7':  'neve e granizo fino',            
    '8':  'garoa gélida',                  
    '9':  'garoa',                         
    '10': 'chuva gélida',                  
    '11': 'chuvisco',                      
    '12': 'chuva',                         
    '13': 'neve em flocos finos',          
    '14': 'leve precipitação de neve',      
    '15': 'ventos com neve',               
    '16': 'neve',                          
    '17': 'chuva de granizo',              
    '18': 'pouco granizo',                 
    '19': 'pó em suspensão',               
    '20': 'neblina',                       
    '21': 'névoa seca',                    
    '22': 'enfumaçado',                    
    '23': 'vendaval',                      
    '24': 'ventando',                      
    '25': 'frio',                          
    '26': 'nublado',                       
    '27': 'muitas nuvens (noite)',          
    '28': 'muitas nuvens (dia)',            
    '29': 'parcialmente nublado (noite)',   
    '30': 'parcialmente nublado (dia)',     
    '31': 'céu limpo (noite)',              
    '32': 'ensolarado',                    
    '33': 'tempo bom (noite)',              
    '34': 'tempo bom (dia)',                
    '35': 'chuva e granizo',               
    '36': 'quente',                        
    '37': 'tempestades isoladas',          
    '38': 'tempestades esparsas',          
    '39': 'tempestades esparsas',          
    '40': 'chuvas esparsas',               
    '41': 'nevasca',                       
    '42': 'tempestades de neve esparsas',  
    '43': 'nevasca',                       
    '44': 'parcialmente nublado',          
    '45': 'chuva com trovoadas',           
    '46': 'tempestade de neve',            
    '47': 'relâmpagos e chuvas isoladas',  
    '3200': 'não disponível'               
}

	var areaChartData ={
	      labels: '',
	      datasets: [
	        {
	          label: "Maxima",
	          fillColor: "rgba(210, 214, 222, 1)",
	          strokeColor: "rgba(210, 214, 222, 1)",
	          pointColor: "rgba(210, 214, 222, 1)",
	          pointStrokeColor: "#c1c7d1",
	          pointHighlightFill: "#fff",
	          pointHighlightStroke: "rgba(220,220,220,1)",
	          data: ''
	        },
	        {
	          label: "Minima",
	          fillColor: "rgba(60,141,188,0.9)",
	          strokeColor: "rgba(60,141,188,0.8)",
	          pointColor: "#3b8bba",
	          pointStrokeColor: "rgba(60,141,188,1)",
	          pointHighlightFill: "#fff",
	          pointHighlightStroke: "rgba(60,141,188,1)",
	          data: ''
	        }
	      ]
	    };

    var areaChartCanvas = $("#areaChart").get(0).getContext("2d");

    var areaChart = new Chart(areaChartCanvas);

    var areaChartOptions = {
      //Boolean - If we should show the scale at all
      showScale: true,
      //Boolean - Whether grid lines are shown across the chart
      scaleShowGridLines: false,
      //String - Colour of the grid lines
      scaleGridLineColor: "rgba(0,0,0,.05)",
      //Number - Width of the grid lines
      scaleGridLineWidth: 1,
      //Boolean - Whether to show horizontal lines (except X axis)
      scaleShowHorizontalLines: true,
      //Boolean - Whether to show vertical lines (except Y axis)
      scaleShowVerticalLines: true,
      //Boolean - Whether the line is curved between points
      bezierCurve: true,
      //Number - Tension of the bezier curve between points
      bezierCurveTension: 0.3,
      //Boolean - Whether to show a dot for each point
      pointDot: false,
      //Number - Radius of each point dot in pixels
      pointDotRadius: 4,
      //Number - Pixel width of point dot stroke
      pointDotStrokeWidth: 1,
      //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
      pointHitDetectionRadius: 20,
      //Boolean - Whether to show a stroke for datasets
      datasetStroke: true,
      //Number - Pixel width of dataset stroke
      datasetStrokeWidth: 2,
      //Boolean - Whether to fill the dataset with a color
      datasetFill: true,
      //String - A legend template
      legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].lineColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>",
      //Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
      maintainAspectRatio: true,
      //Boolean - whether to make the chart responsive to window resizing
      responsive: true
    };

    var barChartCanvas = $("#barChart").get(0).getContext("2d");

    var barChart = new Chart(barChartCanvas);

    var barChartData = areaChartData;

    barChartData.datasets[1].fillColor = "#00a65a";
    barChartData.datasets[1].strokeColor = "#00a65a";
    barChartData.datasets[1].pointColor = "#00a65a";

    var barChartOptions = {
      //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
      scaleBeginAtZero: true,
      //Boolean - Whether grid lines are shown across the chart
      scaleShowGridLines: true,
      //String - Colour of the grid lines
      scaleGridLineColor: "rgba(0,0,0,.05)",
      //Number - Width of the grid lines
      scaleGridLineWidth: 1,
      //Boolean - Whether to show horizontal lines (except X axis)
      scaleShowHorizontalLines: true,
      //Boolean - Whether to show vertical lines (except Y axis)
      scaleShowVerticalLines: true,
      //Boolean - If there is a stroke on each bar
      barShowStroke: true,
      //Number - Pixel width of the bar stroke
      barStrokeWidth: 2,
      //Number - Spacing between each of the X value sets
      barValueSpacing: 5,
      //Number - Spacing between data sets within X values
      barDatasetSpacing: 1,
      //String - A legend template
      legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>",
      //Boolean - whether to make the chart responsive
      responsive: true,
      maintainAspectRatio: true,
      datasetFill: false
    };
	
	var weatherDiv = $('#weather'),
		scroller = $('#scroller'),
		location = $('p.location');
	
	function getPrevision(city, code) {

	    // Yahoo's PlaceFinder API http://developer.yahoo.com/geo/placefinder/
	    var wsql = 'select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="'+city+', '+code+', BR")  and u="'+ DEG +'"',
	        weatherYQL = 'http://query.yahooapis.com/v1/public/yql?q='+encodeURIComponent(wsql)+'&u=c&format=json&callback=?',
	        results, woeid;
	 			
	            $.getJSON(weatherYQL.replace('WID',woeid), function(r){

	                if(r.query && r.query.count == 1){
	                    var item = r.query.results.channel.item.condition;
	                    
	                    if(!item)
						    return false;
	            		
	            		loadCharts(r.query.results.channel.item.forecast);
	            		valePraia(r.query.results.channel.item.forecast);

						/*Esse switch abaixo exemplifica como alterar os valores em inglês , no caso ajustando os dias*/
						switch(item.day){
							case 'Sun': var dia = 'Dom';
							break;
							
							case 'Mon': var dia = 'Seg';
							break;
							
							case 'Tue': var dia = 'Ter';
							break;
							
							case 'Wed': var dia = 'Qua';
							break;
							
							case 'Thu': var dia = 'Qui';
							break;
							
							case 'Fri': var dia = 'Sex';
							break;
							
							case 'Sat': var dia = 'Sab';
							break;
							
						}
	                    
	                }
	            });
	    
	}

	function loadCharts(prevision){
		var labels = [], high = [], low = [], previsionShow = '';


		console.log(prevision)
		for (var i = 0; i < 7; i++) {
		    labels.push(prevision[i].date)
		    high.push(prevision[i].high)
		    low.push(prevision[i].low)

		    previsionShow += "<div class='col-sm-2'>"+
                  "<div class='small-box bg-green'>"+
                    "<div class='inner'>"+
                      "<p>" + ywcc_ptbr[prevision[i].code]  + "</p>"+
                      "<p>"+ prevision[i].date +"</p>"+
                    "</div>"+
                  "</div>"+
              "</div>"; 
		}

		areaChartData.labels = labels;
		areaChartData.datasets[0].data = high;
		areaChartData.datasets[1].data = low;

		areaChart.Line(areaChartData, areaChartOptions);
	    barChart.Bar(barChartData, barChartOptions);
	    $('.previsionShow').html(previsionShow)

	}

	function selecionaCidade(city, code){
		$.getJSON('dist/js/estados_cidades.json', function (data) {
				
				
				$("#cidades").val(city);		

				var items = [];
				var options = '<option value="">escolha um estado</option>';	
				$.each(data, function (key, val) {
					options += '<option ' + (val.sigla == code? 'selected':'')+ '  value="' + val.sigla + '">' + val.nome + '</option>';
				});					
				$("#estados").html(options);				
				
				$("#estados").change(function () {
					
					var cidades = [];
					var str = $("#estados option:selected").val();	
					
					$.each(data, function (key, val) {
						if(val.sigla == str) {							
							$.each(val.cidades, function (key_city, val_city) {
								cidades.push(val_city);
							});							
						}
					});

					$( "#cidades").autocomplete({
				      source: cidades
				    });

				}).change();

			});

			$("#cidades").on( "autocompleteselect", function( event, ui ) {
				$('.favoritar').show();
				var estado = $("#estados option:selected").val();
				var cidade = ui.item.value;

				getPrevision(estado, cidade);
			});	
	}

	function favoritar(){
		$('.favoritar').unbind().on('click', function(){
			var estado = $("#estados option:selected").val();
			var cidade = $("#cidades").val();

			document.cookie = "estado" + "=" + estado + "$" + "cidade" +"="+ cidade ;

			$('.favoritar').hide();
		})
	}

	function valePraia(prevision){
		var tempo = ['clear', 'hot', 'fair']
		var data, mediaSabado, mediaDomingo, text, title;

		for (var i = 0; i < 7; i++) {
		    data = new Date(prevision[i].date)
		    if(data.getDay() == 0){
	    		mediaDomingo = (parseInt(prevision[i].high) + parseInt(prevision[i].low)) / 2;
	    		if(mediaDomingo > 25 && $.inArray(prevision[i].text.toLowerCase(), tempo) > -1){
	    			
	    			mediaDomingo = true
	    			
	    		}
		    }else if (data.getDay() == 6) {
		    	mediaSabado = (parseInt(prevision[i].high) + parseInt(prevision[i].low)) / 2;
	    		if(mediaSabado > 25 && $.inArray(prevision[i].text.toLowerCase(), tempo) > -1){
	    			
	    			mediaSabado = true
	    			
	    		}
		    }
		}

		if(mediaSabado == true && mediaDomingo == true){
			title = "Vai dar praia o final de semana inteiro";
			text = "Final de semana será de tempo bom, que tal pegar uma praia?"
		}else if(mediaSabado == true){
			title = "Vai dar praia no sabado";
			text = "Sabado será de tempo bom, que tal pegar uma praia?"
		}else if(mediaDomingo == true){
			title = "Vai dar praia no domingo";
			text = "Domingo será de tempo bom, que tal pegar uma praia?"
		}else {
			title = "Não vai dar praia o final de semana";
			text = "Final de semana será de tempo ruim."
		}

		$('.valepraia .box-body').html("<h3>" + title + "</h3> <h5>" + text + "</h5>");
	}

	function setCityCode(){
		
		if (document.cookie) {
			elms = document.cookie.split('$');
			if(elms.length == 2){
				var elmEstado = elms[0].split('=')
				if(elmEstado.length == 2){
					var elmCidade = elms[1].split('=')
					if(elmCidade.length == 2){
	        			codeInit = elmEstado[1];
						cityInit = elmCidade[1];

						$('.favoritar').hide();
					}
				}
			}
		}else{
			codeInit = 'SC'; 
			cityInit = 'Blumenau';
		}
	}
    

	function init(){
		setCityCode();
		selecionaCidade(cityInit, codeInit);
		getPrevision(cityInit, codeInit);
		favoritar();

	}

	init();

});
