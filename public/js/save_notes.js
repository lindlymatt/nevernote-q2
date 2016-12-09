'use strict';

var noteContent;
var name = 'note name';

$(document).ready(function() {
  console.log('ready');
  var $button = $('button');

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
}
