'use strict';

$(document).ready(function() {
  var noteId = 2; //change to getting id from token
  var noteName;
  var noteContent;

  $button.on('click', function() {
    var noteContent = simplemde.value();
    postVal(noteContent);
  });
});

function postNote(content) {
  const options = {
    contentType: 'application/JSON',
    data: JSON.stringify({name, content}),
    dataType: 'json',
    type: 'POST',
    url: '/notes'
  };
  console.log(options);
  $.ajax(options)
  .done(console.log('done'));
};
