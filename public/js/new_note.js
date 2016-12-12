'use strict';

$(document).ready(function() {
  var $submit = $('#modal-submit-button');
  var $parent;
  $submit.on('click', function() {
    var $formType = $('#form-description').text();
    var $name = $('#form-text').val();
    getParent();
    if($formType === 'Folder Name: '){
      return postFolder($name, $parent);
    }
    else if($formType === 'Note Name: '){
      var noteContent = '';
      return postNote($name, noteContent, $parent);
    }
  });
  function getParent() {
    var $workspace = $('#workspace').children();
    if($workspace.hasClass('inside')){
      var $inside = $('.inside');
      if($inside.has('.folder')){
        return $parent = $inside.attr('id').slice(6);
      }
      else if($inside.has('.note')){
        //go to parent. do same as above ^
        return $parent = $inside.parent().attr('id').slice(4);
      }
    }
    else{
      return $parent = null;
    }
  };
});

//post new note
function postNote(name, content, parentId) {
  const request = {
    contentType: 'application/JSON',
    data: JSON.stringify({name, content, parentId}),
    dataType: 'json',
    type: 'POST',
    url: '/notes'
  };
  console.log(request);
  $.ajax(request)
  .done(console.log('done'));
};

//post new folder
function postFolder(name, parentId) {
  const request = {
    contentType: 'application/JSON',
    data: JSON.stringify({name, parentId}),
    dataType: 'json',
    type: 'POST',
    url: '/folders'
  }
  console.log(request);
  $.ajax(request)
  .done(console.log('done!'));
};
