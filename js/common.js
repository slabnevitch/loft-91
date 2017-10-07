$(function() {

	

	function sidebarClick() {
		$('.toggle-mnu').toggleClass("on");
		$('body').toggleClass('sidebar-menu--open');
		// $(".main-mnu").stop(true, true).slideToggle();
		return false;
		
	}

	function Menu(){
		var __self = this,
		$nav = $('.sidebar-menu');

		this.init = function(){
			this.listeners();
			this.triangulate($('.menu li'));
		},
		this.listeners = function(){
			// $('.toggle-mnu').on('click', this.toggleClick);
			$('.menu-link').on('click', this.menuClick);
			$(".sidebar-link, .toggle-mnu").on('click', this.sidebarClick);
		},
		this.toggleClick = function(e){

			// $('html').toggleClass('hidden');
			// __self.deleteItem();
		},
		this.sidebarClick = function() {
			$('.toggle-mnu').toggleClass("on");
			$('body').toggleClass('sidebar-menu--open');
			// $(".main-mnu").stop(true, true).slideToggle();
			return false;
		
		},
		this.menuClick = function(e){
			var $th = $(this),
			$parent = $th.parent();
			console.log('menu-click');
			// alert($th.attr('href').indexOf('http'));
			if($th.attr('href').indexOf('http') > -1){
				return;
			}
			if($parent.children('ul').length > 0){
				e.preventDefault();
				__self.renderItem($parent);
				return;
			}
			 __self.scrollToSection($th, e);
		},
		this.scrollToSection = function(link, e) {
			e.preventDefault();
			this.sidebarClick();
			setTimeout(function() {
				var location = link.attr('href'), //секция с id, равным href текущей ссылки
					sectionCoord = $(location).offset().top;
				$('html, body').animate({scrollTop: sectionCoord + 50}, 800);
				
			}, 400);
			
		},
		this.renderItem = function(parent) {

			var $include = parent.find('ul').first().clone(),
				$subContainer = $('<div class="menu-sub-item"></div>')
				$header = $('<a href="#" class="sidebar-menu-title"></a>');

			$header.text(parent.find('a').first().text());
			$header.appendTo($subContainer);
			$include.appendTo($subContainer);
			$subContainer.appendTo($nav);
			if($subContainer.height() < $nav[0].scrollHeight){
				$subContainer.height($nav[0].scrollHeight);
			}
			
			setTimeout(function(){
				$subContainer.addClass('trans'); 
			}, 100);

			$header.on('click', this.delClick);
			this.subLinkListener($subContainer);
			this.triangulate($include.find('li'));
		},
		this.subLinkListener = function($subContainer) {
			$subContainer.find('.menu-link')
			.on('click', this.menuClick);
		}
		this.delClick = function(e) {
			e.preventDefault();
			var $item = $nav.find('.menu-sub-item').last();
			$item.removeClass('trans');
			__self.deleteItem();

		},
		this.deleteItem = function() {
			setTimeout(function() {
				$nav.find('.menu-sub-item').last().remove();
			}, 300);
		},
		this.triangulate = function(analisatedLi) {
			analisatedLi.has('ul').addClass('triangulated');
		}
	}
	var menu = new Menu();
	menu.init();

	// Owl
	$(document).ready(function() {
		
		$('#header-car').owlCarousel({
			items: 1,
			loop: true,
			nav: true,
			navText: [],
			autoplay: true,
			animateOut: 'fadeOut'
		});

		
		$('#testim-car').owlCarousel({
			items: 1,
			loop: true,
			nav: true,
			navText: [],

		});
	});
	
	// end of Owl

	// Popup
	$('.gallery-inner').magnificPopup({
		type: 'image',
		preloader: true,
		focus: '#name',
		closeOnContentClick: false,
		closeBtnInside: false,
		mainClass: 'mfp-with-zoom mfp-img-mobile',
		image: {
			verticalFit: true,
			// titleSrc: function(item) {
			// 	return item.el.attr('title') + ' &middot; <a class="image-source-link" href="'+item.el.attr('data-source')+'" target="_blank">image source</a>';
			// }
		},
		gallery: {
			enabled: true
		},
		zoom: {
			enabled: true,
			duration: 300, // don't foget to change the duration also in CSS
			opener: function(element) {
				return element.find('img');
			}
		}
		
	});

	$('.popup-with-form').magnificPopup({
		type: 'inline',
		preloader: false,
		focus: '#name',

		// When elemened is focused, some mobile browsers in some cases zoom in
		// It looks not nice, so we disable it:
		callbacks: {
			beforeOpen: function() {
				if($(window).width() < 700) {
					this.st.focus = false;
				} else {
					this.st.focus = '#name';
				}
			},
			beforeClose: function() {
				$('.hidden-form input:not([type=checkbox]), .hidden-form .check-custom').tooltipster('close');
			}
		}
	});
	// end of Popup
	
	// Select2
		$('select').select2({
			minimumResultsForSearch: Infinity
		});
	// end of Select2

	//Tooltipster
		$('.tooltipster, .select2').tooltipster({
			trigger: 'custom',
			side: 'right',
			// trackOrigin: true,
			maxWidth: 200,
			repositionOnScroll: true,
			// content: 'Пожалуйста, заполните это поле'
		});
	//end of Tooltipster

	// Validation
		function Validate(form){
			var __self = this;
  		var currentForm = form;
		  	console.log('Form ' + currentForm);
		  
		  this.init = function(){
		    this.regListeners();
		  },
		  this.regListeners = function(){
		    console.log('regListeners');
		    form.on('submit', this.formSubmit);
		    form.find('input').on('keydown', this.inputKeyDown);
		    form.find('input').on('focusout', this.inputFocusOut);
		    form.find( 'select').on('change', this.selectChange);
		    form.find( 'input:checkbox').on('change', this.checkStatus);
		  },
		  this.formSubmit = function(e){
		   
		    
		    if(__self.formValidate($(this)) == false){
		     return false;
		    }
		    return true;
		   
		  },
		  this.formValidate = function(form){
		  	console.log('validate');
		    var validation = true;
		    var $inputs = form.find('input'),
		        $selects = form.find('select'),
		        $checkboxes = form.find('input:checkbox');
		    
		    console.log('val= '+ $selects.val());
		    $checkboxes.each(function(index, elem) {
		    	var $checkbox = $(elem);
			    if(!$checkbox.prop("checked")){
			      validation = false;
			      __self.createTooltip($checkbox.next());
			    }
		    });
		    $selects.each(function(index, elem) {
		    	var $select = $(elem);
			    if(!$select.val()){
			      validation = false;
			      __self.createTooltip($select.next('.select2'));
			    }
		    });
		    $inputs.each(function(index, elem){
		      var $input = $(elem);
		      
		      if($input.val() == ''){
		        validation = false;
		        __self.createTooltip($input);
		      }
		      
		    });
		    return validation;
		  
		  },
		  
		  this.createTooltip = function($toolParent){
		    console.log($toolParent);
		  	$toolParent.tooltipster('open');
		  	console.log($toolParent.tooltipster('status').state);
		  },
		  
		  this.inputKeyDown = function(){
		    $(this).tooltipster('close');
		  },
		  this.inputFocusOut = function(){
		    if($(this).val() == "") __self.createTooltip($(this));
		  },
		  this.selectChange = function(){
		    console.log('change');
		    console.log($(this).val());
		    if($(this).val()){
		      console.log('val is available');
		      $(this).next('.select2').tooltipster('close');
		    } 
		  },
		  this.checkStatus = function(e) {
		  	if($(this).prop("checked")){
		  		$(this).next().tooltipster('close');
		  	}
		  	// console.log($(this).prop("checked"));
		  }
		}
	// var valid = new Validate();
	// valid.init();
	// end of Validation
	$('.my-form__submit').click(function(e) {
		// e.preventDefault();
		var valid = new Validate($(this).closest('form')); 
		valid.init();
		// console.log($(this).closest('.hidden-form'));
	});
	// dotdotdot
	$(document).ready(function() {
		$(".news-annonce").dotdotdot({
	      // Options go here
	  });
	});
	// dotdotdot

	// Contact handler
		var translated = false;
		$('.contacts-inner .fa-times').click(function(e) {
			var $th = $(this),
				
				$parent = $th.closest('.contact-transf'),
				$contacts = $('.contacts'),
				$sectionHeight = $contacts.height() - 50;

			if(!translated){
				$parent.css('transform', 'translateY('+ $sectionHeight + 'px'+')');
				$th.addClass('fa-chevron-up');
				translated = true;
			}else{
				$parent.css('transform', 'translateY(0)');
				$th.removeClass('fa-chevron-up');
				translated = false;
			}
			console.log(translated);

		});
	// end of Contact handler

	// GSAP
			var $logo = $('.main-logo');

			var tl = new TimelineLite();
			tl.fromTo($logo, 1, {scale: 0, rotation: 180}, {scale: 1, rotation: 0}, 1)
				.fromTo('.header__top-inner', .5, {y: -100}, {y: 0}, '$logo')
				.fromTo('.icon-logo_small', 1, {opacity: 0}, {opacity: 1}, 3);


	// end of GSAP


	// Waypoints
	var waypoint = new Waypoint({
		element: document.getElementById('about'),
		handler: function() {
		    // alert('putin');
		    var tl = new TimelineLite();
		    tl.staggerTo($('.about__icons-item'), .5, { ease:Elastic. easeOut.config( 1, 0.3), opacity: 1, y: 0}, 0.2);
		},
		 offset: -20
	});
	waypoint2 = new Waypoint({
		element: document.getElementById('gallery'),
		handler: function() {
		    // alert('putin');
		    var tl = new TimelineLite();
		    tl.staggerTo($('.gallery-inner'), .5, {opacity: 1, scale: 1}, 0.2);
		},
		offset: 100
	});
	waypoint3 = new Waypoint({
		element: document.getElementById('equipment'),
		handler: function() {
		    // alert('putin');
		    var tl = new TimelineLite();
		    tl.staggerTo($('.equipment-item'), .5, {opacity: 1, x: 0}, 0.2);
		},
		offset: 100
	});

	waypoint4 = new Waypoint({
		element: document.querySelector('.news'),
		handler: function() {
		    // alert('putin');
		    var tl = new TimelineLite();
		    tl.staggerTo($('.news-item'), .5, {opacity: 1, y: 0}, 0.2);
		},
		offset: 100
	});
	// end of Waypoints
		//Chrome Smooth Scroll
	try {
		$.browserSelector();
		if($("html").hasClass("chrome")) {
			$.smoothScroll();
		}
	} catch(err) {

	};

	$("img, a").on("dragstart", function(event) { event.preventDefault(); });
	
});

$(window).load(function() {

	$(".preloader").fadeOut();
	$(".loader").delay(400).fadeOut("slow");

});
