var Store = function(nomeReferente,controls){
  this.nomeReferente = nomeReferente;
  this.controls = controls;
  this.listaTratores;
  this.init = function(){
    if (localStorage[nomeReferente] == 'undefined')
      window.alert('undefined');
      localStorage[nomeReferente] = JSON.stringify([]);
    } else window.alert('nao undefined');
    this.listaTratores = JSON.parse(localStorage[nomeReferente]);
  };
  this.retornarLista = function(){
    return this.listaTratores;
  };
  this.cadastrarTrator = function(opcoesT){
    var tratorRepetido = false;
    var trator = { marca : this.controls.inputMarca.value, modelo : this.controls.inputModelo.value, potencia : this.controls.inputPotencia.value, id : this.listaTratores.length+1, indice : 0};
    var outrasOpcoes = opcoesT;
    var variante = 1, divBoxMaisEspec;
    for ( var i = 0; i < outrasOpcoes.length; i++){
      variante = i + 1;
      divBoxMaisEspec = document.getElementsByName('options-'+variante);
      if ( !divBoxMaisEspec[0].checked ) outrasOpcoes[i].possui = false;
    }
    trator.opcoesT = outrasOpcoes;
    for ( var i = 0; i < this.listaTratores.length; i++ ){
      if ( trator.marca == this.listaTratores[i].marca && trator.modelo == this.listaTratores[i].modelo ){
        tratorRepetido = true;
        break;
      }
    }
    if ( !tratorRepetido ){
      this.listaTratores.push(trator);
      localStorage['listaDeTratores'] = JSON.stringify(this.listaTratores);
      return true;
    }
    else {
      this.controls.queryDemo.MaterialSnackbar.showSnackbar({message: 'Trator já existente no sistema!'});
      return false;
    }
  };
  this.atualizarLista = function(){
    localStorage['listaDeTratores'] = JSON.stringify(this.listaTratores);
    if ( this.listaTratores.length > 0 ){
      this.controls.divBoxTratores.innerHTML = "";
      handleBarsMostrarTratores(this.listaTratores);
    }
  };
  this.deletarTrator = function(){

  };
  this.limparLista = function(){
    localStorage['listaDeTratores'] = JSON.stringify([]);
    window.location.reload();
  }
}
