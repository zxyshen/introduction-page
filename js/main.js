var blog={}

blog.getScrollDir=function(e){
    if(e.wheelDelta){
        if(e.wheelDelta>0){
            return 'top';
        }else if(e.wheelDelta<0){
            return 'bottom';
        }
    }
    else if(e.detail){
        if(e.detail>0){
            return 'bottom';
        }else if(e.detail<0){
            return 'top';
        }
    }
}
blog.onCollision=function(self,target){
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
blog.initWH=function(){
    $('body').css('font-size',Number($(window).width())*0.011+'px');
    $('#wrapper').height($(window).height());
    $('#content').height($(window).height());
    $('#content').css('top',$(window).height());
    $('.scene').css('top',$(window).height());
    $('.sr').css('top',-$(window).height());
    for(var i=1;i<=blog.currentScene;i++){
        (i!=4)&&$('#scene'+i).css('top',-$(window).height());
    }
}
blog.changeSceneFun=function(s4Value,sValue,s,fnc){
    blog.changeScene=false;
    var ease='Cubic.easeOut';
    if(sValue>0)
        ease='Cubic.easeIn';

    var sceneId='#scene'+blog.currentScene;
    if(blog.currentScene==4){
        blog.SCTween.to($(sceneId),s,{
            'left':s4Value,
            ease:Cubic.easeOut
        })
    }else{
        blog.SCTween.to($(sceneId),s,{
            'top':sValue,
            ease:ease
        })
    }
    blog.SCTween.add(fnc)
}
blog.toScene=function(dir,s){
    var tempScene=blog.currentScene;
    if(dir=='bottom'){
        if(blog.currentScene+1<=$('.scene').length){
            blog.currentScene++;
            tempScene++;
            blog.changeSceneFun(0,-$(window).height(),1.2,function(){
                blog.changeScene=true;
                blog.sceneAon(blog.currentScene);
            })
        }
    }else
    if(dir='top'){
        if(blog.currentScene>0){
            tempScene--;
            blog.changeSceneFun('100%',0,1.2,function(){
                blog.changeScene=true;
                blog.currentScene--;
                blog.sceneAon(blog.currentScene);
            })
        }
    }

    blog.onProgress(tempScene);
}
blog.toDesignScene=function(scene){
    if(scene>blog.currentScene){
        // dir='bottom';
        for(var i=blog.currentScene;i<=scene;i++){
            (i!=4)&&$('#scene'+i).css('top',-$(window).height());
            (i==4)&&$('.sr').css('left',0);
        }
    }else{
        // dir='top';
        for(var i=blog.currentScene;i>scene;i--){
            (i!=4)&&$('#scene'+i).css('top',0);
            (i==4)&&$('.sr').css('left','100%');
        }
    }
    blog.currentScene=scene;
    blog.onProgress(blog.currentScene);
    blog.sceneAon(blog.currentScene);
}

blog.init=function(){
    blog.config();
    blog.bindAon();
    blog.bindEvent();
}

blog.config=function(){
    blog.configWhole();
    // blog.configChangeSceneTw();
}

blog.bindAon=function(){
    blog.bindInitAon();
    // blog.bindS1Aon();
}

blog.bindEvent=function(){
    blog.bindWholeEvent();
    blog.bindS3Event();
    blog.bindS4Event();
}



blog.bindInitAon=function(){
    var $wmask=$('.wmask');
    var $banner=$('#banner');
    var $banner_h2=$banner.find('h2');
    var $knowMe=$banner.find('.knowMe');

    // 遮罩消失
    $wmask.fadeOut(3000);
    // logo显示
    $banner_h2.show(1400);
    $banner.removeClass('loadstart');


    // KnowMe闪烁
    $knowMe.light=true;
    var KMTween=new TimelineMax;
    $knowMe.timmer=setInterval(function(){
        if($knowMe.light){
            KMTween.to($knowMe,2.6,{
                'boxShadow':'0em 0em 15em rgb(255, 255, 255)'
            })
            $knowMe.light=false;
        }else{
            KMTween.to($knowMe,2.6,{
                'boxShadow':'0em 0em 1em rgb(255, 255,255)'
            })
            $knowMe.light=true;
        }
    },2600)
    

    // showContent出现
    var $show_content_box=$('#show_content_box');
    $show_content_box.fadeIn(200);
    $show_content_box.animate({
        'bottom':0
    },1350);
}


blog.bindWholeEvent=function(){
    $(window).on('resize',function(){
        blog.initWH();
    })
    
    // aside
    var $nav_menu_show_btn=$('.nav-menu-show-btn');
    var $nav_menu_close_btn=$('.nav-menu-close-btn');
    var $menu=$('#menu');
    var $asidemask=$('.asidemask');
    var $NMTween=new TimelineMax
    $nav_menu_show_btn.on('click',function(){
        $NMTween.clear();
        $asidemask.fadeIn();
        $NMTween.to($menu,.4,{
            right:0,
            ease:"Linear.easeIn"
        })
        blog.asideMenuOpen=true;
        
    })

    $nav_menu_close_btn.on('click',function(){
        $NMTween.clear();
        $asidemask.fadeOut();
        $NMTween.to($menu,.4,{
            right:'-22em',
            ease:"Linear.easeOut"
        })
        blog.asideMenuOpen=false;
        
    })

    $menu.on('mouseenter',function(){
        blog.asideMenuOpen=true;
    })

    $menu.on('mouseleave',function(){
        blog.asideMenuOpen=false;
        
    })

    $(document).on('click',function(){
        if(!blog.asideMenuOpen){
            $NMTween.clear();
            $asidemask.fadeOut();
            $NMTween.to($menu,.4,{
                right:'-22em',
                ease:"Linear.easeOut"
            })
        }
        blog.asideMenuOpen=true;
    })



    // 滑动鼠标全屏切换
    $(document).on('mousewheel DOMMouseScroll',function(ev){
        // 控制切换间隔，一次只能滑动一张页面。其实用one绑定事件也可以。
        if(!blog.changeScene)
            return;
        blog.SCTween.clear();
        if(blog.getScrollDir(ev.originalEvent)=='bottom'){
            // 向下翻页
            blog.toScene('bottom');
        }else if(blog.getScrollDir(ev.originalEvent)=='top'){
            // 向上翻页
            blog.toScene('top');
        }
    })

    // more/查看我的技能树/我的作品/了解我        点击翻页
    // knowMe
    // show_content_box
    // show_tree_box
    // show-right-box
    // show-s5-btn

    $('.knowMe,#show_content_box,#show_tree_box,.show-right-box,.show-s5-btn').one('click',ck)

    function ck(){
        $('.knowMe,#show_content_box,#show_tree_box,.show-right-box,.show-s5-btn').off('click',ck)
        blog.toScene('bottom');
        clearTimeout($(this).stopTimer);
        $(this).stopTimer=setTimeout(function(){
            $('.knowMe,#show_content_box,#show_tree_box,.show-right-box,.show-s5-btn').one('click',ck)
        },1200)
    }



    var as=$('.menuU a');
    as.eq(0).click(function(){
        blog.toDesignScene(0);
    })
    as.eq(1).click(function(){
        blog.toDesignScene(1);
    })
    as.eq(2).click(function(){
        blog.toDesignScene(3);
        
    })
    as.eq(3).click(function(){
        blog.toDesignScene(4);
        
    })
    as.eq(4).click(function(){
        blog.toDesignScene(5);
        
    })
    as.eq(5).click(function(){
        blog.toDesignScene(5);
    })
}


blog.configWhole=function(){
    blog.asideMenuOpen=true;
    blog.currentScene=0;
    blog.changeScene=true;
    blog.initWH();
    blog.SCTween=new TimelineMax;
    blog.progressTween=new TimelineMax;
}

blog.onProgress=function(scene){
    var cent=scene/$('.scene').length*100;
    blog.progressTween.to($('.progress'),.8,{
        width:cent+'%'
    })
}





blog.sceneAon=function(currentScene){
    blog.sceneAonInit(currentScene);





    (currentScene==1)&&(blog.bindS1Aon());
    (currentScene==2)&&(blog.bindS2Aon());
    (currentScene==3)&&(blog.bindS3Aon());
    (currentScene==5)&&(blog.bindS5Aon());
}

blog.sceneAonInit=function(currentScene){

    if(currentScene>=2){
        $('#show_content_box').fadeOut(400)
    }else{
        $('#show_content_box').fadeIn(400)
    }

    // s1 init
    if(currentScene!=1){
        var $s1ps=$('#scene1').find('p');
        var s1Aon=new TimelineMax;
        s1Aon.staggerTo($s1ps,.4,{
            opacity:0,
            transform: 'rotateX(100deg)',
        },0)
    }


    // s2 init
    if(currentScene!=2){
        var $s2ps=$('#scene2').find('p');
        var $more=$('#show_content_box').find('span');
        var s2Aon=new TimelineMax;
        s2Aon.staggerTo($s2ps,.4,{
            opacity:0,
            transform: 'rotateX(100deg)',
        },0)

        $('#show_tree_box').fadeOut();

        $('#show_tree_box').animate({
            'bottom':'0em'
        },0)
        
    }



    // scene3 init
    if(currentScene!=2){

    }
}




blog.bindS1Aon=function(){
    var $s1ps=$('#scene1').find('p');
    var s1Aon=new TimelineMax;
    s1Aon.staggerTo($s1ps,.5,{
        opacity:1,
        transform: 'rotateX(360deg)',
        ease:Linear.easeInOut
    },.3)
}

blog.bindS2Aon=function(){
    var $s2ps=$('#scene2').find('p');
    var $showCt_box=$('#show_content_box');
    var $more=$('#show_content_box').find('span');
    var s2Aon=new TimelineMax;
    s2Aon.staggerTo($s2ps,.5,{
        opacity:1,
        transform: 'rotateX(360deg)',
        ease:Linear.easeInOut
    },.3)
    
    $('#show_tree_box').animate({
        'bottom':'3em'
    },800)
    $('#show_tree_box').fadeIn(800);
}


blog.bindS3Aon=function(){

    // 技能树出现
    var $s3tree=$('#skill_tree');
    var $nodes=$('.node');
    var $more_box=$('#show_content_box');
    var s3Aon=new TimelineMax;
    var nodeAon=new TimelineMax;

    s3Aon.to($s3tree,2.1,{
        height:'100%',
        ease:Linear.easeOut
    })
    var count=0;
    $s3tree.timer=setInterval(function(){
        $($nodes).each(function(i){
            if(blog.onCollision($s3tree.get(0),$nodes.eq(i).get(0))){
                nodeAon.to($nodes.eq(i),0,{
                    'background':'#fff',
                    'box-shadow':'0 0 4em #fff',
                    onComplete:function(){
                        $nodes.eq(i).find('.node-desp').show(600);
                    }
                })
                count++;
            }
        })
        if(count==$nodes.length)
            clearInterval($s3tree.timer);
    },300)
}

blog.bindS5Aon=function(){
    $('.inp').focus();
    $('#s5-left').animate({
        left:0
    },500,function(){
    })
}













blog.bindS3Event=function(){
    var $node_desp=$('.node-desp');
    var NDTween=new TimelineMax;
    $node_desp.on('click',function(){
        var This=$(this);
        if(This.attr('data-dir')=='front'){
            NDTween.to(This,0,{
                'transform':'rotateX(180deg)',
                onComplete:function(){
                    This.find('.front').addClass('dy-none');
                    This.find('.back').removeClass('dy-none');
                    This.attr('data-dir','back');
                }
            })
        }else
        if(This.attr('data-dir')=='back'){
            NDTween.to(This,0,{
                'transform':'rotateX(0deg)',
                onComplete:function(){
                    This.find('.back').addClass('dy-none');
                    This.find('.front').removeClass('dy-none');
                    This.attr('data-dir','front');
                }
            })
        }
    })
}



blog.bindS4Event=function(){
    var $wkvs=$('.wkv');
    var $s4bl=$('.s4bl');
    var $s4br=$('.s4br');

    $wkvs.currentv=0;
    $s4bl.on('click',function(){
        $wkvs.eq($wkvs.currentv).fadeOut(400);
        $wkvs.currentv==0?($wkvs.currentv=$wkvs.length-1):($wkvs.currentv--);
        $wkvs.eq($wkvs.currentv).fadeIn(400);
    })

    $s4br.on('click',function(){
        if($wkvs.currentv==($wkvs.length-1))
        return;
        $wkvs.eq($wkvs.currentv).fadeOut(400);
        // $wkvs.currentv==($wkvs.length-1)?($wkvs.currentv=0):($wkvs.currentv++);
        $wkvs.currentv++;
        $wkvs.eq($wkvs.currentv).fadeIn(400);
        if($wkvs.currentv==$wkvs.length-1)
            $('.show-s5-btn').fadeIn(5000);
    })

}


$(function(){
    // $('.wmask').fadeOut(3000);
    blog.init();
})