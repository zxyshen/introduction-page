var index={};

index.mouseCTween=null;

index.currentScreen='screen1';
// 2、3Dbox转动异常      建议以后就用封装的button3D那种思想来做3D翻转。（并不是说外层2D内层3D是错的。而是控制翻转的时候不要控制3D空间了。）


index.init=function(){

    index.resize();

    index.headerAon();

    index.initAon();

    index.configmouseCTween();
    
    index.showNext();

    index.showBar();

    index.scene2Init();

    index.scene2Aon();

    index.bindEvents();




}

index.bindEvents=function(){
    index.resizeEvent();

    index.headerEvent();

    $(window).bind('scroll',index.resizeScrollT);

    index.scrollScreenEvent();
    
    $(window).bind('mouseup',index.scrollMouseupFn);
    
    index.scene2Event();
}

index.scrollMouseupFn=function(ev){
    if(ev.clientX<$(window).width())return;
    var currentScreen=index.currentScreen;

    var nowTime=index.scale()*index.mouseCTween.totalDuration();

    var afterScreen=index.mouseCTween.getLabelAfter(nowTime);

    var afterTime=index.mouseCTween.getLabelTime(afterScreen);
    
    var beforeScreen=index.mouseCTween.getLabelBefore(nowTime);

    var beforeTime=index.mouseCTween.getLabelTime(beforeScreen);

    var nowToNext=Math.abs(nowTime-afterTime);

    var nowToPrev=Math.abs(nowTime-beforeTime);

    if(index.scale()==0){   //第一屏
        index.currentScreen='screen1';
    }else if(index.scale()==1){     //最后一屏
        index.currentScreen='screen'+$('.scene').length();
    }else if(nowToNext>nowToPrev){
        index.currentScreen=beforeScreen;
    }else{
        index.currentScreen=afterScreen;
    }
    
    var maxH=$('body').height()-$(window).height();

    var t=Math.abs(nowTime-index.mouseCTween.getLabelTime(index.currentScreen));

    var positionY=index.mouseCTween.getLabelTime(index.currentScreen)/index.mouseCTween.totalDuration()*maxH;

    var scrollAnimate=new TimelineMax;
    
    scrollAnimate.to('body,html',t,{scrollTop:positionY});
    

}

index.resizeScrollT=function(){
    $(window).scrollTop(0);
}

index.resize=function(){
    // var scenes=O('.scene');
    // var nowScreen=new TimelineMax();
    // nowScreen.clear();
    // for(var i=0;i<scenes.length;i++){
    //     (i!=0)&&(scenes[i].style.top=document.documentElement.clientHeight+'px');
    //     scenes[i].style.height=document.documentElement.clientHeight+'px';
    // }
    // nowScreen.to(scenes[index.currentScreen-1],0,{top:0});
    // 1、rezie后滑动top不对      错在这里
    // 原因是：只调整了当前页面的top。如果第一次resize，滑动后当前页面变了。那么就有多个页面的top
    // 不对、而最后再次resize的时候。只调整了当前页面的top，而前面几个都错了，所以造成了页面混乱。

    $('.scene').height($(window).height())
    
    $(".scene:not(':first')").css("top",$(window).height());

    index.configmouseCTween();

}

index.scene2Init=function(){
    var steps=O('.step')
    for(var i=0;i<steps.length;i++){
        for(var j=0;j<steps[i].children.length;j++){
            (i!=0)&&(steps[i].children[j].style.opacity=0);
            (i!=0)&&(steps[i].children[j].transform='rotateX(180deg)');
        }
    }

    var subNavs=O('.subNav'); 
    for(var i=0;i<subNavs.children.length;i++){
        subNavs.children[i].index=i+1;
    }
}

