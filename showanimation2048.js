function showNumberAnimate(i,j,num){
    var number=$('#number-'+i+'-'+j);
    number.css('background-color',getBackgroundColor(num));
    number.css('color',getNumberColor(num));
    number.text(num);
    number.animate({
        width:cellWidth,
        height:cellWidth,
        'border-radius':0.15*cellWidth,
        top:getToplength(i,j),
        left:getLeftlength(i,j),
        opacity: 0.7,
    },30);
}

function moveanimate(i,j,i,k){
    $('number-'+i+'-'+j).animate({
        top:getToplength(i,k),
        left:getLeftlength(i,k)
    },200)
}

function updateScoreanimate(score){
    $('.score>span').text(score);
}