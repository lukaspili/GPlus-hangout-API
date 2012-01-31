var users = new Array();

var hands = new Array();

var currentUser = null;

gapi.hangout.onApiReady.add(function(apiInitEvent) {
  if (apiInitEvent.isApiReady) {
    start();
  }
});

function start() {

  gapi.hangout.layout.displayNotice('Starting app...', false);

  users = gapi.hangout.getParticipants();
  currentUser = gapi.hangout.getParticipantById(gapi.hangout.getParticipantId());

  refresh();

  gapi.hangout.layout.displayNotice('Done !', false);
}

$('#button_ask').click(function() {

  if($.inArray(currentUser, hands) > -1) {
    gapi.hangout.layout.displayNotice('You already rised your hand', false);
    return;
  }

  hands.push(currentUser);
  refresh();

  gapi.hangout.layout.displayNotice('You rised your hand', false);
});

$('#button_cancel').click(function() {

  if($.inArray(currentUser, hands) == -1) {
    gapi.hangout.layout.displayNotice('You didn\'t rise your hand', false);
    return;
  }

  hands.remove(currentUser);
  refresh();

  gapi.hangout.layout.displayNotice('You hide your hand', false);
});

function refresh() {
  
  users.each(function(index) {
    $('#users_list').append('<li>' + users[index].person.displayName + '</li>');
  });

  hands.each(function(index) {
    $('#hands_list').append('<li>' + hands[index].person.displayName + '</li>');
  });
}