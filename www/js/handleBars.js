function handleBarsCarregarTratores(opcoesT){
  var source = $("#lista-opcoes-template").html(); 
  var template = Handlebars.compile(source); 
  $("#more-information").append(template(opcoesT)); 
}
function handleBarsMostrarTratores(listaTratores){
	var source = $('#lista-tratores-template').html();
	var template = Handlebars.compile(source);
	$("#box-tratores").append(template(listaTratores));
}