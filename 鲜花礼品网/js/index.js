// JavaScript Document
/*ad. effects*/
$("#Top .close").click(function(){
	$("#Top").slideUp();
});

/*nav effects*/
$("#nav ul li.nav").hover(function(){
	//当鼠标移入
	var _left=$(this).position().left;
	var _width=$(this).width();
	$("#nav ul li.last").css("width",_width).show().stop().animate({left:_left},100);
},function(){
	//当鼠标移除
	$("#nav ul li.last").hide();
});

/*吸顶盒导航*/
$(window).scroll(function(){
	var _top=$(window).scrollTop();//获取浏览器窗口滚动高度
	var _height=$("#Top_box").height();
	if(_top>=_height){
		$("#nav").addClass("nav_box");
		$(".menu").hide();
		$(".flash,.news").css("top","-10px");
	}else{
		$("#nav").removeClass("nav_box");
		$(".menu").show();
		$(".flash,.news").css("top","0px");
	}	
});
//二级菜单中的moreNav
$("#nav ul li .menu ol li").hover(function(){
	$(this).addClass("hover")
	var _top=$(this).position().top;
	var _height=$(this).find(".moreNav").height()/3;

	if(_top>_height){
		if($(this).index()==5){
			$(this).find(".moreNav").css("top",-(_height*3-68));
		}else{
			$(this).find(".moreNav").css("top",-_height);
		}
	}
}, function(){
	$(this).removeClass("hover");
});

/*首页轮播*/
var _index=0;
var prior_index=0;//前一张图片序列号
var clearTime=null;
var begin_time=new Date()//获取当前时间

$(".btn span").mousemove(function(){
	clearInterval(clearTime);
	_index=$(this).index();//获取序列号
	scrollPlay();
	prior_index=_index;
}).mouseout(function(){
	autoPlay();
});
//右按钮切换
$(".flash a.next").click(function(){
	var newtime=new Date();
	if(newtime-begin_time>300){
		_index++;
		if(_index>5){
			_index=0;
			prior_index=5;
		}
		scrollPlay();
		prior_index=_index;
	}
	begin_time=new Date();
});
//左按钮切换
$(".flash a.prev").click(function(){
	var newtime=new Date();
	if(newtime-begin_time>300){
		_index--;
		if(_index<0){
			_index=5;
			prior_index=0;
		}
		scrollPlay();
		prior_index=_index;
	}
	begin_time=new Date();
});

$(".flash a.prev,.flash a.next").hover(function(){
	clearInterval(clearTime);
},function(){
	autoPlay();
});

autoPlay();
//自动轮播
function autoPlay(){
	clearTime=setInterval(function(){
		_index++;
		if(_index>5){
			_index=0;
			_qindex=5;
		}
		scrollPlay();
		prior_index=_index;
	},2000);
}

function scrollPlay(){
	$(".flash .btn span").eq(_index).addClass("hover").siblings("span").removeClass("hover");
	if(_index==5 && prior_index==0){
		prev();
	}else if(_index==0 && prior_index==5){
		next();
	}else if(_index>prior_index){
		next();
	}else if(_index<prior_index){
		prev();
	}
}
//下一张，左移
function next(){
		$(".scroll img").eq(prior_index).animate({"left":"-820px"},300);
		$(".scroll img").eq(_index).css("left","820px").animate({"left":"0px"},300);

};

//上一张 ，右移
function prev(){
		$(".scroll img").eq(prior_index).animate({"left":"820px"},300);
		$(".scroll img").eq(_index).css("left","-820px").animate({"left":"0px"},300);
}

//按扭显示隐藏
$(".flash").hover(function(){
	//显示
	$("a.prev,a.next").show();
},function(){
	//隐藏
	$("a.prev,a.next").hide();
});
/*首页轮播 end*/

/*节日提醒滚动效果*/
	var y=0;
	var _top=0;
	var _t=0;
	var newTop=0;
