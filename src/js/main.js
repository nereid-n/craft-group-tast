$(document).ready(function(){
	$(".block").hover(
		function(){
			var block = $('.block').eq($(this).index());
			var bord = block.children('.bord');
			if (bord.length == 0) {
				$(this).append('<div class="bord">');
				var bord = block.children('.bord');
				var position = $(this).offset();
				bord.offset({top:position.top, left:position.left - 50});
				$('.active' ,this).animate({opacity: 1}, 1000);
				bord.animate({opacity: 1, left: 0}, 1000);
			}
			else {
				bord.stop();
				$('.active' ,this).animate({opacity: 1}, duration(bord, 'left'));
				bord.animate({opacity: 1, left: 0}, duration(bord, 'left'));
			}
	}, 
		function(){
			var block = $('.block').eq($(this).index());
			var bord = block.children('.bord');
			bord.stop();
			$('.active' ,this).animate({opacity: 0}, duration(bord, 'right'));
			bord.animate({opacity: 0, left: -50}, duration(bord, 'right'));
			setInterval(function() {
				if(bord.css('opacity') == 0)
					bord.remove();
			}, 2000);
	})
})

function duration(bord, direction) {
	var duration;
	var pos = bord.css('left');
	pos = parseInt(pos, 10);
	pos *= -1;
	if (direction === 'left')
		duration = 1000 / (50 / pos);
	else {
		if (pos === 0)
			duration = 1000;
		else
			duration = 1000 - (1000 / (50 / pos));
	}
	return duration;
}