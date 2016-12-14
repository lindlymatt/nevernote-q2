'use strict';

var $currentFolder;
$(document).ready(function() {
  var $submit = $('#modal-submit-button');

  $submit.on('click', function() {
    if($('#modal-title').text().includes('Create')) {
      var $formType = $('#form-description').text();
      var $name = $('#form-text').val();
      let $parent = getParent();
      if($parent === undefined || $parent === '') {
        $parent = null;
      }
      if($formType === 'Folder Name: ') {
        return postFolder($name, $parent);
      }
      else if($formType === 'Note Name: ') {
        return postNote($name, $parent);
      }
    }
  });
});

function getParent() {
  if ($('*').hasClass('inside')) {
    var $inside = $('.inside');
    $currentFolder = $inside;
    if ($inside.parent().parent().is('#workspace')) {
      if($inside.parent().hasClass('folder')) {
        return $inside.attr('id').slice(7);
      }
      else if($inside.has('.note')) {
        return null;
      }
    } else {
      if($inside.parent().hasClass('note')) {
        $currentFolder = $inside;
        return $inside.parent().parent().children().first().attr('id').slice(7);
      }
      $currentFolder = $inside;
      console.log($inside);
      return $inside.attr('id').slice(7);
    }
  }
  else {
    return null;
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
        $folderDiv.attr('draggable', true);
        $folderDiv.attr('ondragstart', 'dragAndDrop(event)');
        $folderDiv.attr('ondrop', 'dropElement(event)');
        $folderDiv.attr('ondragover', 'dragOver(event)');
        $('#workspace').append($folderDiv);
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

        $currentFolder.parent().children().show();
        if($currentFolder.parent().children().first().children().first().hasClass('fa-folder-o')) {
          $currentFolder.parent().children().first().children().first().toggleClass('fa-folder-o');
          $currentFolder.parent().children().first().children().first().toggleClass('fa-folder-open-o');
        }
        $folderh5.prepend($folderI);
        $folderDiv.append($folderh5);
        $folderDiv.attr('draggable', true);
        $folderDiv.attr('ondragstart', 'dragAndDrop(event)');
        $folderDiv.attr('ondrop', 'dropElement(event)');
        $folderDiv.attr('ondragover', 'dragOver(event)');
        $(`#folder_${parentId}`).parent().append($folderDiv);
        return;
    });
  }
};

//post new note
function postNote(name, parentId) {
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
      $folderh5.on('click', function() {
        clearInterval(window.interval);
        simplemde.value("Loading...");
        let noteId = res.id;
        let $current = $('*').find('.inside');
        $.get(`/notes/${noteId}`, data => {
          simplemde.value(data.content);
          interval = setInterval(function() {
            patchNote(simplemde.value(), noteId);
          }, 2000);
        });
      });

      $folderh5.prepend($folderI);
      $folderDiv.append($folderh5);
      $('#workspace').append($folderDiv);
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

      $folderh5.on('click', function() {
        clearInterval(window.interval);
        simplemde.value('Loading...');
        let noteId = res.id;
        let $current = $('*').find('.inside');
        $.get(`/notes/${noteId}`, data => {
          simplemde.value(data.content);
          interval = setInterval(function() {
            patchNote(simplemde.value(), noteId);
          }, 2000);
        });
      });

      $currentFolder.parent().children().show();
      $currentFolder.find('*').show();
      if($currentFolder.parent().children().first().children().first().hasClass('fa-folder-o')) {
        $currentFolder.parent().children().first().children().first().toggleClass('fa-folder-o');
        $currentFolder.parent().children().first().children().first().toggleClass('fa-folder-open-o');
      }
      $currentFolder.parent().find('*').show();
      $folderh5.prepend($folderI);
      $folderDiv.append($folderh5);
      $(`#folder_${parentId}`).parent().append($folderDiv);
      return;
    });
  }
};

function patchNote(content, id) {
  if(!content) {
    content = ' ';
  }

  let data = { content };
  $.ajax({
    url : `/notes/${id}`,
    data : JSON.stringify(data),
    type : 'PATCH',
    contentType : 'application/json',
    processData: false,
    dataType: 'json'
  });
};