index.configmouseCTween=function(){
    var time=(index.mouseCTween?index.mouseCTween.time():0);
    if(index.mouseCTween)index.mouseCTween.clear();

    index.mouseCTween=new TimelineMax;

    index.mouseCTween.add('screen1');
    index.mouseCTween.to('#scene2',0.8,{top:0,ease:Cubic.easeInOut});
    index.mouseCTween.add('screen2');
    index.mouseCTween.to('#scene3',0.8,{top:0,ease:Cubic.easeInOut});
    index.mouseCTween.add('screen3');
    index.mouseCTween.to('#scene4',0.8,{top:0,ease:Cubic.easeInOut});
    index.mouseCTween.add('screen4');
    index.mouseCTween.to('#scene5',0.8,{top:0,ease:Cubic.easeInOut});
    index.mouseCTween.add('screen5');

    index.mouseCTween.stop();

    index.mouseCTween.seek(time,false);
}

index.scale=function(){
    var scrollT=$(window).scrollTop();
    var maxH=$('body').height()-$(window).height();
    var s=scrollT/maxH;
    return s;
}

index.changeScreen=function(v){
    var currentTime=index.mouseCTween.getLabelTime(index.currentScreen);
    if(v=='next'){

        var afterScreen=index.mouseCTween.getLabelAfter(currentTime);

        if(!afterScreen)return;

        var totalTime=index.mouseCTween.totalDuration();

        var afterTime=index.mouseCTween.getLabelTime(afterScreen);

        var maxH=$('body').height()-$(window).height();

        var positionY=afterTime/totalTime*maxH;

        var scrollTime=Math.abs(index.mouseCTween.time()-afterTime);

        var scrollAnimate=new TimelineMax;

        scrollAnimate.to('html,body',scrollTime,{scrollTop:positionY});

        // index.mouseCTween.tweenTo(afterScreen);

        index.currentScreen=afterScreen;
    }else{
        
        var beforeScreen=index.mouseCTween.getLabelBefore(currentTime);

        if(!beforeScreen)return;

        var totalTime=index.mouseCTween.totalDuration();

        var beforeTime=index.mouseCTween.getLabelTime(beforeScreen);

        var maxH=$('body').height()-$(window).height();

        var positionY=beforeTime/totalTime*maxH;

        var scrollTime=Math.abs(index.mouseCTween.time()-beforeTime);

        var scrollAnimate=new TimelineMax;

        scrollAnimate.to('html,body',scrollTime,{scrollTop:positionY});

        // index.mouseCTween.tweenTo(beforeScreen);和上面这个重复了

        index.currentScreen=beforeScreen;
    }
}

