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
    $parent = null;
    return;
  }
};

//post new note
function postNote(name, content, parentId) {
  if(parentId === null) {
    $.post('/notes', { name: name }, res => {
      let nId = res.id;
      let $folderDiv = $('<div>')
      .addClass('note');
      let $folderh5 = $('<h5>')
      .attr('id', `note_${nId}`)
      .text(' ' + name);
      let $folderI = $('<i>')
      .addClass('fa fa-sticky-note-o fa-fw')
      .attr('aria-hidden', true);

      $folderh5.prepend($folderI);
      $folderDiv.append($folderh5);
      $('#workspace').append($folderDiv);
      $folderh5.removeClass('inside');
      return;
    });
  }
  else {
    $.post('/notes', { name: name, parentFolder: parentId }, res => {
      let nId = res.id;
      let $folderDiv = $('<div>')
      .addClass('note');
      let $folderh5 = $('<h5>')
      .attr('id', `note_${nId}`)
      .text(' ' + name);
      let $folderI = $('<i>')
      .addClass('fa fa-sticky-note-o fa-fw')
      .attr('aria-hidden', true);

      $folderh5.prepend($folderI);
      $folderDiv.append($folderh5);
      $currentFolder.parent().append($folderDiv);
      $folderh5.removeClass('inside');
      return;
    });
  }
};

//post new folder
function postFolder(name, parentId) {
  if(parentId === null) {
    $.post('/folders', { name: name }, response => {
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
        $('#workspace').append($folderDiv);
        $folderh5.removeClass('inside');
        return;
    });
  }
  else {
    $.post('/folders', { name: name, parentFolder: parentId }, response => {
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
        $currentFolder.children().show();
        $folderh5.removeClass('inside');
        return;
    });
  }
};
