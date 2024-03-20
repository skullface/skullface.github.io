(function() {
    const nSparkles = 66;
    const sparkles = new Array(nSparkles);
    let mouse = {
        x: 0,
        y: 0,
        moved: false
    };
    document.addEventListener("mousemove", throttle(handleMouseMove, 10));
    window.addEventListener("load", setupSparkles);
    function handleMouseMove(e) {
        mouse.x = e.pageX;
        mouse.y = e.pageY;
        mouse.moved = true;
    }
    function setupSparkles() {
        for(let i = 0; i < nSparkles; i++){
            const sparkleDiv = createSparkle(0, 0);
            document.body.appendChild(sparkleDiv);
            sparkles[i] = {
                element: sparkleDiv,
                x: 0,
                y: 0,
                size: 0,
                visible: false,
                horizontalSpeed: randomHorizontalSpeed(),
                color: aPleasingColor()
            };
        }
        doSparkles();
    }
    function doSparkles() {
        if (mouse.moved) {
            for (const sparkle of sparkles)if (sparkle.size < 1) {
                resetSparkle(sparkle);
                mouse.moved = false;
                break;
            }
        }
        for (const sparkle of sparkles)if (sparkle.visible) {
            moveSparkle(sparkle);
            shrinkSparkle(sparkle);
            updateSparkleElement(sparkle);
        }
        requestAnimationFrame(doSparkles);
    }
    function moveSparkle(sparkle) {
        sparkle.x += sparkle.horizontalSpeed;
        sparkle.y += Math.random() * 1;
    }
    function shrinkSparkle(sparkle) {
        sparkle.size -= 1;
        const style = sparkle.element.style;
        if (sparkle.size < 75) style.clip = "rect(1px, 4px, 4px, 1px)";
        if (sparkle.size < 50) {
            style.clip = "rect(2px, 4px, 4px, 2px)";
            style.backgroundColor = sparkle.color;
        }
        if (sparkle.size < 25) style.clip = "rect(2px, 3px, 3px, 2px)";
        if (sparkle.size < 1) sparkle.visible = false;
    }
    function updateSparkleElement(sparkle) {
        const style = sparkle.element.style;
        style.left = sparkle.x + "px";
        style.top = sparkle.y + "px";
        style.visibility = sparkle.visible ? "visible" : "hidden";
    }
    function resetSparkle(sparkle) {
        sparkle.visible = true;
        sparkle.x = mouse.x;
        sparkle.y = mouse.y;
        sparkle.horizontalSpeed = randomHorizontalSpeed();
        sparkle.size = 100;
        sparkle.element.style.clip = "rect(0px, 5px, 5px, 0px)";
        sparkle.element.style.backgroundColor = "transparent";
        sparkle.color = aPleasingColor();
        sparkle.element.childNodes[0].style.backgroundColor = sparkle.color;
        sparkle.element.childNodes[1].style.backgroundColor = sparkle.color;
    }
    function createSparkle(x, y) {
        const boundingBox = createDiv(x, y, 15, 15);
        boundingBox.style.backgroundColor = "transparent";
        const down = createDiv(0, 2, 5, 1);
        const across = createDiv(2, 0, 1, 5);
        boundingBox.appendChild(down);
        boundingBox.appendChild(across);
        return boundingBox;
    }
    function createDiv(x, y, w, h) {
        const div = document.createElement("div");
        div.style.position = "absolute";
        div.style.top = y + "px";
        div.style.left = x + "px";
        div.style.overflow = "hidden";
        div.style.height = h + "px";
        div.style.width = w + "px";
        div.style.pointerEvents = "none";
        return div;
    }
    function aPleasingColor() {
        const colorSet = [
            "#ff64c3",
            "#19c1df",
            "#9655c4",
            "#ff97d7",
            "#98fff7",
            "#d598ff"
        ];
        return colorSet[Math.floor(Math.random() * colorSet.length)];
    }
    function randomHorizontalSpeed() {
        const dir = Math.random() > 0.5 ? 1 : -1;
        const speed = randomInt(3);
        return speed / 10 * dir;
    }
    function randomInt(exclusiveMaximum) {
        return Math.floor(Math.random() * exclusiveMaximum);
    }
    function throttle(callback, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                callback.apply(context, args);
                inThrottle = true;
                setTimeout(()=>inThrottle = false, limit);
            }
        };
    }
})();

//# sourceMappingURL=index.396d77e6.js.map
