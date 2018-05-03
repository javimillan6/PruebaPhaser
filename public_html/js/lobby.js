var color = 1;

var lobby ={
    preload: function(){
        game.load.image('fondoMenu', 'assets/menu/fondo.png');
        game.load.image('botonAzul', 'assets/menu/botonAzul.png');
        game.load.image('playerLobby', 'assets/menu/playerLobby.png');
        game.load.image('blue', 'assets/player/playerBlue.png');
        game.load.image('green', 'assets/player/playerGreen.png');
        game.load.image('red', 'assets/player/playerRed.png');
        
    },
    create: function(){
        game.add.sprite(0,0, 'fondoMenu');
        
        var botonCreateRoom = game.add.button(500, 260,'botonAzul');
        botonCreateRoom.scale.setTo(0.5, 0.4);
        var textPlay = game.add.text(botonCreateRoom.x+55, botonCreateRoom.y+15, "READY");
        textPlay.font = 'Comfortaa';
        textPlay.fontSize = 30;
        textPlay.fill = '#ffffff';
        
        //y distancia 85
        mostrarPlayer("BICHOO", 1, 25, 25, "blue");
        mostrarPlayer("Manolo", 2, 25, 110, "green");
        mostrarPlayer("Juan puedes oirme?", 3, 25, 195,"red");
    },
    update: function(){
        
    }
};

function mostrarPlayer(playerName, index, posX, posY, color){
    var pLobby = game.add.sprite(posX, posY, 'playerLobby');
    pLobby.scale.setTo(0.7, 0.6);
    var name = game.add.text(pLobby.x+95, pLobby.y+40, playerName);
    name.font = 'Comfortaa';
    name.fontSize = 18;
    name.fill = '#ffffff';
    
    var name = game.add.text(pLobby.x+95, pLobby.y+13, "PLAYER "+index);
    name.font = 'Comfortaa';
    name.fontSize = 10;
    name.fill = '#ffffff';
    
    var color = game.add.sprite(pLobby.x+22, pLobby.y+16, color);
    
}