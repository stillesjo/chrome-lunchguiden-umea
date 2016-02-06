'use strict';

function alarmFunction() {
  chrome.storage.sync.get('reminder', function(result) {
    if (result.reminder) {
      chrome.notifications.create('lunchreminder', {
        type: 'basic',
        iconUrl: chrome.extension.getURL('/images/icon-16.png'),
        title: 'Lunchdags!',
        message: 'Dags att börja fundera på mat?',
      });
    }
  });
}

chrome.alarms.clear('lunchalarm', function() {
  var time = new Date().setHours(11,0,0,0);
  chrome.alarms.create('lunchalarm', {
    when: time,
    periodInMinutes: (60 * 60 * 24),
  });
});

chrome.alarms.onAlarm.addListener(function(id) {
  console.log('Got alarm ', id);
  if (id.name === 'lunchalarm') {
    alarmFunction();
  }
})