index.scrollScreenEvent=function(){

    $('#wrapper').bind('DOMMouseScroll',function(ev){
        ev.preventDefault();
    });

    $('#wrapper').bind('mousewheel',function(ev){
        ev.preventDefault();
    });

    // var ssTween=new TimelineMax();
    // var scrollTween=new TimelineMax();
    var next=O('.next');
    var screens=O('.scene');
    var This=O('#wrapper');
    // ssTween.toFirst=true;

    clearTimeout(this.timer);
    this.timer=setTimeout(function() {
        $('#wrapper').one('DOMMouseScroll',mousewheelFn);
        $('#wrapper').one('mousewheel',mousewheelFn);
        $(window).bind('scroll',scrollStatus)
        $('.next').one('click',nextClick);
    },index.showBar.time*1000 );  //只有初始动画完成后才支持这些切换屏幕事件
    
    function mousewheelFn(ev,direction){    
        $(window).unbind('scroll',index.resizeScrollT);
        
        if(direction<1){    //向下滚动
            index.changeScreen('next');
        }else{  //向上滚动
            index.changeScreen('prev')
        }

        clearTimeout(this.timer);
        this.timer=setTimeout(function() {
            $('#wrapper').one('DOMMouseScroll',mousewheelFn);
            $('#wrapper').one('mousewheel',mousewheelFn);
            $(window).bind('scroll',scrollStatus);
        }, 900);
    }

    function nextClick(){
        $(window).unbind('scroll',index.resizeScrollT);
        clearTimeout(this.timer);
        this.timer=setTimeout(function(){
            $('.next').one('click',nextClick);
        },1000);

        index.changeScreen('next');
    }

    function scrollStatus(){
        $(window).unbind('scroll',index.resizeScrollT);
        var time=index.scale()*index.mouseCTween.totalDuration();
        index.mouseCTween.seek(time,false);
    }

    // ssTween.add(function(){
    //     if(!ssTween.toFirst&&index.headerChange){
    //         headerChangeAon(screens[0],0)
    //         index.headerChange=false;
    //     }
    // });
    // ssTween.add('screen1');
    // for(let i=1;i<screens.length;i++){
    //     ssTween.to(screens[i],0.8,{top:0});
    //     ssTween.add(function(){
    //         ssTween.toFirst=false;
    //         if(index.headerChange){
    //             headerChangeAon(screens[i],i)
    //             index.headerChange=false;
    //         }
    //     });
    //     ssTween.add('screen'+(i+1));
    // }
    // ssTween.stop();
    



    // function scrollFn(){
    //     var times=scale()*ssTween.totalDuration()*0.92;
    //     // 阻止seek触发headerChange
    //     ssTween.seek(times,false);
    //     // index.headerChange=false;    覆盖了内域
    //     // console.log(Number(ssTween.currentLabel().slice(-1)));
    //     // console.log(ssTween.currentLabel().match(/\d+/g).join(''));
    //     // index.currentScreen=Number(ssTween.currentLabel().slice(-1));
        
    //     // $(window).one('mousedown',function(){
    //         //     index.currentScreen=Number(ssTween.currentLabel().slice(-1));
    //         //     ssTween.seek('screen'+index.currentScreen);
    //         // })

            
    //     $(window).one('mouseup',function(ev){
    //         // 防止点击next误触问题
    //         if(ev.clientX<$('body').width())
    //         return;
    //         index.headerChange=true; 
                

    //         var times=scale()*ssTween.totalDuration()*0.92;
    //         var nextScreen=ssTween.getLabelAfter(times);
    //         var prevScreen=ssTween.getLabelBefore(times);
            
    //         (!prevScreen)&&(prevScreen='screen1');
    //         (!nextScreen)&&(nextScreen='screen'+scenes.length);

    //         var nowToNext=Math.abs(times-ssTween.getLabelTime(nextScreen));
    //         var nowToPrev=Math.abs(times-ssTween.getLabelTime(prevScreen));
            
    //         if(nowToNext<nowToPrev){
    //             index.currentScreen=Number(nextScreen.slice(-1));
    //         }else {
    //             index.currentScreen=Number(prevScreen.slice(-1));
    //         }
    //         scrollTween.clear();
    //         var sHeight=(ssTween.getLabelTime('screen'+index.currentScreen)/ssTween.totalDuration())*(document.body.offsetHeight);
    //         ssTween.tweenTo('screen'+index.currentScreen);
    //         scrollTween.to('body,html',0.8,{scrollTop:sHeight});
    //         // scrollTween.clear();
    //         // var sHeight=(ssTween.getLabelTime('screen'+index.currentScreen)/ssTween.totalDuration())*(document.body.offsetHeight);
    //         // ssTween.tweenTo('screen'+index.currentScreen);
    //         // scrollTween.to('body,html',0.8,{scrollTop:sHeight});
    //     })
    // }
}

