// Helper for header style on scroll
import * as utils from './utils'

const OFFSET = 10

utils.onDocReady(() => {

    // Add class to header when scrolling
    const headerContainer = document.querySelectorAll('.header-container')[0]
    const windowHeight = window.innerHeight

    const scrollingElement = utils.getScrollingElement()

    window.headerContainer = headerContainer

    utils.onScroll(scrollingElement, (scrollDistance) => {

        if(scrollDistance >= OFFSET){
            headerContainer.classList.add('header-scrolled')
        } else {
            headerContainer.classList.remove('header-scrolled')
        }
    })


    const navLinks = document.querySelectorAll('a[href^="#"].navigation-link ')

    utils.onScroll(scrollingElement, (scrollDistance) => {
        navLinks.forEach(link =>{
            const section = document.querySelector(link.hash)

            const fromTop = scrollDistance + headerContainer.offsetHeight

            if (section.offsetTop <= fromTop && 
                section.offsetTop + section.offsetHeight > fromTop) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        })
    })

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const section = document.querySelector(link.hash)
            const destination = section.offsetTop - headerContainer.offsetHeight
            utils.scrollTo(destination, 600, "easeOutQuart")
        });
    });

})
