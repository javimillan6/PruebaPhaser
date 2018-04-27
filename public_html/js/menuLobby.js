var menuLobby ={
    preload: function(){
        game.load.image('fondoMenu', 'assets/menu/fondo.png');
        game.load.image('botonAzul', 'assets/menu/botonAzul.png');
        game.load.image('lobbyBoard', 'assets/menu/lobbyBoard.png');
        game.load.image('lobbyNames','assets/menu/lobbyNames.png');
        
    },
    create: function(){
        game.add.sprite(0,0, 'fondoMenu');
        
        var botonCreateRoom = game.add.button(75, 320,'botonAzul', function(){game.state.start("lobby")}, this, 2, 1, 0);
        botonCreateRoom.scale.setTo(0.5, 0.4);
        var textCreate = game.add.text(botonCreateRoom.x+45, botonCreateRoom.y+15, "CREATE");
        textCreate.font = 'Comfortaa';
        textCreate.fontSize = 30;
        textCreate.fill = '#ffffff';
        
        var inputName = game.add.inputField(40, 250, {
            font: '18px Arial',
            fill: '#212121',
            fontWeight: 'bold',
            width: 260,
            padding: 8,
            borderWidth: 1,
            borderColor: '#000',
            borderRadius: 6,
            placeHolder: 'Room name',
            type: PhaserInput.InputType.text
        });
        
        var lobbyBoard = game.add.sprite(400, 30, 'lobbyBoard');
        lobbyBoard.scale.setTo(0.6, 0.65);
        
        var textPlay = game.add.text(lobbyBoard.x+85, lobbyBoard.y+20, "CURRENT GAMES");
        textPlay.font = 'Comfortaa';
        textPlay.fontSize = 22;
        textPlay.fill = '#ffffff';
        
        //Diferencia de 35 caben 10
        mostrarLobby("Jhon cena",2,10,435,140);
        mostrarLobby("Batman room",5,8,435,175);
        
    },
    update: function(){
        
    }
};

function mostrarLobby(nameRoom, nPlayers, nMaxPlayers, posX, posY){
    var nombre = nameRoom + " (" + nPlayers + "/" +nMaxPlayers+")";
    var lobby = game.add.button(posX, posY, 'lobbyNames');
    lobby.scale.setTo(0.63, 0.25);
    var textLobby = game.add.text(lobby.x+5, lobby.y+3, nombre);
    textLobby.font = 'Comfortaa';
    textLobby.fontSize = 18;
    textLobby.fill = '#ffffff';
}


