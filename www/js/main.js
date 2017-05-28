function main(){
  let listaTratores = [];
  let myRes = new Res();
  let myStore = new Store('listaDeTratores',myRes);
  let paginaTratores = 0;
  let opcoesT = [new opcaoT('Presença de cabine',7.83,1),new opcaoT('Estrutura de proteção no capotamento',6.80,2),new opcaoT('Acelerador com acionamento para frente',6.61,3),new opcaoT('Cinto de segurança',6.37,4),new opcaoT('Dispositivo contra partida acidental',5.81,5),new opcaoT('Dispositivo que une os pedais dos freios',5.02,6),new opcaoT('Escapamento com direção acima do operador',4.75,7),new opcaoT('Superfície antiderrapante nos pedais',4.55,8),new opcaoT('Proteção da TDP',4.19,9),new opcaoT('Arranjo adequado nos comandos',3.48,10),new opcaoT('Proteção das partes móveis',3.28,11),new opcaoT('Proteção da ventoinha',3.24,12),new opcaoT('Acesso facilitado para o abastecimentos',3.05,13),new opcaoT('Degraus de acesso e saída',3.01,14),new opcaoT('Superfície antiderrapante no posto de operação',2.69,15),new opcaoT('Batente vertical de ambos os lados dos degraus',2.33,16),new opcaoT('Proteção da caixa de câmbio',2.29,17),new opcaoT('Degraus com superfície antiderrapante',2.18,18),new opcaoT('Espelho retrovisor lateral',2.14,19),new opcaoT('Espelho retrovisor intermediário',1.82,20),new opcaoT('Corrimão e/ou manípulos',1.74,21),new opcaoT('Luz de ré',1.66,22),new opcaoT('Orientação sobre capotagem lateral',1.42,23),new opcaoT('Vidros de anteparo ou para-lamas dianteiros',1.31,24),new opcaoT('Advertência de risco da TDP',1.31,25),new opcaoT('Tampa de proteção da bateria',1.07,26),new opcaoT('Aviso sonoro de marcha ré',1.03,27),new opcaoT('Extintor de incêndio',0.95,28),new opcaoT('Silenciador no cano de exaustão',0.87,29),new opcaoT('Orientação sobre tombamento longitudinal',0.75,30),new opcaoT('Luzes de advertência',0.75,31),new opcaoT('Orientações sobre a partida do motor',0.67,32),new opcaoT('Indicadores de direção',0.63,33),new opcaoT('Buzina',0.63,34),new opcaoT('Proteção em dutos de fluido sobre pressão',0.59,35),new opcaoT('Proteção da tubulação de exaustão',0.55,36),new opcaoT('Defletor de poeira',0.51,37),new opcaoT('Orientações sobre o acoplamento dos implementos',0.51,38),new opcaoT('Orientação na abertura do radiador',0.47,39),new opcaoT('Orientação sobre os elementos móveis',0.36,40),new opcaoT('Orientação sobre os locais aquecidos',0.28,41),new opcaoT('Orientação sobre a colocação dos EPI’s',0.24,42),new opcaoT('Triângulo de segurança de baixa velocidade',0.08,44),new opcaoT('Orientação sobre a colocação do cinto de segurança',0.04,43)];
  /* Se nao tiver conexão com a internet, adicionar mensagem de ERRO */
  let app = {
    init : function(){
      myRes.botaoLimparDados.addEventListener('click',this.limparDadosForm.bind(this));
      myRes.botaoConfirmar.addEventListener('click',this.confirmar.bind(this));
      myRes.botaoLogarGoogle.addEventListener('click',loginGoogle);
      myRes.botaoDeslogarGoogle.addEventListener('click',deslogarGoogle);
      /* Dialogo limpar localStorage */
      if (! myRes.dialog.showModal) {
        dialogPolyfill.registerDialog(myRes.dialog);
      }
      myRes.showDialogButton.addEventListener('click', function() {
        myRes.dialog.showModal();
      });
      myRes.dialog.querySelector('.close').addEventListener('click', function() {
        myRes.dialog.close();
      });
      myRes.dialog.querySelector('#confirm-button').addEventListener('click',this.limparTudo.bind(this));
      /* Fim Dialogo limpar localStorage */
      myStore.init();
      this.listaTratores = myStore.retornarLista();
      this.atualizarLista();
      this.carregarListaDeOpcoes();
    },
    limparDadosForm : function(){
      myRes.formPageRefference.reset();
      document.querySelector('#demo-toast-example').MaterialSnackbar.showSnackbar({message: 'Formulário limpo com sucesso!'});
    },
    confirmar : function(){
      let potenciaTrator = parseInt(myRes.inputPotencia.value);
      if( myRes.inputMarca.value.length == 0 || myRes.inputModelo.value.length == 0 ) {
        myRes.queryDemo.MaterialSnackbar.showSnackbar({message: 'Por favor preencha todos os campos!'});
      }
      else if ( myRes.inputModelo.value.length >= 20 ){
        myRes.queryDemo.MaterialSnackbar.showSnackbar({message: 'Tamanho máximo para modelo é de 20 caracteres!'});
      }
      else if ( myRes.inputMarca.value.length > 15 ){
        myRes.queryDemo.MaterialSnackbar.showSnackbar({message: 'Tamanho máximo para marca é de 15 caracteres!'})
      }
      else if (isNaN(potenciaTrator) || potenciaTrator < 1 || potenciaTrator > 9999 ){
         myRes.queryDemo.MaterialSnackbar.showSnackbar({message: 'Por favor insira um numero entre 1 e 9999'})
      }
      else {
        let cadastroComSucesso = myStore.cadastrarTrator();
        if ( cadastroComSucesso ){
          myRes.formPageRefference.reset();
          this.atualizarLista();
          this.listaTratores = myStore.retornarLista();
        }
      }
    },
    carregarListaDeOpcoes : function(){
      handleBarsCarregarTratores(opcoesT);
    },
    atualizarLista : function(){
      myStore.atualizarLista();
    },
    proximoTrator : function(){
      myStore.proximoTrator()
    },
    tratorAtenterior : function(){
    myStore.tratorAnterior();
    },
    deletarTrator : function(){
      myStore.deletarTrator;
    },
    limparTudo : function(){
      myRes.dialog.close();
      myStore.limparLista();
    }
  }
  app.init();
}
main();
