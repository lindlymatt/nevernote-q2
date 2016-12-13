'use strict';

var $parent;
var $currentFolder;
$(document).ready(function() {
  var $submit = $('#modal-submit-button');

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
});

function getParent() {
  if ($('*').hasClass('inside')) {
    var $inside = $('.inside');
    $currentFolder = $inside;
    var $insideEle = $('.inside').get(0).id;
    if ($inside.parent().has('.folder')){
      $parent = $inside.attr('id').slice(7);
      return;
    }
    else if ($inside.parent().has('.note')){
      //go to parent. do same as above ^
      $parent = $inside.parent().attr('id').slice(4);
      return;
    }
  }
  else {
    return $parent = null;
  }
};

//post new note
function postNote(name, content, parentId) {
  $.post('/notes', { name: name, content: content, parentFolder: $parent }, res => {
      console.log(response);
      var nId = response.id;
      let $folderDiv = $('<div>')
          .addClass('folder');
      let $folderh5 = $('<h5>')
          .attr('id', `folder_${fId}`)
          .text(' ' + name);
      let $folderI = $('<i>')
          .addClass('fa fa-folder-o fa-fw')
          .attr('aria-hidden', true);

      $folderh5.prepend($folderI);
      $folderDiv.append($folderh5);
      $currentFolder.parent().append($folderDiv);
      $folderh5.removeClass('inside');
      return;
  });
};

//post new folder
function postFolder(name, parentId) {
  $.post('/folders', { name: name, parentFolder: $parent }, response => {
      var fId = response[0].id;
      let $folderDiv = $('<div>')
          .addClass('folder');
      let $folderh5 = $('<h5>')
          .attr('id', `folder_${fId}`)
          .text(' ' + name);
      let $folderI = $('<i>')
          .addClass('fa fa-folder-o fa-fw')
          .attr('aria-hidden', true);

      $folderh5.prepend($folderI);
      $folderDiv.append($folderh5);
      $currentFolder.parent().append($folderDiv);
      $folderh5.removeClass('inside');
      return;
  });
};
