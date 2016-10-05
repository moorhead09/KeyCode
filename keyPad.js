// JavaScript code to handle the password
var pwCount = 0;
var passWord = [];
var aleksPW = [0, 0, 0, 0];
var mattPW = [1, 1, 1, 1];
var settingsWindow;


function getFigures(){
    var figs;
    figs = document.getElementById("pw_carousel").getElementsByTagName('img');
    return figs;
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
        document.getElementById("dots").style.backgroundPositionY = "-322px";
        break;

        case 4:
        document.getElementById("dots").style.backgroundPositionY = "-483px";
        break;
    }
}

function handleClick(index){
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

function checkPW(pw){
    var aCount = 0;
    var mCount = 0;
    var value = 0;
    if(pw.length == 4){
        for(var i = 0; i < pw.length; i++){
            if(pw[i] == aleksPW[i]){
                aCount++;
            }
            if(pw[i] == mattPW[i]){
                mCount++;
            }
        }
        if(aCount == 4){
            /*alert("Welcome Home Aleks");*/
            value = 1;
        }
        else if(mCount == 4){
            /*alert("Welcome Home Matt");*/
            value = 2;
        }
        else{
            /* pw incorrect */
            value = 0;
        }
    }else{
        /* pw too short */
        value = 3;
    }

    return value;
}

function loadPW(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            var xmlDoc = xmlhttp.responseXML;
            var txt = "";
            var x = xmlDoc.getElementsByTagName("p").getElementById("alekspw");
            for(var i = 0; i < x.length; i++){
                txt += x[i].childNodes[0].nodeValue + "<br>";
            }
            console.log("Returned: " + txt);
            /*
            var response = this.responseText;
            console.log("Returned: " + response);*/
        }
    };
    xhttp.open("GET", "stuff.txt", true);
    xhttp.send();
}

function submitPW(){
    var checkVal = checkPW(passWord);
    switch(checkVal) {
        case 0:
        /* pw incorrect */
        alert("Password Incorrect!");
        break;

        case 1:
        /* aleks in */
        $('[data-remodal-id=welcomeAleks]').remodal().open();
        break;

        case 2:
        /* matt in */
        $('[data-remodal-id=welcomeMatt]').remodal().open();
        break;

        case 3:
        /* pw too short */
        alert("Password must contain 4 numbers!");
        break;
    }
    loadPW();

    pwCount = 0;
    passWord = [];
    setPWImage(pwCount);
}

function checkNewPin(nPin, cPin){
    var pinCheck = 0;
    for(var i = 0; i < 4; i++){
        if(nPin[i] == cPin[i]){
            pinCheck++;
        }
    }
    if(pinCheck == 4){
        return true;
    }
    else{
        return false;
    }
}

$(document).on('confirmation', '.remodal', function () {
    console.log('Confirmation button is clicked');
    /*alert('Confirmation button is clicked');*/
    var user = document.forms[0].elements["firstName"].value;
    console.log('User: ' + user);
    /*var newPin = document.getElementsByName("newPin").value;*/
    var newPin = document.forms[0].elements["newPin"].value;
    newPin = newPin.toString(10).split("").map(Number);
    console.log('New Pin: ' + newPin);
    var conf_newPin = document.forms[0].elements["conf_newPin"].value;
    conf_newPin = conf_newPin.toString(10).split("").map(Number);
    console.log('Conf Pin: ' + conf_newPin);
    var pin = document.forms[0].elements["pin"].value;
    pin = pin.toString(10).split("").map(Number);

    var checkVal = checkPW(pin);
    var match = checkNewPin(newPin, conf_newPin);
    console.log('Match: ' + match);
    switch(checkVal) {
        case 0:
        /* pw incorrect */
        alert("Password Incorrect!");
        break;

        case 1:
        /* aleks in */
        if(user == 'aleks' && match){
            $('[data-remodal-id=pwResetSuccessful]').remodal().open();
            aleksPW = newPin;
        }else if(user == 'matt'){
            $('[data-remodal-id=pwResetFailed]').remodal().open();
        }else{
            $('[data-remodal-id=pwDontMatch]').remodal().open();
        }
        break;

        case 2:
        /* matt in */
        if(user == 'matt' && match){
            $('[data-remodal-id=pwResetSuccessful]').remodal().open();
            mattPW = newPin;
        }else if(user == 'aleks'){
            $('[data-remodal-id=pwResetFailed]').remodal().open();
        }else{
            $('[data-remodal-id=pwDontMatch]').remodal().open();
        }
        break;

        case 3:
        /* pw too short */
        alert("Password must contain 4 numbers!");
        break;
    }

    settings = {
        closeOnConfirm: false,
        closeOnEscape: false,
        closeOnOutsideClick: false
    };
  
});

function openSettings(){
    settingsWindow = window.open("settings.html");
}

function checkPWInit(pw1, pw2){
    var test1 = [0, 0, 0, 0];
    var test2 = [1, 1, 1, 1];
    var match1 = checkNewPin(test1, pw1);
    var match2 = checkNewPin(test2, pw2);

    if(match1){

    }
}

checkPWInit(aleksPW, mattPW);
setPWImage(pwCount);