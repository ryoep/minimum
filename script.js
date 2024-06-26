(function() {
    //要素の取得
    var container = document.getElementById('container');

    //要素内のクリックされた位置を取得するグローバル（のような）変数
    var x;
    var y;

    //ドラッグアンドドロップのイベント設定
    function setDragAndDrop(element) {
        element.addEventListener("mousedown", mdown, false);
        element.addEventListener("touchstart", mdown, false);
    }

    //四角形の複製
    container.addEventListener('contextmenu', function(event) {
        event.preventDefault();
        if (event.target.classList.contains('red-box')) {
            var newSquare = event.target.cloneNode(true);
            newSquare.style.top = `${event.clientY - container.offsetTop}px`;
            newSquare.style.left = `${event.clientX - container.offsetLeft}px`;
            container.appendChild(newSquare);
            setDragAndDrop(newSquare);
        }
    });

    //マウスが押された際の関数
    function mdown(e) {
        var event = e.type === "mousedown" ? e : e.changedTouches[0];
        this.classList.add("drag");
        x = event.pageX - this.offsetLeft;
        y = event.pageY - this.offsetTop;

        document.body.addEventListener("mousemove", mmove, false);
        document.body.addEventListener("touchmove", mmove, false);
    }

    //マウスカーソルが動いたときに発火
    function mmove(e) {
        var drag = document.getElementsByClassName("drag")[0];
        var event = e.type === "mousemove" ? e : e.changedTouches[0];
        e.preventDefault();
        drag.style.top = event.pageY - y + "px";
        drag.style.left = event.pageX - x + "px";

        drag.addEventListener("mouseup", mup, false);
        document.body.addEventListener("mouseleave", mup, false);
        drag.addEventListener("touchend", mup, false);
        document.body.addEventListener("touchleave", mup, false);
    }

    //マウスボタンが上がったら発火
    function mup(e) {
        var drag = document.getElementsByClassName("drag")[0];
        document.body.removeEventListener("mousemove", mmove, false);
        drag.removeEventListener("mouseup", mup, false);
        document.body.removeEventListener("touchmove", mmove, false);
        drag.removeEventListener("touchend", mup, false);
        drag.classList.remove("drag");
    }

    // 初期四角形の設定
    var elements = document.getElementsByClassName("drag-and-drop");
    for (var i = 0; i < elements.length; i++) {
        setDragAndDrop(elements[i]);
    }
})();
