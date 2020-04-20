'use strict';

{
    const timer = document.getElementById('timer');
    const start = document.getElementById('start');
    const stop = document.getElementById('stop');
    const reset = document.getElementById('reset');

    // ボタンを押した時点での時刻
    let startTime;

    // setTimeoutで取得した時刻をclearTimeoutでキャンセルするためのID
    let timeoutId;

    // タイマーが走っていた時間
    let elapsedTime = 0;

    // カウントアップ関数
    function countUp(){
        const d = new Date(Date.now() - startTime + elapsedTime);
        const m = String(d.getMinutes()).padStart(2,'0');
        const s = String(d.getSeconds()).padStart(2, '0');
        const ms = String(d.getMilliseconds()).padStart(3, '0');
        timer.textContent = `${m}:${s}.${ms}`;

        // 10msごとにcountUp()を実行
        timeoutId = setTimeout(() => {
            countUp();
        }, 10);
    }

    // 開始前の状態
    // .inactiveクラスのつけ外しで表示切り替え
    function setButtonStateInitial(){
        start.classList.remove('inactive');
        stop.classList.add('inactive');
        reset.classList.add('inactive');
    }

    // 動作中の状態
    // .inactiveクラスのつけ外しで表示切り替え
    function setButtonStateRunning(){
        start.classList.add('inactive');
        stop.classList.remove('inactive');
        reset.classList.add('inactive');
    }

    // ストップを押した後の状態
    // .inactiveクラスのつけ外しで表示切り替え
    function setButtonStateStopped(){
        start.classList.remove('inactive');
        stop.classList.add('inactive');
        reset.classList.remove('inactive');
    }

    // ボタンの状態を初期状態に
    setButtonStateInitial();

    // スタートを押した時のイベント定義
    start.addEventListener('click', () => {
        // .inactiveクラスがある場合、ボタンを押しても反応しないようにする
        if (start.classList.contains('inactive') === true){
            return;
        }
        setButtonStateRunning();
        startTime = Date.now();
        countUp();
    });

    // ストップを押した時のイベント定義
    stop.addEventListener('click', () => {
        // .inactiveクラスがある場合、ボタンを押しても反応しないようにする
        if (stop.classList.contains('inactive') === true){
            return;
        }
        setButtonStateStopped();
        clearTimeout(timeoutId);
        elapsedTime += Date.now() - startTime;
    });

    // リセットを押した時のイベント定義
    reset.addEventListener('click', () => {
        // .inactiveクラスがある場合、ボタンを押しても反応しないようにする
        if (reset.classList.contains('inactive') === true){
            return;
        }
        setButtonStateInitial();
        timer.textContent = '00:00.000';
        elapsedTime = 0;
    });
}