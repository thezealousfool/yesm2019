import './main.css'
import './index.css'

var snapping = false;
var currentTop = 0;

function easeOutExpo(iter, start, end, duration, steepness) {
    return start + (end-start)*(1-Math.pow(2, (-1*steepness*iter/duration)))
}

function doScrolling(elementY, duration) { 
  var startingY = window.pageYOffset || document.documentElement.scrollTop;
  var iters = 0;

  window.requestAnimationFrame(function step() {
    var toY = easeOutExpo(iters, startingY, elementY, duration, 15);
    window.scrollTo(0, toY);
    iters++;
    if (iters < duration) {
      window.requestAnimationFrame(step);
    } else {
        snapping=false;
    }
  })
}

window.addEventListener('scroll', function(e) {
    var newTop = window.pageYOffset || document.documentElement.scrollTop;
    var delta = (newTop - currentTop);
    if (!snapping && Math.abs(delta) > 5) {
        snapping = true;
        var direction = 1;
        if (delta < 0) {
            direction = -1;
        }
        var vh = window.innerHeight;
        var elementY = (Math.floor(currentTop / vh) + direction)*vh;
        currentTop = elementY;
        doScrolling(elementY, 50);
    }
})
