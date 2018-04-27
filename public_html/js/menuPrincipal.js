var menuPrincipal ={
    preload: function(){
        game.load.image('fondoMenu', 'assets/menu/fondo.png');
        game.load.image('botonAzul', 'assets/menu/botonAzul.png');
        
    },
    create: function(){
        game.add.sprite(0,0, 'fondoMenu');
        
        var botonPlay = game.add.button(300, 200,'botonAzul' , function(){game.state.start("menuLobby");}, this, 2, 1, 0);
        botonPlay.scale.setTo(0.5, 0.4);
        var textPlay = game.add.text(botonPlay.x+70, botonPlay.y+15, "PLAY");
        textPlay.font = 'Comfortaa';
        textPlay.fontSize = 30;
        textPlay.fill = '#ffffff';
        
        var botonHowToPlay = game.add.button(300, 300,'botonAzul');
        botonHowToPlay.scale.setTo(0.5, 0.4);
        var textHowToPlay = game.add.text(botonHowToPlay.x+15, botonHowToPlay.y+15, "HOW TO PLAY");
        textHowToPlay.font = 'Comfortaa';
        textHowToPlay.fontSize = 25;
        textHowToPlay.fill = '#ffffff';
        
        var botonTraining = game.add.button(300, 400,'botonAzul');
        botonTraining.scale.setTo(0.5, 0.4);
        var textTraining = game.add.text(botonTraining.x+30, botonTraining.y+15, "TRAINING");
        textTraining.font = 'Comfortaa';
        textTraining.fontSize = 30;
        textTraining.fill = '#ffffff';
        
        var botonLogout = game.add.button(300, 500,'botonAzul');
        botonLogout.scale.setTo(0.5, 0.4);
        var textLogout = game.add.text(botonLogout.x+35, botonLogout.y+15, "LOGOUT");
        textLogout.font = 'Comfortaa';
        textLogout.fontSize = 30;
        textLogout.fill = '#ffffff';
        
    },
    update: function(){
        
    }
};