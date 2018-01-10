$(function(){
	$(".jzan").click(function(){
		var zann=$(this).children("span");
		$.post('forlove.php/Home/Index/zan',{gid:zann.attr("id")},
			function(data){
				if(data!=1){
					$(".notic").html("点赞失败本IP已经点赞过");
					$(".notic").fadeIn().delay(1000).fadeOut();
				}else{
					$(".notic").html("点赞成功");
					$(".notic").fadeIn().delay(1000).fadeOut();
					zann.html(parseInt(zann.html())+1);
				}
			});
	});

	$(".pjiao").click(function(){
		var id=$(this).prev().prev().val();
		var content=$(this).prev().val();
		var objcontent=$(this).prev();
		var adds=$(this).parent().parent().find("ul");
		if(content==""){
			$(".notic").html("请填写内容");
			$(".notic").fadeIn().delay(1000).fadeOut();
		}else if(content.length>100){
			$(".notic").html("内容填写过多，请删减后再提交");
			$(".notic").fadeIn().delay(1000).fadeOut();
		}else{
		$.post('forlove.php/Home/Index/reply',{co:content,gid:id},
		function(data){
			if(data==-1){
				$("#hiid").attr("value",id);
				$("#hireply").attr("value",content);
				objcontent.attr("value","");
				$(".hidemask2").fadeIn();
			}else{
				objcontent.attr("value","");
				var addhtml='<li class="replys"><span class="replyname">我的评论</span>：'+content+'</li>';
				adds.prepend(addhtml);
				$(".notic").html("评论提交成功");
				$(".notic").fadeIn().delay(1000).fadeOut();
			}
		})
		}
	});

	$(".hisu").click(function(){
		var search_str = /^[\w\-\.]+@[\w\-\.]+(\.\w+)+$/;
		if($("#email").val()=="" || $("#realname").val()==""){
			$(".notic").html("请填写完成所有信息后提交");
			$(".notic").fadeIn().delay(1000).fadeOut();
		}else if(!search_str.test($("#email").val())){
			$(".notic").html("邮箱填写不正确");
			$(".notic").fadeIn().delay(1000).fadeOut();
		}else{
		$(".hisu").attr("disabled","disabled");
		$(".hisu").attr("value","正在发布评论...");
		var pos="#reply-"+$("#hiid").attr("value");
		var content=$("#hireply").attr("value");
		var addhtml='<li class="replys"><span class="replyname">我的评论</span>：'+content+'</li>';
		$(pos).prepend(addhtml);
		$.post('forlove.php/Home/Index/reply2',$("#reply2").serialize(),
			function(data){
				if(data==1){
					$(".hidemask2").fadeOut();
					$(".hisu").removeAttr("disabled");
					$(".notic").html("评论提交成功");
					$(".notic").fadeIn().delay(1000).fadeOut();
				}else{
					$(".hidemask2").fadeOut();
					$(".hisu").removeAttr("disabled");
					$(".notic").html("评论失败，数据库错误，请联系管理员");
					$(".notic").fadeIn().delay(1000).fadeOut();
				}
			}
			)
		}
	});
	$(".butt").click(function(){
		$(".hidemask").fadeIn();
	});
	$(".close").click(function(){
		$(".hidemask").fadeOut();
		$(".hidemask2").fadeOut();
	});
	$(".hidegaobaisubmit").click(function(){
		var search_str = /^[\w\-\.]+@[\w\-\.]+(\.\w+)+$/;
		if($("#gemail").val()=="" || $("#grealname").val()=="" || $("#gtowho").val()=="" || $("#gcontent").val()==""){
			$(".notic").html("请填写完整告白后再发布");
			$(".notic").fadeIn().delay(1000).fadeOut();
		}else if(!search_str.test($("#gemail").val())){
			$(".notic").html("邮箱填写不正确");
			$(".notic").fadeIn().delay(1000).fadeOut();
		}else if($("#gcontent").val().length>140){
			$(".notic").html("告白内容过多，请保持内容在100个字左右。");
			$(".notic").fadeIn().delay(1000).fadeOut();
		}else{
			$(".hidegaobaisubmit").attr("disabled","disabled");
			$(".hidegaobaisubmit").attr("value","正在提交数据...");
			$.post('forlove.php/Home/Index/gaobai',$("#gaobai").serialize(),
			function(data){
				if(data==0){
					$(".notic").html("请填写所有内容后提交");
					$(".notic").fadeIn().delay(1000).fadeOut();
					$(".hidegaobaisubmit").removeAttr("disabled");
					$(".hidegaobaisubmit").attr("value","发布");
				}else{
					if(data==-2){
						$(".notic").html("IP地址被临时锁定，请稍后发布消息");
						$(".notic").fadeIn().delay(1000).fadeOut();
						$(".hidegaobaisubmit").removeAttr("disabled");
						$(".hidegaobaisubmit").attr("value","发布");
					}else{
						$.ajax({
						url: "forlove.php",
						cache: false,
						success: function(html){
							$("body").delay(2000).empty();
						    $("body").append(html);
						    $(".notic").html("发布成功");
							$(".notic").fadeIn().delay(1000).fadeOut();
							$(".hidegaobaisubmit").removeAttr("disabled");
							$(".hidegaobaisubmit").attr("value","发布");
						}
						});
						}
				}
			}
		)
		}
	});

	$(".num,.current,.next,.end,.prev,.first").click(function(){
		var tt=$(this);
		$(".load").show();
		jumpthis(tt);
		return false;
	});

	$("#slink").click(function(){
		$(".search").fadeToggle(500);
	});
	$("#ilink").click(function(){
		$(".load").show();
		$.ajax({
		url: "forlove.php",
		cache: false,
		success: function(html){
			$("body").empty();
		    $("body").append(html);
		    $(".notic").html("已经回到主页");
			$(".notic").fadeIn().delay(1000).fadeOut();
		}
		})
	});
	$("#alink").click(function(){
		$(".load").show();
		$.ajax({
		url: "forlove.php/Home/Index/about",
		cache: false,
		success: function(html){
			$("body").empty();
		    $("body").append(html);
		    $(".notic").html("关于新媒体");
			$(".notic").fadeIn().delay(1000).fadeOut();
		}
		})
	})
	$(".sjiao").click(function(){
		$.post('forlove.php/Home/Index/search',$(".sform").serialize(),
			function(data){
				if(data==0){
					$(".notic").html("没有搜索到该结果");
					$(".notic").fadeIn().delay(1000).fadeOut();
				}else{
					var se="forlove.php/Home/Index/dosearch/s/"+$('.sin').val();
					$.ajax({
					url: se,
					cache: false,
					success: function(html){
						$("body").delay(2000).empty();
					    $("body").append(html);
					    $(".notic").html("搜索结果如下");
						$(".notic").fadeIn().delay(1000).fadeOut();
					}
					});
				}
			})
	});
	$(".more").click(function(){
		$(this).prev().css("height","auto");
		$(this).css("display","none");
	})
})

function jumpthis(tt){
	var url=tt.attr('href');
	$.ajax({
	url: url,
	cache: false,
	success: function(html){
		$("body").delay(2000).empty();
	    $("body").append(html);
	    $("html,body").animate({scrollTop:"0px"},400);
	}
	});
}
