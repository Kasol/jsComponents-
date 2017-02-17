/**
 * Created by Administrator on 2017/2/17 0017.
 */
(function(window,undefined){
   var Router= function () {
       this.routes={};
       this.currentUrl="";
   }
    Router.prototype.init=function(){
        //window.addEventListener("load",this.refresh);
        window.addEventListener("hashchange",this.refresh.bind(this));
    }
    Router.prototype.refresh=function(){
      this.currentUrl=location.hash.slice(1)||"/";
        this.routes[this.currentUrl]();
    }
    Router.prototype.route=function(path,callback){
        var result_HandlerResult=callback||function(){};
        this.routes[path]=callback;
    }
    var router=new Router();
    router.init();
    router.route("/", function () {
        var str="<h1>这是一个默认的页面</h1>";
       document.getElementById("myCtrl").innerHTML=str;
    })
    router.route("/blue", function () {
        var str="<h1>这是蓝色的页面</h1>";
        document.getElementById("myCtrl").innerHTML=str;
    })
    router.route("/green", function () {
        var str="<h1>这是绿色的页面</h1>";
        document.getElementById("myCtrl").innerHTML=str;
    })
    router.route("/black", function () {
        var str="<h1>这是黑色的页面</h1>";
        document.getElementById("myCtrl").innerHTML=str;
    })
})(window);