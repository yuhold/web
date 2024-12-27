let randomPassword = generateRandomPassword();  // 生成初始密码
let errorCount = 0;                             // 错误次数计数
let remainingTime = 120;                        // 剩余时间
let gameInterval;
let isGameStarted = false;                      // 游戏是否已经开始

// 游戏开始
document.getElementById("startBtn").onclick = function () {
    startGame();
};

// 提交密码
document.getElementById("submitBtn").onclick = function () {
    inputPassword();
};

// 重新开始游戏
document.getElementById("restartBtn").onclick = function () {
    restartGame();
};

function startGame() {
    // 初始化游戏状态
    randomPassword = generateRandomPassword();
    errorCount = 0;
    remainingTime = 120;
    isGameStarted = true;
    
    // UI更新
    document.getElementById("startBtn").style.display = "none";
    document.getElementById("inputSection").style.display = "block";
    document.getElementById("restartBtn").style.display = "none";
    document.getElementById("feedback").textContent = "";
    document.getElementById("record").textContent = "";
    
    // 启动倒计时
    startCountdown();
}

function inputPassword() {
    const inputPasswordValue = document.getElementById("passwordInput").value;

    // 输入检查
    if (inputPasswordValue.length !== 4 || isNaN(inputPasswordValue)) {
        document.getElementById("feedback").textContent = "请输入4位数字的密码！";
        return;
    }

    // 判断密码是否正确
    if (inputPasswordValue === randomPassword) {
        endGame("恭喜，你猜对了！游戏胜利！");
    } else {
        errorCount++;
        const feedback = getFeedback(inputPasswordValue);
        document.getElementById("feedback").textContent = feedback;

        // 更新记录窗口
        const record = document.createElement("div");
        record.textContent = `输入密码: ${inputPasswordValue} -> ${feedback}`;
        document.getElementById("record").appendChild(record);

        // 错误次数过多时结束游戏
        if (errorCount >= 5) {
            endGame("错误次数过多，游戏失败！");
        }
    }
}

// 获取密码的反馈
function getFeedback(inputPasswordValue) {
    let feedback = "";
    let correctPosition = 0;
    let incorrectPosition = 0;

    for (let i = 0; i < 4; i++) {
        if (inputPasswordValue[i] === randomPassword[i]) {
            correctPosition++;
        } else if (randomPassword.includes(inputPasswordValue[i])) {
            incorrectPosition++;
        }
    }

    feedback = `${correctPosition} 个数字正确，位置正确，${incorrectPosition} 个数字正确，位置错误。`;
    return feedback;
}

// 结束游戏
function endGame(message) {
    clearInterval(gameInterval);  // 清除倒计时
    document.getElementById("feedback").textContent = message;

    // 显示重新开始按钮
    document.getElementById("startBtn").textContent = "重新开始";
    document.getElementById("startBtn").style.display = "inline-block";
    document.getElementById("inputSection").style.display = "none";
    document.getElementById("restartBtn").style.display = "inline-block";
}

// 重新开始游戏
function restartGame() {
    errorCount = 0;
    remainingTime = 120;
    document.getElementById("feedback").textContent = "";
    document.getElementById("record").textContent = "";
    document.getElementById("time").textContent = "剩余时间: 120秒";
    document.getElementById("restartBtn").style.display = "none";
    document.getElementById("startBtn").textContent = "开始游戏";
    document.getElementById("startBtn").style.display = "inline-block";
}

// 生成一个四位数密码
function generateRandomPassword() {
    let password = '';
    while (password.length < 4) {
        const digit = Math.floor(Math.random() * 10).toString();
        if (!password.includes(digit)) {
            password += digit;
        }
    }
    return password;
}

// 启动倒计时
function startCountdown() {
    gameInterval = setInterval(function () {
        if (remainingTime > 0) {
            remainingTime--;
            document.getElementById("time").textContent = `剩余时间: ${remainingTime}秒`;
        } else {
            endGame("时间到，游戏失败！");
        }
    }, 1000);
}
