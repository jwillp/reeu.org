// Utility functions


/**
 * Adds an event handler when the DOMContentLoaded event is called.
 * To be used as a replacement to jquery's $(document).ready()
 * source: http://youmightnotneedjquery.com/
 */
export function onDocReady(fn) {
    if (document.attachEvent ?
        document.readyState === "complete" :
        document.readyState !== "loading") {
        fn()
    } else {
        document.addEventListener('DOMContentLoaded', fn)
    }
}

/**
 * Adds an event handler when the 'sroll' event is called.
 * To be used as a replacement to jquery's $(window).scroll()
 * source: https://developer.mozilla.org/en-US/docs/Web/Events/scroll
 */

export function onScroll(scrollingElement, fn) {
    if (!scrollingElement.addEventListener) {
        if(process.env.NODE_ENV == 'development'){
            console.warn('Element cannot be scrolled: ', scrollingElement)
            return
        }
    }

    let lastKnownScrollPosition = 0
    let animationFrameTicking = false

    scrollingElement.addEventListener('scroll', () => {
        lastKnownScrollPosition = scrollingElement.scrollY

        if (!animationFrameTicking) {
            window.requestAnimationFrame(() => {
                fn(lastKnownScrollPosition)
                animationFrameTicking = false
            })
            animationFrameTicking = true
        }
    })
}


/**
 * Returns the element scrolling the page.
 * Allows for changing it in cases where body, html --> height: 100%
 */
export function getScrollingElement() {
    return window
}

/**
* Easing functions
*/
const easings = {
    linear(t) {
      return t
    },
    easeInQuad(t) {
      return t * t
    },
    easeOutQuad(t) {
      return t * (2 - t)
    },
    easeInOutQuad(t) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
    },
    easeInCubic(t) {
      return t * t * t;
    },
    easeOutCubic(t) {
      return (--t) * t * t + 1
    },
    easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
    },
    easeInQuart(t) {
      return t * t * t * t
    },
    easeOutQuart(t) {
      return 1 - (--t) * t * t * t
    },
    easeInOutQuart(t) {
      return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t
    },
    easeInQuint(t) {
      return t * t * t * t * t
    },
    easeOutQuint(t) {
      return 1 + (--t) * t * t * t * t
    },
    easeInOutQuint(t) {
      return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t
    }
};
export function getEasing(easingFunction) {
    return easings[easingFunction]
}



/**
 * Scrolls to a certain destination
 * source: https://pawelgrzybek.com/page-scroll-in-vanilla-javascript/
 * @param  {element|Number} destination destination object or offset number
 * @param  {Number}         duration    duration of the scroll easing
 * @param  {String}         easing      scroll easing
 * @param  {Function}       callback    callback when scrolled done
 */
export function scrollTo(destination, duration = 200, easing = 'linear', callback) {

  const start = window.pageYOffset;
  const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

  const documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
  const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
  const destinationOffset = typeof destination === 'number' ? destination : destination.offsetTop;
  const destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset);

  if ('requestAnimationFrame' in window === false) {
    window.scroll(0, destinationOffsetToScroll);
    if (typeof callBack === 'function') {
      callback();
    }
    return;
  }

  function scroll() {
    const now = 'now' in window.performance ? performance.now() : new Date().getTime();
    const time = Math.min(1, ((now - startTime) / duration));
    const timeFunction = getEasing(easing)(time);
    window.scroll(0, Math.ceil((timeFunction * (destinationOffsetToScroll - start)) + start));

    if (window.pageYOffset === destinationOffsetToScroll) {
      if (callback) {
        callback();
      }
      return;
    }

    requestAnimationFrame(scroll);
  }

  scroll();
}



