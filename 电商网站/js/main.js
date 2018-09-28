var index={};
index.init=function(){
    index.config();
    index.bindAon();
    index.bindEvent();
}

// 初始化配置
index.config=function(){
    // topBar
    index.configTopBar();

    // middleBar
    index.configMiddleBar();

    // ct-sup-left
    index.configCtSupLeft();

    // ct-sup-main
    index.configCtSupMain();
}

// 绑定动画
index.bindAon=function(){
    index.bindMiddleBarAon();
}


// 绑定事件集合
index.bindEvent=function(){
    // topBar
    index.bindTopBarEvent();

    // middleBar
    index.bindMiddleBarEvent();

    // nav
    index.bindNavEvent();

    // ct-sup-left
    index.bindEventCtSupLeft();

    // ct-sup-main
    index.bindCtSupMainEvent();

    // to-top
    index.bindToTopEvent();
}




// 模仿placeholder，为了兼容ie。
index.placeholder=function(obj,text){
    obj.value=text;
    obj.onfocus=function(){
        $(obj).removeClass('inp-onblur');
        (obj.value==text)&&(obj.value='');
    }
    obj.onblur=function(){
        $(obj).addClass('inp-onblur');
        (obj.value.length==0)&&(obj.value=text);
    }
}

// 查找该对象实例上有多少个属性
index.countAttr=function(obj){
    // 不包括symbol定义的属性，兼容ie
    if(!!window.ActiveXObject || "ActiveXObject" in window){
        var count=0;
        for(var attr in obj){
            if(obj.hasOwnProperty(attr)){
                count++;
            }
        }
        return count++;
    }

    // 包括symbol定义的属性，但是不兼容ie
    return Reflect.ownKeys(obj).length;

}

// autoplay
// 只适用于那种ul li的轮播图
index.autoplay=function(obj,flip,bg){
    clearInterval(obj.autoplayTimer);
    obj.autoplayTimer=setInterval(function(){
        if($(obj).attr('data-play')!='auto'){
            clearInterval(obj.autoplayTimer);
            return;
        }
        var nowPage=Number($(obj).attr('data-page'));
        var nextPage=nowPage+1;
        (nowPage==$(obj).find('li').length)&&(nextPage=1)

        index.changePage($(obj).find('li'),nowPage,nextPage);
        
        (flip)&&(index.changeFlip($(flip).find('a'),nextPage));
        (bg)&&(index.changeBgLight(bg,nextPage,1))
    },3400)
}

    index.changePage=function($pages,nowPage,nextPage,quickly){
        if(nowPage==nextPage)
            return;

        if(quickly){
            $pages.eq(nowPage-1).fadeOut(500);
            $pages.eq(nextPage-1).fadeIn(300);
            $pages.parent().attr('data-page',nextPage);
            return;
        }
        $pages.eq(nowPage-1).fadeOut(1500);
        $pages.eq(nextPage-1).fadeIn(1000);
        $pages.parent().attr('data-page',nextPage);
    }

    index.changeFlip=function($flips,nextPage){
        $($flips).each(function(i){
            $flips.eq(i).removeClass('ct-flip-btn-hover');
        })
        $flips.eq(nextPage-1).addClass('ct-flip-btn-hover');
    }

    index.changeBgLight=function(bg,index,speed){
        if(bg.index==index)
            return;
        var time=0;
        if(speed==1){
            time=600;
        }else if(speed==2){
            time=300;
        }

        var $bgLis=$(bg).find('li');
        $($bgLis).each(function(i){
            $bgLis.eq(i).fadeOut(speed);
        })
        var toBgLight=$bgLis.eq(index-1).fadeIn(time);

        
        bg.index=index;
    }






// topBar
index.configTopBar=function(){
    var $user_inps=$('.user-inp');
    index.placeholder($user_inps.eq(0).get(0),'请输入登录邮箱/手机号');
    index.placeholder($user_inps.eq(1).get(0),'xxxxxxxx');
    index.placeholder($user_inps.eq(2).get(0),'请输入邮箱/手机号');
    index.placeholder($user_inps.eq(3).get(0),'xxxxxxxx');
}

