var howtoplay ={
    preload: function(){
        game.load.image('fondoMenu', 'assets/menu/fondo.png');
        game.load.image('arrows', 'assets/howtoplay/arrows.png');
        game.load.image('end', 'assets/howtoplay/end.png');
        game.load.image('hit', 'assets/howtoplay/hit.png');
        game.load.image('playerBlue', 'assets/player/playerBlue.png');
        game.load.image('playerGreen', 'assets/player/playerGreen.png');
        game.load.image('playerRed', 'assets/player/playerRed.png');
        
    },
    create: function(){
        
        game.add.sprite(0,0, 'fondoMenu');
        
        var player1 = game.add.sprite(95, 270, 'playerBlue');
        var player2 = game.add.sprite(165, 220, 'playerGreen');
        var player3 = game.add.sprite(235, 270, 'playerRed');
        
        var textPlayer = game.add.text(35, 150, "Every player is a ball");
        textPlayer.font = 'Comfortaa';
        textPlayer.fontSize = 30;
        textPlayer.fill = '#ffffff';
        
        var hit = game.add.sprite(455,200, 'hit')
        hit.scale.setTo(0.45, 0.45);
        
        var textHit = game.add.text(485, 150, "Hit 'em all!");
        textHit.font = 'Comfortaa';
        textHit.fontSize = 30;
        textHit.fill = '#ffffff';
        
        var arrows = game.add.sprite(75, 420, 'arrows');
        arrows.scale.setTo(0.8, 0.8);
        
        var textArrows = game.add.text(35, 370, "Move it with arrows");
        textArrows.font = 'Comfortaa';
        textArrows.fontSize = 30;
        textArrows.fill = '#ffffff';
        
        var end = game.add.sprite(455,420, 'end')
        end.scale.setTo(0.45, 0.45);
        
        var textSwim = game.add.text(485, 370, "Don't swim!");
        textSwim.font = 'Comfortaa';
        textSwim.fontSize = 30;
        textSwim.fill = '#ffffff';
        
    },
    update: function(){
        
    }
};