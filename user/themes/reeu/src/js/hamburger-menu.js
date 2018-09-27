// Hamburger Menu
import * as utils from './utils'

utils.onDocReady(() => {
    const mobileMenuButton = document.querySelector('.mobile-menu-button')
    const mobileMenuWrapper = document.querySelector('.mobile-menu-wrapper')
    const scrollElement = document.documentElement

    mobileMenuButton.addEventListener('click', () => {
        mobileMenuButton.classList.toggle('open')
        mobileMenuWrapper.classList.toggle('responsive-open')
        scrollElement.classList.toggle('no-scroll')
    })

    // On link click close menu
    const navLinks = document.querySelectorAll('a[href^="#"].navigation-link ')
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            mobileMenuButton.classList.remove('open')
            mobileMenuWrapper.classList.remove('responsive-open')
            scrollElement.classList.remove('no-scroll')
        });
    });
})
