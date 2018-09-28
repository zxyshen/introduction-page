// -----------------------------------------------------Function---------------------------------------------------------








// ----------------------------------------获取元素当前样式------------------------------------------



//     getComputedStyle-----getComputedStyle(obj,"伪类")[attr]    
//                         兼容非ie的浏览器，伪类可选，还可以获取伪类的当前样式。

//     currentStyle-----obj.currentStyle[attr];   
//                         只兼容ie浏览器。不可以获取伪类的样式。


//     获取元素的样式，有以下几点要注意。
// ---------------------------------------------------------------------------------------------------------
//         只能获取，不能更改。（要更改在this.style.里更改）  

//         获取到的是元素最后渲染过的样式（不一定是css里设置的噢，是元素当前显示的样式）

//         最好不要获取复合样式  

//         所获取的样式必须是存在的，明确设置过的。

//         获取到的样式类型是字符串  

//         别空格  [' width']  

//         *获取到的样式带px的   

// --------------------------------------------------------------------------------------------------------
//         transform 获取不到  （this.style可以获取到）

//         transition 不准确  （this.style可以获取到）

//         所以，这两个属性写在DOM上吧。
// ---------------------------------------------------------------------------------------------------------

        function getStyle(obj,attr){
            return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr];
            // return obj.currentStyle[attr] || getComputedStyle(obj)[attr];
        }

        //         注意：  getStyle()获取的样式值就是单纯的样式值
        //        （比如width:500px; 那么get到的就是500px  不会在乎padding 和 border）











// ---------------------------------------获取元素----------------------------------------

        // 改进1：以前不知道querySelector还可以获得包含选择器。所以设置了个parentNode，
        // 现在看来明显是多余了。但为了兼容以前的就不去掉了。
        
        function O(selectorName,parentNode){
            var first=selectorName.substring(0,1);
            var selectorArr=selectorName.split(' ');
                if(first==='#'&&selectorArr.length==1){        //id选择器
                    return document.querySelector(selectorName);
                }
                else{           
                    //class和tag选择器，都有可能有多个元素。
                    if(parentNode){     
                        //找特定元素下的class和tag
                        var arr=parentNode.querySelectorAll(selectorName);
                    }
                    else{
                        var arr=document.querySelectorAll(selectorName);
                    }                    
                    return arr.length==1?arr[0]:arr;    //有多个就返回数组，一个就返回一个元素。
                }
        }










// ----------------------------全局查找字符串位置的方法（不支持正则）-----------------------------

        function indexOfAll(str,toFind){
            var i=0;                  //开始查找的位置
            while(str.indexOf(toFind,i)!=-1){
                alert(str.indexOf(toFind,i));
                i=str.indexOf(toFind,i)+toFind.length
            }      
        }






// ---------------------------------判断某个元素是否包含某个class------------------------------


        function hasClass(obj,className){
            var reg=new RegExp("\\b"+className+"\\b","g");
            if(reg.test(obj.className)){
                return true;
            }
            else{
                return false;
            }
        }



// --------------------------------------给某个元素添加class----------------------------------
        
        function addClass(obj,className){
            if(hasClass(obj,className)){                                    //如果已经有了该class，那么程序返回。
                return false;
            }
            obj.className+=' '+className;                               //前面加个' '保证一定能先加上这个class
            obj.className=obj.className.replace(/\s+/,' ');         //把所有' '超过一个空格的替换成一个空格
            obj.className=obj.className.trim();                             //最后再把前后空格去掉
            return true;
        }





//---------------------------------------给某个元素删除class-----------------------------------

        function remClass(obj,className){
            if(!hasClass(className)){                                               //如果没有这个class直接返回false
                return false;
            }
            var reg=new RegExp("\\b"+className+"\\b","g");      //因为表达式含有变量，所以需要借助RegExp构造表达式
            obj.className=obj.className.replace(reg,'');            //把对应class替换为空
            obj.className=obj.className.replace(/\s+/,' ');         //把所有' '超过一个空格的替换成一个空格
            obj.className=obj.className.trim();                             //最后再把前后空格去掉
            return true;
        }