index.headerEvent=function(){
    var spaceArr=O('.space');
    //-----为每个3D盒子绑定事件
    var spaceTweens=new Array();
    for(var i=0;i<spaceArr.length;i++){
        spaceTweens[i]=new TimelineMax();
    }
    for(let i=0;i<spaceArr.length;i++){
        spaceArr[i].addEventListener('mouseenter',function(){
            spaceTweens[i].to(spaceArr[i],0.3,{transform:"rotateX(90deg)"});
        },false);
        
        spaceArr[i].addEventListener('mouseleave',function(){
            spaceTweens[i].clear();
            spaceTweens[i].to(spaceArr[i],0.3,{transform:"rotateX(0deg)"});
        },false);
    }


    //-----为language绑定事件
    var selectTween=new TimelineMax();
    var select=O('.select');
    var optBtn=select.children[0];
    var language=select.children[1];
    optBtn.addEventListener('mouseenter',function(){
        selectTween.clear();
        selectTween.to(language,0.4,{opacity:1});
    },false)
    select.addEventListener('mouseleave',function(){
        selectTween.clear();
        selectTween.to(language,0.5,{opacity:0});
    },false);



    //-----为nav绑定事件（滑动下划线）
    var navTween=new TimelineMax();
    var markLine=O('.markLine');
    var nav=O('.nav');
    var navLis=O('.nav li');
    for(let i=0;i<navLis.length;i++){
        navLis[i].addEventListener('mouseenter',function(){
            navTween.clear();
            var cLeft=this.getBoundingClientRect().left-nav.getBoundingClientRect().left;
            markLine.style.width=getStyle(this,'width');
            navTween.to(markLine,0.3,{opacity:1,left:cLeft+'px'},0);
        },false);
        navLis[i].addEventListener('mouseleave',function(){
            navTween.clear();
            navTween.to(markLine,0.3,{opacity:0},0);
        },false);
    }
}

index.resizeEvent=function(){
    $(window).resize(index.resize);
}

index.scene2Event=function(){

    // horFlip触摸停止自动播放事件
    $('.horFlip').bind('mouseenter',function(){
        index.scene2Aon.autoPlay=false;
    })

    $('.horFlip').bind('mouseleave',function(){
        index.scene2Aon.autoPlay=true;
    })
    
    // subNav触摸停止自动播放事件
    $('.subNavFont').bind('mouseenter',function(){
        index.scene2Aon.autoPlay=false;
    })

    $('.subNavFont').bind('mouseleave',function(){
        index.scene2Aon.autoPlay=true;
    })


    
    // horFlip点击翻页事件
    $('.Sprev').bind('click',function(){
        index.scene2Aon.prototype.changeStep(index.scene2Aon.currentStep,index.scene2Aon.currentStep-1);
    })
    $('.Snext').bind('click',function(){
        index.scene2Aon.prototype.changeStep(index.scene2Aon.currentStep,index.scene2Aon.currentStep+1);
    })


    // subNav点击翻页事件
    $('.subNavFont').bind('click',function(){
        index.scene2Aon.prototype.changeStep(index.scene2Aon.currentStep,this.index);
    })

}


index.headerAon=function(){
    var headerTween=new TimelineMax();
    var header=O('#header');
    var headerChilds=header.children[0].children;
    var hLeft=header.getBoundingClientRect().left+parseFloat(getStyle(header,'width'));
    for(var i=0;i<headerChilds.length;i++){
        (i!=headerChilds.length-1)&&(headerChilds[i].style.opacity=0);
    }
    header.style.left=hLeft+'px';
    headerTween.to(header,0.8,{left:"22px"});
    for(var i=0;i<headerChilds.length;i++){
        headerTween.to(headerChilds[i],0.3,{opacity:1});
    }

    index.headerAon.time=headerTween.totalDuration();
}

index.headerChangeAon=function(scene,i){
    if(index.currentHeader==index.currentScreen)
        return;
    else{
        index.currentHeader=index.currentScreen;
    }
    console.log(index.currentHeader)
    var hcTween=new TimelineMax();
    var header=O('#header');
    var prevH=O('.headerNav');
    var backH=prevH.cloneNode(true);
    header.insertBefore(backH,prevH);
    addClass(backH,'headerNavChange');
    backH.style.backgroundColor=getStyle(scene,'backgroundColor');
    
    if(i==0){
        
    }

    if(i==1){
    }

    if(i==2){
        backH.style.backgroundColor='#ED7F6A';
    }

    if(i==3){

    }
    if(i==4){
        
    }

    if(i==5){
        
    }


    hcTween.to(header,0.8,{transform:'rotateX(90deg)',ease:Elastic.easeOut,onComplete:function(){
        hcTween.to(header,0,{transform:'rotateX(0)'});  //定好初始状态
        header.removeChild(prevH);
        remClass(backH,'headerNavChange');
        headerEvent();
    }});

}