$(".scrollBut").mousedown(function(e){
	y=e.clientY;  //鼠标按下的那个点与浏览器窗口上面的距离
	_top=$(".scrollBut").offset().top;//滑块与浏览器窗口上面的距离
	_t=y-_top; //鼠标按下去的那个点与滚动条上面的距离
	var _height=$(".scrollBar").height()-$(".scrollBut").height();
	$(document).mousemove(function(e){
		newTop=e.clientY-$(".scrollBar").offset().top-_t;//获取滑块与滚动条上面的距离
		
		if(newTop<0){ newTop=0;}
		if(newTop>_height){ newTop=_height;}
		
		$(".scrollBut").css("top",newTop);
		//获取文字移动的比例
		var pl=newTop/_height;	
		var _scrollHeight=pl*($(".Date_flash ul").height()-120);
		$(".Date_flash ul").css("top",-_scrollHeight);
	});
	$(document).mouseup(function(){
		$(document).unbind("mousemove");
		$(document).unbind("mouseup");
	});
	return false;
});

/*倒计时*/
//第一个倒计时
var endTime1=new Date();
endTime1.setFullYear(2015);
endTime1.setMonth(9);
endTime1.setDate(1);
endTime1.setHours(24);
endTime1.setMinutes(00);
endTime1.setSeconds(00);
var endTimes1=endTime1.getTime();
var obj1=$("#NewProduct dt.time1 font");
setInterval(function(){
	changeTime(endTimes1,obj1)
},1000);
changeTime(endTimes1,obj1);

//第二个倒计时
var endTime2=new Date();
endTime2.setFullYear(2015);
endTime2.setMonth(9);
endTime2.setDate(7);
endTime2.setHours(24);
endTime2.setMinutes(00);
endTime2.setSeconds(00);
var endTimes2=endTime2.getTime();
var obj2=$("#NewProduct dt.time2 font");
setInterval(function(){
	changeTime(endTimes2,obj2)
},1000);
changeTime(endTimes2,obj2);

var endTime3=new Date();
endTime3.setFullYear(2015);
endTime3.setMonth(9);
endTime3.setDate(3);
endTime3.setHours(24);
endTime3.setMinutes(00);
endTime3.setSeconds(00);
var endTimes3=endTime3.getTime();
var obj3=$("#NewProduct dt.time3 font");
setInterval(function(){
	changeTime(endTimes3,obj3)
},1000);
changeTime(endTimes3,obj3);

var endTime4=new Date();
endTime4.setFullYear(2015);
endTime4.setMonth(9);
endTime4.setDate(1);
endTime4.setHours(24);
endTime4.setMinutes(00);
endTime4.setSeconds(00);
var endTimes4=endTime4.getTime();
var obj4=$("#NewProduct dt.time4 font");
setInterval(function(){
	changeTime(endTimes4,obj4)
},1000);
changeTime(endTimes4,obj4);

var endTime5=new Date();
endTime5.setFullYear(2015);
endTime5.setMonth(9);
endTime5.setDate(1);
endTime5.setHours(24);
endTime5.setMinutes(00);
endTime5.setSeconds(00);
var endTimes5=endTime5.getTime();
var obj5=$("#NewProduct dt.time5 font");
setInterval(function(){
	changeTime(endTimes5,obj5)
},1000);
changeTime(endTimes5,obj5);

var endTime6=new Date();
endTime6.setFullYear(2015);
endTime6.setMonth(9);
endTime6.setDate(6);
endTime6.setHours(24);
endTime6.setMinutes(00);
endTime6.setSeconds(00);
var endTimes6=endTime6.getTime();
var obj6=$("#NewProduct dt.time6 font");
setInterval(function(){
	changeTime(endTimes6,obj6)
},1000);
changeTime(endTimes6,obj6);

var endTime7=new Date();
endTime7.setFullYear(2015);
endTime7.setMonth(9);
endTime7.setDate(7);
endTime7.setHours(24);
endTime7.setMinutes(00);
endTime7.setSeconds(00);
var endTimes7=endTime7.getTime();
var obj7=$("#NewProduct dt.time7 font");
setInterval(function(){
	changeTime(endTimes7,obj7)
},1000);
changeTime(endTimes7,obj7);