index.bindTopBarEvent=function(){
    // 单击收藏
    var $collectBtn=$('.top-bar-one');
    $collectBtn.on('click',function(){
        alert("抱歉，您所使用的浏览器无法完成此操作。\n请使用快捷键Ctrl+D进行添加！");
    })


    // userform
    var userTween=new TimelineMax();
    // 单击登录
    var $loginBtn=$('.ln');
    var $wmask=$('.wmask');
    var $userForm=$('#user-form-box');
    var $log=$('.log');
    var $reg=$('.register');
    var $user_swapBtns=$('.user-swap');
    $loginBtn.on('click',function(){
        $wmask.removeClass('dy-none');
        $userForm.removeClass('dy-none');
        userTween.to($userForm,0.7,{top:80})
        $reg.addClass('dy-none');
        $user_swapBtns.eq(1).removeClass('user-swap-hover');
        $log.removeClass('dy-none');
        $user_swapBtns.eq(0).addClass('user-swap-hover');
    })
    

    // 单击注册
    var $registerBtn=$('.rr');
    $registerBtn.on('click',function(){
        $wmask.removeClass('dy-none');
        $userForm.removeClass('dy-none');
        userTween.to($userForm,0.7,{top:80})
        $log.addClass('dy-none');
        $user_swapBtns.eq(0).removeClass('user-swap-hover');
        $reg.removeClass('dy-none');
        $user_swapBtns.eq(1).addClass('user-swap-hover');
    })

    // close userform
    var $user_closeBtn=$('#user-close-btn');
    $user_closeBtn.on('click',function(){
        $wmask.addClass('dy-none');
        $userForm.addClass('dy-none');
        userTween.to($userForm,0,{top:0})
    })


    // 登录/注册

    // 7天登录/同意协议
    
    // 忘记密码

    // qq和微信的接口

}





// middleBar
index.configMiddleBar=function(){
    index.goodsCont=0;
    index.openResultBox=false;
    index.placeholder($('.search-inp').get(0),'iphone X');
}

index.bindMiddleBarAon=function(){
    var mbarTween=new TimelineMax;
    mbarTween.to($('.logo'),3,{left:0,ease:"Bounce.easeOut"});
}

index.bindMiddleBarEvent=function(){
    // search-form
    var $search_inp=$('.search-inp');
    var $search_result_box=$('.search-result-box');

    $search_inp.on('focus',function(){
        $search_result_box.removeClass('dy-none');
        $search_inp.addClass('search-inp-focus');
    })

    $search_result_box.on('mouseenter',function(){
        index.openResultBox=true;
    })
    $search_result_box.on('mouseleave',function(){
        index.openResultBox=false;
    })

    $search_inp.on('blur',function(){
        if(index.openResultBox==false){
            $search_inp.removeClass('search-inp-focus');
            $search_result_box.addClass('dy-none');
        }
    })



    // jsonp
    $search_inp.on('keyup.input',function(){
        var wd=$search_inp.get(0).value;
        var noCache = Date();
        var src='https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd='+wd+'&cb=?';
        $.getJSON(src,{"noCache":noCache},function(data){
            $search_result_box.get(0).innerHTML='';  
            $.each(data.s,function(i){
                if(i>=5)
                    return;
                var $newLi=$('<li>');
                $newLi.html(data.s[i]);
                $newLi.on('click',function(){
                    $search_inp.get(0).value=data.s[i];
                    var url='https://www.baidu.com/s?wd='+data.s[i];
                    window.open(url);
                })
                
                $search_result_box.append($newLi);
            })
        })
        this.prevValue=wd;
    })
    
    

    
    // search-btn
    var $search_btn=$('.search-btn');
    $search_btn.on('click',function(){
        var wd=$search_inp.get(0).value;
        var url='https://www.baidu.com/s?wd='+wd;
        window.open(url);
    })
    


    // shopping cart
    var $shopcart_box=$('.shopcart-box');
    var $shopcar_show_btn=$('.shopcart-show-btn');
    var $shopcar_result_box=$('.shopcart-result-box');

    $shopcar_show_btn.on('mouseenter',function(){
        $shopcar_result_box.fadeIn(200);
    })

    var $shopinform_show_btn=$('.shopinform-show-btn');
    var $shopinform_box=$('.shopinform-box');
    $shopinform_show_btn.on('mouseenter',function(){
        $shopinform_box.fadeIn(200);
    })
    $shopcart_box.on('mouseleave',function(){
        $shopcar_result_box.fadeOut(0);
        $shopinform_box.fadeOut(0);
    })




}



