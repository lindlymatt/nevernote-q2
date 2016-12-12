'use strict';

$(document).ready(function() {
  //on folder form submit post folder()
  //on note form submit post note()

});

//post new note
function postNote(name, content, id) {
  const request = {
    contentType: 'application/JSON',
    data: JSON.stringify({name, content}),
    dataType: 'json',
    type: 'POST',
    url: '/notes'
  };
  console.log(request);
  $.ajax(request)
  .done(console.log('done'));
};

//post new folder
function postFolder(name,  id) {
  const request = {
    contentType: 'application/JSON',
    data: JSON.stringify({name})
  }
}
