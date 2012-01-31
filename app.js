var users = new Array();

var hands = new Array();

var currentUser = null;

gapi.hangout.onApiReady.add(function(apiInitEvent) {
  if (apiInitEvent.isApiReady) {
    start();
  }
});

function start() {

  console.log('Start begin');

  gapi.hangout.layout.displayNotice('Welcome', false);
  gapi.hangout.layout.displayNotice('Starting app...', false);

  console.log('Get participants');
  users = gapi.hangout.getParticipants();
  console.log('Participants count : ' + users.count());

  console.log('Get current user');
  currentUser = gapi.hangout.getParticipantById(gapi.hangout.getParticipantId());
  console.log('Current user : ' + currentUser.person.displayName);

  refresh();

  gapi.hangout.layout.displayNotice('Done !', false);
  console.log('Start finish');
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