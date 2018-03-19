var fondo;
var menuPrincipal ={
    preload: function(){
        game.load.image('fondoMenu', 'assets/menu/fondo.png');
        
    },
    create: function(){
       fondo=game.add.sprite(-5,-6, 'fondoMenu');
       fondo.scale.setTo(1.03, 1.03);
        
    },
    update: function(){
        
    }
};