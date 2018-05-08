var land;
var cursors;
var player;
var velocidad;
var grupoPlayers;
var grupoVelocidades;
var grupoMuros;
var velX;
var velY;
var alive = true;

var training ={
    preload: function(){
        //Imagenes y sprites del jugador
        game.load.image('jugador', 'assets/player/playerBlue.png');

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
        velocidad = 4;
        velX = 0;
        velY = 0;

        //Tamano del mundo.
        game.world.setBounds(0, 0, 3000, 3000);
        

        //Agregamos sus fisicas
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        //Collision groups
        grupoPlayers = game.add.physicsGroup();
        grupoPlayers.enableBody = true;
        grupoPlayers.physicsBodyType = Phaser.Physics.ARCADE;
        grupoVelocidades = game.add.physicsGroup();
        grupoVelocidades.enableBody = true;
        grupoVelocidades.physicsBodyType = Phaser.Physics.ARCADE;    
        grupoMuros = game.add.physicsGroup();
        grupoMuros.enableBody = true;
        grupoMuros.physicsBodyType = Phaser.Physics.ARCADE;
        grupoSea = game.add.physicsGroup();
        grupoSea.enableBody = true;
        grupoSea.physicsBodyType = Phaser.Physics.ARCADE;
        
        //Crear tablero.
        var tablero = new Tablero();
        var matriz = tablero.getTablero();

        //Mapear el terreno.
        for (var i = 0; i < matriz.length; i++) {
            for (var j = 0; j < matriz[i].length; j++) {
                switch(matriz[i][j]){
                    case 'water': 
                        var sea = grupoSea.create(i*100, j*100, 'agua');
                        sea.animations.add('moveSea');
                        //Parametros (nombre animacion, velocidad, se repite).
                        sea.animations.play('moveSea', 8, true);
                        sea.body.immovable = true;
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
                        var wall = grupoMuros.create(i*100, j*100, 'wallHorizontal');
                        wall.body.immovable = true;

                        break;
                    case 'wallVertical':
                        game.add.sprite(i*100, j*100, 'terrenoCesped');
                        var wall = grupoMuros.create(i*100, j*100, 'wallVertical');
                        wall.body.immovable = true;

                        break;
                    case 'speedItem':
                        game.add.sprite(i*100, j*100, 'terrenoCesped');
                        grupoVelocidades.create(i*100+35, j*100+35, 'velocidad');
                        break;
                }
            }
        }
        
        //Crear jugador.
        player = grupoPlayers.create(375, 275, 'jugador');
        player.body.bounce.setTo(1, 1);
        //Variable que pilla el teclado.
        cursors = game.input.keyboard.createCursorKeys();
        
        game.world.bringToTop(grupoPlayers);
        game.world.bringToTop(grupoVelocidades);
        game.world.bringToTop(grupoMuros);
    },
    update: function(){
        
        game.physics.arcade.overlap(grupoPlayers, grupoVelocidades, cogerVelocidad, null, this);
        game.physics.arcade.overlap(grupoPlayers, grupoSea, swim, null, this);
        game.physics.arcade.collide(grupoPlayers, grupoMuros, choqueMuro);
        
        if(alive){
            if (cursors.left.isDown)
            {
                velX = velX-velocidad;
            }
            else if (cursors.right.isDown)
            {
                velX = velX+velocidad;
            }

            if (cursors.up.isDown)
            {
                velY = velY-velocidad;
            }
            else if (cursors.down.isDown)
            {
                velY = velY+velocidad;
            }
        }

        //Movimiento del jugador
        player.body.velocity.x = velX;
        player.body.velocity.y = velY;

        //La camara sigue al jugador.
        if(alive){
            game.camera.follow(player);
        }else{
            game.camera.follow(null);
        }
        
    }
    
};

function cogerVelocidad(body1, body2){
    body2.destroy();
    velocidad += 3;
}

function choqueMuro(body1, body2){
    if(body2.body.touching.up == true || body2.body.touching.down == true) velY = -velY;
    if(body2.body.touching.right == true || body2.body.touching.left == true) velX = -velX;
}

function swim(body1, body2){
    var distanciaX = Math.abs((body1.x+25) - (body2.x+50));
    var distanciaY = Math.abs((body1.y+25) - (body2.y+50));
    
    if(distanciaX<38 && distanciaY<38){
        if(alive){
            setTimeout(function(){ 
                alive = true;
                game.state.start("menuPrincipal"); 
            }, 1000);
        }
        alive=false;
        game.add.tween(body1).to( { alpha: 0 }, 200, Phaser.Easing.Linear.None, true, 0, 200, false);
        
    }
}


