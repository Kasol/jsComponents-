/**
 * Created by Administrator on 2016/11/16 0016.
 */
//关于事件调度，mousedown可以照常冒泡方式即可，不过注意要冒泡到他之后截止冒泡（ e.stop）。其次，由于，元素动作会更不上鼠标动作
 //所以呢，对于mouseover和mouseup，要用捕获的方式，注意这里会有冒泡上来，所以必须都要e.stopPropagation防止二次响应
(function(window,undefined){
    var getScrollOffsets=function (window) {
     var   w = window || w;
        if (w.pageXOffset != null) return {x: w.pageXOffset, y: w.pageYOffset};
        var d = w.document;
        if (document.compatMode == "CSS1Compat")
            return {x: d.documentElement.scrollLeft, y: d.documentElement.scrollTop};
        return {x: d.body.scrollLeft, y: d.body.scrollTop};
    }

    var panel= function (panelId,headText,footText) {
        this.panel=document.getElementById(panelId)||document.getElementById("kasol");
        var tempPanelobj=this.panel;
        this.panelHeader=tempPanelobj.getElementsByTagName(headText)[0];
        var tempHeadobj=this.panelHeader;//闭包内的变量
        this.panelFooter=tempPanelobj.getElementsByTagName(footText)[0];
        this.panelHeader.state="stopDrag";
        this.closeBtn=tempPanelobj.getElementsByClassName("close-button")[0];
        //this.closeBtn.addEventListener("click",btnClickHandler);
        this.closeBtn.addEventListener("mouseover", btnMouseOverHandler);
        this.closeBtn.addEventListener("mouseout", btnMouseOutHandler);
        this.closeBtn.addEventListener("click", btnClickHandler);
        this.panelHeader.addEventListener("mousedown", function (event) {
           console.log(event.target);
            if(!event.target.hasAttributes("src"))
            tempHeadobj.state="startDrag";
            var e=event||window.event;
            //console.log(e.offsetX+"\n"+ e.offsetY);
          //  console.log(e.clientX+"\n"+ e.clientY);
            var startX= e.offsetX;
            var startY= e.offsetY;
            document.addEventListener("mousemove", function (event) {
                var scroll=getScrollOffsets(window);
                var e=event||window.event;
                if(tempHeadobj.state=="startDrag") {
                        var finalX=(e.clientX+scroll.x - startX)<0?0:(e.clientX+scroll.x - startX);
                        var finalY=(e.clientY+scroll.y- startY)<0?0:(e.clientY+scroll.y - startY);
                    tempPanelobj.style.left = finalX + "px";
                    tempPanelobj.style.top = finalY + "px";
                }
               e.stopPropagation();
            },true);
            document.addEventListener("mouseup", function (event) {
                tempHeadobj.state="stopDrag";
                tempHeadobj.removeEventListener("mouseup", function (event) {

                });
                tempHeadobj.removeEventListener("mousemove", function (event) {
                    startX=0;
                    startY=0;
                });
                e.stopPropagation();
            },true);
            e.stopPropagation();
            e.preventDefault();

        });

    }
    var btnMouseOverHandler= function (event) {
        var e=event||window.event;
        console.log(this);
        this.src="close-black.png";
    }
    var btnMouseOutHandler= function (event) {
        this.src="close-blue.png";
    }
    var btnClickHandler=function(event){
        this.parentNode.parentNode.style.display="none";
    }

    var popBtns=document.getElementsByClassName("popPanel");
    for(var i=0;i<popBtns.length;i++){
        popBtns[i].addEventListener("click", function (event) {
            var targetName=this.getAttribute("data-target");
            document.getElementById(targetName).style.display="block";
        })
    }
  return  window.panel=panel;
  //  window.myPanel=panel;
    //alert(window.myPanel);

})(window);