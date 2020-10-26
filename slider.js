function slider({container, slide, nextArrow, previousArrow, totalNumberOfSlides, currentNumberOfSlides, wrapper, field}) {
    const sliderPrev = document.querySelector(previousArrow),
    sliderNext = document.querySelector(nextArrow),
    slides = document.querySelectorAll(slide),
    slidesWrapper = document.querySelector(wrapper),
    slidesField = document.querySelector(field),
    width = window.getComputedStyle(slidesWrapper, null).width,
    total = document.querySelector(totalNumberOfSlides),
    current = document.querySelector(currentNumberOfSlides),
    offerSlider = document.querySelector(container);
    let slideIndex = 1;
    let offset = 0;

    function replaceWidth (str) {
        return +str.replace(/\D/ig, '');
    }

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
     } else {
         total.textContent = slides.length;
         current.textContent = slideIndex;
     }

    slidesField.style.width = 100 * slides.length + '%';

     slidesWrapper.style.overflow = 'hidden';

    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';
        slides.forEach((slide) => {
            slide.style.width = width;
        });

    
        sliderNext.addEventListener('click', () => {
            if (offset == replaceWidth(width) * (slides.length - 1)) { 
                offset = 0;
            } else {
                offset += replaceWidth(width);
            }
            
            slidesField.style.transform = `translateX(${-offset}px)`;
            if (slideIndex == slides.length) {
                slideIndex = 1;
            } else {
                slideIndex++;
            }

            if (slides.length < 10) {
                current.textContent = `0${slideIndex}`;
            } else {
                current.textContent = {slideIndex};
            }
            dots.forEach(dot => dot.style.opacity = '.5');
            dots[slideIndex - 1].style.opacity = 1;
        });
        sliderPrev.addEventListener('click', () => {
            if ( offset == 0) {
            offset = replaceWidth(width) * (slides.length - 1);
           
            } else {
                offset -= replaceWidth(width);
            }
            
            slidesField.style.transform = `translateX(${-offset}px)`;

            if (slideIndex == 1) {
                slideIndex = slides.length;
            } else {
                slideIndex--;
            }


            if (slides.length < 10) {
                current.textContent = `0${slideIndex}`;
            } else {
                current.textContent = {slideIndex};
            }
            dots.forEach(dot => dot.style.opacity = '.5');
            dots[slideIndex - 1].style.opacity = 1;
        });
        const dots = []; // создаем пустой массив для точек
        offerSlider.style.cssText = 'position: relative';

        function createCarousel () {
            const carousel = document.createElement('div');
            carousel.classList.add('carousel-indicators');
            offerSlider.append(carousel);
        }

        createCarousel();

        for (let i = 0; i < slides.length; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            const parent = document.querySelector('.carousel-indicators');
            dot.setAttribute('data-slide-to', i + 1);
            if (i == 0) {
                dot.style.opacity = 1;
            }
            parent.append(dot);
            dots.push(dot); // Помещаем в массив все точки для дальнейшего использования

        }
        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                const slideTo = e.target.getAttribute('data-slide-to');
                slideIndex = slideTo;
                offset = replaceWidth(width) * (slideTo - 1);
                slidesField.style.transform = `translateX(${-offset}px)`;
                if (slides.length < 10) {
                    current.textContent = `0${slideIndex}`;
                } else {
                    current.textContent = {slideIndex};
                }
                dots.forEach(dot => dot.style.opacity = '.5');
                dots[slideIndex - 1].style.opacity = 1;
                
            });
        });
}

export default slider;