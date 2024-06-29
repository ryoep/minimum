(function() {
    //要素の取得
    var container = document.getElementById('container');

    //要素内のクリックされた位置を取得するグローバル（のような）変数
    var x;
    var y;

    //ドラッグアンドドロップのイベント設定
    for(var i = 0; i < elements.length; i++) {
        elements[i].addEventListener("mousedown", mdown, false);
        elements[i].addEventListener("touchstart", mdown, false);
    }

    //四角形の複製
    container.addEventListener('contextmenu', function(event) {
        event.preventDefault();
        if (event.target.classList.contains('square')) {
            var newSquare = event.target.cloneNode(true);
            newSquare.style.top = `${event.clientY - container.offsetTop}px`;
            newSquare.style.left = `${event.clientX - container.offsetLeft}px`;
            container.appendChild(newSquare);
            setDragAndDrop(newSquare);
        }
    });

    //マウスが押された際の関数
    function mdown(e) {

        this.classList.add("drag");

        //タッチデイベントとマウスのイベントの差異を吸収            
        if(e.type === "mousedown") {
             var event = e;
        } else {
                var event = e.changedTouches[0];
            }

        x = event.pageX - this.offsetLeft;
        y = event.pageY - this.offsetTop;

        document.body.addEventListener("mousemove", mmove, false);
        document.body.addEventListener("touchmove", mmove, false);
    }

    //マウスカーソルが動いたときに発火
    function mmove(e) {

        //ドラッグしている要素を取得
        var drag = document.getElementsByClassName("drag")[0];

        //同様にマウスとタッチの差異を吸収
        if(e.type === "mousemove") {
            var event = e;
        } else {
            var event = e.changedTouches[0];
        }

        //フリックしたときに画面を動かさないようにデフォルト動作を抑制
        e.preventDefault();

        //マウスが動いた場所に要素を動かす
        drag.style.top = event.pageY - y + "px";
        drag.style.left = event.pageX - x + "px";

        //マウスボタンが離されたとき、またはカーソルが外れたとき発火
        drag.addEventListener("mouseup", mup, false);
        document.body.addEventListener("mouseleave", mup, false);
        drag.addEventListener("touchend", mup, false);
        document.body.addEventListener("touchleave", mup, false);
    }

    //マウスボタンが上がったら発火
    function mup(e) {
        var drag = document.getElementsByClassName("drag")[0];

        //ムーブベントハンドラの消去
        document.body.removeEventListener("mousemove", mmove, false);
        drag.removeEventListener("mouseup", mup, false);
        document.body.removeEventListener("touchmove", mmove, false);
        drag.removeEventListener("touchend", mup, false);

        //クラス名 .drag も消す
        drag.classList.remove("drag");
    }

    // 初期四角形の設定
    //var elements = document.getElementsByClassName("drag-and-drop");
    //for (var i = 0; i < elements.length; i++) {
    //    setDragAndDrop(elements[i]);
    //}
})();
