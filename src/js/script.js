window.addEventListener('DOMContentLoaded', () => {

	// * HOVER MENU UNDERLINE
	// * =========================================================
	jQuery(document).ready(function ($) {

		const ulLi = $('.header__nav-list li'),
			hr = $('.menu_hr'),
			current = $('.current'),
			currLeft = $(current).offset().left - $('.header__nav-list').offset().left,
			currWidth = $(current).width();


		ulLi.hover(function () {
			var left = $(this).offset().left - $('.header__nav-list').offset().left,
				width = $(this).width();
			hr.css({
				'margin-left': left,
				'width': width
			})
		}, function () { // задаем функцию, которая срабатывает, когда указатель выходит из элемента
			hr.css({
				'margin-left': currLeft,
				'width': currWidth
			})
		}).first().mouseenter().mouseleave()

	});




	// * MODAL WINDOWS
	//*  ==========================================================
	const modalBtn = document.querySelectorAll('[data-modal]');
	const body = document.body;
	const modalClose = document.querySelectorAll('.modal__close');
	const modal = document.querySelectorAll('.modal');

	modalBtn.forEach(item => {
		item.addEventListener('click', event => {
			let $this = event.currentTarget;
			let modalId = $this.getAttribute('data-modal');
			let modal = document.getElementById(modalId);
			let modalContent = modal.querySelector('.modal__content');

			modalContent.addEventListener('click', event => {
				event.stopPropagation();
			});
			modal.classList.add('show');
			body.classList.add('no-scroll');

			setTimeout(() => {
				modalContent.style.cssText = `transform:scale(1);`;
				modalContent.style.opacity = '1';
			}, 30);

		});
	});

	modalClose.forEach(item => {
		item.addEventListener('click', event => {
			let currentModal = event.currentTarget.closest('.modal');

			closeModal(currentModal);
		});
	});

	modal.forEach(item => {
		item.addEventListener('click', event => {
			let currentModal = event.currentTarget;

			closeModal(currentModal);
		});
	});

	function closeModal(currentModal) {
		let modalContent = currentModal.querySelector('.modal__content');
		modalContent.removeAttribute('style');

		setTimeout(() => {
			currentModal.classList.remove('show');
			body.classList.remove('no-scroll');
		}, 300);
	}


	//* Burger
	//* ======================================
	const burger = document.getElementById('menuBurger');
	const menubar = document.getElementById('menuBar');
	const barHead = document.querySelectorAll('.burger-menu__head');
	const barItem = document.querySelectorAll('.burger-menu__subitem');

	burger.addEventListener('click', () => {
		document.body.classList.toggle('active');
		menubar.classList.toggle('active');
		burger.classList.toggle('active');
	});

	barHead.forEach((item) => {
		item.addEventListener('click', function () {
			this.classList.toggle('show-list');
		});
	});



	// * Верхний sticky-header
	// * =================================================
	window.onscroll = function () {
		myFunction();
	};
	let newHeightLogo;
	const logoBrand = document.querySelector(".brand");
	const wrapNavbar = document.querySelector(".wrap-navbar");
	const headerLogo = document.querySelector(".header__logo");

	var content = document.getElementById("content");
	var distanceContent = content.getBoundingClientRect();
	var heightContent = content.offsetTop;
	var wLogoTextClass = document.querySelector(".wrap_logo_text");
	var header = document.getElementById("myHeader");
	var sticky = header.offsetTop;

	function myFunction() {
		if (window.innerWidth < 1230) return;

		if (window.pageYOffset > sticky) {

			wLogoTextClass.style.display = "block";
			header.style.paddingLeft = distanceContent.left + "px";
			header.style.paddingRight = distanceContent.left + "px";
			header.classList.add("sticky");
			logoBrand.setAttribute("height", 40);

		} else {
			wLogoTextClass.style.display = "none";
			header.style.paddingLeft = "0px";
			header.style.paddingRight = "0px";
			wrapNavbar.style.marginLeft = 0 + "px";
			header.classList.remove("sticky");
			newHeightLogo = heightContent - window.pageYOffset;
			logoBrand.setAttribute("height", newHeightLogo);

		}


	}


	// * TABS
	// * =======================================================================
	const tabs = (headerSelector, tabSelector, contentSelector, activeClass) => {

		const header = document.querySelector(headerSelector),
			tab = document.querySelectorAll(tabSelector),
			content = document.querySelectorAll(contentSelector);

		function hideTabContent() {
			content.forEach(item => {
				item.style.display = 'none';
			});

			tab.forEach(item => {
				item.classList.remove(activeClass);
			});
		}

		function showTabContent(i = 0) {
			content[i].style.display = 'block';
			tab[i].classList.add(activeClass);
		}

		hideTabContent();
		showTabContent();

		header.addEventListener('click', (e) => {
			const target = e.target;
			if (target &&
				(target.classList.contains(tabSelector.replace(/\./, "")) ||
					target.parentNode.classList.contains(tabSelector.replace(/\./, "")))) {
				tab.forEach((item, i) => {
					if (target == item || target.parentNode == item) {
						hideTabContent();
						showTabContent(i);
					}
				});
			}
		});
	};

	tabs('.advantage__gallery', '.advantage__item', '.advantage__descr', 'active');




	// * Slick-slider
	// * ====================================================

	$('.advantage__gallery').slick({
		infinite: true,
		speed: 300,
		slidesToShow: 4,

		responsive: [{
				breakpoint: 992,
				settings: {
					centerPadding: '1px',
					slidesToShow: 3,
					slidesToScroll: 1,
				}
			},
			{
				breakpoint: 770,
				settings: {
					centerPadding: '2px',
					slidesToShow: 3,
					slidesToScroll: 1,
				}
			},
			{
				breakpoint: 650,
				settings: {
					centerPadding: '2px',
					slidesToShow: 2,
					slidesToScroll: 1,
				}
			},
			{
				breakpoint: 450,
				settings: {
					centerMode: true,
					centerPadding: '2px',
					slidesToShow: 1,
					slidesToScroll: 1,
				}
			}
		]
	});
	$('.advantage__gallery').slick('setPosition');


});
