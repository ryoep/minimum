(function() {
    var container = document.getElementById('container'); // 四角形を配置するコンテナ要素を取得する

    container.addEventListener('touchstart', function(e) {
        var touch = e.touches[0]; // 最初のタッチの情報を取得する

        // タッチされた位置に新しい四角形を作成する
        var newSquare = document.createElement('div');
        newSquare.classList.add('drag-and-drop'); // 同じクラスを設定する
        newSquare.style.position = 'absolute';
        newSquare.style.width = '100px';
        newSquare.style.height = '100px';
        newSquare.style.backgroundColor = 'green'; // 例として緑色の背景色を設定する
        newSquare.style.left = touch.pageX + 'px'; // タッチされたX座標に配置する
        newSquare.style.top = touch.pageY + 'px'; // タッチされたY座標に配置する

        container.appendChild(newSquare); // 新しい四角形をコンテナに追加する

        // タッチした要素をドラッグ可能にする処理を追加する（以前のコードを適用）
        newSquare.addEventListener('mousedown', mdown, false);
        newSquare.addEventListener('touchstart', mdown, false);
    });

    function mdown(e) {
        this.classList.add("drag");

        if(e.type === "mousedown") {
            var event = e;
        } else {
            var event = e.changedTouches[0];
        }

        var x = event.pageX - this.offsetLeft;
        var y = event.pageY - this.offsetTop;

        document.body.addEventListener("mousemove", mmove, false);
        document.body.addEventListener("touchmove", mmove, false);

        function mmove(e) {
            var drag = document.getElementsByClassName("drag")[0];

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

        function mup(e) {
            var drag = document.getElementsByClassName("drag")[0];

            document.body.removeEventListener("mousemove", mmove, false);
            drag.removeEventListener("mouseup", mup, false);
            document.body.removeEventListener("touchmove", mmove, false);
            drag.removeEventListener("touchend", mup, false);

            drag.classList.remove("drag");
        }
    }
})();
