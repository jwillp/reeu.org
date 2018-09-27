// Back to top button
import * as utils from './utils'

/// browser window scroll (in pixels) after which the "back to top" link is shown
const OFFSET = 500
//browser window scroll (in pixels) after which the "back to top" link opacity is reduced
const OFFSET_OPACITY = 1200
//duration of the top scrolling animation (in ms)
const SCROLL_TOP_DURATION = 700



utils.onDocReady(() =>{

    //grab the "back to top" link
    const backToTopBtn = document.querySelector('.scroll-up-button')
    backToTopBtn.style.visibility = 'hidden'

    const scrollingElement = utils.getScrollingElement()


    //hide or show the "back to top" link

    utils.onScroll(scrollingElement, (scrollDistance) => {

        if(scrollDistance >= OFFSET){
            backToTopBtn.style.visibility = 'visible'
            if (!backToTopBtn.classList.contains('bounceIn')) {
                backToTopBtn.classList.add('bounceIn')
            }
            backToTopBtn.classList.remove('bounceOut')
        } else {
            if (!backToTopBtn.classList.contains('bounceOut')) {
                backToTopBtn.classList.add('bounceOut')
            }
            backToTopBtn.classList.remove('bounceIn')
        }
    })

    // Smooth scrolling on click
    backToTopBtn.addEventListener('click', (event) => {
        event.preventDefault();
        utils.scrollTo(0, 1000, 'easeOutQuart')
    })

})