// -----------------------------------------碰撞检测------------------------------------------

        function onCollision(self,target){
            var selfRect=self.getBoundingClientRect();
            var targetRect=target.getBoundingClientRect();
            var selfRectL=selfRect.left;
            var selfW=self.offsetWidth;
            var selfRectT=selfRect.top;
            var selfH=self.offsetHeight;

            var targetRectL=targetRect.left;
            var targetW=target.offsetWidth;
            var targetRectT=targetRect.top;
            var targetH=target.offsetHeight;

            if((selfRectL+selfW>=targetRectL&&selfRectL<=targetRectL+targetW)&&(selfRectT+selfH>=targetRectT&&selfRectT<=targetRectT+targetH))
                return true;
            else
                return false;
        }



// -----------------------------------返回[x,y]范围内的随机数-----------------------------------


        function getRandom(x,y){
                                    return Math.round(Math.random()*(y-x)+x);
        }



//--------------------------------------NowTime时间对象---------------------------------------


    //         返回一个封装好的时间对象，直接调属性就行了。

            function getNowTime(){
                var NowTime=new Date();
                
                //--------下面全是number类型，但经过zeroFile包装后就都是string类型了------------
                NowTime.YEAR=zeroFill(NowTime.getFullYear());
                NowTime.MONTH=zeroFill(NowTime.getMonth()+1);               //和很多程序一样，月份从0开始算。所以要加一
                NowTime.DAY=zeroFill(NowTime.getDate());
                NowTime.WEEK=zeroFill(NowTime.getDay());
                NowTime.HOURS=zeroFill(NowTime.getHours());
                NowTime.MINUTES=zeroFill(NowTime.getMinutes());
                NowTime.SECONDS=zeroFill(NowTime.getSeconds());

                NowTime.str=NowTime.YEAR+NowTime.MONTH+NowTime.DAY+NowTime.HOURS+NowTime.MINUTES+NowTime.SECONDS+'';
                return NowTime;
            }


    //                 附：补0函数。

                        function zeroFill(n){                                 
                            return n<=9?'0'+n:''+n;                         //要想补零，必须是字符串，所以为了统一类型，我都让它返回字符串类型。                    
                        }

    //                 附：毫秒转换正常时间公式（没有补零）
    //                                -------这是给Date类型变量相减后得到毫秒结果，转化成正常时间用的。
                        function transformNormalTime(t){
                            t/=1000;
                            return    Math.floor(t/86400)+'天'+Math.floor(t%86400/3600)+'时'+Math.floor(t%86400%3600/60)+'分'+Math.floor(t%60)+'秒';
                        }






    //--------------------------------------常用的正则表达式---------------------------------------

            var regObj={
                languageForChina : /^[\u4e00-\u9fa5]*$/,
                email : /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
                idNum : /(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$)/,
                phoneNum : /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
            };







// ---------------------------------------------对象继承---------------------------------------------

        function classExtend(child,parent){
            parent.call(child);
            for(var attr in parent.prototype){
                child.prototype[attr]=parent.prototype[attr];
            }
        }


        // --------------------------------------普通继承--------------------------------
        function extend(obj1,obj2){
            if(obj1&&obj2){
                for(var attr in obj2){
                    obj1[attr]=obj2[attr];
                }
            }
        }






// ----------------------------------------------AJAX------------------------------------------------


        function ajax(custom){      //完整的四个参数：method（请求方式），url（请求的路径），asyn（是否异步），fnc（数据处理函数）
            var defaultSettings={
                method : "get",
                url : "",
                asyn : true,
            }

            if(custom){
                for(var attr in custom){
                    defaultSettings[attr]=custom[attr];
                }
            }

            if(defaultSettings.url.trim()=="" || (defaultSettings.method!='get'&&defaultSettings.method!='post')){
                console.log('error');
                return;
            }

            var xhr=new XMLHttpRequest();

            if(defaultSettings.parm){
                if(defaultSettings.method=='get'){
                    defaultSettings.url+='?'+defaultSettings.parm;
                    xhr.open(defaultSettings.method,defaultSettings.url,defaultSettings.asyn);
                    xhr.send();
                }
                else{
                    xhr.open(defaultSettings.method,defaultSettings.url,defaultSettings.asyn);
                    xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
                    xhr.send(defaultSettings.parm);
                }
            }
            else{
                xhr.open(defaultSettings.method,defaultSettings.url,defaultSettings.asyn);
                xhr.send();
            }
      

            xhr.onreadystatechange=function(){
                if(xhr.readyState==4){
                    if(xhr.status==200){
                        var data=JSON.parse(xhr.responseText);
                        defaultSettings.fnc&&defaultSettings.fnc(data);
                    }
                }
            }
        }































