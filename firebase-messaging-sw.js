/* global importScripts, firebase */
importScripts('https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.1/firebase-messaging.js');

console.log('===========================================');
console.log('FIREBASE SERVICE WORKER LOADED');
console.log('===========================================');

firebase.initializeApp({
  apiKey: '',
  projectId: '',
  messagingSenderId: '',
  appId: '',
  authDomain: '',
  databaseURL: '',
  storageBucket: '',
  measurementId: '',
});

class CustomPushEvent extends Event {
  constructor(data) {
    super('push');

    Object.assign(this, data);
    this.custom = true;
  }
}

/*
 * Overrides push notification data, to avoid having 'notification' key and firebase blocking
 * the message handler from being called
 */
self.addEventListener('push', (e) => {
  // Skip if event is our own custom event
  if (e.custom) return;

  // Kep old event data to override
  const oldData = e.data;

  // Create a new event to dispatch, pull values from notification key and put it in data key,
  // and then remove notification key
  const newEvent = new CustomPushEvent({
    data: {
      ehheh: oldData.json(),
      json() {
        const newData = oldData.json();
        newData.data = {
          ...newData.data,
          ...newData.notification,
        };
        delete newData.notification;
        return newData;
      },
    },
    waitUntil: e.waitUntil.bind(e),
  });

  // Stop event propagation
  e.stopImmediatePropagation();

  // Dispatch the new wrapped event
  dispatchEvent(newEvent);
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  // console.log('[firebase-messaging-sw.js] Received background message ', payload);

  const { title, body, icon, badge, ...restPayload } = payload.data;

  const notificationOptions = {
    body,
    icon: icon || '/icons/firebase-logo.png', // path to your "fallback" firebase notification logo
    badge: badge || '/icons/firebase-logo.png', // path to your "fallback" notification badge (Instead of the default bell)
    data: restPayload,
  };

  return self.registration.showNotification(title, notificationOptions);
});

self.addEventListener('notificationclick', (event) => {
  // console.log('[firebase-messaging-sw.js] notificationclick ', event);

  // click_action described at https://github.com/BrunoS3D/firebase-messaging-sw.js#click-action
  if (event.notification.data && event.notification.data.click_action) {
    self.clients.openWindow(event.notification.data.click_action);
  } else {
    self.clients.openWindow(event.currentTarget.origin);
  }
  
  // close notification after click
  event.notification.close();
});
