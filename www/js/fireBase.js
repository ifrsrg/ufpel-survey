// Inicializar FIREBASE
let myRes = new Res();
var config = {
   apiKey: "AIzaSyCAuRD6_xD4o5WXQGgA2SwE1Pzp-ktsCaU",
   authDomain: "gerenciamento-ufpel.firebaseapp.com",
   databaseURL: "https://gerenciamento-ufpel.firebaseio.com",
   projectId: "gerenciamento-ufpel",
   storageBucket: "gerenciamento-ufpel.appspot.com",
   messagingSenderId: "161092657861"
};
firebase.initializeApp(config);
var user = firebase.auth().currentUser;
var name, email, photoUrl, uid;
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    myRes.botaoLogarGoogle.style.display = 'none';
    if (user != null) {
      name = user.displayName;
      email = user.email;
      photoUrl = user.photoURL;
      myRes.userName.innerHTML = name;
      myRes.emailUser.innerHTML = email;
      myRes.imgUser.src = photoUrl;
    }
  } else {
    myRes.loginGoogleBox.style.display = 'none';
  }
});
var deslogarGoogle = function(){
  firebase.auth().signOut().then(function() {
    window.location.reload();
  }, function(error) {
    
  });
}
var loginGoogle = function(){
   var provider = new firebase.auth.GoogleAuthProvider();
   firebase.auth().signInWithRedirect(provider);
   firebase.auth().getRedirectResult().then(function(result) {
     if (result.credential) {
       // This gives you a Google Access Token. You can use it to access the Google API.
       var token = result.credential.accessToken;
       // ...
     }
     // The signed-in user info.
     var user = result.user;
     localStorage['usuarioParaSalvar'] = user;
   }).catch(function(error) {
     // Handle Errors here.
     var errorCode = error.code;
     var errorMessage = error.message;
     // The email of the user's account used.
     var email = error.email;
     // The firebase.auth.AuthCredential type that was used.
     var credential = error.credential;
     // ...
   });
}
