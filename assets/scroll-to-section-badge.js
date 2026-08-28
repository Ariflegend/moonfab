document.addEventListener('DOMContentLoaded', function() {
  // Mobile Gallery Badge Scroll Functionality
  var badges = document.querySelectorAll('.mobile-gallery-badge[data-scroll-to]');
  
  badges.forEach(function(badge) {
    badge.addEventListener('click', function(e) {
      e.preventDefault();
      
      var targetId = this.getAttribute('data-scroll-to');
      
      if (targetId && targetId.trim() !== '') {
        // Try multiple selector patterns to find the target
        var targetElement = document.getElementById(targetId) ||
                           document.querySelector('#' + CSS.escape(targetId)) ||
                           document.querySelector('[id*="' + targetId + '"]') ||
                           document.querySelector('.' + targetId) ||
                           document.querySelector('[data-section-id="' + targetId + '"]');
        
        if (targetElement) {
          // Calculate scroll position accounting for sticky header
          var headerOffset = 100; // Adjust this value based on your header height
          var elementPosition = targetElement.getBoundingClientRect().top;
          var offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          // Smooth scroll to target
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        } else {
          console.warn('Mobile Gallery Badge: Could not find section with ID:', targetId);
        }
      }
    });
  });
});