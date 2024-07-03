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
    //container要素にcontextmenuイベントリスナーを追加
    container.addEventListener('contextmenu', function(event) {

        //デフォルトのコンテキストメニュー（右クリックメニュー）が表示されるのを防ぐ
        event.preventDefault();

        //右クリックされた要素がclass="square"を持っているかどうかを確認
        if (event.target.classList.contains('square')) {

            //右クリックされた四角形を複製。cloneNode(true)は、その要素とその子要素もすべて複製
            var newSquare = event.target.cloneNode(true);

            //新しい四角形の位置を設定
            //event.clientYとevent.clientXは、右クリックされた位置のY座標とX座標
            //container.offsetTopとcontainer.offsetLeftは、コンテナ要素の上端と左端からのオフセット
            newSquare.style.top = `${event.clientY - container.offsetTop}px`;
            newSquare.style.left = `${event.clientX - container.offsetLeft}px`;

            //新しい四角形をcontainer要素に追加
            container.appendChild(newSquare);

            //新しい四角形にドラッグアンドドロップ機能を設定する関数setDragAndDropを呼び出す
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
