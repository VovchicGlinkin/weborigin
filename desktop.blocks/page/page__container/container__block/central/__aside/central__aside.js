(function($){	// Определяем функцию обработчик для события resize scroll
	var item = $();
	$.central__aside = function(option) {
		option = $.extend({ scroll: true}, option);
		item = $('.central__aside');
		
		if (!true) { 
			item = $('.central__aside');
			item.filter(function() {
				return !$(this).data('initialized');
			})
			.data({'initialized':true});
		item.trigger('central__aside: reflow');		
		}
		//console.log(option);
	}
	$(function(){
		$.central__aside(); //Вызов функции	
	});
	$(window).bind ('resize scroll', function(e){ // К окну подключаем обработчик
		//console.log('resize or scroll');
		item.trigger('central__aside: reflow', e);// Запускает обработчик события для данного элемента и посылаем ему параметр reflow.	
		
	});	
})(jQuery);