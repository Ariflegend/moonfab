  document.addEventListener('DOMContentLoaded', function() {
    // Initialize Swiper with proper settings
    const relatedSwiper = new Swiper('#relatedProductsSwiper', {
      slidesPerView: '1.5',
      spaceBetween: 15,
      navigation: {
        nextEl: '.swiper-button-next-v2',
        prevEl: '.swiper-button-prev-v2',
      },
      pagination: {
        el: 'swiper-pagination-related-2',
        clickable: true,
      },
      loop: false,
      breakpoints: {
        768: {
      slidesPerView: 4.5,
          spaceBetween: 18.5,
        }
      }
    });

    console.log('Related Products Swiper initialized:', relatedSwiper);
  });