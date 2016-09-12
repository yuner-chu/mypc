var middle=document.getElementById("middle");
var middleInner=utils.getElementsByClass("middleInner",middle)[0];
var imgs=middleInner.getElementsByTagName("img");
var focus=middle.getElementsByTagName("ul")[0];
var lis=focus.getElementsByTagName("li");
var left=utils.getElementsByClass("left",middle)[0];
var right=utils.getElementsByClass("right",middle)[0];

function getData(){
    var xhr=new XMLHttpRequest();
    xhr.open("get","data.txt",false);
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4&&/^2\d{2}$/.test(xhr.status)){
            data=eval(xhr.responseText);
        }
    }
    xhr.send(null);
}
getData();

function bindData(){
    if(data){
        var str="";
        var lisStr="";
        for(var i=0;i<data.length;i++){
            var curData=data[i];
            str+='<div><img src="" trueSrc="'+curData.src+'"/></div>';
            lisStr+=i==0 ? '<li class="bg"></li>': '<li></li>';
        }
        str+='<div><img src="" trueSrc="'+data[0].src+'"/></div>';
        middleInner.innerHTML=str;
        utils.setCss(middleInner,"width",2000*(data.length+1));
        focus.innerHTML=lisStr;
    }
}
bindData();

function imagesDelayLoad(){
    for(var i=0;i<imgs.length;i++){
        (function(i){
            var curImg=imgs[i];
            if(curImg.isloaded){return;}
            var tempImg=document.createElement("img");
            tempImg.src=curImg.getAttribute("trueSrc");
            tempImg.onload=function(){
                curImg.src=this.src;
                utils.setCss(curImg,"display","block");
                animate(curImg,{opacity:1},300);
            }
            tempImg=null;
            curImg.isloaded=true;
        })(i);
    }
}
window.setTimeout(imagesDelayLoad,500);

var step=0;
var timer=null;
function autoMove(){
    if(step==data.length){
        step=0;
        utils.setCss(middleInner,"left",0);
    }
    step++;
    animate(middleInner,{left:-step*2000},300);
    focusAlign();
}
timer=window.setInterval(autoMove,2000);


function focusAlign(){
    var tempStep=step==data.length ? 0 : step;
    for(var i=0;i<lis.length;i++){
        lis[i].className=i==tempStep ? "bg" : '';
    }
}

function bingEventForLis(){
    for(var i=0;i<lis.length;i++){
        lis[i].onclick=function(){
            if(step==data.length){
                step=0;
                utils.setCss(middleInner,"left",0);
            }
            step=this.index;
            animate(middleInner,{left:-step*2000},300);
            focusAlign();
        }
        lis[i].index=i;
    }
}
bingEventForLis();


middle.onmouseover=function(){
    window.clearInterval(timer);
};

middle.onmouseout=function(){
    timer=window.setInterval(autoMove,6000);
};

left.onclick=function(){
    if(step==0){
        step=data.length;
        utils.setCss(middleInner,"left",-step*2000);
    }
    step--;
    animate(middleInner,{left:-step*2000},300);
    focusAlign();
}
right.onclick=autoMove;



