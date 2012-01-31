gapi.hangout.onApiReady.add(function(apiInitEvent) {
  if (apiInitEvent.isApiReady) {
    start();
  }
});

function start() {
  gapi.hangout.layout.displayNotice('Hello World', true);
}