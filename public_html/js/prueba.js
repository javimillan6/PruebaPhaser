var game= new Phaser.Game(800,600,Phaser.AUTO,'ejemploPhaser',{preload: preload, create: create, update: update});

var land;
var cursors;
var velocidadX;
var velocidadY;
var aX;
var aY;
var player;
var velocidad;

function preload(){
    
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
    game.load.image('wall', 'assets/mapa/wall.png');
    game.load.image('velocidad', 'assets/mapa/velocidad.png');
}



function create(){
    
    //Inicializacion variables globales del juego.
    velocidadX = 0;
    velocidadY = 0;
    velocidad = 5;
    aX = 0;
    aY = 0;
    
    //Tamano del mundo.
    game.world.setBounds(0, 0, 3000, 3000);
    
    //Agregamos sus fisicas
    game.physics.startSystem(Phaser.Physics.ARCADE);
   
    //Crear tablero.
    var tablero = new Tablero();
    var matriz = tablero.getTablero();
    
    matriz[4][4] = 'wall';
    matriz[4][5] = 'wall';
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
                case 'wall':
                    var wall = game.add.sprite(i*100, j*100, 'wall');
                    game.physics.arcade.enable(wall, Phaser.Physics.ARCADE);
                    wall.body.immovable = true;
                    break;
            }
        }
    }
    
    //Crear jugador
    player = game.add.sprite(375, 275, 'jugador');
    game.physics.arcade.enable(player, Phaser.Physics.ARCADE);
    player.body.collideWorldBounds = true;
    
    //creamos objeto
    objetoVelocidad= game.add.sprite(400, 400, 'velocidad');
    game.physics.enable(objetoVelocidad, Phaser.Physics.ARCADE);
    objetoVelocidad.body.immovable=true;
    
    //Variable que pilla el teclado.
    cursors = game.input.keyboard.createCursorKeys();
}

function update() {
    
    // object1, object2, collideCallback, processCallback, callbackContext
    game.physics.arcade.collide(objetoVelocidad, player, cogeVelocidad, null, this);
    
    //Movimiento del jugador.
    if (cursors.up.isDown)
    {
        aY -= velocidad;
    }
    else if (cursors.down.isDown)
    {
        aY += velocidad;
    }

    if (cursors.left.isDown)
    {
        aX -= velocidad;
    }
    else if (cursors.right.isDown)
    {
        aX += velocidad;
    }
    
    //Formula de la aceleracion.
    velocidadX = velocidadX + aX;
    velocidadY = velocidadY + aY;
    aX = 0;
    aY = 0;
    //Movimiento del jugador.
    player.body.velocity.setTo(velocidadX, velocidadY);
    //La camara sigue al jugador.
    game.camera.follow(player);
    //Rastro del jugador
    var rastro = game.add.sprite(player.x, player.y, 'jugadorTrail');
    game.add.tween(rastro).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
    game.add.tween(rastro.scale).to( { x: -0.01, y: -0.01 }, 2000, Phaser.Easing.Linear.None, true);
    game.world.bringToTop(player);

}

function cogeVelocidad(sprite1, sprite2){
    sprite1.destroy();
    velocidad+=20;
}
