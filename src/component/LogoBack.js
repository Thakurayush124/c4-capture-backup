import React, { useEffect, useRef } from 'react';
import $ from 'jquery';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick.min.js';
import './LogoBack.css';

const LogoBack = () => {
  const sliderRef = useRef(null);
  const rightSliderRef = useRef(null);
  const textSliderRef = useRef(null);

  useEffect(() => {
    const $slider = $(sliderRef.current);
    const $sliderRight = $(rightSliderRef.current);
    const $textSlider = $(textSliderRef.current);

    const maxItems = $('.item', $slider).length;
    let dragging = false;
    let tracking, rightTracking;

    // Clone and reverse right slider items
    const $rightSliderContainer = $sliderRight.closest('.slideshow-right');
    const rightItems = $('.item', $rightSliderContainer).toArray().reverse();
    $sliderRight.empty();
    rightItems.forEach(item => $sliderRight.append(item));

    $slider.slick({
      vertical: true,
      verticalSwiping: true,
      arrows: false,
      infinite: true,
      dots: true,
      speed: 1000,
      cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
      autoplay: true,
      autoplaySpeed: 1600
    }).on('beforeChange', function(event, slick, currentSlide, nextSlide) {
      if (currentSlide > nextSlide && nextSlide === 0 && currentSlide === maxItems - 1) {
        $sliderRight.slick('slickGoTo', -1);
        $textSlider.slick('slickGoTo', maxItems);
      } else if (currentSlide < nextSlide && currentSlide === 0 && nextSlide === maxItems - 1) {
        $sliderRight.slick('slickGoTo', maxItems);
        $textSlider.slick('slickGoTo', -1);
      } else {
        $sliderRight.slick('slickGoTo', maxItems - 1 - nextSlide);
        $textSlider.slick('slickGoTo', nextSlide);
      }
    }).on("mousewheel", function(event) {
      event.preventDefault();
      if (event.deltaX > 0 || event.deltaY < 0) {
        $(this).slick('slickNext');
      } else if (event.deltaX < 0 || event.deltaY > 0) {
        $(this).slick('slickPrev');
      }
    }).on('mousedown touchstart', function(){
      dragging = true;
      tracking = $('.slick-track', $slider).css('transform');
      tracking = parseInt(tracking.split(',')[5]);
      rightTracking = $('.slick-track', $sliderRight).css('transform');
      rightTracking = parseInt(rightTracking.split(',')[5]);
    }).on('mousemove touchmove', function(){
      if (dragging) {
        const newTracking = $('.slick-track', $slider).css('transform');
        const newTrackingNum = parseInt(newTracking.split(',')[5]);
        const diffTracking = newTrackingNum - tracking;
        $('.slick-track', $sliderRight).css({'transform': `matrix(1, 0, 0, 1, 0, ${rightTracking - diffTracking})`});
      }
    }).on('mouseleave touchend mouseup', function(){
      dragging = false;
    });

    $sliderRight.slick({
      swipe: false,
      vertical: true,
      arrows: false,
      infinite: true,
      speed: 950,
      cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
      initialSlide: maxItems - 1
    });

    $textSlider.slick({
      swipe: false,
      vertical: true,
      arrows: false,
      infinite: true,
      speed: 900,
      cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)'
    });

    $slider.on('afterChange', function(event, slick, currentSlide){
      $sliderRight.slick('slickGoTo', maxItems - 1 - currentSlide);
      $textSlider.slick('slickGoTo', currentSlide);
    });

    return () => {
      $slider.slick('unslick');
      $sliderRight.slick('unslick');
      $textSlider.slick('unslick');
    };
  }, []);

  return (
    <div className="split-slideshow">
      <div className="slideshow slideshow-left">
        <div className="slider" ref={sliderRef}>
          <div className="item">
            <img src="https://raw.githubusercontent.com/supahfunk/supah-codepen/master/canyon-2.jpg" alt="Canyon 2" />
          </div>
          <div className="item">
            <img src="https://raw.githubusercontent.com/supahfunk/supah-codepen/master/canyon-3.jpg" alt="Canyon 3" />
          </div>
          <div className="item">
            <img src="https://raw.githubusercontent.com/supahfunk/supah-codepen/master/canyon-4.jpg" alt="Canyon 4" />
          </div>
          <div className="item">
            <img src="https://raw.githubusercontent.com/supahfunk/supah-codepen/master/canyon-1.jpg" alt="Canyon 1" />
          </div>
        </div>
      </div>
      <div className="slideshow slideshow-right">
        <div className="slider" ref={rightSliderRef}>
          <div className="item">
            <img src="https://raw.githubusercontent.com/supahfunk/supah-codepen/master/canyon-2.jpg" alt="Canyon 2" />
          </div>
          <div className="item">
            <img src="https://raw.githubusercontent.com/supahfunk/supah-codepen/master/canyon-3.jpg" alt="Canyon 3" />
          </div>
          <div className="item">
            <img src="https://raw.githubusercontent.com/supahfunk/supah-codepen/master/canyon-4.jpg" alt="Canyon 4" />
          </div>
          <div className="item">
            <img src="https://raw.githubusercontent.com/supahfunk/supah-codepen/master/canyon-1.jpg" alt="Canyon 1" />
          </div>
        </div>
      </div>
      <div className="slideshow-text" ref={textSliderRef}>
        <div className="item">Canyon</div>
        <div className="item">Desert</div>
        <div className="item">Erosion</div>
        <div className="item">Shape</div>
      </div>
      <a className="the-most" target="_blank" href="https://codepen.io/2017/popular/pens/10/" rel="noopener noreferrer">
        <img src="https://raw.githubusercontent.com/supahfunk/supah-codepen/master/themost-2017.png" alt="The Most" />
      </a>
    </div>
  );
};

export default LogoBack;