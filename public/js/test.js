'use strict';

var noteContent;

$(document).ready(function() {
  console.log('ready');
  var $button = $('button');

  $button.on('click', function() {
    noteContent = simplemde.value();
    console.log(simplemde.value());
  });
});

function postVal(val) {
  const options = {
    contentType: 'application/JSON',
    data: JSON.stringify({name, })
  }
}
