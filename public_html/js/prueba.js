var land;
var cursors;
var player;
var velocidad;

var pantallaJuego ={
    preload: function(){
        //Imagenes y sprites del jugador
        game.load.image('jugador', 'assets/player/player1.png');
        game.load.image('jugadorTrail', 'assets/player/player1Trail.png');

        //Imagenes y sprites del suelo
        game.load.spritesheet('agua', 'assets/mapa/aguaSpriteSheet.png', 100, 100);
        game.load.image('terrenoCesped', 'assets/mapa/suelo/terrenoCesped.png');
        game.load.image('terrenoCespedTop', 'assets/mapa/suelo/terrenoCespedTop.png');
        game.load.image('terrenoCespedTopRight', 'assets/mapa/suelo/terrenoCespedTopRight.png');
        game.load.image('terrenoCespedTopLeft', 'assets/mapa/suelo/terrenoCespedTopLeft.png');
        game.load.image('terrenoCespedBot', 'assets/mapa/suelo/terrenoCespedBot.png');
        game.load.image('terrenoCespedBotRight', 'assets/mapa/suelo/terrenoCespedBotRight.png');
        game.load.image('terrenoCespedBotLeft', 'assets/mapa/suelo/terrenoCespedBotLeft.png');
        game.load.image('terrenoCespedRight', 'assets/mapa/suelo/terrenoCespedRight.png');
        game.load.image('terrenoCespedLeft', 'assets/mapa/suelo/terrenoCespedLeft.png');
        game.load.image('wallHorizontal', 'assets/mapa/muro/muroHorizontal.png');
        game.load.image('wallVertical', 'assets/mapa/muro/muroVertical.png');
        game.load.image('velocidad', 'assets/mapa/velocidad.png');        
    },
    create: function(){
        //Inicializacion variables globales del juego.
        velocidad = 500;

        //Tamano del mundo.
        game.world.setBounds(0, 0, 3000, 3000);
        game.physics.p2.setImpactEvents(true);
        game.physics.p2.restitution = 1.0;

        //Agregamos sus fisicas
        game.physics.startSystem(Phaser.Physics.P2JS);
        
        //Collision groups
        var grupoPlayers = game.physics.p2.createCollisionGroup();
        var grupoVelocidades = game.physics.p2.createCollisionGroup();
        var grupoMuros = game.physics.p2.createCollisionGroup();
        
        //Crear tablero.
        var tablero = new Tablero();
        var matriz = tablero.getTablero();

        //Mapear el terreno.
        for (var i = 0; i < matriz.length; i++) {
            for (var j = 0; j < matriz[i].length; j++) {
                switch(matriz[i][j]){
                    case 'water': 
                        var sea = game.add.sprite(i*100, j*100, 'agua');
                        sea.animations.add('moveSea');
                        //Parametros (nombre animacion, velocidad, se repite).
                        sea.animations.play('moveSea', 8, true);
                        break;
                    case 'terrain':
                        game.add.sprite(i*100, j*100, 'terrenoCesped');
                        break;
                    case 'terrainTopLeft':
                        game.add.sprite(i*100, j*100, 'terrenoCespedTopLeft');
                        break;
                    case 'terrainBotLeft':
                        game.add.sprite(i*100, j*100, 'terrenoCespedBotLeft');
                        break;
                    case 'terrainTopRight':
                        game.add.sprite(i*100, j*100, 'terrenoCespedTopRight');
                        break;
                    case 'terrainBotRight':
                        game.add.sprite(i*100, j*100, 'terrenoCespedBotRight');
                        break;
                    case 'terrainLeft':
                        game.add.sprite(i*100, j*100, 'terrenoCespedLeft');
                        break;
                    case 'terrainRight':
                        game.add.sprite(i*100, j*100, 'terrenoCespedRight');
                        break;
                    case 'terrainTop':
                        game.add.sprite(i*100, j*100, 'terrenoCespedTop');
                        break;
                    case 'terrainBot':
                        game.add.sprite(i*100, j*100, 'terrenoCespedBot');
                        break;
                    case 'wallHorizontal':
                        game.add.sprite(i*100, j*100, 'terrenoCesped');
                        var wall = game.add.sprite(i*100+50, j*100+25, 'wallHorizontal');
                        game.physics.p2.enable(wall);
                        wall.body.static = 2;
                        wall.body.setCollisionGroup(grupoMuros);
                        wall.body.collides(grupoPlayers);
                        break;
                    case 'wallVertical':
                        game.add.sprite(i*100, j*100, 'terrenoCesped');
                        var wall = game.add.sprite(i*100+25, j*100+50, 'wallVertical');
                        game.physics.p2.enable(wall);
                        wall.body.static = 2;
                        wall.body.setCollisionGroup(grupoMuros);
                        wall.body.collides(grupoPlayers);
                        break;
                    case 'speedItem':
                        game.add.sprite(i*100, j*100, 'terrenoCesped');
                        var objetoVelocidad = game.add.sprite(i*100+50, j*100+50, 'velocidad');
                        game.physics.p2.enable(objetoVelocidad);
                        objetoVelocidad.body.setCollisionGroup(grupoVelocidades);
                        objetoVelocidad.body.collides(grupoPlayers);
                        break;
                }
            }
        }
        
        //Crear jugador.
        player = game.add.sprite(375, 275, 'jugador');
        game.physics.p2.enable(player);
        player.body.setCircle(25);
        player.body.setCollisionGroup(grupoPlayers);
        player.body.collides(grupoVelocidades, cogerVelocidad, this);
        player.body.collides(grupoMuros);

        //Variable que pilla el teclado.
        cursors = game.input.keyboard.createCursorKeys();
        
    },
    update: function(){
        
        if (cursors.left.isDown)
        {
            player.body.force.x += -velocidad;
        }
        else if (cursors.right.isDown)
        {
            player.body.force.x += velocidad;
        }

        if (cursors.up.isDown)
        {
            player.body.force.y += -velocidad;
        }
        else if (cursors.down.isDown)
        {
            player.body.force.y += velocidad;
        }

        //La camara sigue al jugador.
        game.camera.follow(player);
        //Rastro del jugador
        var rastro = game.add.sprite(player.x-25, player.y-25, 'jugadorTrail');
        game.add.tween(rastro).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
        game.add.tween(rastro.scale).to( { x: -0.01, y: -0.01 }, 2000, Phaser.Easing.Linear.None, true);
        game.world.bringToTop(player);
    }
    
};

function cogerVelocidad(body1, body2){
    body2.sprite.destroy();
    velocidad += 100;
    
    
}
