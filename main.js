let finished = false;
const keyBoardKeys = [];
let heroPlatform = undefined;
let accY = 5;
window.onload = loop;
window.onkeydown = (evt) => { keyBoardKeys[evt.keyCode] = evt.keyCode; }
window.onkeyup = (evt) => { keyBoardKeys[evt.keyCode] = false; }

function getPosition(obj) {
    const rect = obj.getBoundingClientRect();
    return { left: rect.left - scene.offsetLeft, top: rect.top - scene.offsetTop, width: rect.width, height: rect.height };
}

function intersect(rect1, rect2) {
    return rect1.top + rect1.height > rect2.top && rect1.left + rect1.width > rect2.left &&
        rect1.top < rect2.top + rect2.height && rect1.left < rect2.left + rect2.width;
}

function loop() {
    if (keyBoardKeys[37]) hero.style.left = Math.max(0, (getPosition(hero).left - 5)) + "px";
    if (keyBoardKeys[39]) hero.style.left = Math.min(800, (getPosition(hero).left + 5)) + "px";
    if (keyBoardKeys[38] && heroPlatform) {
        accY = -10; hero.style.top = getPosition(hero).top - 20 + "px";
    }
    accY = Math.min(5, accY + 1);
    const platforms = document.getElementsByTagName("PLATFORM");
    heroPlatform = undefined;
    for (let i = 0; i < platforms.length; i++) {
        const platform = platforms[i];
        if (intersect(getPosition(hero), getPosition(platform))) {
            heroPlatform = platform;
            platform.classList.add("on");
        }
    }
    if (!finished && intersect(getPosition(hero), getPosition(win))) { finished = true; msg.innerHTML = "you won!"; }
    if (!finished && getPosition(hero).top > scene.offsetHeight) { msg.innerHTML = "you loose!"; finished = true; }
    hero.style.top = (heroPlatform == undefined) ? (getPosition(hero).top + accY) + "px" :
        getPosition(heroPlatform).top - getPosition(hero).height + 1 + "px";
    window.requestAnimationFrame(loop);
}
