var highscorePHPLink = "SpaceInvaders";
var buttonName = "button"; //Name des buttons
var outputName = "scoreTable"; //Name der ausgabefl�che

var secret = "AvorionRusty";

function uploadScore(name,score)
{

    var output=document.getElementById(outputName);                    //output.innerHTML="Hello World";

   var xmlhttp;

    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }


    var link=highscorePHPLink + "?" + "function=UploadScore" + "&var1=" + name + "&var2=" + score;


    xmlhttp.open("POST",link,false);
    xmlhttp.send();


}




function getScore()
{
    var xmlhttp;

    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }



    var link=highscorePHPLink + "?" + "function=GetScore";

    xmlhttp.open("GET",link,false);
    xmlhttp.send();

    return xmlhttp.responseText;
}
