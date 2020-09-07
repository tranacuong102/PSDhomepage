document.addEventListener("DOMContentLoaded",function(){
	var bannerSlide = document.querySelector('.banner-slide');
	var btnDot = document.querySelectorAll('.slide-dots .slide-dots__item');
	var slides = document.querySelectorAll('.slide-images .slide-images__item');
	var btnDericRight = document.querySelector('.btn__Direc--right');
	var btnDericLeft = document.querySelector('.btn__Direc--left');
	var totalSlide = slides.length;
	var status = "pause";
	var indexCurrent = 0;

	// Xử lý nav dots item
	for (i=0;i<btnDot.length;i++) {
		btnDot[i].onclick = function() {
			for(k=0;k<btnDot.length;k++) {
				btnDot[k].classList.remove('slide-dots__item--active');
			} this.classList.add('slide-dots__item--active');
			var dotActive = this;
			var indexDot = 0;
			for (indexDot = 0; dotActive = dotActive.previousElementSibling; indexDot++) {}
				for (i=0;i<slides.length;i++) {
					slides[i].classList.remove('slide-images__item--active');
				} slides[indexDot].classList.add('slide-images__item--active');
		}
	}

	// Xây dựng hàm next
	function Next() {
		if (status == "play") { return false; }
			status = "play";
			var statusMotion = 0;
			var slideActive = slides[indexCurrent];
			if (indexCurrent < totalSlide -1) {
				indexCurrent ++;
			} else { indexCurrent = 0; }
			var slideNext = slides[indexCurrent];
			slideActive.classList.add('NextfadeOut');
			slideNext.classList.add('NextfadeIn');

			// Xử lý khi slider kết thúc chuyển động
			var slideActiveMotion = function() {
				this.classList.remove('NextfadeOut');
				this.classList.remove('slide-images__item--active');
				statusMotion++;
				if (statusMotion == 2) { status = "pause" };
			}
			var slideNextMotion = function() {
				this.classList.remove('NextfadeIn');
				this.classList.add('slide-images__item--active');
				statusMotion++;
				if (statusMotion == 2) { status = "pause" };
			}
			slideActive.addEventListener('webkitAnimationEnd',slideActiveMotion);
			slideNext.addEventListener('webkitAnimationEnd',slideNextMotion);

			// Đồng bộ sự hiển thị slider và nav dots
			var indexSlide = 0;
			var slideShow = document.querySelector('.slide-images .slide-images__item--active');
			for (indexSlide = 0;slideShow = slideShow.previousElementSibling;indexSlide++) {}
				if (indexSlide < slides.length -1) {
					for (i=0;i<slides.length;i++) {
						btnDot[i].classList.remove('slide-dots__item--active');
					}
					btnDot[indexSlide].nextElementSibling.classList.add('slide-dots__item--active');
					slides[indexSlide].nextElementSibling.classList.add('slide-images__item--active');
				} else {
					for(i=0;i<slides.length;i++) {
						btnDot[i].classList.remove('slide-dots__item--active');
					}
					btnDot[0].classList.add('slide-dots__item--active');
					slides[0].classList.add('slide-images__item--active');
				}
	}

	btnDericRight.onclick = function() {
		Next();
	}

	// Bắt sự kiện click vào nút previous
	btnDericLeft.onclick = function() {
		if (status == "play") { return false; }
			status = "play";
			var statusMotion = 0;
			var slideActive = slides[indexCurrent];
			if (indexCurrent > 0) {
				indexCurrent --;
			} else { indexCurrent = totalSlide - 1; }
			var slidePrev = slides[indexCurrent];
			slideActive.classList.add('PrevfadeOut');
			slidePrev.classList.add('PrevfadeIn');
			// Xử lý khi slider kết thúc chuyển động
			var slideActiveMotion = function() {
				this.classList.remove('PrevfadeOut');
				this.classList.remove('slide-images__item--active');
				statusMotion++;
				if (statusMotion == 2) { status = "pause" };
			}
			var slideNextMotion = function() {
				this.classList.remove('PrevfadeIn');
				this.classList.add('slide-images__item--active');
				statusMotion++;
				if (statusMotion == 2) { status = "pause" };
			}
			slideActive.addEventListener('webkitAnimationEnd',slideActiveMotion);
			slidePrev.addEventListener('webkitAnimationEnd',slideNextMotion);

			// Đồng bộ sự hiển thị slider và nav dots
			var indexSlide = 0;
			var slideShow = document.querySelector('.slide-images .slide-images__item--active');
			for (indexSlide = 0;slideShow = slideShow.nextElementSibling;indexSlide++) {}
				if (indexSlide < slides.length - 1) {
					for (i=0;i<slides.length;i++) {
						btnDot[i].classList.remove('slide-dots__item--active');
					}
					if (indexSlide == 0){
						btnDot[indexSlide].nextElementSibling.classList.add('slide-dots__item--active');
					slides[indexSlide].nextElementSibling.classList.add('slide-images__item--active');
					} 
					else {
						btnDot[indexSlide].previousElementSibling.classList.add('slide-dots__item--active');
						slides[indexSlide].previousElementSibling.classList.add('slide-images__item--active');
					}
				} else {
					for(i=0;i<slides.length;i++) {
						btnDot[i].classList.remove('slide-dots__item--active');
					}
					btnDot[2].classList.add('slide-dots__item--active');
					slides[2].classList.add('slide-images__item--active');
				}
	}
	var autoSlide = setInterval(Next,3000);
	
	// Xây dựng hover dừng slider và di chuyển chuột ra ngoài thì slider tiếp tục chuyển động
	var play = true;
	bannerSlide.onmouseenter = function() {
		play = false;
		clearInterval(autoSlide);
	}
	bannerSlide.onmouseleave = function() {
		play = true;
		autoSlide = setInterval(Next,3000);
	}
},false)