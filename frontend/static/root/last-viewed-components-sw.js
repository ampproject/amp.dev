importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js');

var history = {
  "items": []
}

self.addEventListener('message', (event) => {
  if (event.data['history']) {
    // If the message contains a key history it is an update of the visit history
    // we are going to reverse it as new entries are pushed but we want the latest
    // to show in the top of the list
    console.log('Received history update in Service Worker.');
    history['items'] = event.data['history'].reverse();
  }
});

if (workbox) {
  workbox.setConfig({
    'debug': true
  });
  workbox.core.setLogLevel(workbox.core.LOG_LEVELS.debug);
  workbox.skipWaiting();
  workbox.clientsClaim();

  // Add a synthetic JSON endpoint that queries the latest visited from the PWA
  // as the Service Worker itself does not have access to the local storage
  workbox.routing.registerRoute(new RegExp('.*\.json'), ({url, event}) => {
    return new Response(JSON.stringify(history));
  });
}
