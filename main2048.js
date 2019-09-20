
var boardNumber=new Array();
var score=0;
var hasMerged=new Array();


$(document).ready(function(){
    prepareTouchScan();
    newGame();
})

function prepareTouchScan(){
    if(screenWidth>500){
        containorWidth='500';
        cellWidth='100';
        cellSpace='20';
    }

    $('.containor').css({
        width:containorWidth,
        height:containorWidth,
        padding:cellSpace,
        'border-radius':0.15*containorWidth,
    });

    // var num=$('.number');
    // $('.number').css({
    //     width:cellWidth,
    //     height:cellWidth,
    //     "border-radius":0.15*cellWidth,
    // });
   

    $('.box').css({
        width:cellWidth,
        height:cellWidth,
        'border-radius':0.15*cellWidth,
    });
}

function newGame(){
    init();
    //随机生成两个数字
    setOneRandomNumber();
    setOneRandomNumber();
}

function init(){
    for(var i=0;i<4;i++){
        boardNumber[i]=new Array();
        hasMerged[i]=new Array();
        for(var j=0;j<4;j++){
            $('#gril-'+i+'-'+j).css({
                top:getToplength(i,j),
                left:getLeftlength(i,j)
            })
            boardNumber[i][j]=0;
            hasMerged[i][j]=false;
        }
    }
    showBoardnumberView()
    score=0;
}

function showBoardnumberView(){
    $('.number').remove();
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            $('.containor').append('<div class="number" id="number-'+i+'-'+j+'"></div>');
            var board=$('#number-'+i+'-'+j);
            if(boardNumber[i][j]==0){
                board.css({
                    width:0,
                    height:0,
                    top:getToplength(i,j)+cellWidth/2,
                    left:getLeftlength(i,j)+cellWidth/2
                })
            }else{                
                board.css({
                    width:cellWidth,
                    height:cellWidth,
                    'border-radius':0.15*cellWidth,
                    top:getToplength(i,j),
                    left:getLeftlength(i,j),
                    'background-color':getBackgroundColor(boardNumber[i][j]),
                    color:getNumberColor(boardNumber[i][j])                    
                })
                board.text(boardNumber[i][j])           
            }
            hasMerged[i][j]=false;
        }
    }
    $('.number').css("font-size",0.6*cellWidth+"px");
    $('.number').css("line-height",0.8*cellWidth+"px");    

}

function setOneRandomNumber(){
    if(nospace(boardNumber)){
        return false;
    }
           
    var randx=parseInt(Math.floor(Math.random()*4));
    var randy=parseInt(Math.floor(Math.random()*4));

    var times=0;
    while(times<50){
        if(boardNumber[randx][randy]==0){
            break;
        }
        
        randx=parseInt(Math.floor(Math.random()*4));
        randy=parseInt(Math.floor(Math.random()*4));
        times++;
    }

    if(times==50){
        for(var i=0;i<4;i++){
            for(var j=0;j<4;j++){
                if(boardNumber[i][j]==0){
                    randx=i;
                    randy=j;
                    break;
                    // break;
                }
            }
        }
    }

    boardNumber[randx][randy]=Math.random()<0.5?2:4;
    showNumberAnimate(randx,randy,boardNumber[randx][randy])
    console.log(boardNumber);
    return true;
}

document.addEventListener('touchstart',function(event){
    startX=event.targetTouches[0].pageX;
    startY=event.targetTouches[0].pageY;
})

document.addEventListener('touchend',function(event){   
    endX=event.changedTouches[0].pageX;
    endY=event.changedTouches[0].pageY;

    var dirX=endX-startX;
    var dirY=endY-startY;

    if(Math.abs(dirX)<0.1*containorWidth&&Math.abs(dirY)<0.1*containorWidth){
        return;
    }

    if(Math.abs(dirX)>=Math.abs(dirY)){
        //左右
        if(dirX>=0){
            //右
            if(moveRight()){
                setTimeout(setOneRandomNumber,230)
                setTimeout(isGameover,500)
            }
        }else{
            //左
            if(moveLeft()){
                setTimeout(setOneRandomNumber,230)
                setTimeout(isGameover,300)
            }
        }
    }else{
        //上下
        if(dirY>=0){
            //下
            if(moveBottom()){
                setTimeout(setOneRandomNumber,230)
                setTimeout(isGameover,500)
            }   
        }else{
            //上
            if(moveTop()){
                setTimeout(setOneRandomNumber,230)
                setTimeout(isGameover,300)
            }
        }       
    }
})



