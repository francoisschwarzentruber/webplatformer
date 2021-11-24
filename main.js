window.onload = loop;
let finished = false;
const keyBoardKeys = [];
let heroPlatform = undefined;

window.onkeydown = (evt) => { keyBoardKeys[evt.keyCode] = evt.keyCode; }
window.onkeyup = (evt) => { keyBoardKeys[evt.keyCode] = false; }

function intersect(rect1, rect2) {
    return rect1.top + rect1.height > rect2.top && rect1.left + rect1.width > rect2.left &&
        rect1.bottom - rect1.height < rect2.bottom && rect1.right - rect1.width < rect2.right;
}

let accY = 5;

function loop() {
    if (keyBoardKeys[37]) hero.style.left = (hero.getBoundingClientRect().x - 5) + "px";
    if (keyBoardKeys[39]) hero.style.left = (hero.getBoundingClientRect().x + 5) + "px";
    if (keyBoardKeys[38] && heroPlatform) {
        accY = -20; hero.style.top = heroPlatform.getBoundingClientRect().y - 20 + "px";
    }
    accY = Math.min(5, accY + 1);
    const platforms = document.getElementsByTagName("PLATFORM");
    heroPlatform = undefined;
    for (let i = 0; i < platforms.length; i++) {
        const platform = platforms[i];
        if (intersect(hero.getBoundingClientRect(), platform.getBoundingClientRect())) {
            heroPlatform = platform;
            platform.classList.add("on");
        }
    }
    if (!finished && intersect(hero.getBoundingClientRect(), win.getBoundingClientRect())) {
        finished = true; alert("you won!");
    }
    if (!finished && hero.getBoundingClientRect().y > window.innerHeight) {
        alert("you loose!"); finished = true;
    }
    hero.style.top = (heroPlatform == undefined) ? (hero.getBoundingClientRect().y + accY) + "px" :
        heroPlatform.getBoundingClientRect().y - hero.getBoundingClientRect().height + 1 + "px";
    window.requestAnimationFrame(loop);
}