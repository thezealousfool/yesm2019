import './main.css'
import './index.css'

var main = null;
var offsets = [];
var currentIndex = 0;
var snapping = false;

function scroll_to() {
    var str ='translateY(-'+offsets[currentIndex]+'px)';
    main.style.transform = str;
    window.setTimeout(() => snapping=false, 500);
}

function scroll_to_first() {
    if (currentIndex !== 0) {
        currentIndex = 0;
        scroll_to();
    } else {
        snapping = false;
    }
}

function scroll_to_last() {
    if (currentIndex !== offsets.length-1) {
        currentIndex = offsets.length-1;
        scroll_to();
    } else {
        snapping = false;
    }
}

function scroll_down() {
    if (currentIndex < offsets.length-1) {
        ++currentIndex;
        scroll_to();
    } else {
        snapping = false;
    }
}

function scroll_up() {
    if (currentIndex > 0) {
        --currentIndex;
        scroll_to();
    } else {
        snapping = false;
    }
}

function get_section_offsets() {
    var sections = document.getElementsByTagName('section');
    offsets = [];
    for(var i = 0; i < sections.length; ++i) {
        offsets.push(sections[i].offsetTop);
    }
}

window.onload = () => {
    main = document.getElementById("main");
    get_section_offsets();
    main.addEventListener('wheel', (e) => {
        e.preventDefault();
        if (!snapping) {
            snapping = true;
            if (e.deltaY > 10)
                scroll_down();
            else if (e.deltaY < -10)
                scroll_up();
            else
                snapping = false;
        }
    });
    window.addEventListener('keydown', (e) => {
        if (!snapping) {
            snapping = true;
            if (e.which == 40 || e.which == 34) {
                e.preventDefault();
                scroll_down();
            } else if (e.which == 38 || e.which == 33) {
                e.preventDefault();
                scroll_up();
            } else if (e.which == 36) {
                e.preventDefault();
                scroll_to_first();
            } else if (e.which == 35) {
                e.preventDefault();
                scroll_to_last();
            } else {
                snapping = false;
            }
        } else {
            e.preventDefault();
        }
    });
    var touch_startY = null;
    window.addEventListener('touchstart', (e) => {
        if (snapping)
            return;
        touch_startY = e.touches[0].screenY;
    });
    window.addEventListener('touchmove', (e) => {
        if (snapping || touch_startY === null)
            return;
        var touchY = e.touches[0].screenY;
        if (Math.abs(touchY-touch_startY) > 10) {
            snapping = true;
            if (touchY - touch_startY < 0)
                scroll_down();
            else
                scroll_up();
            touch_startY = null;
        }
    });
    window.addEventListener('resize', (e) => {
        get_section_offsets();
        snapping = true;
        scroll_to();
    });
}
