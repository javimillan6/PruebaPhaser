//var game= new Phaser.Game(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio,Phaser.AUTO,'ejemploPhaser');
var game= new Phaser.Game(800,600,Phaser.AUTO,'ejemploPhaser');

game.state.add("menu",menu);
game.state.add("menuPrincipal",menuPrincipal);
game.state.add("menuLobby",menuLobby);
game.state.add("pantallaJuego",pantallaJuego);
game.state.add("lobby",lobby);

game.state.start("menu");