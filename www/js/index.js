var myStore;
var listaTratores = [];
var opcoesT = [new opcaoT('Presença de cabine',7.83,1),new opcaoT('Estrutura de proteção no capotamento',6.80,2),new opcaoT('Acelerador com acionamento para frente',6.61,3),new opcaoT('Cinto de segurança',6.37,4),new opcaoT('Dispositivo contra partida acidental',5.81,5),new opcaoT('Dispositivo que une os pedais dos freios',5.02,6),new opcaoT('Escapamento com direção acima do operador',4.75,7),new opcaoT('Superfície antiderrapante nos pedais',4.55,8),new opcaoT('Proteção da TDP',4.19,9),new opcaoT('Arranjo adequado nos comandos',3.48,10),new opcaoT('Proteção das partes móveis',3.28,11),new opcaoT('Proteção da ventoinha',3.24,12),new opcaoT('Acesso facilitado para o abastecimentos',3.05,13),new opcaoT('Degraus de acesso e saída',3.01,14),new opcaoT('Superfície antiderrapante no posto de operação',2.69,15),new opcaoT('Batente vertical de ambos os lados dos degraus',2.33,16),new opcaoT('Proteção da caixa de câmbio',2.29,17),new opcaoT('Degraus com superfície antiderrapante',2.18,18),new opcaoT('Espelho retrovisor lateral',2.14,19),new opcaoT('Espelho retrovisor intermediário',1.82,20),new opcaoT('Corrimão e/ou manípulos',1.74,21),new opcaoT('Luz de ré',1.66,22),new opcaoT('Orientação sobre capotagem lateral',1.42,23),new opcaoT('Vidros de anteparo ou para-lamas dianteiros',1.31,24),new opcaoT('Advertência de risco da TDP',1.31,25),new opcaoT('Tampa de proteção da bateria',1.07,26),new opcaoT('Aviso sonoro de marcha ré',1.03,27),new opcaoT('Extintor de incêndio',0.95,28),new opcaoT('Silenciador no cano de exaustão',0.87,29),new opcaoT('Orientação sobre tombamento longitudinal',0.75,30),new opcaoT('Luzes de advertência',0.75,31),new opcaoT('Orientações sobre a partida do motor',0.67,32),new opcaoT('Indicadores de direção',0.63,33),new opcaoT('Buzina',0.63,34),new opcaoT('Proteção em dutos de fluido sobre pressão',0.59,35),new opcaoT('Proteção da tubulação de exaustão',0.55,36),new opcaoT('Defletor de poeira',0.51,37),new opcaoT('Orientações sobre o acoplamento dos implementos',0.51,38),new opcaoT('Orientação na abertura do radiador',0.47,39),new opcaoT('Orientação sobre os elementos móveis',0.36,40),new opcaoT('Orientação sobre os locais aquecidos',0.28,41),new opcaoT('Orientação sobre a colocação dos EPI’s',0.24,42),new opcaoT('Triângulo de segurança de baixa velocidade',0.08,44),new opcaoT('Orientação sobre a colocação do cinto de segurança',0.04,43)];
var paginaTratores = 0;
var config = {
   apiKey: "AIzaSyCAuRD6_xD4o5WXQGgA2SwE1Pzp-ktsCaU",
   authDomain: "gerenciamento-ufpel.firebaseapp.com",
   databaseURL: "https://gerenciamento-ufpel.firebaseio.com",
   projectId: "gerenciamento-ufpel",
   storageBucket: "gerenciamento-ufpel.appspot.com",
   messagingSenderId: "161092657861"
};
var app = {
    init: function() {
      myStore = new Store('listaDeTratores',this.controls);
      myStore.init();
      this.atualizarLista();
      listaTratores = myStore.retornarLista();
      this.bindEvents();
      this.carregarListaDeOpcoes();
    },
    bindEvents: function() {
      document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    onDeviceReady: function() {
      this.controls.botaoConfirmar.addEventListener("touchend",this.confirmar.bind(this));
      this.controls.botaoLimparDados.addEventListener("touchend",this.limparDadosForm.bind(this));
      this.controls.botaoLogarGoogle.addEventListener("touchend",this.loginGoogle.bind(this));
      this.controls.botaoDeslogarGoogle.addEventListener("touchend",this.deslogarGoogle.bind(this));
      this.controls.botaoLimparLocal.addEventListener("touchend",this.limparTudo.bind(this));
      firebase.initializeApp(config);
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          app.controls.botaoLogarGoogle.style.display = 'none';
          if (user != null) {
            name = user.displayName;
            email = user.email;
            photoUrl = user.photoURL;
            app.controls.userName.innerHTML = name;
            app.controls.emailUser.innerHTML = email;
            app.controls.imgUser.src = photoUrl;
          }
        } else {
          app.controls.loginGoogleBox.style.display = 'none';
        }
      });
      for ( var i = 0; i < listaTratores.length; i++ ){
        var tratorId = listaTratores[i].id;
        var meuElemento = document.getElementById("deletar-trator-"+tratorId);
        meuElemento.addEventListener("touchend",this.deletarTrator);
      }
      for ( var i = 0; i < listaTratores.length; i++ ){
        var variante = i + 1;
        var divBoxMaisEspec = document.getElementById('mais-espec-'+variante);
        var divMoreInfo = document.getElementById('more-info-'+variante);
        var textoParaAdd = "<table>";
        for ( var a = 0; a < listaTratores[i].opcoesT.length; a++ ){
          var trueOrFalse = ( listaTratores[i].opcoesT[a].possui ) ? "check" : "clear";
          textoParaAdd += "<tr><td>"+opcoesT[a].componenteTitulo+"</td><td><i class='material-icons'>"+trueOrFalse+"</i></tr>";
        }
        divMoreInfo.innerHTML = textoParaAdd;
        divBoxMaisEspec.addEventListener("touchend",function(){
          var meuId = this.id + "";
          var minhaVariante = parseInt(meuId.substring(meuId.length-1));
          var divMaisInformacoes = document.getElementById('more-info-'+minhaVariante);
          var divBoxMaisEspecs = document.getElementById('mais-espec-'+minhaVariante);
          if(divMaisInformacoes.style.display == 'none'){
            divMaisInformacoes.style.display = 'block';
            divBoxMaisEspecs.innerHTML = "<i class='material-icons'>remove</i> ver menos especificações</span></span>";
          } else {
            divMaisInformacoes.style.display = 'none';
            divBoxMaisEspecs.innerHTML = "<i class='material-icons'>add</i> ver mais especificacoes";
          }
        });
      }
    },
    confirmar: function(){
      if( this.controls.inputMarca.value.length == 0 || this.controls.inputModelo.value.length == 0 ) {
        this.controls.queryDemo.MaterialSnackbar.showSnackbar({message: 'Por favor preencha todos os campos!'});
      }
      else if ( this.controls.inputModelo.value.length >= 20 ){
        this.controls.queryDemo.MaterialSnackbar.showSnackbar({message: 'Tamanho máximo para modelo é de 20 caracteres!'});
      }
      else if ( this.controls.inputMarca.value.length > 15 ){
        this.controls.queryDemo.MaterialSnackbar.showSnackbar({message: 'Tamanho máximo para marca é de 15 caracteres!'})
      } else {
        var cadastroComSucesso = myStore.cadastrarTrator(opcoesT);
        if ( cadastroComSucesso ){
          this.controls.formPageRefference.reset();
          this.atualizarLista();
          this.listaTratores = myStore.retornarLista();
        }
        window.location.reload();
      }
    },
    limparDadosForm : function(){
      this.controls.formPageRefference.reset();
      document.querySelector('#demo-toast-example').MaterialSnackbar.showSnackbar({message: 'Formulário limpo com sucesso!'});
    },
    atualizarLista : function(){
      myStore.atualizarLista();
    },
    deletarTrator : function(){
      myStore.deletarTrator(this.id);
    },
    limparTudo : function(){
      myStore.limparLista();
    },
    carregarListaDeOpcoes: function(){
      handleBarsCarregarTratores(opcoesT);
    },
    loginGoogle: function(){
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(provider);
      firebase.auth().getRedirectResult().then(function(result) {
        if (result.credential) {
          var token = result.credential.accessToken;
        }
        var user = result.user;
        localStorage['usuarioParaSalvar'] = user;
      }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
      });
    },
    deslogarGoogle: function(){
      firebase.auth().signOut().then(function() {
        window.location.reload();
      }, function(error) {});
    }
};