// nav
index.bindNavEvent=function(){
    var $navs=$('.nav a ');
    $navs.on('mouseenter',function(){
        var navETween=new TimelineMax;
        navETween.to($(this),0.2,{fontSize:'22px',backgroundColor:'#4593fd'})
    })

    $navs.on('mouseleave',function(){
        var navLTween=new TimelineMax;
        navLTween.to($(this),0.2,{fontSize:'16px',backgroundColor:'#1369C0'})
    })
}





// ct-sup-left
index.configCtSupLeft=function(){
    // 获取tw-right
    var $nav_one_downmenu=$('.nav-one-downmenu');
    var $tw_right=$('.tw-right');
    // 载入数据
    $(tw_right_data).each(function(i){
        var $tt_1=$('<ul>');
        $tt_1.addClass('tt-1 dy-none');

        // for(var j=0;j<index.countAttr(tw_right_data[i]);j++){
        //     var $li=$('<li>');
        //     var $span=$('<span>')
        //     $span.html(tw_right_data[i][j]['title']);
        //     console.log(tw_right_data[i][j]['title'])
        // }

        for(var attr in tw_right_data[i]){
            if(tw_right_data[i].hasOwnProperty(attr)){
                var $li=$('<li>');
                var $span=$('<span>')
                $span.html(tw_right_data[i][attr].name);
                var $tt_2=$('<ul>');
                $tt_2.addClass('tt-2')
                $tt_2.addClass('ow-hidden')
                $(tw_right_data[i][attr].value).each(function(index){
                    var $li=$('<li>');
                    var $a=$('<a>');
                    $a.get(0).href='###';
                    $a.html(tw_right_data[i][attr].value[index]);
                    $li.append($a);
                    $tt_2.append($li);
                })
                $li.append($span);
                $li.append($tt_2);
                $tt_1.append($li);
            }
            $tw_right.append($tt_1);
        }

    })
}

index.bindEventCtSupLeft=function(){
    var $ct_sup_left=$('.ct-sup-aside');
    var $ct_sup_leftLis=$('.nav-one-downmenu>li');


    $ct_sup_leftLis.on('mouseenter',function(){
        $($ct_sup_leftLis).each(function(i){
            $ct_sup_leftLis.eq(i).removeClass('ct-sup-leftLis-hover');
        })
        $ct_sup_leftLis.eq($(this).index()).addClass('ct-sup-leftLis-hover');
    })





    var $tw_right=$('.tw-right');
    var $tt_1=$('.tt-1');

    $ct_sup_left.on('mouseenter',function(){
        $tw_right.fadeIn(200);
    })

    $ct_sup_leftLis.on('mouseenter',function(){
        $($tt_1).each(function(i){
            $tt_1.eq(i).addClass('dy-none');
        })
        $tt_1.eq($(this).index()).removeClass('dy-none');
    })

    $ct_sup_left.on('mouseleave',function(){
        $tw_right.fadeOut(20);
        $($ct_sup_leftLis).each(function(i){
            $ct_sup_leftLis.eq(i).removeClass('ct-sup-leftLis-hover');
        })
    })


}