// --------------------------------------------------------特效--------------------------------------------------------------
        var Tween = {
            linear: function (t, b, c, d){  //匀速
                return c*t/d + b;
            },
            easeIn: function(t, b, c, d){  //加速曲线
                return c*(t/=d)*t + b;
            },
            easeOut: function(t, b, c, d){  //减速曲线
                return -c *(t/=d)*(t-2) + b;
            },
            easeBoth: function(t, b, c, d){  //加速减速曲线
                if ((t/=d/2) < 1) {
                    return c/2*t*t + b;
                }
                return -c/2 * ((--t)*(t-2) - 1) + b;
            },
            easeInStrong: function(t, b, c, d){  //加加速曲线
                return c*(t/=d)*t*t*t + b;
            },
            easeOutStrong: function(t, b, c, d){  //减减速曲线
                return -c * ((t=t/d-1)*t*t*t - 1) + b;
            },
            easeBothStrong: function(t, b, c, d){  //加加速减减速曲线
                if ((t/=d/2) < 1) {
                    return c/2*t*t*t*t + b;
                }
                return -c/2 * ((t-=2)*t*t*t - 2) + b;
            },
            elasticIn: function(t, b, c, d, a, p){  //正弦衰减曲线（弹动渐入）
                if (t === 0) { 
                    return b; 
                }
                if ( (t /= d) == 1 ) {
                    return b+c; 
                }
                if (!p) {
                    p=d*0.3; 
                }
                if (!a || a < Math.abs(c)) {
                    a = c; 
                    var s = p/4;
                } else {
                    var s = p/(2*Math.PI) * Math.asin (c/a);
                }
                return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
            },
            elasticOut: function(t, b, c, d, a, p){    //正弦增强曲线（弹动渐出）
                if (t === 0) {
                    return b;
                }
                if ( (t /= d) == 1 ) {
                    return b+c;
                }
                if (!p) {
                    p=d*0.3;
                }
                if (!a || a < Math.abs(c)) {
                    a = c;
                    var s = p / 4;
                } else {
                    var s = p/(2*Math.PI) * Math.asin (c/a);
                }
                return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
            },    
            elasticBoth: function(t, b, c, d, a, p){
                if (t === 0) {
                    return b;
                }
                if ( (t /= d/2) == 2 ) {
                    return b+c;
                }
                if (!p) {
                    p = d*(0.3*1.5);
                }
                if ( !a || a < Math.abs(c) ) {
                    a = c; 
                    var s = p/4;
                }
                else {
                    var s = p/(2*Math.PI) * Math.asin (c/a);
                }
                if (t < 1) {
                    return - 0.5*(a*Math.pow(2,10*(t-=1)) * 
                            Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
                }
                return a*Math.pow(2,-10*(t-=1)) * 
                        Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
            },
            backIn: function(t, b, c, d, s){     //回退加速（回退渐入）
                if (typeof s == 'undefined') {
                s = 1.70158;
                }
                return c*(t/=d)*t*((s+1)*t - s) + b;
            },
            backOut: function(t, b, c, d, s){
                if (typeof s == 'undefined') {
                    s = 3.70158;  //回缩的距离
                }
                return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
            }, 
            backBoth: function(t, b, c, d, s){
                if (typeof s == 'undefined') {
                    s = 1.70158; 
                }
                if ((t /= d/2 ) < 1) {
                    return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
                }
                return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
            },
            bounceIn: function(t, b, c, d){    //弹球减振（弹球渐出）
                return c - Tween['bounceOut'](d-t, 0, c, d) + b;
            },       
            bounceOut: function(t, b, c, d){
                if ((t/=d) < (1/2.75)) {
                    return c*(7.5625*t*t) + b;
                } else if (t < (2/2.75)) {
                    return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
                } else if (t < (2.5/2.75)) {
                    return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
                }
                return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
            },      
            bounceBoth: function(t, b, c, d){
                if (t < d/2) {
                    return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
                }
                return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
            }
        }


        function animate(obj,targetStyle,time,fx,fnc){      //fx运动形式，具体看Tween
            clearInterval(obj.animateTimer);
            if(!fx){
                fx='linear';
            }
            if(!time){
                time=2000;
            }

            var iStyle={};          //当前样式
            for(var attr in targetStyle){           //targetStyle目标样式
                if(attr=='opacity'){                //为了统一opacity和alpha
                    targetStyle[attr]=Math.round(parseFloat(targetStyle[attr])*100);
                    iStyle[attr]=Math.round(parseFloat(getStyle(obj,attr))*100);
                }else{
                    iStyle[attr]=parseFloat(getStyle(obj,attr));
                }
            }
            var startTime=(new Date()).getTime();
            obj.animateTimer=setInterval(function(){
                var NowTime=(new Date()).getTime();
                // console.log(time-Math.max(0,startTime-NowTime+time))

                // var t=time-Math.max(0,startTime-NowTime+time);
                var t=NowTime-startTime>time?time:NowTime-startTime;
                for(var attr in targetStyle){
                    var value=Tween[fx](t,iStyle[attr],parseFloat(targetStyle[attr])-iStyle[attr],time);
                    if(attr == 'opacity'){
                        obj.style.opacity = value/100;
                        obj.style.filter = 'alpha(opacity='+value+')';
                    }
                    else{
                        obj.style[attr] = value + 'px';
                    }
                }

                if(t==time){
                    clearInterval(obj.animateTimer);
                    console.log(t)
                
                    if(fnc){
                        fnc.call(obj);
                    }
                }
            },13)
        }






// ---------------------------------设置元素朝某个方向（水平）移动--------------------------------------

//          通用位移函数：attr（方向），oneLength（每次位移距离），limit（限制，当前方向位移允许的最大值）
//                                        t（每次位移发生的时间---定时器执行的每次间隔。单位：ms）
//                                        fnc（回调函数，可选）  

//          注意点：同一时刻只能向一个方向移动。
//          要想向不同方向移动，把clear去掉就行了。

        function doMove(obj,attr,oneLength,t,limit,fnc){
            clearInterval(obj[attr+'Timer']);
            var currentLength=parseFloat(getStyle(obj,attr));
            obj[attr+'Timer']=setInterval(function(){
                                                    currentLength+=oneLength;
                                                    if(currentLength>=limit&&oneLength>0||currentLength<=limit&&oneLength<0){
                                                        currentLength=limit;
                                                        obj.style[attr]=currentLength+'px';
                                                        clearInterval(obj[attr+'Timer']);
                                                        if(fnc){
                                                            fnc();
                                                        }
                                                    }
                                                    else{
                                                        obj.style[attr]=currentLength+'px';
                                                    }
                                                },t);
        }


        // 附：这个是上面的简化版。（其实是生成进度条用的）
        //            功能：使元素的attr长度在t时间左右变成length。（前提是：attr.length<length）


        function becomeTheLength(obj,attr,length,t){                        //这个t不再是定时器每次执行的间隔，而是定时器完成的时间
                var speed=length/t;
                var currentLength=parseFloat(getStyle(obj,attr));
                obj.becomeTheLengthTimer=setInterval(function(){
                                                        currentLength+=speed;
                                                        if(currentLength>=length){                  //教训：别和浮点数作相等比较！
                                                            obj.style[attr]=length+'px';
                                                            clearInterval(obj.becomeTheLengthTimer);
                                                        }
                                                        else{
                                                            obj.style[attr]=currentLength+'px';
                                                        }
                                                    },1);
            }







//-------------------------------------------opacity渐变----------------------------------------

//         opacity渐变函数：method（渐变的方式----add（0~1），reduece（1~0）），speed（渐变速度）
//                                              t（渐变频率）
//                                              fnc（回调函数）

                        // 呼吸：granientOpacity(t1,'reduce',0.04,20,function(){granientOpacity(t1,'add',0.04,20)});
                                                            
            

        function granientOpacity(obj,method,speed,t,fnc){
            clearInterval(obj[method+'OpacityTimer']);
            var opacity;                    
            if(method=='add'){
                obj.style.opacity=0;
                opacity=0;
                target=1;
                speed=speed;
            }
            else if(method=='reduce'){
                obj.style.opacity=1;
                opacity=1;
                target=0;
                speed=-speed;
            }
            obj[method+'OpacityTimer']=setInterval(function(){
                                                                            opacity+=speed;
                                                                            if(opacity>=target&&speed>0||opacity<=target&&speed<0){
                                                                                opacity=target;
                                                                                obj.style.opacity=opacity;
                                                                                clearInterval(obj[method+'OpacityTimer']);
                                                                                if(fnc){
                                                                                    fnc();
                                                                                }
                                                                            }
                                                                            else{
                                                                                obj.style.opacity=opacity;
                                                                            }
                                                                        },t);
            }



// ------------------------------------设置元素朝某个方向"抖动"-------------------------------------

//          一开始我以为可以简单的封装一下doMove，让它朝不同的方向跑就可以。
// 但没那么简单，抖动是有幅度变化的。也就是说Move的Length是变化的。doMove不行，所以必须重写了。
//          并且，元素必须回到原点，所以必须控制定时器开启和关闭的时间。



//          通用元素抖动函数：obj（抖动的对象），attr（抖动的方向），maxLength（幅度最大时的抖动长度）
//                                         t（抖动的频率---定时器执行的每次间隔。单位：ms）
//                                         fnc（回调函数，可选）  


//          注意：由于元素必须是要回到原点的。也就是说在一次抖动的过程中，不能在非原点的位置被clear掉。
//                          所以我设置了必须等前一次定时器执行结束后，才允许再次开启定时器。

function shark(obj,attr,maxLength,t,fnc){
    if(obj[attr+'Timer']==undefined){
        var initial=parseFloat(getStyle(obj,attr));                   //记录初始位置----抖动结束要回到原点
        obj.style.zIndex=2;                                                     //为了保证抖动效果，把层级提高（这个2符合普通情况，看情况调吧）。
        var lengthArr=new Array();
        for(var i=maxLength;i>0;i--){
            lengthArr.push(i,-i);
        }
        var num=0;


        clearInterval(obj[attr+'Timer'])
        obj[attr+'Timer']=setInterval(function(){
                                                        if(num==lengthArr.length){
                                                            obj.style[attr]=initial+'px';
                                                            clearInterval(obj[attr+'Timer']);
                                                            obj.style.zIndex='auto';                                     //抖动结束恢复原本层级。
                                                            obj[attr+'Timer']=undefined;
                                                            if(fnc){
                                                                fnc();
                                                            }
                                                        }
                                                        else{
                                                            obj.style[attr]=initial+lengthArr[num++]+'px';
                                                        }
                                                    },t)
    }
}




// -------------------------------------查找指定字符串并高亮显示 -------------------------------------

    // 附：背景颜色和字体颜色可以调

    function highLightStr(sourceStr,tofindStr){
        return sourceStr.split(tofindStr).join('<span style="backgroundColor:#fff8a4; color:#222">'+tofindStr+'</span>');
    }









// ----------------------------inupt textarea提示文字（点击消失，不输入恢复） ----------------------------
    
    //  只是作个参考。  input prompt 输入提示
    
        function inputPrompt(inp){
            inp.value='在此输入留言!';
            inp.onfocus=function(){
                if(inp.value=='在此输入留言!')
                    inp.value='';
            }
            inp.onblur=function(){
                if(inp.value.trim()=='')
                    inp.value='在此输入留言!';
            }   
        }








// -------------------------------------------换背景颜色 -----------------------------------

        function changeBgColor(obj,color){
            if(obj&&color)
                obj.style.backgroundColor=color;
        }
































// ---------------------------------------------------组件---------------------------------------------








        // 就是一面镜子，有drag和slide两种功能。

        function Mirror(){
            this.div=document.createElement('div');
            var This=this;


            this.cssDefault={
                width : '50%',
                height : '50%',
                background : 'rgba(255, 255, 255, 0.5)',
                position : 'absolute'
            };

            this.fncDefault={
                drag : function(parent){
                    This.div.addEventListener('mousedown',
                        function(ev){
                            var insideX=ev.clientX-This.div.getBoundingClientRect().left;
                            var insideY=ev.clientY-This.div.getBoundingClientRect().top;

                            

                            function move(ev){
                                var disX=ev.clientX-insideX;
                                var disY=ev.clientY-insideY;
                                if(parent){
                                    disX=ev.clientX-parent.getBoundingClientRect().left-insideX;
                                    disY=ev.clientY-parent.getBoundingClientRect().top-insideY;

                                    disX=disX>parent.clientWidth-This.div.clientWidth ? parent.clientWidth-This.div.clientWidth : disX && disX<0 ? 0 : disX ;
                                    disY=disY>parent.clientHeight-This.div.clientHeight ? parent.clientHeight-This.div.clientHeight : disY && disY<0 ? 0 : disY ;
                                }

                                This.div.style.left=disX+'px';
                                This.div.style.top=disY+'px';
                            }

                            function up(){
                                document.documentElement.removeEventListener('mousemove',move,false);
                                document.documentElement.removeEventListener('mousemove',up,false);
                            }

                            document.documentElement.addEventListener('mousemove',move,false);
                            document.documentElement.addEventListener('mouseup',up,false);
                        },false);
                },

                slide : function(parent){
                    parent.addEventListener('mouseenter',function(ev){
                        function move(ev){
                            var disX=ev.clientX-parent.getBoundingClientRect().left-This.div.clientWidth/2;
                            var disY=ev.clientY-parent.getBoundingClientRect().top-This.div.clientHeight/2;
            
                            disX=disX>parent.clientWidth-This.div.clientWidth ? parent.clientWidth-This.div.clientWidth : disX && disX<0 ? 0 : disX ;
                            disY=disY>parent.clientHeight-This.div.clientHeight ? parent.clientHeight-This.div.clientHeight : disY && disY<0 ? 0 : disY ;

                            This.div.style.left=disX+'px';
                            This.div.style.top=disY+'px';

                        }
                        function leave(){
                            document.documentElement.removeEventListener('mousemove',move,false);
                            parent.removeEventListener('mousemove',leave,false);
                        }

                        document.documentElement.addEventListener('mousemove',move,false);
                        parent.addEventListener('mouseleave',leave,false);
                    },false)
                }
            };


            Mirror.prototype.cssInit=function(custom){
                if(custom!=null){
                    for(var attr in custom){
                        this.cssDefault[attr]=custom[attr];
                    }
                }
            }

            Mirror.prototype.createDom=function(e){
                // div.addClass();
                for(var attr in this.cssDefault){
                    this.div.style[attr]=this.cssDefault[attr];
                }
                
                var parent = e || document.body;
                parent.appendChild(this.div);
            }

            Mirror.prototype.fncInit=function(custom){
                if(custom!=null){
                    for(var attr in custom){
                        this.fncDefault[attr]=custom[attr];
                    }
                }
            }

            Mirror.prototype.fireFnc=function(customFire){
                for(var attr in this.fncDefault){
                    if(!customFire||!customFire[attr]){
                        this.fncDefault[attr]();
                    }
                }
            }
        }
























    //模仿百度的搜索栏 
        
        
        function QueryBar(){
            var liIndex=-1;
            window.go=function(s){
                if(s=='[object MouseEvent]')
                    var wd=this.innerHTML||this.value;
                else{
                    var wd=s;
                }
                var url=`https://www.baidu.com/s?wd=${wd}`;
                window.open(url);
            }

            window.doData=function(custom){
                var queryBar=O('.QueryBar');
                var ul=O('ul',queryBar);
                ul.style.display='block';
                ul.innerHTML='';
                for(var i=0;i<custom.s.length;i++){
                    var li=document.createElement('li');
                    li.innerHTML=custom.s[i];
                    li.addEventListener('click',go,false);
                    ul.appendChild(li);
                }
                liIndex=-1
                QueryBar.prototype.lock=true;
                
            }


            var oDiv=document.createElement('div');
            oDiv.className='QueryBar';
            var inp=document.createElement('input');
            var downMenu=document.createElement('ul');

            QueryBar.prototype.lock=true;
            var prevScript;
            var This=this;

            this.cssDefault={
                width : '300px',
                height : '50px',
                fontSize : '30px',
                color : '#000',
                border : '2px solid #E10601',
                borderColor : '#E10601',
                lineHeight : '120%',
                display : 'block',
                position : 'absolute',
                textIndent : '5%'
            }

            this.fncDefault={
                keyup : function(){
                    inp.addEventListener('keyup',createScript,false);
                    function createScript(){
                        if(!this.prevValue||this.prevValue!=this.value){
                            if(QueryBar.prototype.lock){
                                if(prevScript){
                                    document.body.removeChild(prevScript);
                                }
                                var eScript=document.createElement('script');
                                QueryBar.prototype.lock=false;
                                var t=new Date();
                                var wd=this.value;
                                eScript.src=`https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=${wd}&cb=doData&t=${t}`;
                                document.body.appendChild(eScript);
                                prevScript=eScript;
                                this.prevValue=this.value;
                            }
                        }
                    }
                },

                keyup2 : function(){
                    inp.addEventListener('keyup',keyFnc,false);
                    function keyFnc(ev){
                        ev.keyCode=='13'&&go(this.value);
                        var max=this.nextElementSibling.children.length;
                        changeBgColor(this.nextElementSibling.children[liIndex],'#fff');
                        
                        if(ev.keyCode=='40'){           //下
                            if(++liIndex>=max)
                                liIndex=max-1;
                            this.value=this.nextElementSibling.children[liIndex].innerHTML;
                            QueryBar.prototype.lock=false;
                        }else if(ev.keyCode=='38'){           //上
                            if(--liIndex<0)
                                liIndex=0;
                            this.value=this.nextElementSibling.children[liIndex].innerHTML;
                            QueryBar.prototype.lock=false;
                        }
                        else{
                            QueryBar.prototype.lock=true;
                        }
                        console.log(liIndex)
                        changeBgColor(this.nextElementSibling.children[liIndex],This.cssDefault.borderColor);
                    }

                }
            }

            this.DMcssDefault={
                width : this.cssDefault.width,
                fontSize : parseInt(this.cssDefault.fontSize)*0.8+'px',
                color : this.cssDefault.color,
                border : "1px solid #E10601",
                position : 'absolute',
                display : 'none',
                top : this.cssDefault.height,
                textIndent : this.cssDefault.textIndent,
                cursor : "pointer"
            }



            this.DMfncDefault={
            }

            QueryBar.prototype.createDom=function(parent){
                var parent=parent||document.body;

                
                for(var attr in this.cssDefault){
                    oDiv.style[attr]=this.cssDefault[attr];
                    (attr!='position'&&attr!='border')&&(inp.style[attr]=this.cssDefault[attr]);
                }

                for(var attr in this.DMcssDefault){
                    downMenu.style[attr]=this.DMcssDefault[attr];
                }



                oDiv.appendChild(inp);
                oDiv.appendChild(downMenu);
                parent.appendChild(oDiv);
            }
            
            QueryBar.prototype.cssInit=function(custom){
                extend(this.cssDefault,custom);
            }

            QueryBar.prototype.DMcssInit=function(custom){
                extend(this.DMcssDefault,custom);
            }

            QueryBar.prototype.fncInit=function(custom){
                extend(this.fncDefault,custom);
            }

            QueryBar.prototype.DMfncInit=function(custom){
                extend(this.DMfncDefault,custom);
            }
            



            QueryBar.prototype.fireFnc=function(notFire){
                for(var attr in this.fncDefault){
                    if(!notFire||!notFire[attr]){
                        this.fncDefault[attr]();
                    }
                }

                for(var attr in this.DMfncDefault){
                    if(!notFire||!notFire[attr]){
                        this.DMfncDefault[attr]();
                    }
                }
            }
        }