// 创建计时器显示元素
var timerDiv = document.createElement('div');
timerDiv.style.position = 'fixed';
timerDiv.style.bottom = '10px';
timerDiv.style.right = '10px';
timerDiv.style.padding = '10px';
timerDiv.style.backgroundColor = 'black';
timerDiv.style.color = 'white';
timerDiv.style.fontSize = '20px';
timerDiv.style.zIndex = '1000';
timerDiv.id = 'timerDiv';
document.body.appendChild(timerDiv);

// 创建暂停按钮
var pauseButton = document.createElement('button');
pauseButton.textContent = '暂停';
pauseButton.style.position = 'fixed';
pauseButton.style.bottom = '50px';
pauseButton.style.right = '10px';
pauseButton.style.padding = '10px';
pauseButton.style.zIndex = '1000';
document.body.appendChild(pauseButton);

// 创建继续按钮
var resumeButton = document.createElement('button');
resumeButton.textContent = '继续';
resumeButton.style.position = 'fixed';
resumeButton.style.bottom = '90px';
resumeButton.style.right = '10px';
resumeButton.style.padding = '10px';
resumeButton.style.zIndex = '1000';
document.body.appendChild(resumeButton);

var startTime = Date.now();
var timerRunning = true;
var pausedAt = 0;
var totalPausedTime = 0;
var intervalId;
var timeLimitInSeconds = 60; // 默认时间限制为60秒

// 从 Chrome 扩展存储中获取时间限制设置
chrome.storage.sync.get('timeLimit', function(data) {
  if (data.timeLimit) {
    timeLimitInSeconds = data.timeLimit;
  }

  // 更新计时器显示函数
  function updateTimer() {
    var currentTime = Date.now();
    var elapsedTime = (currentTime - startTime - totalPausedTime) / 1000;
    var elapsedTimeFormatted = new Date(elapsedTime * 1000).toISOString().substr(11, 8);
    timerDiv.textContent = '浏览时间: ' + elapsedTimeFormatted;

    // 提醒用户接近时间限制
    if (elapsedTime >= timeLimitInSeconds - 10 && elapsedTime < timeLimitInSeconds - 9) {
      chrome.runtime.sendMessage({ action: 'notify', message: '您即将达到时间限制' });
    }

    if (elapsedTime >= timeLimitInSeconds) {
      console.log('达到时间限制，关闭网页');
      clearInterval(intervalId);
      chrome.runtime.sendMessage({ action: 'closeTab' });
    }
  }

  // 开始计时器
  intervalId = setInterval(function() {
    if (timerRunning) {
      updateTimer();
    }
  }, 1000);

  // 暂停按钮点击事件
  pauseButton.addEventListener('click', function() {
    if (timerRunning) {
      timerRunning = false;
      pausedAt = Date.now();
      console.log("计时器已暂停");
    }
  });

  // 继续按钮点击事件
  resumeButton.addEventListener('click', function() {
    if (!timerRunning) {
      timerRunning = true;
      totalPausedTime += Date.now() - pausedAt;
      console.log("计时器已继续");
    }
  });
});









