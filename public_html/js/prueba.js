var game= new Phaser.Game(800,600,Phaser.AUTO,'ejemploPhaser',{preload: preload, create: create, update: update});

function preload(){
    
    //Imagenes y sprites del jugador
    game.load.image('jugador', 'assets/player/player1.png');
    game.load.image('jugadorTrail', 'assets/player/player1trail.png');
    
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
}

var land;
var cursors;
var velocidadX;
var velocidadY;
var aX;
var aY;
var player;

function create(){
    //Inicializacion variables globales del juego.
    velocidadX = 0;
    velocidadY = 0;
    aX = 0;
    aY = 0;
    
    //Tamano del mundo
    game.world.setBounds(0, 0, 3000, 3000);
   
    //Llenar el fondo
    for (var i = 0; i < 30; i++)
    {
        for (var j = 0; j < 30; j++){
            if(i<2 || j<2 || i>27 || j>27){
                var sea = game.add.sprite(i*100, j*100, 'agua');
                sea.animations.add('moveSea');
                //Parametros (nombre animacion, velocidad, se repite).
                sea.animations.play('moveSea', 8, true);
            }else if(i == 2 && j == 2){
                game.add.sprite(i*100, j*100, 'terrenoCespedTopLeft');
            }else if(i == 2 && j == 27){
                game.add.sprite(i*100, j*100, 'terrenoCespedBotLeft');
            }else if(i == 27 && j == 2){
                game.add.sprite(i*100, j*100, 'terrenoCespedTopRight');
            }else if(i == 27 && j == 27){
                game.add.sprite(i*100, j*100, 'terrenoCespedBotRight');
            }
            else if(i<3){
                game.add.sprite(i*100, j*100, 'terrenoCespedLeft');
            }else if(i>26){
                game.add.sprite(i*100, j*100, 'terrenoCespedRight');
            }else if(j<3){
                game.add.sprite(i*100, j*100, 'terrenoCespedTop');
            }else if(j>26){
                game.add.sprite(i*100, j*100, 'terrenoCespedBot');
            }else{
                game.add.sprite(i*100, j*100, 'terrenoCesped');
            }        
        }
    }
    
    //Crear jugador
    player = game.add.sprite(375, 275, 'jugador');
    //Agregamos sus fisicas
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.body.collideWorldBounds = true;
    
    //Variable que pilla el teclado.
    cursors = game.input.keyboard.createCursorKeys();
}

function update() {
    
    //Movimiento del jugador.
    if (cursors.up.isDown)
    {
        aY -= 10;
    }
    else if (cursors.down.isDown)
    {
        aY += 10;
    }

    if (cursors.left.isDown)
    {
        aX -= 10;
    }
    else if (cursors.right.isDown)
    {
        aX += 10;
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

