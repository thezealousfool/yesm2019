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


window.onload = () => {
    main = document.getElementById("main");
    var sections = document.getElementsByTagName('section');
    for(var i = 0; i < sections.length; ++i) {
        offsets.push(sections[i].offsetTop);
    } 
    main.addEventListener('wheel', (e) => {
        e.preventDefault();
        if (!snapping) {
            snapping = true;
            if (e.deltaY > 0)
                scroll_down();
            else if (e.deltaY < 0)
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
                console.log(e.which);
            }
        } else {
            e.preventDefault();
        }
    });
}
