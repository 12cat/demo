
/**
 *
 * 图片滚动方法：
 *
 * 例：new ScrollImg('.class1', 200, 150, '.left' , '.right', '.class2');
 *
 * _class1：大图片父元素div class名称，前面加“.”。
 *       w：大图片宽度（不加 px）
 *       h：大图片高度（不加 px）
 *   _left：左侧按钮 class名称，前面加“.”。
 *  _right：右侧按钮 class名称，前面加“.”。
 * _class2：小图片父元素div class名称，前面加“.”。
 *
 *
 *
 *   html：
 	<div class="class1">
		<a href="#"><img src="img/max1.png" /></a>
		<a href="#"><img src="img/max2.png" /></a>
		<a href="#"><img src="img/max3.png" /></a>
    </div>
    <a href="javascript:;" class="left">left</a>
    <a href="javascript:;" class="right">right</a>
    <div class="class2">
    	<a href="javascript:;"><img src="img/min1.png" /></a>
		<a href="javascript:;"><img src="img/min2.png" /></a>
		<a href="javascript:;"><img src="img/min3.png" /></a>
    </div>
 *
 *
 */

function ScrollImg(_class1, w, h, _left, _right, _class2){
	var index = 0;	// 指针
	var length = $(_class1).find('a').length;	// 获取图片数量
	var length2 = $(_class2).find('a').length;	// 获取小图片数量
	var class1 = $(_class1);
	var class1_a = class1.find('a');
	class1_a.wrapAll("<div></div>");			// 给所有大图标外的 a 标签加一个父元素 div
	var class1_div = class1.find('div');
	var class2 = $(_class2);
	var class2_a = class2.find('a');
	
	class1_div.append(class1.find('a:first').clone());	// 复制第一张大图片，并添加到最后一个位置
	class1.css({
		'overflow':'hidden',
		'position':'relative',
		'width':w+'px',
		'height':h+'px',
		});
	class1_div.css({
		"width":"9999px",
		"position":"absolute",
		});
	class1_a.css({
		'float':'left'
		});
	class1.find('img').css({
		'width':w+'px',
		'height':h+'px',
		});
	opacity();									// 初始化小图片不透明度
	var _scrollRun = setInterval(run,3000);		// 初始化设置
	class1.hover(	// 大图片鼠标事件，用于停止和开始动画效果
		function(){
			clear();
		}, function(){
			_scrollRun = setInterval(run,3000);
		}
	);
	class2_a.each(function(i) {	// 小图片鼠标事件，用于停止和开始动画效果
		$(this).hover(
			function(){
				index = i;
				if(!class1_div.is(':animated')){
					class1_div.animate({left:-w*i},700);
				} else {
					class1_div.animate({left:-w*i},0);
				}
				opacity();
				clear();
			}, function(){
				_scrollRun = setInterval(run,3000);	// 开始循环
			}
		);
	});
	$(_left).click(function(){ onClick(0); });	// 左侧按钮
	$(_right).click(function(){ onClick(1); });	// 右侧按钮
	function run(){			// 图片滚动方法
		index = index<length?index+1:0;
		class1_div.animate({left:-w*index},700);
		if(index==length){	// 重置位置
			class1_div.animate({left:0},0);
			index=0;
		}
		opacity();
	}
	function clear(){		// 停止动画效果
		clearInterval(_scrollRun);
		_scrollRun = null;
	}
	function opacity(){		// 设定小图片的不透明度
		class2_a.css('opacity','0.6');
		class2_a.eq(index).css('opacity','1');
	}
	function onClick(x){	// 点击事件，参数 x=0 表示左侧按钮，否则表示右侧按钮
		if(!class1_div.is(':animated')){
			if(x==0){
				index = index<1?length-1:index-1;
			} else {
				index = index+1>=length?0:index+1;
			}
			class1_div.animate({left:-w*index},700);
			opacity();
			clear();
			scrollRun();
		}
	}
}