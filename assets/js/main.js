;(function($) {

	var $body = $('body');
	var windowHeight = $(window).height();

	$(function() {

		//Scroll page and Add header menu item active class
		$(document).on('click', 'nav .menu__link', function(event) {
			event.preventDefault();

			var $this = $(this);

			$this.closest('nav')
					.find('.menu__link--active')
					.removeClass('menu__link--active');
					
			$this.addClass('menu__link--active');
			
			var elementId = $this.attr('href');

			if (elementId.length > 2) {
				var top = $(elementId).offset().top;

				$body.animate({
					scrollTop: top
				}, 1200);	
			}
		});// end click

		
		$('.head-top menu').on('click', '.menu__link', function(event) {
			event.preventDefault();
			/* Act on the event */
		});

		//Sliders
		var headSlider = $('.head-slider');

		headSlider.slick({
			arrows: false,
			infinite: true,
			speed: 1400,
			slide: '.head-slide',
			draggable: false,
			pauseOnHover: false,
			pauseOnFocus: false,
			autoplay: true,
			autoplaySpeed: 1700
		});

		// Change slider arrow color
		$(document).on('click', '.head-slider .slide-arrow', function(event) {
			event.preventDefault();
			
			var $this = $(this);

			$this.siblings().removeClass('slide-arrow--active');
			$this.addClass('slide-arrow--active');
		}); // end click

	
		// Slider preview
		var headSliderPreview = $('.head-slider__preview');

		// Add to slider preview next image during first loading page
		var currentSlide = headSlider.slick('slickCurrentSlide');
		var nextDataId = $('.head-slide[data-slick-index=' + (currentSlide + 1) + ']');
		var nextImage = nextDataId.css('backgroundImage');

		headSliderPreview.css('backgroundImage', nextImage);

		// Change slider preview image
		headSlider.on('afterChange', function(event, slick, currentSlide){

			var currentSlide = headSlider.slick('slickCurrentSlide');		  	
			var nextDataId = $('.head-slide[data-slick-index=' + (currentSlide + 1) + ']');
			var nextImage = nextDataId.css('backgroundImage');

			headSliderPreview.css('backgroundImage', nextImage);
		}); //end afterChange


		$(document).on('click', '.slide-arrow__prev', function(event) {
			event.preventDefault();
			headSlider.slick('slickPrev');

			// Change slider preview image
			headSlider.on('afterChange', function(event, slick, currentSlide){

				var currentSlide = headSlider.slick('slickCurrentSlide'); 
				var prevDataId = $('.head-slide[data-slick-index=' + (currentSlide - 1) + ']');
				var prevImage = prevDataId.css('backgroundImage');

				headSliderPreview.css('backgroundImage', prevImage);
			}); //end afterChange
		}); // end click

		$(document).on('click', '.slide-arrow__next', function(event) {
			event.preventDefault();
			headSlider.slick('slickNext');

			// Change slider preview image
			headSlider.on('afterChange', function(event, slick, currentSlide){
				
				var currentSlide = headSlider.slick('slickCurrentSlide');    	
				var nextDataId = $('.head-slide[data-slick-index=' + (currentSlide + 1) + ']');
				var nextImage = nextDataId.css('backgroundImage');

				headSliderPreview.css('backgroundImage', nextImage);
			}); //end afterChange
		}); // end click

		//Testimonials slider
		$('.testimonials-slider').slick({
  			asNavFor: '.testimonials-carousel',
  			slide: '.testimonials-slide',
			arrows: false,
  			slidesToShow: 1,
			infinite: false,
			speed: 1200,
			initialSlide: 3
		});

		$('.testimonials-carousel').slick({
			arrows: true,
			asNavFor: '.testimonials-slider',
  			slide: '.testimonials-carousel__item',
			slidesToShow: 4,
  			slidesToScroll: 1,
			prevArrow: '.carousel-arrow__prev',
			nextArrow: '.carousel-arrow__next',
			infinite: false,
			speed: 1200,
			focusOnSelect: true,
			initialSlide: 3
		});
	
		$('.testimonials-carousel').on('click', '.carousel-arrow', function(event) {
			event.preventDefault();

			var $this = $(this);

			$this.siblings().removeClass('carousel-arrow--active');
					
			$this.addClass('carousel-arrow--active');
		}); // end click


		// About tabs
		//Set data attributs for tabs items
		var aboutMenuItem = $('.tabs-navigation li'),
			aboutContentItem = $('.tabs-content .tab-content');
		
		setDataTab(aboutMenuItem, aboutContentItem);

		// Show selected tab 
		$(document).on('click', '.tabs-navigation li', function(event) {
			event.preventDefault();
			var $this = $(this),
				tabId = $this.attr('data-tab');

			$('.tabs .js-tab-active').removeClass('js-tab-active');

			$this.addClass('js-tab-active');

			$this.closest('.tabs')
					.find('.tab-content[data-tab=' + tabId +']')
					.addClass('js-tab-active');
		}); // end click

		// Services tabs
		//Set data attributs for tabs items
		var serviceMenuItem = $('.service-menu li');
		var serviceContentItem = $('.service-content .service-content__item');
		
		setDataTab(serviceMenuItem, serviceContentItem);

		// Show selected tab 
		$(document).on('click', '.service-menu li', function(event) {
			event.preventDefault();
			var $this = $(this);
			var	tabId = $this.attr('data-tab');

			$('.service-tabs .js-service-active').removeClass('js-service-active');

			$this.addClass('js-service-active');

			$this.closest('.service-tabs')
					.find('.service-content__item[data-tab=' + tabId +']')
					.addClass('js-service-active');
		}); // end click

		// Set data-from value to tag with increment number
		$('.facts').find('[data-from]').each(function(index, el) {
			var $this = $(this);
			var	currentData = $this.data('from');

			$this.text(currentData);
		}); 

		//Show search field
		$(document).on('click', '.search-icon', function(event) {
			event.preventDefault();
			$('.search').slideToggle();
		});
	}); // end ready

	$(window).load(function() {
		
		//Set max content height
		var aboutTabContent = $('.tabs-content .tab-content');

		setMaxHeight(aboutTabContent);

		var serviceTabContent = $('.service-content .service-content__item');

		setMaxHeight(serviceTabContent);

		//Work filter
		var $grid = $('.work-filter').isotope({
		    itemSelector: '.work-filter__item',
		    stagger: 30, // staggers after one another 
		    percentPosition: true,
		    layoutMode: 'masonry',
		    masonry: {
		    	columnWidth: '.work-filter__item',
		    }
		});

		// filter items on link click
		$('.work-menu').on('click', 'li', function(event) {
			event.preventDefault();

			var $this = $(this);
		    var filterValue = $this.children('a').attr('data-work-filter');

		    $grid.isotope({ filter: filterValue });
			
			$this.siblings().removeClass('js-work-menu-active');
			$this.addClass('js-work-menu-active');
		}); // end click

		// Load more to work-filter
		$(document).on('click', '.work__btn', function(event) {
			event.preventDefault();
			
			var btn = $(this).children('.work__btn-icon');

			btn.addClass('work__btn-icon--loading');

			setTimeout(function() {
				$.ajax({
					url: 'load-more.html',
					type: 'POST',
					dataType: 'html',
					success: function(response) {
						if(response.length > 0) {
							elems = $(response);
							$grid.isotope()
								  .append( elems )
								  .isotope( 'appended', elems )
								  .isotope('layout');
						}

	            		btn.removeClass('work__btn-icon--loading');
					},
					error: function() {
						alert('Error loading images');
					}
				});
			}, 800);
		});

		//Google map 
		var $coordinates = {lat: 40.8471069, lng: -74.0767309};
		var $mapOptions = {
	        center: $coordinates, 
	        zoom: 15,
	        mapTypeId: google.maps.MapTypeId.ROADMAP, //ROADMAP, HYBRID etc
			disableDefaultUI: true, //disable controls zooms icon
			scrollwheel: true, // disable map scroll
			draggable: true, // disable drag map with mouse
	    };

		var $mapDiv = $('#map')[0]; // [0] is important, if we use jQuery for a map
		var $map = new google.maps.Map($mapDiv, $mapOptions);


		//Zooming WORK photo
		var modalZoom = $('.modal-zooming');

		$(document).on('click', '.work-filter .work-overlay__link--zoom', function(event) {
			event.preventDefault();

			var imageZoom = $(this).closest('.work-filter__item')
									.css('backgroundImage')
									.replace(/.*\s?url\([\'\"]?/, '').replace(/[\'\"]?\).*/, '');
			var img = $('<img src=' + imageZoom + ' alt="zooming image">');

			$('.modal-zooming__img-box').html(img);	

			var imgWidth = $('.modal-zooming__img-box img')[0].naturalWidth;	
			var imgHeight = $('.modal-zooming__img-box img')[0].naturalHeight;
			var modalWindow = $('.modal-zooming__inner');

			reziseWindow(imgWidth, imgHeight, modalWindow);

			modalZoom.fadeIn();
			
			disableScrolling();

			// For mobile
			$body.on('touchmove', function(e){
				e.preventDefault()
			});
		});

		// Zooming TEAM photo
		$(document).on('click', '.team-item .team-overlay__icon-wrap', function(event) {
			event.preventDefault();

			var imageZoom = $(this).closest('.team-item__img-box')
									.css('backgroundImage')
									.replace(/.*\s?url\([\'\"]?/, '').replace(/[\'\"]?\).*/, '');

			var img = $('<img src=' + imageZoom + ' alt="zooming image">');

			$('.modal-zooming__img-box').html(img);	

			var imgWidth = $('.modal-zooming__img-box img')[0].naturalWidth;	
			var imgHeight = $('.modal-zooming__img-box img')[0].naturalHeight;
			var modalWindow = $('.modal-zooming__inner');

			reziseWindow(imgWidth, imgHeight, modalWindow);

			modalZoom.fadeIn();
			
			disableScrolling();

			// Disable scrolling for mobile
			$body.on('touchmove', function(e){
				e.preventDefault()
			});
		}); // end click

		// Close modalZoom
		$(document).on('click', '.modal-zooming, .modal-zooming__close', function(event) {
			event.preventDefault();
			
			modalZoom.fadeOut();

			enableScrolling();

			// Disable scrolling for mobile
			$body.off('touchmove');
		}); // end click
	}); // end load

	// Variables for Animate progressbar when block is visible
	var showAbout = true,
		showFacts = true;

	$(window).scroll(function(event) {
		
		// Add header position fixed 
		var scrollPos = $(window).scrollTop();
		var	headTopBlock = $('.head-top');
		var	headHeight = headTopBlock.outerHeight();
			
		if (scrollPos > (headHeight) ) {

			headTopBlock.addClass('js-head-fixed');
		
		} else {

			headTopBlock.removeClass('js-head-fixed');
	
		}

		//Hide search field
		var searchBlock = $('.search');
		if (scrollPos > headHeight &&  searchBlock.css('display') == 'block') {
			searchBlock.slideUp('fast');
		}

		//Set active menu depend on view section
		var blockIds = [];

		$('nav .menu__link').each(function(index, el) {
			var id = $(this).attr('href');

			if(id.length > 2) {
				blockIds.push(id);
			}
		});

		$(blockIds).each(function(index, id) {

			var idHeight = $(id).outerHeight();
			var idTop = $(id).offset().top;
			var idBottom = $(id).offset().top + idHeight;

			if (scrollPos + (windowHeight / 3) > idTop && scrollPos + (windowHeight / 3) < idBottom) {
				$('nav .menu__link--active').removeClass('menu__link--active');
				$('nav .menu__link[href="'+ id +'"]').addClass('menu__link--active');
			} else {
				$('nav .menu__link[href="'+ id +'"]').removeClass('menu__link--active');
			}

		});

		//Animate progressbar when block is visible
		var aboutBlock = $('#about');
		var	factsBlock = $('.facts');

		if ( isVisiblePage( aboutBlock ) && showAbout) {

			aboutBlock.find('.tab-content__value').each(function(index, el) {
				var $this = $(this),
				    percent,
				    colorValue,
				    widthBar;

				widthBar =  $('.tab-content__item').innerWidth();   
				percent = parseFloat( $this.attr('data-percent') );
				percent = percent * widthBar / 100;
				percent = percent.toFixed(1);
				colorValue = $this.attr('data-color');

				$this.css({	backgroundColor: colorValue	});

				$this.animate({
					width: percent,
					opacity: '1'
				}, 1500);
			}); // end each

			showAbout = false;
		}

		if ( isVisiblePage( factsBlock ) && showFacts) {

			// Animate increment number
			$('.fact__title').spincrement({
				thousandSeparator: '',
				duration: 3000,
			});

			showFacts = false;
		}
	}); // end scroll

	function setMaxHeight(elem) {

		var maxHeight = 0;

		elem.each(function(index, el) {
					
			var tabHeight = $(this).outerHeight();
			
			if (maxHeight < tabHeight) {
				maxHeight = tabHeight;
			}
		}); // end each

		elem.each(function(index, el) {
			$(this).css('height', maxHeight);
		}); // end each
	}

	function setDataTab(menuItem, contentItem) {

		var counter = 1;
		
		menuItem.each(function(index, el) {

			$(this).attr('data-tab', counter);

			counter++;
		}); // end each

		counter = 1; // reset counter value

		contentItem.each(function(index, el) {

			$(this).attr('data-tab', counter);

			counter++;			
		}); // end each
	}

	function disableScrolling(){
	    var x=window.scrollX;
	    var y=window.scrollY;
	    window.onscroll=function(){window.scrollTo(x, y);};
	}

	function enableScrolling(){
	    window.onscroll=function(){};
	}

	function reziseWindow(imgWidth, imgHeight, modal) {
		var windowWidth = $body.width();
		var modal = modal;
		var needImgWidth = 0;
		var needImgHeight = 0;
		var needWindowWidth = (windowWidth / 2);
		var needWindowHeight = (windowHeight - 100);
		var ratioSizeImg = imgWidth / imgHeight;
			ratioSizeImg = ratioSizeImg.toFixed(4);

		if( imgWidth < needWindowWidth ) {
			needImgWidth = imgWidth;

		} else {
			needImgWidth = needWindowWidth;
		}

		modal.width(needImgWidth);

		if( imgHeight > needWindowHeight ) {

			needImgHeight = needWindowHeight;
			needImgWidth = (needWindowHeight * ratioSizeImg);

			modal.find('img').css({
				'height': needImgHeight,
				'width': needImgWidth
			});	

			modal.width(needImgWidth);
		}
	}

	function isVisiblePage(elem) {

		var elemPos = elem.offset().top,
			pagePos = $(window).scrollTop(),
			totalHeight = elemPos + elem.height();

		return ( totalHeight <= pagePos + windowHeight && elemPos >= pagePos);
	}

})(jQuery);