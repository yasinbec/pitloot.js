(function($) {

  // Create plugin
  $.fn.tooltips = function(el) {

    var $tooltip,
      $body = $('body'),
      $el;

    // Ensure chaining works
    return this.each(function(i, el) {

      $el = $(el).attr("data-tooltip", i);

      // Make DIV and append to page
      var $tooltip = $('<div class="tooltip" data-tooltip="' + i + '">' + $el.attr('title') + '<div class="tooltip-arrow"></div></div>').appendTo("body");

      // Position right away, so first appearance is smooth
      var linkPosition = $el.position();
      var leftPos = linkPosition.left - ($tooltip.width() / 2);

      $tooltip.css({
        top: linkPosition.top - $tooltip.outerHeight() - 13,
        left: leftPos
      });

      $el
      // Get rid of yellow box popup
        .removeAttr("title");

      // we have to divide touch screens and standard non-touch screens
      // modernizr helps us to define touch or not touch screens
      // modernizr is required for this part

      if($('html').hasClass('touch')) {
        $el

        .on('click', function(e) {
          e.preventDefault();

          $el = $(this);

          $tooltip = $('div[data-tooltip=' + $el.data('tooltip') + ']');

          if ($tooltip.hasClass("active")) {

            $(".tooltip").removeClass("active").removeClass("out").removeClass('tooltip-show');

            $tooltip.removeClass("active");

              //CSS Change
            $tooltip.css({
              'pointer-events': 'none'
            });

          } else {

            $(".tooltip").removeClass("active").removeClass("out");

            // Reposition tooltip, in case of page movement e.g. screen resize
            var linkPosition = $el.position();

            var leftPos = linkPosition.left - ($tooltip.outerWidth() / 2);

            // Tooltip width is 300px
            // Check if tooltip too right on the screen
            // Only Happends screen lower that 414
            // Iphone 6P widht is 414
            var winWidthCheck = $(window).outerWidth();
            var arrowBottom;

            // if(winWidthCheck > 414) {
            //   leftPos = ( linkPosition.left + ($el.width() / 2) ) - ($tooltip.outerWidth() / 2)
            //   arrowBottom = linkPosition.left + ($el.outerWidth() / 2) - $('.tooltip').offset().left;
            // }

            if(winWidthCheck <= 414) {
              leftPos = ( linkPosition.left + ($el.width() / 2) ) - ($tooltip.outerWidth() / 2)
              arrowBottom = linkPosition.left + ($el.outerWidth() / 2) - $('.tooltip').offset().left;
            }

            // console.log(linkPosition.left);
            // console.log($el.outerWidth());
            // console.log($('.tooltip').offset().left);

            if (leftPos <= 0) {
              leftPos = 0;
              arrowBottom = linkPosition.left + ($el.outerWidth() / 2);
            }

            if(arrowBottom <= 0 ) {
              arrowBottom = Math.abs(arrowBottom);
            }

            // Tooltip Arrow Adjustment if needed
            $('.tooltip-arrow').css({
              left: arrowBottom
            });

            $tooltip.css({
              top: linkPosition.top - $tooltip.outerHeight() - 13,
              left: leftPos,
              'pointer-events': 'fill'
            });

            // Adding class handles animation through CSS
            $tooltip.addClass("active").addClass('tooltip-show');

          }

        });

      } else {

        // non touch screens

        $el

        .on('mouseover click', function(e) {
          e.preventDefault();

          $el = $(this);

          $tooltip = $('div[data-tooltip=' + $el.data('tooltip') + ']');

          // Reposition tooltip, in case of page movement e.g. screen resize
          var linkPosition = $el.position();

          console.log($el.width());


          var leftPos = ( linkPosition.left + ($el.width() / 2) ) - ($tooltip.outerWidth() / 2);

          //console.log(leftPos);

          if (leftPos <= 0) {
            leftPos = 0;
            // Tooltip Arrow Adjustment if needed
            $('.tooltip-arrow').css({
              left: linkPosition.left + ($el.outerWidth() / 2)
            });
          }

          $tooltip.css({
            top: linkPosition.top - $tooltip.outerHeight() - 13,
            left: leftPos
          });

          // Adding class handles animation through CSS
          $tooltip.addClass("active");

        })
        
        .on('mouseout mouseleave', function() {

          $el = $(this);

          // Temporary class for same-direction fadeout
          $tooltip = $('div[data-tooltip=' + $el.data('tooltip') + ']').addClass("out");

          // Remove all classes
          setTimeout(function() {
            $tooltip.removeClass("active").removeClass("out");
          }, 300);

        });

      }

    })

  }

})(jQuery);
