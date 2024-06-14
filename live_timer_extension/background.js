chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.action === 'closeTab') {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.remove(tabs[0].id);
    });
  } else if (message.action === 'notify') {
    chrome.notifications.create('', {
      type: 'basic',
      iconUrl: 'icon.png', // 你的扩展图标路径
      title: '浏览时间提醒',
      message: message.message,
    });
  }
});






  