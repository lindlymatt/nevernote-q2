'use strict';

var noteContent;
var name = 'note name';

$(document).ready(function() {
  console.log('ready');
  var $button = $('button');

  var noteId = window.QUERY_PARAMETERS.id;
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
  const options = {
    contentType: 'application/JSON',
    dataType: 'json',
    type: 'GET',
    url: '/notes/' + id
  }
  $.ajax(options)
  .done(console.log('done'));
}
