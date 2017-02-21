/**
 * Created by Administrator on 2016/12/16 0016.
 */

(function(window,undefined){
document.getElementsByClassName("toServerBtn")[0].addEventListener("click", function (event) {
    var pg2=document.getElementById("myProgress2");
    var xhr;
    var fileObj=document.getElementById("myFile").files[0];
    pg2.max=fileObj.size;
    //var form=new FormData(document.getElementById("myForm"));
    var form=new FormData();
    form.append("file",fileObj);
    console.log(form.get("file"));
    if(XMLHttpRequest)
        xhr=new XMLHttpRequest();
    else{
        xhr=new ActiveXObject('Microsoft.XMLHTTP');
    }
    xhr.open("post","http://localhost:8081/GZLT/File.php");
    xhr.onload=function(){
         //   alert("上传成功");
    }
    xhr.onerror=function(){
        alert("上传失败");
    }
    xhr.upload.onprogress=function(event){
        pg2.value=event.loaded;
    }
    xhr.upload.onloadstart=function(){

    }
    xhr.onreadystatechange= function () {
        if(xhr.readyState==4){
                 if(xhr.status=200){
                     var jsonObj=JSON.parse(xhr.responseText);
                     alert(jsonObj.status+"\n"+jsonObj.info);
                 }else{
                     alert("出错啦，错误代码："+xhr.status);
                 }
        }
    }

    xhr.send(form);
});
    document.getElementById("myFile").addEventListener("change", function (event) {

        var files=event.target.files;
        if(files.length)
        {
            var fc= document.getElementById("filecontent");
            var pg=document.getElementById("myProgress");
            var pp=document.getElementsByClassName("progressPercent")[0];
            fc.innerHTML="";
            pg.value=0;
            pp.innerHTML="&nbsp;";
            var file = files[0];
            var reader = new FileReader();

            pg.max=file.size;

            document.getElementsByClassName("cancelBtn")[0].addEventListener("click", function (event) {
               reader.abort();
            });
            reader.onload = function(event)//加载成功时触发
            {
                pg.value=pg.max;
                pp.innerHTML="100%";
                fc.innerHTML="文件名是"+file.name+"<br/>文件大小是"+Math.ceil(file.size/1000)+"KB<br/>文件类型是"+file.type;
            };
            reader.onloadstart=function(event){//加载开始时触发

            }
            reader.onloadend=function(event){//加载结束时触发

            }
            reader.onabort= function (event) {//加载打断时触发
                alert("加载被取消");
                pg.value=0;
                pp.innerHTML="&nbsp;";
            }
            reader.onerror= function (event) {//加载错误时触发

            }
            reader.onprogress= function (event) {//加载时触发
                     pg.value=event.loaded;
                pp.innerHTML=Math.round((pg.value/pg.max)*100).toString()+"%";
            }
            reader.readAsText(file);
        }
    })
    //var Kasol=function(){};
    //function  handleFiles(files)
    //{
    //
    //}
    //function fileUpload_resultHandler(selectedId,showAreaId){//file input的id，显示信息的dom节点id
    //
    //}
})(window);