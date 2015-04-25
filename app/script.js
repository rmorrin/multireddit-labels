'use strict';

(function ($) {

  var $subreddits,
      $entryLinks,
      colours = [
        '#AB4642',
        '#DC9656',
        '#F7CA88',
        '#A1B56C',
        '#86C1B9',
        '#7CAFC2',
        '#BA8BAF',
        '#A16946',
        '#8968CD',
        '#838EDE',
        '#7D9EC0',
        '#2FAA96',
        '#CECC15',
        '#8B3A3A',
        '#A78D84',
        '#8B814C',
        '#526F35',
        '#388E8E',
        '#5959AB',
        '#8B8989',
        '#CD661D',
        '#CECC15',
        '#0D4F8B'
      ],
      colourMap = [];

  function getUnusedColour() {
    var random = colours[Math.floor(Math.random() * colours.length)];

    if (colourMap.filter(function (val) { return val.colour === random; }).length === 0) {
      // colour not previously chosen
      return random;
    } else if (colourMap.length >= colours.length) {
      // all colours used, return gray
      return '#EEEEEE';
    } else {
      // colour already chosen, try different value
      return getUnusedColour();
    }
  }

  function applyColour($el, subredditColour) {
    $el.css({
      'background': subredditColour,
      'color': '#000',
      opacity: '0.6'
    });
  }

  $(function () {
    $subreddits = $('.multi-details .subreddits li a');
    $entryLinks = $('.entry .tagline .subreddit');

    $subreddits.each(function () {
      var $el = $(this);

      var subredditColour = getUnusedColour();
      // keep track of colour/subreddit mappings
      colourMap.push({ subreddit: $el.text(), colour: subredditColour });

      applyColour($el, subredditColour);
    });

    $entryLinks.each(function () {
      var $el = $(this);

      // get chosen colour for the current subreddit
      var subredditColour = colourMap.filter(function (c) {
        return c.subreddit === $el.text();
      });

      applyColour($el, subredditColour[0].colour);
    });

  });


})(jQuery);
