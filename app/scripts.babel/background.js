'use strict';

chrome.runtime.onInstalled.addListener(details => {
  console.log('onInstaller.addListener');
});

chrome.tabs.onUpdated.addListener(tabId => {
  // TODO Don't think this is needed
  // chrome.pageAction.show(tabId);
  console.log('Listener added.');
});
// function functionToRun() {
//   console.log('Ping!');
//   setTimeout(functionToRun, 50000);
// }
// setTimeout(functionToRun, 2000);

function alarmFunction() {
  chrome.notifications.create('lunchreminder', {
    type: 'basic',
    iconUrl: chrome.extension.getURL('/images/icon-16.png'),
    title: 'Lunchdags!',
    message: 'Dags att börja fundera på mat?',
  });
}
chrome.alarms.create('lunchalarm', {
  when: Date.now() + 10000,
  periodInMinutes: 1,
  // periodInMinutes: 60 * 60 * 24,
});

chrome.alarms.onAlarm.addListener(function(id) {
  console.log('Got alarm ', id);
  if (id.name === 'lunchalarm') {
    alarmFunction();
  }
})