$(document).keydown(function(event){
    switch(event.keyCode){
        case 37:
            if(moveLeft()){
                setTimeout(setOneRandomNumber,230)
                setTimeout(isGameover,300)
            }
            break;
        case 38:
            if(moveTop()){
                setTimeout(setOneRandomNumber,230)
                setTimeout(isGameover,300)
            }
            break;
        case 39:
            if(moveRight()){
                setTimeout(setOneRandomNumber,230)
                setTimeout(isGameover,500)
            }
            break;
        case 40:
            if(moveBottom()){
                setTimeout(setOneRandomNumber,230)
                setTimeout(isGameover,500)
            }   
            break;
        default:
            break;
    }
    setTimeout('updateScoreanimate(score)',350);
});

function moveLeft(){
    if(!canMoveleft(boardNumber))
        return false;
    //move left
    for(var i=0;i<4;i++){
        for(var j=1;j<4;j++){
            if(boardNumber[i][j]!=0){
                for(var k=0;k<j;k++){
                    if(boardNumber[i][k]==0&&noStopshorizontal(i,k,j,boardNumber)){
                        moveanimate(i,j,i,k);
                        boardNumber[i][k]=boardNumber[i][j];
                        boardNumber[i][j]=0;
                        continue;
                    }else if(boardNumber[i][k]==boardNumber[i][j]&&noStopshorizontal(i,k,j,boardNumber)&&hasMerged[i][k]==false){
                        moveanimate(i,j,i,k);
                        boardNumber[i][k]+=boardNumber[i][j];
                        boardNumber[i][j]=0;
                        score+=boardNumber[i][k];
                        hasMerged[i][k]=true;
                        continue;
                    }
                }
            }
            
        }
    }
    setTimeout(showBoardnumberView,210);
    return true;
}

function moveTop(){
    if(!canMovetop(boardNumber))
        return false;
    //move top
    for(var i=1;i<4;i++){
        for(var j=0;j<4;j++){
            if(boardNumber[i][j]!=0){
                for(var k=0;k<i;k++){
                    if(boardNumber[k][j]==0&&noStopsvertical(j,k,i,boardNumber)){
                        moveanimate(i,j,k,j);
                        boardNumber[k][j]=boardNumber[i][j];
                        boardNumber[i][j]=0;
                        continue;
                    }else if(boardNumber[k][j]==boardNumber[i][j]&&noStopsvertical(j,k,i,boardNumber)&&hasMerged[k][j]==false){
                        moveanimate(i,j,k,j);
                        boardNumber[k][j]+=boardNumber[i][j];
                        boardNumber[i][j]=0;
                        score+=boardNumber[k][j];
                        hasMerged[k][j]=true;
                        continue;
                    }
                }
            }
            
        }
    }
    setTimeout(showBoardnumberView,200);
    return true;
}

function moveRight(){
    if(!canMoveright(boardNumber))
        return false;
    //move right
    for(var i=0;i<4;i++){
        for(var j=2;j>=0;j--){
            if(boardNumber[i][j]!=0){
                for(var k=3;k>j;k--){
                    if(boardNumber[i][k]==0&&noStopshorizontal(i,j,k,boardNumber)){
                        moveanimate(i,j,i,k);
                        boardNumber[i][k]=boardNumber[i][j];
                        boardNumber[i][j]=0;
                        continue;
                    }else if(boardNumber[i][k]==boardNumber[i][j]&&noStopshorizontal(i,j,k,boardNumber)&&hasMerged[i][k]==false){
                        moveanimate(i,j,i,k);
                        boardNumber[i][k]+=boardNumber[i][j];
                        boardNumber[i][j]=0;
                        score+=boardNumber[i][k];
                        hasMerged[i][k]=true;
                        continue;
                    }
                }
            }
            
        }
    }
    setTimeout(showBoardnumberView,200);
    return true;
}

function moveBottom(){
    if(!canMovebottom(boardNumber))
        return false;
    //move bottom
    for(var i=2;i>=0;i--){
        for(var j=0;j<4;j++){
            if(boardNumber[i][j]!=0){
                for(var k=3;k>i;k--){
                    if(boardNumber[k][j]==0&&noStopsvertical(j,i,k,boardNumber)){
                        moveanimate(i,j,i,k);
                        boardNumber[k][j]=boardNumber[i][j];
                        boardNumber[i][j]=0;
                        continue;
                    }else if(boardNumber[k][j]==boardNumber[i][j]&&noStopsvertical(j,i,k,boardNumber)&&hasMerged[k][j]==false){
                        moveanimate(i,j,i,k);
                        boardNumber[k][j]+=boardNumber[i][j];
                        boardNumber[i][j]=0;
                        score+=boardNumber[k][j];
                        hasMerged[k][j]=true;
                        continue;
                    }
                }
            }
            
        }
    }
    setTimeout(showBoardnumberView,200);
    return true;
}

function isGameover(){
    if(nospace(boardNumber)||noMove(boardNumber)){
        alert('Game Over!     score:'+score);
    }
}