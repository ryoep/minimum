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

    // 初期四角形の設定
    //squareである全ての要素を取得し、elementsに格納
    var elements = document.getElementsByClassName("square");
    for (var i = 0; i < elements.length; i++) {
        //各要素に対してsetDragAndDropを適用
        setDragAndDrop(elements[i]);
    } 

    //四角形の複製 
    container.addEventListener('contextmenu', function(event) {
        event.preventDefault();
        if (event.target.classList.contains('square')) {
            var newSquare = event.target.cloneNode(true);
    
            // 元の square の位置を取得
            var originalTop = parseInt(window.getComputedStyle(event.target).top, 10); //event.targetが元の四角形でその座標を取得している
            var originalLeft = parseInt(window.getComputedStyle(event.target).left, 10);
    
            // 複製された四角形を元の位置から10pxずらした位置に配置
            newSquare.style.top = `${originalTop + 10}px`;
            newSquare.style.left = `${originalLeft + 10}px`;
    
            container.appendChild(newSquare);
            setDragAndDrop(newSquare);
        }
    });
    

    //マウスが押された際の関数
    function mdown(e) {
        //タッチデイベントとマウスのイベントの差異を吸収
        if(e.type === "mousedown") {
            var event = e;
        } else {
            var event = e.changedTouches[0];
        }
        this.classList.add("drag");
        x = event.pageX - this.offsetLeft;
        y = event.pageY - this.offsetTop;

        document.body.addEventListener("mousemove", mmove, false);
        document.body.addEventListener("touchmove", mmove, false);
    }

    //マウスカーソルが動いたときに発火
    function mmove(e) {
        var drag = document.getElementsByClassName("drag")[0];
        //同様にマウスとタッチの差異を吸収
        if(e.type === "mousemove") {
            var event = e;
        } else {
            var event = e.changedTouches[0];
        }
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

})();