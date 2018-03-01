var game= new Phaser.Game(800,600,Phaser.AUTO,'ejemploPhaser',{preload: preload, create: create, update: update});

function preload(){
    game.stage.backgroundColor = '#007236';
    game.load.image('terrenoCesped', 'assets/mapa/terrenoCesped.png');
    game.load.image('jugador', 'assets/player/spriteJugador.png');
}

var land;
var cursors;

function create(){
    //Tamano del mundo
    game.world.setBounds(0, 0, 3000, 3000);
   
    //Llenar el fondo
    for (var i = 0; i < 30; i++)
    {
        for (var y = 0; y < 30; y++)
        game.add.sprite(i*100, y*100, 'terrenoCesped');
    }
    
    //Crear jugador
    player = game.add.sprite(325, 225, 'jugador');
    
    //Variable que pilla el teclado.
    cursors = game.input.keyboard.createCursorKeys();
}

function update() {

    //Movimiento de la camara.
    if (cursors.up.isDown)
    {
        game.camera.y -= 4;
    }
    else if (cursors.down.isDown)
    {
        game.camera.y += 4;
    }

    if (cursors.left.isDown)
    {
        game.camera.x -= 4;
    }
    else if (cursors.right.isDown)
    {
        game.camera.x += 4;
    }

}