var endTime8=new Date();
endTime8.setFullYear(2015);
endTime8.setMonth(9);
endTime8.setDate(8);
endTime8.setHours(24);
endTime8.setMinutes(00);
endTime8.setSeconds(00);
var endTimes8=endTime8.getTime();
var obj8=$("#NewProduct dt.time8 font");
setInterval(function(){
	changeTime(endTimes8,obj8)
},1000);
changeTime(endTimes8,obj8);

function changeTime(endTimes,obj){
	var nowTime=new Date();
	var s=(endTimes-nowTime.getTime())/1000;
	if(s>0){
		var day=Math.floor(s/86400);
			s=s%86400; //剩下秒数  s=s-day*86400
		var hours=Math.floor(s/3600); 
			s=s%3600;  //s=s-hours*3600
		var minutes=Math.floor(s/60);
		s=Math.floor(s%60); //秒
		
		$(obj).eq(0).html(fullZero(day,2));
		$(obj).eq(1).html(fullZero(hours,2));
		$(obj).eq(2).html(fullZero(minutes,2));
		$(obj).eq(3).html(fullZero(s,2));
	}
}
//创建补0方法
function fullZero(itime,n){
	var str=""+itime;
	while(str.length<n){
		str="0"+str;
	}
	return str;
	
}

/*今日新品图片样式*/
$("#NewProduct .imgList dl").hover(function(){
	$(this).addClass("hover");
},function(){
	$(this).removeClass("hover");
});

/*今日新品中的换一批*/
var mark=0;
var clearProduct=null;
$("#NewProduct .change").click(function(){
	product_antoPlay();
});

function product_antoPlay(){
	if(mark==1){
		mark=0;
	}else{
		mark=1;
	}
	$("#NewProduct .imgList").eq(mark).fadeIn().siblings(".imgList").fadeOut();
}

$("#NewProduct .change").hover(function(){
	clearInterval(clearProduct);
},function(){
	clearProduct=setInterval(product_antoPlay,4000);
});

clearProduct=setInterval(product_antoPlay,4000);

/*flower 栏目*/
$("#Flower ul.flower_nav li").not(".title").mousemove(function(){
	$(this).addClass("hover").siblings("li").removeClass("hover");
	var _index=$(this).index();
	$("#Flower .flower_right .flowerComm").eq(_index).show().siblings().hide();
});
//flower flowerComm p事件
$("#Flower .flowerComm li").hover(function(){
	$(this).find("p").slideDown();
},function(){
	$(this).find("p").slideUp();
});

//flower 手风琴效果
$("#Flower .accordion li").mousemove(function(){
	$(this).addClass("box").siblings().removeClass("box");
	$(this).find("h3").addClass("hover").parent().siblings("li").find("h3").removeClass("hover");
});

/*cake js*/
//放大镜特效
$(".cake_left ul.product_display li").click(function(){	
	$(".cake_left .gray").show();
	$(".cake_left .showCake").show();
	var img_cake=$(this).find("img").attr("src");
	$(".cake_left .showCake img.cake_img").attr("src",img_cake);
})
$(".cake_left .gray").click(function(){
	$(".cake_left .gray").hide();
	$(".cake_left .showCake").hide();
});

/*Floor*/
//轮播特效重用
var FloorObj1=$("#Floor_one .commFlash ul.img_btn li");
var FloorObj1_scroll=$("#Floor_one .commFlash ul.flashImg");
var FloorObj1_next=$("#Floor_one .next");
var FloorObj1_prev=$("#Floor_one .prev");

var FloorObj2=$("#Floor_two .commFlash ul.img_btn li");
var FloorObj2_scroll=$("#Floor_two .commFlash ul.flashImg");
var FloorObj2_next=$("#Floor_two .next");
var FloorObj2_prev=$("#Floor_two .prev");

