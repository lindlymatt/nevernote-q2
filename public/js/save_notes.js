'use strict';

var noteContent;
var noteId;
var name = 'note name';

$(document).ready(function() {
  console.log('ready');
  var $button = $('button');
  noteId = 10;
  if(noteId) {
    getNote(noteId);
  };

  $button.on('click', function() {
    noteContent = simplemde.value();
    console.log(noteContent);
    postVal(noteContent);
  });
});

function postVal(content) {
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

function getNote(id) {
  $.getJSON('/notes/' + noteId)
  .done((note) => {
    // window.location.href = 'test.html/notes/10';
    simplemde.value(note.content);
    console.log(note);
  });
};
