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
    function setButtonStateInitial(){
        start.disabled = false;
        stop.disabled = true;
        reset.disabled = true;
    }

    // 動作中の状態
    function setButtonStateRunning(){
        start.disabled = true;
        stop.disabled = false;
        reset.disabled = true;
    }

    // ストップを押した後の状態
    function setButtonStateStopped(){
        start.disabled = false;
        stop.disabled = true;
        reset.disabled = false;
    }

    // ボタンの状態を初期状態に
    setButtonStateInitial();

    // スタートを押した時のイベント定義
    start.addEventListener('click', () => {
        setButtonStateRunning();
        startTime = Date.now();
        countUp();
    });

    // ストップを押した時のイベント定義
    stop.addEventListener('click', () => {
        setButtonStateStopped();
        clearTimeout(timeoutId);
        elapsedTime += Date.now() - startTime;
    });

    // リセットを押した時のイベント定義
    reset.addEventListener('click', () => {
        setButtonStateInitial();
        timer.textContent = '00.00.000';
        elapsedTime = 0;
    });
}