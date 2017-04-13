/**
 * Created by Administrator on 2017/3/22 0022.
 */

var sto;
window.onload=function(){
    waterFall('container','box');

  /*  console.log(obj.style.height);
    console.log(obj.offsetHeight);
    console.log(obj.clientHeight);*/
  /*  document.body.addEventListener("scroll",function(){
        var st=document.documentElement.scrollTop||document.body.scrollTop;
        var clientH=document.documentElement.clientHeight||document.body.clientHeight;
        if(obj.offsetHeight-clientH===st){
            alert("到底了");
        }
    });*/
}
window.onscroll=function(){//函数节流
    clearTimeout(sto);
   sto= setTimeout(function(){
         if(isToBottom()){
             //alert("到底了");
             toggleOver();
             setTimeout(function(){//模拟hhtp获得图片
                 var c= document.getElementById("container");
                 for(var i=0;i<20;i++){
                     c.append(genImgs());
                 }
                 waterFall('container','box');
                 toggleOver();
             },1000);

         }
    },500);

}
function waterFall(containerId,box){
     var container=document.getElementById(containerId);
   var boxArr= container.getElementsByClassName(box);
    var singlew=boxArr[0].offsetWidth;
    var windoww=document.documentElement.clientWidth;
    var cols=Math.floor(windoww/singlew)
    //console.log(cols);
    var containerw=cols*singlew;
    container.style.width=containerw+"px";
//console.log(boxArr);
    var dataArr=[];
    for(var i=0;i<boxArr.length;i++){
        if(i<cols){
            dataArr.push(boxArr[i].offsetHeight);
        }else{
            //console.log(dataArr);
             var minNum= Math.min.apply(null,dataArr);
            var index=dataArr.indexOf(minNum);
            boxArr[i].style.position='absolute';
            boxArr[i].style.top=minNum+"px";
            boxArr[i].style.left=index*singlew+"px";
            dataArr[index]+=boxArr[i].offsetHeight;
        }

    }
    container.style.height=Math.max.apply(null,dataArr)+"px";
}
function isToBottom(){
    var obj=document.getElementById('container');
    var st=document.documentElement.scrollTop||document.body.scrollTop;
    var clientH=document.documentElement.clientHeight||document.body.clientHeight;
   /* if(obj.offsetHeight-clientH===st){
        alert("到底了");
    }*/
    return obj.offsetHeight-clientH===st;
}

function calCurrentNums(){
   var c= document.getElementById('container');
   var list= c.getElementsByClassName("box");
    return list.length;
}
function toggleOver(){
    var o=document.getElementsByClassName("overLay")[0];
    console.log(o);
    o.style.display=o.style.display=="block"? "none":"block";
}
function genImgs(){
    var firstDiv=document.createElement("div");
    firstDiv.className="box";
    var secondDiv=document.createElement("div");
    secondDiv.className="pic";
    var img=document.createElement("img");
    img.src="images/"+Math.floor(Math.random()*63)+".jpg";
    secondDiv.append(img);
    firstDiv.append(secondDiv);
    return firstDiv;

}