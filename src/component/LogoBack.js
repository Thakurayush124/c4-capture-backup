import React, { useEffect, useRef } from 'react';
import $ from 'jquery';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick.min.js';
import './LogoBack.css';

const LogoBack = () => {
  const splitSlideshowRef = useRef(null);

  useEffect(() => {
    const initializeSlick = () => {
      const $splitSlideshow = $(splitSlideshowRef.current);
      const $slider = $('.slideshow .slider', $splitSlideshow);
      const maxItems = $('.item', $slider).length;

      let dragging = false;
      let tracking, rightTracking;

      // Clone and create right slideshow
      const $sliderRight = $('.slideshow', $splitSlideshow).clone().addClass('slideshow-right').appendTo($splitSlideshow);
      const rightItems = $('.item', $sliderRight).toArray();
      const reverseItems = rightItems.reverse();
      $('.slider', $sliderRight).html('');
      for (let i = 0; i < maxItems; i++) {
        $(reverseItems[i]).appendTo($('.slider', $sliderRight));
      }

      $slider.addClass('slideshow-left');

      $('.slideshow-left', $splitSlideshow).slick({
        vertical: true,
        verticalSwiping: true,
        arrows: false,
        infinite: true,
        dots: true,
        speed: 1000,
        cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)'
      }).on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        if (currentSlide > nextSlide && nextSlide === 0 && currentSlide === maxItems - 1) {
          $('.slideshow-right .slider', $splitSlideshow).slick('slickGoTo', -1);
          $('.slideshow-text', $splitSlideshow).slick('slickGoTo', maxItems);
        } else if (currentSlide < nextSlide && currentSlide === 0 && nextSlide === maxItems - 1) {
          $('.slideshow-right .slider', $splitSlideshow).slick('slickGoTo', maxItems);
          $('.slideshow-text', $splitSlideshow).slick('slickGoTo', -1);
        } else {
          $('.slideshow-right .slider', $splitSlideshow).slick('slickGoTo', maxItems - 1 - nextSlide);
          $('.slideshow-text', $splitSlideshow).slick('slickGoTo', nextSlide);
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
        rightTracking = $('.slideshow-right .slick-track', $splitSlideshow).css('transform');
        rightTracking = parseInt(rightTracking.split(',')[5]);
      }).on('mousemove touchmove', function(){
        if (dragging) {
          const newTracking = $('.slideshow-left .slick-track', $splitSlideshow).css('transform');
          const newTrackingNum = parseInt(newTracking.split(',')[5]);
          const diffTracking = newTrackingNum - tracking;
          $('.slideshow-right .slick-track', $splitSlideshow).css({'transform': 'matrix(1, 0, 0, 1, 0, ' + (rightTracking - diffTracking) + ')'});
        }
      }).on('mouseleave touchend mouseup', function(){
        dragging = false;
      });

      $('.slideshow-right .slider', $splitSlideshow).slick({
        swipe: false,
        vertical: true,
        arrows: false,
        infinite: true,
        speed: 950,
        cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
        initialSlide: maxItems - 1
      });

      $('.slideshow-text', $splitSlideshow).slick({
        swipe: false,
        vertical: true,
        arrows: false,
        infinite: true,
        speed: 900,
        cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)'
      });

      // Auto-click function for slick dots
      const startAutoClick = () => {
        const $dots = $('.slick-dots li', $splitSlideshow);
        const clickDot = () => {
          const $currentDot = $dots.filter('.slick-active');
          const currentIndex = $dots.index($currentDot);
          const nextIndex = (currentIndex + 1) % $dots.length;
          $dots.eq(nextIndex).find('button').click();
        };

        // Start clicking every 3 seconds
        const intervalId = setInterval(clickDot, 3000); // Adjust the interval as needed

        // Cleanup on component unmount
        return () => clearInterval(intervalId);
      };

      startAutoClick();

      // Cleanup function to destroy slick instances
      return () => {
        $('.slideshow-left', $splitSlideshow).slick('unslick');
        $('.slideshow-right .slider', $splitSlideshow).slick('unslick');
        $('.slideshow-text', $splitSlideshow).slick('unslick');
      };
    };

    // Add a delay to ensure DOM elements are available
    const timer = setTimeout(initializeSlick, 100); // Adjust delay as needed

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  return (
    <div className="split-slideshow" ref={splitSlideshowRef}>
      <div className="slideshow">
        <div className="slider">
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
      <div className="slideshow-text">
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
