'use strict';

{
    // 定数設定
    const timer = document.getElementById('timer');
    const start = document.getElementById('start');
    const stop = document.getElementById('stop');
    const reset = document.getElementById('reset');
    const log = document.getElementById('tbody');

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
        start.classList.add('inactive');
        stop.classList.add('inactive');
        reset.classList.remove('inactive');
    }

    // 止めた時間によってタイマーに色をつける
    function setTimerColor() {
        if (timer.textContent === '00:01.000') {
            timer.style.background = '#0000f0';
            timer.style.color = '#ffffff';
            timer.textContent = 'Success！';
        } else {
            timer.style.background = '#f00000';
            timer.style.color = '#ffffff';
            timer.textContent = 'Failed...';
        }
    }

    // ストップ後に設定された色のリセット
    function resetTimerColor() {
        timer.style.background = '';
        timer.style.color = '';
    }

    // Log表示
    function setLog() {
        // div要素の作成
        let tr = document.createElement('tr');
        tr.innerHTML =  '<tr><td>' + getDate() + '</td><td>---</td><td>' + timer.textContent + '</td></tr>';

        // 先頭にtrを追加
        log.insertBefore(tr, log.firstChild);
    }

    // Log表示用時間取得
    function getDate() {
        // 現在の時刻が入る（Moment.js）
        let m = moment();
        // 時刻フォーマット設定
        let output = m.format('YYYY.MM.DD HH:mm:ss');

        return output;
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
        setLog();
        setTimerColor();
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
        resetTimerColor();
        setButtonStateInitial();
        timer.textContent = '00:00.000';
        elapsedTime = 0;
    });
}