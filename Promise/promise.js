/**
 * Created by Administrator on 2016/12/21 0021.
 */
function test(resolve,reject){
    var num=Math.random()*5;
    var data={};
    data.num=num;
    console.log("test任务要延时 "+num+"秒");
    setTimeout(function () {//这里为简便所以用定时器，实际上常用ajax执行某些任务
        if(num<2.5){
            resolve(num);
        }else{
            reject("test任务出错了！");
        }
    },num*1000);
}
function bar(resolve,reject){
    var num=Math.random()*10;
    console.log("bar任务要延时 "+num+"秒");
    setTimeout(function () {
        resolve(num);
    },num*1000)
}

function foo(resolve,reject){
    var xhr;
    if(XMLHttpRequest)
    xhr=new XMLHttpRequest();
    else{
        xhr=new ActiveXObject('Microsoft.XMLHTTP');
    }
    xhr.onreadystatechange= function () {
        if(xhr.readyState===4){
             if(xhr.status===200){
                 var jsondata=JSON.parse(xhr.responseText);
                    resolve( jsondata);//jsondata格式{"name":"Kasol","age":23,"skill":["html","css","js","as","php","mysql"]}
             }else{
                 console.log("error code is"+xhr.status);
                 reject("foo任务没有得到正确相应");
             }
        }else{

        }
    };
    xhr.open("get","http://localhost:8081/GZLT/index.php");
    xhr.send();

}
function add(input){
    var sum=input+input;
    return new Promise(function(resolve,reject){
        console.log(input+"+"+input+"="+sum);
          resolve(sum);
    });
}

function  mul(input){
    var m=input*input;
    return new Promise(function(resolve,reject){
        console.log(input+"*"+input+"="+m);
        resolve(m);
    });

}
var p1=new Promise(test);
var p2=new Promise(bar);
var p3=new Promise(foo);
//Promise.all([p1,p2]).then(function (result) {// 这里的all改成race，则变成了先抢先赢！
//    console.log(result);
//    //这个result是一个数组，包含了来自两个promise的反馈信息
//}).catch(function (reason) {
//   console.log(reason);
//});

/*p1.then(function (result) {
 console.log(result);
 }).catch(function (reason) {
 console.log(reason);
 });*/
Promise.all([p1,p2,p3]).then(function (result) {//p1和p2任务同时执行，相互等待，之后把出来的值相加，返回promise对象
    var pSum=result[0]+result[1]+result[2].age;
    console.log(pSum);
    return new Promise(function(resolve,reject){
        resolve(pSum);
    });
}).then(add)
.then(mul)
.catch(function(reason){
        console.log(reason);
    });



