$(document).ready(function(){	
	
	(function($){

   var arraySticky = [];
	var $sticky = $('.stick');
   var $window = $(window);
   var count = 1;

	$sticky.each(function(index){
		arraySticky.push($(this));
	});	
/* stickyeahClon Функция: Клонирует эл.html,удаляет-добавляет классы,устанавливает свойства css.*/
   var stickyeahClon = function(array){ 
     	$window.off('scroll', handlerOne);
      $.each(array, function(i){ 		
         switch (i) {
            case 0: 
               $stickyClon1 = array[i]
                                       .clone()
                                       .addClass('sticky_clone')
                                       .removeClass('container__block stick')
                                       .insertAfter(this) 
                                       .css({'z-index': 4,
															'position': 'fixed',
															'top':0});			
					break;   // Для перехода в конец инструкции switch 99% обязательно.		
			   case 1:  
               $stickyClon2 = array[i]
                                       .clone() 
													.addClass('sticky_clone')																										
													.removeClass('central__aside stick')
                                       .insertAfter(this)
													.css({'z-index': 4,
															'position': 'fixed',
															'top':52+'px',
															'background-color':'rgb(255,236,153)',
															'width': 76+'px','height': 1000+'px'})                   
                break;           
         };
         return; 
      });
   }; // end
/* Блок кода определяет поведение меню*/	
	var fclick = function(){
		$('.menu__item__tier')
								.animate({height:0},'slow')
								.removeClass('is-active')
								.addClass('is-hidden'); 								
			$('.central').on('mouseenter', '.menu__item', fover );
	};
																				
	var fover = function(){
		$('.menu__item__tier')
								.removeClass('is-hidden')
								.addClass('is-active')
								.css('height',0)
								.animate({height:360}, 'slow');								
	  		$('.central').off('mouseenter'); /*mouseenter*/
	};	
 /* end*/   
   var handlerTwo = function(e){
      if ($window.scrollTop() < 442){
			$(".central").css({"margin-top":0}); 				    
         $('.sticky_clone').remove();
			$sticky.show();
         count = 1; // Переприсваивание для цикла while
         $window.on('scroll', handlerOne);    
      };
   }; 
	  
   var handlerOne = function(e){   
      if ($window.scrollTop() > 442)
         while ( count  < 2 ){  /* Цикл необходим для использования единственного события */        			
            stickyeahClon(arraySticky);
				//$sticky.css({'visibility': 'hidden'});
				//$sticky.css({'display': 'none'});
				//$('.central').css({'padding-top': 54 +'px'});				
			 // Вместо цикла можно использовать /setTimeout(function(){varCall=true},500); Повторный вызов примется через 500 мл.
            count++;  
         };		
      }; 

	$window.scroll(function() { // Регистрация анoнимного обработчика события X scroll.
			$('.sticky_clone').offset({left: 0}); // Привязываем классы "sticky_clone" к краю page.
	});
 	     
   $window.on({'scroll': handlerOne, 'scroll': handlerTwo}); // Элемент $(window) будет кэширован
	$('.central').on('mouseenter', '.menu__item', fover ); //Делегированная обработка событий. mouseenter
	$('.central').on('click', '.menu__item__tier', fclick ); //Делегированная обработка событий.
	$('.menu__item__tier').addClass('is-hidden');
	
	})(jQuery) 
})