class Tablero{ 
    
    constructor(){
        this.arrayTablero = new Array(30);
        for(var i = 0; i<30; i++){
            this.arrayTablero[i] = new Array(30);
        }
        
        for(var i = 0; i<30; i++){
            for(var j = 0; j<30; j++){
                if(i<2 || j<2 || i>27 || j>27){
                    this.arrayTablero[i][j] = 'water';
                }else if(i == 2 && j == 2){
                    this.arrayTablero[i][j] = 'terrainTopLeft';
                }else if(i == 2 && j == 27){
                    this.arrayTablero[i][j] = 'terrainBotLeft';
                }else if(i == 27 && j == 2){
                    this.arrayTablero[i][j] = 'terrainTopRight';
                }else if(i == 27 && j == 27){
                    this.arrayTablero[i][j] = 'terrainTopLeft';
                }
                else if(i<3){
                    this.arrayTablero[i][j] = 'terrainLeft';
                }else if(i>26){
                    this.arrayTablero[i][j] = 'terrainRight';
                }else if(j<3){
                    this.arrayTablero[i][j] = 'terrainTop';
                }else if(j>26){
                    this.arrayTablero[i][j] = 'terrainTopBot';
                }else{
                    this.arrayTablero[i][j] = 'terrain';
                }
            }
        }
    }
    
    getTablero(){
        return this.arrayTablero;
    }
}


