let randomPassword;
let attempts;
let maxAttempts;
let countdownTimer;
let timeRemaining;
let gameWon = false;  // 新增变量，用于标记游戏是否获胜

// 在页面加载后弹出游戏规则
window.onload = function() {
    alert("欢迎来到猜数字游戏！\n\n" +
          "本游戏规则如下：\n\n" +
          "本游戏有三个难度，分别为：简单、普通、困难\n\n" +
          "简单：请在120秒内猜出密码，您只有10次机会\n" +
          "普通：请在60秒内猜出密码，您只有5次机会\n" +
          "困难：请在40秒内猜出密码，您有无限次机会\n\n" +
          "玩法：请在规定时间内猜出密码，密码为四位数、不重复的数字。");
};

function startGame(level) {
    // 清除之前的倒计时器，确保只有一个倒计时器在运行
    if (countdownTimer) {
        clearInterval(countdownTimer);
    }

    // 随机生成一个四位无重复密码
    randomPassword = generateRandomPassword();
    
    if (level == 'easy') {
        maxAttempts = 10;
        timeRemaining = 120;  // 简单：120秒
    } else if (level == 'medium') {
        maxAttempts = 5;  // 普通：次数限制为5
        timeRemaining = 60;  // 普通：60秒
    } else if (level == 'hard') {
        maxAttempts = 999;  // 困难：次数限制为999（实际上是“无限”）
        timeRemaining = 40;  // 困难：40秒
    }

    attempts = 0;
    gameWon = false;  // 游戏开始时重置获胜状态

    // 显示游戏信息，输入框和按钮
    document.getElementById('gameInfo').innerHTML = `
        <p>你选择了${capitalizeLevel(level)}难度！</p>
        <p>目标密码由四位数字组成，你有 ${level == 'hard' ? '无限' : maxAttempts} 次机会。</p>
        <input type="text" id="userGuess" placeholder="输入猜测的四位密码" />
        <button onclick="makeGuess()">猜密码</button>
    `;

    // 启动倒计时
    startCountdown();
}

// 生成一个四位随机密码，且没有重复的数字
function generateRandomPassword() {
    let digits = [];
    while (digits.length < 4) {
        let digit = Math.floor(Math.random() * 10);  // 生成0-9之间的随机数字
        if (!digits.includes(digit)) {  // 确保没有重复数字
            digits.push(digit);
        }
    }
    return digits.join('');
}

function startCountdown() {
    // 每秒更新倒计时
    countdownTimer = setInterval(function () {
        if (timeRemaining <= 0) {
            clearInterval(countdownTimer);
            document.getElementById('countdown').innerHTML = "时间到！游戏结束！";
            document.getElementById('gameInfo').innerHTML += `<p>正确的密码是 ${randomPassword}。</p>`;
        } else {
            document.getElementById('countdown').innerHTML = `剩余时间：${timeRemaining} 秒`;
            timeRemaining--;
        }
    }, 1000);
}

function makeGuess() {
    const userGuess = document.getElementById('userGuess').value;
    
    if (userGuess.length !== 4 || isNaN(userGuess)) {
        alert("请输入一个四位数字密码！");
        return;
    }

    attempts++;

    const feedback = getFeedback(userGuess);

    // 显示反馈信息
    document.getElementById('gameInfo').innerHTML += `<p>${feedback}</p>`;

    if (userGuess == randomPassword) {
        clearInterval(countdownTimer); // 猜对密码时停止倒计时
        gameWon = true;  // 标记游戏为获胜
        document.getElementById('gameInfo').innerHTML = `<p>恭喜你！猜对了密码！你用了 ${attempts} 次机会。</p>`;
        show抽奖弹窗();  // 游戏获胜后弹出抽奖弹窗
        return;
    }

    // 困难模式下不限制次数，其他模式还是有次数限制
    if (level !== 'hard' && attempts >= maxAttempts) {
        clearInterval(countdownTimer); // 用尽次数时停止倒计时
        document.getElementById('gameInfo').innerHTML = `<p>游戏结束！你没有猜对密码，正确的密码是 ${randomPassword}。</p>`;
    }
}

// 获取密码的反馈
function getFeedback(inputPasswordValue) {
    let feedback = `${inputPasswordValue} - `; // 在反馈前加上用户输入的密码
    for (let i = 0; i < 4; i++) {
        if (inputPasswordValue[i] == randomPassword[i]) {
            feedback += `第${i + 1}位正确，`;
        } else if (randomPassword.includes(inputPasswordValue[i])) {
            feedback += `第${i + 1}位数字正确，但位置不对，`;
        } else {
            feedback += `第${i + 1}位错误，`;
        }
    }
    // 去掉最后的多余的逗号
    feedback = feedback.slice(0, -1);
    return feedback;
}

// 将难度的英文表示转换为中文显示
function capitalizeLevel(level) {
    if (level == 'easy') {
        return '简单';
    } else if (level == 'medium') {
        return '普通';
    } else if (level == 'hard') {
        return '困难';
    }
    return level;
}

function show抽奖弹窗(){
    document.getElementById('抽奖').innerHTML = `
        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.5); display: flex; justify-content: center; align-items: center;">
            <div style="background: white; padding: 20px; border-radius: 10px; text-align: center;">
                <h2>恭喜你！你赢得了抽奖机会！</h2>
                <iframe src="抽奖.html" style="width: 100%; height: 300px; border: none;"></iframe>
                <button onclick="close抽奖弹窗()">关闭</button>
            </div>
        </div>
    `;
}

function close抽奖弹窗() {
    document.getElementById('抽奖').innerHTML = '';
}
