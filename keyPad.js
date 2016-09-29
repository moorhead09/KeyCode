// JavaScript code to handle the password
var pwCount = 0;
var passWord = [];
var aleksPW = [0, 1, 2, 3];
var mattPW = [1, 1, 2, 3];

function getFigures(){
    var figs;
    figs = document.getElementById("pw_carousel").getElementsByTagName('img');
    return figs;
}

function getPW(numIndex){
    var num;
    num = document.getElementById("pw_num").getElementsByTagName('img');
    for(var i = 0; i < num.length; i++){
        if(num[i].className == 'zero'){
            passWord = passWord.concat(i);
            alert(i);
        }else if(num[i].className == 'one'){
            passWord = passWord.concat(i);
            alert(i);
        }
    }
    return num;
}

function setPWImage(count){
    switch(count) {
        case 0:
        document.getElementById("dots").style.backgroundPositionY = "-644px";
        break;

        case 1:
        document.getElementById("dots").style.backgroundPositionY = "0px";
        break;

        case 2:
        document.getElementById("dots").style.backgroundPositionY = "-161px";
        break;

        case 3:
        document.getElementById("dots").style.backgroundPositionY = "-321px";
        break;

        case 4:
        document.getElementById("dots").style.backgroundPositionY = "-483px";
        break;
    }
}

function handleClick(index){
    //var nums = getPW(index);
    if(pwCount < 4){
        pwCount ++;
        passWord = passWord.concat(index);
    }else{
        pwCount = 0;
        passWord = [];
    }
    setPWImage(pwCount);
}

function resetPW(){
    pwCount = 0;
    setPWImage(pwCount);
    passWord = [];
}

function checkPW(){
    var aCount = 0;
    var mCount = 0;
    if(passWord.length == 4){
        for(var i = 0; i < passWord.length; i++){
            if(passWord[i] == aleksPW[i]){
                aCount++;
            }
            if(passWord[i] == mattPW[i]){
                mCount++;
            }
        }
        if(aCount == 4 || mCount == 4){
            alert("Success");
        }
        else{
            alert("Password Incorrect!");
        }
    }else{
        alert("Password must contain 4 numbers!")
    }
    pwCount = 0;
    passWord = [];
    setPWImage(pwCount);
}

setPWImage(pwCount);