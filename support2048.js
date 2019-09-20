screenWidth=0.95*window.screen.availWidth;
containorWidth=0.92*screenWidth;
cellWidth=0.18*screenWidth;
cellSpace=0.04*screenWidth;

function getToplength(i,j){
    return 2*cellSpace+i*(parseInt(cellSpace)+parseInt(cellWidth));
}
function getLeftlength(i,j){
    return 2*cellSpace+j*(parseInt(cellSpace)+parseInt(cellWidth));
}
function getBackgroundColor(num){
    switch(num){
        case 1: return 'rgb(182, 96, 35)';break;
        case 2: return 'rgb(182, 96, 35)';break;
        case 3: return 'rgb(182, 96, 35)';break;
        case 4: return 'rgb(182, 96, 35)';break;
        case 5: return 'rgb(182, 96, 35)';break;
        case 6: return 'rgb(182, 96, 35)';break;
        case 7: return 'rgb(182, 96, 35)';break;
        case 8: return 'rgb(182, 96, 35)';break;
        case 9: return 'rgb(182, 96, 35)';break;      
    }
    return 'black';
}
function getNumberColor(num){
    if(num==2||num==4){
        return 'rgb(252, 249, 247)';
    }
    return 'orange';
}

function nospace(board){
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            if(board[i][j]==0){
                return false;
            }
        }
    }
    return true;
}

function canMoveleft(board){
    for(var i=0;i<4;i++){
        for(var j=1;j<4;j++){
            if(board[i][j]!=0){
                if(board[i][j-1]==0||board[i][j-1]==board[i][j]){
                    return true;
                }
            }           
        }
    }
    return false;
}

function canMovetop(board){
    for(var j=0;j<4;j++){
        for(var i=1;i<4;i++){
            if(board[i][j]!=0){
                if(board[i-1][j]==0||board[i-1][j]==board[i][j]){
                    return true;
                }
            }           
        }
    }
    return false;
}
function canMoveright(board){
    for(var i=0;i<4;i++){
        for(var j=0;j<3;j++){
            if(board[i][j]!=0){
                if(board[i][j+1]==0||board[i][j+1]==board[i][j]){
                    return true;
                }
            }           
        }
    }
    return false;
}
function canMovebottom(board){
    for(var i=0;i<3;i++){
        for(var j=0;j<4;j++){
            if(board[i][j]!=0){
                if(board[i+1][j]==0||board[i+1][j]==board[i][j]){
                    return true;
                }
            }           
        }
    }
    return false;
}

function noMove(board){
    if(canMoveleft(board)||canMovetop(board)||canMoveright(board)||canMovebottom(board)){
        return false;
    }
    return true;

}

function noStopshorizontal(i,k,j,board){
    for(var v=k+1;v<j;v++){
        if( board[i][v]!=0){
            return false;
        }
    }
    return true;
}

function noStopsvertical(j,k,i,board){
    for(var v=k+1;v<i;v++){
        if( board[v][j]!=0){
            return false;
        }
    }
    return true;
}