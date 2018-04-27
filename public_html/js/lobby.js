var lobby ={
    preload: function(){
        game.load.image('fondoMenu', 'assets/menu/fondo.png');
        game.load.image('botonAzul', 'assets/menu/botonAzul.png');
        game.load.image('lobbyBoard', 'assets/menu/lobbyBoard.png');
        game.load.image('lobbyNames','assets/menu/lobbyNames.png');
        
    },
    create: function(){
        game.add.sprite(0,0, 'fondoMenu');
        
        var botonCreateRoom = game.add.button(75, 320,'botonAzul');
        botonCreateRoom.scale.setTo(0.5, 0.4);
        var textPlay = game.add.text(botonCreateRoom.x+45, botonCreateRoom.y+15, "CREATE");
        textPlay.font = 'Comfortaa';
        textPlay.fontSize = 30;
        textPlay.fill = '#ffffff';
        
    },
    update: function(){
        
    }
};