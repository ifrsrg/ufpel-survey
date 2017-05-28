let Store = function(nomeReferente,myRes){
  this.nomeReferente = nomeReferente;
  this.listaTratores;
  this.myRes = myRes;
  this.init = function(){
    if (localStorage['listaDeTratores'] == undefined) localStorage['listaDeTratores'] = JSON.stringify([]);
    this.listaTratores = JSON.parse(localStorage['listaDeTratores']);
  };
  this.retornarLista = function(){
    return this.listaTratores;
  };
  this.cadastrarTrator = function(){
    let tratorRepetido = false;
    let trator = { marca : myRes.inputMarca.value, modelo : myRes.inputModelo.value, potencia : myRes.inputPotencia.value, id : this.listaTratores.length+1, indice : 0};
    for ( var i = 0; i < this.listaTratores.length; i++ ){
      if ( trator.marca == this.listaTratores[i].marca && trator.modelo == this.listaTratores[i].modelo ){
        tratorRepetido = true;
        break;
      }
    }
    if ( !tratorRepetido ){
      this.listaTratores.push(trator);
      myRes.queryDemo.MaterialSnackbar.showSnackbar({message: 'Trator adicionado com sucesso!'});
      localStorage['listaDeTratores'] = JSON.stringify(this.listaTratores);
      return true;
    }
    else {
      myRes.queryDemo.MaterialSnackbar.showSnackbar({message: 'Trator já existente no sistema!'});
      return false;
    }
  };
  this.atualizarLista = function(){
    localStorage['listaDeTratores'] = JSON.stringify(this.listaTratores);
    if ( this.listaTratores.length > 0 ){
      myRes.divBoxTratores.innerHTML = "";
      handleBarsMostrarTratores(this.listaTratores);
    }
  };
  this.deletarTrator = function(){
    /* Criar funcao para deletar trator */
  };
  this.limparLista = function(){
    localStorage['listaDeTratores'] = JSON.stringify([]);
    window.location.reload();
  }
}
