document.addEventListener('DOMContentLoaded', function() {
  // 获取元素
  var timeLimitInput = document.getElementById('timeLimit');
  var themeSelect = document.getElementById('theme');
  var saveButton = document.getElementById('saveButton');

  // 从存储中加载设置
  chrome.storage.sync.get(['timeLimit', 'theme'], function(data) {
      if (data.timeLimit) {
          timeLimitInput.value = data.timeLimit;
      }
      if (data.theme) {
          themeSelect.value = data.theme;
          document.body.classList.toggle('dark', data.theme === 'dark');
      }
  });

  // 保存设置
  saveButton.addEventListener('click', function() {
      var timeLimit = timeLimitInput.value;
      var theme = themeSelect.value;
      chrome.storage.sync.set({ timeLimit: timeLimit, theme: theme }, function() {
          alert('设置已保存');
      });
  });

  // 主题选择处理
  themeSelect.addEventListener('change', function() {
      document.body.classList.toggle('dark', themeSelect.value === 'dark');
  });

  // 本地化
  var elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(function(element) {
      var messageKey = element.getAttribute('data-i18n');
      element.innerText = chrome.i18n.getMessage(messageKey);
  });
});





  
  