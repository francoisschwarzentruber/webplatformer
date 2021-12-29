const keyBoardKeys = [];
let heroPlatform = undefined;
let scene = undefined;
let initialPosition = undefined;
let iLevel = 0;
let accY = 5;

window.onload = () => { loadLevel(); loop() };
window.onkeydown = (evt) => { keyBoardKeys[evt.keyCode] = evt.keyCode; }
window.onkeyup = (evt) => { keyBoardKeys[evt.keyCode] = false; }

function getPositionHero() {
    const rect = hero.getBoundingClientRect();
    return { left: rect.left, top: rect.top, width: rect.width, height: rect.height };
}

function getPosition(obj) {
    const rect = obj.getBoundingClientRect();
    return { left: rect.left - scene.offsetLeft, top: rect.top - scene.offsetTop, width: rect.width, height: rect.height };
}

function intersect(rect1, rect2) {
    return rect1.top + rect1.height > rect2.top && rect1.left + rect1.width > rect2.left && rect1.top < rect2.top + rect2.height && rect1.left < rect2.left + rect2.width;
}

function left() { hero.style.left = (getPositionHero().left - 5) + "px"; }
function right() { hero.style.left = (getPositionHero().left + 5) + "px"; }

function loadLevel() {
    for (const scene of videogame.getElementsByTagName("LEVEL"))
        scene.style.display = "none";
    scene = videogame.children[iLevel];
    scene.style.display = "";
    heroPlatform = undefined;
    initialPosition = { x: getPositionHero().left, y: getPositionHero().top };
}



function loop() {
    if (keyBoardKeys[37]) left();
    if (keyBoardKeys[39]) right();
    if (keyBoardKeys[38] && heroPlatform) { accY = -10; hero.style.top = getPositionHero().top - 20 + "px"; }
    accY = Math.min(5, accY + 1);

    heroPlatform = undefined;
    for (const platform of scene.getElementsByTagName("PLATFORM")) {
        if (getComputedStyle(platform).opacity > 0.2)
            if (intersect(getPositionHero(), getPosition(platform))) {
                heroPlatform = platform;
                platform.classList.add("on");
            }
    }
    const win = scene.getElementsByTagName("win")[0];
    if (win && intersect(getPositionHero(), getPosition(win))) { hero.style.top = parseInt(hero.style.top) - 50 + "px"; iLevel++; loadLevel(); }
    if (getPositionHero().top > scene.offsetHeight) { hero.style.left = initialPosition.x + "px"; hero.style.top = initialPosition.y + "px"; }
    hero.style.top = (heroPlatform == undefined) ? (getPosition(hero).top + accY) + "px" :
        getPosition(heroPlatform).top - getPosition(hero).height + 1 + "px";
    window.requestAnimationFrame(loop);
}