// ct-sup-main
index.configCtSupMain=function(){
    // 固定5张图片，图片src动态换
    var $ct_sup_screen_a=$('.ct-sup-screen a');
    var $loader=$('.loader');
    $($ct_sup_screen_a).each(function(i){
        // 图片预加载
        var $img=$('<img />');
        var oimg=new Image;
        oimg.src='./images/'+ct_sup_screen_img[i];
        $ct_sup_screen_a.eq(i).append($img);
        var s='./images/'+ct_sup_screen_img[i];
        oimg.onload=function(){
            $img.attr('src',s);
            $loader.addClass('dy-none');
        }
    })
    
    // 轮播
    index.autoplay($('.ct-sup-screen').get(0),$('.ct-flip-box').get(0),$('.bg-light').get(0));
}




index.bindCtSupMainEvent=function(){
    // 总共有三种播放方式。1.autoplay 2.中间翻页  3.下面的flip

    var $flip_btns=$('.ct-flip-btn');
    var $pages=$('.ct-sup-screen li');
    var $bg_light=$('.bg-light');

    var $next_btn=$('.next');
    var $prev_btn=$('.prev');


    // 中间翻页
    $next_btn.on('click',function(){
        var nowPage=Number($('.ct-sup-screen').attr('data-page'));
        var nextPage=nowPage+1;
        (nowPage==$('.ct-sup-screen').find('li').length)&&(nextPage=1)

        index.changePage($('.ct-sup-screen').find('li'),nowPage,nextPage,true);
        
        index.changeFlip($flip_btns,nextPage);
        index.changeBgLight($bg_light.get(0),nextPage);
    })

    $prev_btn.on('click',function(){
        var nowPage=Number($('.ct-sup-screen').attr('data-page'));
        var nextPage=nowPage-1;
        (nowPage==0)&&(nextPage=$('.ct-sup-screen').find('li').length)

        index.changePage($('.ct-sup-screen').find('li'),nowPage,nextPage,true);
        
        index.changeFlip($flip_btns,nextPage);
        index.changeBgLight($bg_light.get(0),nextPage);
    })



    // 下面翻页
    $flip_btns.on('click',function(){
        var next=$(this).index('.ct-flip-btn')+1;
        index.changeFlip($flip_btns,next);
        index.changePage($pages,Number($('.ct-sup-screen').attr('data-page')),next,true);
        index.changeBgLight($bg_light.get(0),next,2);
    })        

    // 移动到屏幕中时停止自动播放
    var $ct_sup_main=$('.ct-sup-main');
    $ct_sup_main.on('mouseenter',function(){
        $('.ct-sup-screen').attr('data-play','none');
    })


    // 移出屏幕继续播放
    $ct_sup_main.on('mouseleave',function(){
        $('.ct-sup-screen').attr('data-play','auto');
        index.autoplay($('.ct-sup-screen').get(0),$('.ct-flip-box').get(0),$('.bg-light').get(0));
    })
}




// rocket to-top

index.bindToTopEvent=function(){
    var $to_top_box=$('.to-top');
    var $to_top=$('.rocket');
    $('body,html').scrollTop()>200?$to_top_box.fadeIn(500):$to_top_box.fadeOut();
    
    $(document).on('scroll',function(){
        $('body,html').scrollTop()>200?$to_top_box.fadeIn(500):$to_top_box.fadeOut();
    })
    
    $to_top_box.on('mouseenter',function(){
        $to_top.fadeIn(200);
    })

    $to_top_box.on('mouseleave',function(){
        $to_top.fadeOut(200);
    })



    $to_top_box.on('click',function(){
        var pos=0;
        
        timer=setInterval(function(){
            $('.rocket').css({
                'background-position' : pos * (-127) - 283 + 'px -18px'
            })
            pos++;
            if (pos >= 4) {
                pos = 0;
            };
        },20)

        // document.body.scrollTop||document.documentElement.scrollTop
        $('body,html').animate({
            'scrollTop' : 0
        },600,function(){
            clearInterval(timer);
        })

        $('.to-top').animate({
            'top':'-100px',
            
        },800,function(){
            //让火箭回到初始状态
            $('.to-top').css({
                'top':'80%'
            })
            
            $('.rocket').css({
                'background-position':'-158px -18px',
                'display':'none'
            })
        })

    })
}








window.onload=function(){
    index.init();
}