var FloorObj3=$("#Floor_third .commFlash ul.img_btn li");
var FloorObj3_scroll=$("#Floor_third .commFlash ul.flashImg");
var FloorObj3_next=$("#Floor_third .next");
var FloorObj3_prev=$("#Floor_third .prev");

var FloorObj4=$("#Floor_four .commFlash ul.img_btn li");
var FloorObj4_scroll=$("#Floor_four .commFlash ul.flashImg");
var FloorObj4_next=$("#Floor_four .next");
var FloorObj4_prev=$("#Floor_four .prev");

function commFlash(obj,objScroll,FloorObjNext,FloorObjPrev){
	var Flash_index=0;
	var timeInterval=null;
	/*轮播按钮*/
	obj.hover(function(){
		Flash_index=$(this).index();
		Scroll();
		clearInterval(timeInterval);
	},function(){
		AutoFlash();
	});
	
	/*左切换按钮*/
	FloorObjNext.click(function(){
		Flash_index++;
		if(Flash_index>obj.length-1){
			Flash_index=0;
		}
		Scroll();
	});
	
	/*右切换按钮*/
	FloorObjPrev.click(function(){
		Flash_index--;
		if(Flash_index<0){
			Flash_index=obj.length-1;
		}
		Scroll();
	});
	
	/*当鼠标放到左右切换按钮时启停定时器*/
	FloorObjNext.hover(function(){
		clearInterval(timeInterval);
	},function(){
		AutoFlash();
	});
	FloorObjPrev.hover(function(){
		clearInterval(timeInterval);
	},function(){
		AutoFlash();
	});
	
	function AutoFlash(){
		timeInterval=setInterval(function(){
			Flash_index++;
			if(Flash_index>obj.length-1){
				Flash_index=0;
			}
			Scroll();
		},2000);
	}

	AutoFlash();

	function Scroll(){
		obj.eq(Flash_index).addClass("hover").siblings("li").removeClass("hover");
		objScroll.animate({left:Flash_index*-429},300);
	}
}
commFlash(FloorObj1,FloorObj1_scroll,FloorObj1_next,FloorObj1_prev);
commFlash(FloorObj2,FloorObj2_scroll,FloorObj2_next,FloorObj2_prev);
commFlash(FloorObj3,FloorObj3_scroll,FloorObj3_next,FloorObj3_prev);
commFlash(FloorObj4,FloorObj4_scroll,FloorObj4_next,FloorObj4_prev);

/*LTNav 特效*/
$("#LTNav li").not(".Top").hover(function(){
	$(this).addClass("hover");
},function(){
	$(this).removeClass("hover");
});

	var mark=1;//标记
$("#LTNav ul li").not(".Top").click(function(){
	mark=2;
	$("#LTNav ul li").find("span").removeClass("active");
	$(this).find("span").addClass("active");
	var _index=$(this).index();//获取楼梯式导航栏的index
	var _top=$("#Main div.LT").eq(_index).offset().top;//获取当前div与浏览器窗口的距离
	$("body,html").animate({scrollTop:_top-50},500,function(){
		mark=1
	});//500毫秒内跳转到对应的div
});

$(window).scroll(function(){
	if(mark==1){
		var _STop=$(this).scrollTop();//获取浏览器滚动的高度
		var _TOP=$("#Main div.LT").eq(0).offset().top-100;
		if(_STop>_TOP){
			$("#LTNav").fadeIn();
		}else{
			$("#LTNav").fadeOut();
		}
		
		var obj=$("#Main div.LT");
		obj.each(function() {
			var _index=$(this).index();
			var _Height=obj.eq(_index).offset().top+$(this).height()/2;
			if(_STop<_Height){
				$("#LTNav ul li").find("span").removeClass("active");
				$("#LTNav ul li").eq(_index).find("span").addClass("active");
				return false;
			}
		});
	}
});

$("#LTNav li.Top").click(function(){
	$("body,html").animate({scrollTop:0},500);
	mark=1;
});



















