import * as utils from './utils'



utils.onDocReady(() => {

    function slider(elementClass) {
        
        const s = {

            init: function() {

                // Add class to header when scrolling
                let container = document.querySelectorAll(elementClass)
                if (container.length == 0) {
                    console.error('Slider: No selector found with name ' + elementClass)
                }
                container = container[0]

                this.prev = container.querySelectorAll('.prev')[0]
                this.next = container.querySelectorAll('.next')[0]
                this.batches = container.querySelectorAll('.team-batch')
                this.currentActive = 0



                // Generate markup



                // Register listeners
                const self = this
                this.prev.addEventListener('click', function() {
                    self.activatePrevious()
                })

                this.next.addEventListener('click', function () {
                    self.activateNext()
                })

                this.activateBatch(this.currentActive)

            },

            activateBatch: function(index) {
                this.batches[index].classList.add('active')
            },

            deactivateBatch: function(index) {
                this.batches[index].classList.remove('active')
            },

            activateNext: function() {
                this.deactivateBatch(this.currentActive)
                this.currentActive++
                if (this.currentActive ==this. batches.length) {
                    this.currentActive = 0
                }
                this.activateBatch(this.currentActive)
            },

            activatePrevious: function() {
                this.deactivateBatch(this.currentActive)
                this.currentActive--
                if (this.currentActive == -1) {
                    this.currentActive = this.batches.length -1 
                }
                this.activateBatch(this.currentActive)
            },
        }

        s.init()
        return s
    }


    slider('.team-slider-desktop')
    slider('.team-slider-mobile')
    slider('.team-slider-mobile-xs')
})