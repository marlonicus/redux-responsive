// third party imports
import throttle from 'lodash/throttle'
// local imports
import calculateResponsiveState from '../actions/creators/calculateResponsiveState'

// this function adds throttled responsive handlers to the window
export default ({store, window, throttleTime, calculateStateInitially}) => {
    let flag = false
    // throttled event handler for window resize
    const throttledHandler = throttle(
        // just dispatch action to calculate responsive state
        () => {
            if (flag) {
                return false
            }
            store.dispatch(calculateResponsiveState(window))
        },
        throttleTime
    )
    // initialize the responsive state
    if (calculateStateInitially) {
        throttledHandler()
    }
    // add the resize event listener
    window.addEventListener('resize', throttledHandler)

    var beforePrint = function() {
        flag = true
        console.log('Functionality to run before printing.')
    }
    var afterPrint = function() {
        flag = false
        console.log('Functionality to run after printing')
    }

    if (window.matchMedia) {
        var mediaQueryList = window.matchMedia('print')
        mediaQueryList.addListener(function(mql) {
            if (mql.matches) {
                beforePrint()
            } else {
                afterPrint()
            }
        })
    }

    window.onbeforeprint = beforePrint
    window.onafterprint = afterPrint
}
