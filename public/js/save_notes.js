'use strict';

var noteContent;
var noteId;
var name = 'note name';

//post note is triggered when note is created, patch note is created when note is saved, delete note is triggered on trashcan button click, get note is triggered on filesystem click

$(document).ready(function() {
  console.log('ready');
  var $button = $('button');
  noteId = 2;
  if(noteId) {
    getNote(noteId);
  };

//autosave - could be refactored to trigger on time intervals, length of time w/o mouse/key activity, or click on part of page outside text area
  var interval = 1000 * 10;
  setInterval(function() {
    patchNote(name, localStorage.smde_content);
  }, interval);

  $button.on('click', function() {
    noteContent = simplemde.value();
    // console.log(localStorage);
    console.log(noteContent);
    patchNote(name, noteContent);
  });
});

function postNote(name, content) {
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

function patchNote(name, content) {
  console.log('patching');
  const options = {
    contentType: 'application/JSON',
    data: JSON.stringify({name, content}),
    dataType: 'json',
    type: 'PATCH',
    url: '/notes/' + noteId
  }
  $.ajax(options)
  .done();
}

var currentRequest = null;

function getNote(id) {
  if(currentRequest != null) {
    currentRequest.abort();
  }
  else{
    currentRequest = $.getJSON('/notes/' + noteId)
    .done((note) => {
      // window.location.href = 'test.html/notes/10';
      simplemde.value(note.content);
      console.log(note);
    });
  }
};
