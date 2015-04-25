'use strict';

(function ($) {

  var $subreddits,
      $entryLinks,
      colours = [],
      colourMap = [];

  function getUnusedColour() {
    var random = colours[Math.floor(Math.random() * colours.length)];

    if (colourMap.filter(function (val) { return val.colour === random; }).length === 0) {
      // colour not previously chosen
      return random;
    } else {
      // colour already chosen, try different value
      return getUnusedColour();
    }
  }

  // credit to: http://stackoverflow.com/a/8987502
  function hsvToRgb(h, s, v) {
    var r, g, b;
    var i;
    var f, p, q, t;

    // Make sure our arguments stay in-range
    h = Math.max(0, Math.min(360, h));
    s = Math.max(0, Math.min(100, s));
    v = Math.max(0, Math.min(100, v));

    // We accept saturation and value arguments from 0 to 100 because that's
    // how Photoshop represents those values. Internally, however, the
    // saturation and value are calculated from a range of 0 to 1. We make
    // That conversion here.
    s /= 100;
    v /= 100;

    if(s === 0) {
      // Achromatic (grey)
      r = g = b = v;
      return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    }

    h /= 60; // sector 0 to 5
    i = Math.floor(h);
    f = h - i; // factorial part of h
    p = v * (1 - s);
    q = v * (1 - s * f);
    t = v * (1 - s * (1 - f));

    switch(i) {
      case 0:
        r = v;
        g = t;
        b = p;
        break;

      case 1:
        r = q;
        g = v;
        b = p;
        break;

      case 2:
        r = p;
        g = v;
        b = t;
        break;

      case 3:
        r = p;
        g = q;
        b = v;
        break;

      case 4:
        r = t;
        g = p;
        b = v;
        break;

      default: // case 5:
        r = v;
        g = p;
        b = q;
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  }

  // credit to: http://stackoverflow.com/a/8987502
  function distinctColours(count) {
    var colours = [];
    for(var hue = 0; hue < 360; hue += 360 / count) {
      colours.push(hsvToRgb(hue, 40, 90));
    }
    return colours;
  }

  function applyColour($el, subredditColour) {
    subredditColour = subredditColour.concat([0.6]); //add alpha value

    $el.css({
      'background': 'rgba(' + subredditColour.join(',') + ')',
      'color': '#000',
    });
  }

  $(function () {
    $subreddits = $('.multi-details .subreddits li a');
    $entryLinks = $('.entry .tagline .subreddit');
    colours = distinctColours($subreddits.length);

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