index.scene2Aon=function(){
    index.scene2Aon.currentStep=1;
    index.scene2Aon.autoPlay=true;
    index.scene2Aon.prototype.navFocus=function(step){
       var subNavs=O('.subNavFont');
        for(var i=0;i<subNavs.length;i++){
            remClass(subNavs[i],'focus');
            (i==(step-1))&&addClass(subNavs[i],'focus');
        }
    }
    index.scene2Aon.prototype.changeStep=function(currentStep,toStep){

        (toStep==$('.step').length+1)&&(toStep=1);  //末尾转头部
        (toStep==0)&&(toStep=$('.step').length);  //头部转末尾

        var csTween=new TimelineMax();
        var random;
        var csChildren=O('.step')[currentStep-1].children;
        var toChildren=O('.step')[toStep-1].children;

        while((random=getRandom(-1,1))==0){
            continue;
        }

        csTween.staggerTo(csChildren,0.2,{
            transform:`rotateX(${random*90}deg)`,
            opacity:0
        },0.1)

        csTween.staggerTo(toChildren,0.2,{
            transform:'rotateX(0deg)',
            opacity:1,
            onComplete:function(){
                index.scene2Aon.currentStep=toStep;
                index.scene2Aon.prototype.navFocus(toStep);
            }
        },0.1)

    }

    this.autoPlay=setInterval(function(){
        if(!index.scene2Aon.autoPlay){
            ;
        }else{
            toStep=index.scene2Aon.currentStep+1;
            if(index.scene2Aon.currentStep>=O('.step').length){
                toStep=1;
            }
            index.scene2Aon.prototype.changeStep(index.scene2Aon.currentStep,toStep);
        }
    },5000);



    index.scene2Aon.prototype.navFocus(1);
}

index.initAon=function(){
    var scene1Tween=new TimelineMax();
    var scene1=O('#scene1');
    var scene1Logo=O('.scene1Logo');
    var scene1Content=O('#scene1Content');
    var lighLeft=O('.lightLeft')
    var lightRight=O('.lightRight');

    scene1Logo.style.opacity=0;
    scene1Content.style.opacity=0;
    lighLeft.style.visibility='hidden';
    lightRight.style.visibility='hidden';


    scene1Tween.to(scene1Logo,0.5,{opacity:1},index.headerAon.time);
    scene1Tween.to(scene1Content,2,{opacity:1,transform:'rotateX(0deg)',ease:Elastic.easeOut});
    scene1Tween.to(lighLeft,0.8,{visibility:'visible',transform:'rotate(0deg)',ease:Cubic.easeOut},3);
    scene1Tween.to(lightRight,0.8,{visibility:'visible',transform:'rotate(-0deg)',ease:Cubic.easeOut},3);

    index.initAon.time=scene1Tween.totalDuration();
}

index.showNext=function(){
    var nextTween=new TimelineMax();
    var next=O('.next');
    nextTween.to(next,0.3,{visibility:'visible',opacity:1},index.initAon.time-1);
    index.showNext.time=nextTween.totalDuration();

    // next.changeColor=true;
    next.flashTimer=setInterval(function(){
            if(next.changeColor){
                addClass(next,'nextColor');
                next.changeColor=false;
            }else{
                remClass(next,'nextColor');            
                next.changeColor=true;
            }
    },1500)
}

index.showBar=function(){
    var to=new TimelineMax;
    to.to('body',0,{height:8500},index.initAon.time);
}














window.onload=function(){
    index.init();
    // document.documentElement.style.overflowY = 'hidden';
    // 我觉得bindEvents放在bindAon后面比较好，因为bindEvents有可能会用到Aon的time
}
