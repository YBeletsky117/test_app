
/**
 * 
 *      ***     Function Debounce     ***
 * 
 * @function func This is the function that will be called from the debouncing effects.
 * @param delay This is the delay with which the func
 */

export function debounce (func: Function, delay: number) {
    let timer
    return function (...args): void {
        clearTimeout(timer)
        timer = setTimeout(() => {
            func.apply(this, args)
        }, delay)
    }
  }