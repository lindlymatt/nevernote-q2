'use strict';

var $currentFolder;
$(document).ready(function() {
  var $submit = $('#modal-submit-button');

  $submit.on('click', function() {
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
  });
});

function getParent() {
  if ($('*').hasClass('inside')) {
    var $inside = $('.inside');
    if ($inside.parent().parent().is('#workspace')) {
      if($inside.parent().has('.folder')) {
        $currentFolder = $inside;
        return $inside.attr('id').slice(7);
      }
      else if($inside.has('.note')) {
        return null;
      }
    } else {
      if ($inside.parent().is('.folder')) {
        $currentFolder = $inside;
        return $inside.attr('id').slice(7);
      }
      $currentFolder = $inside.parent();
      return $inside.parent().attr('id').slice(7);
    }
    // else if(!($inside.parent().parent().is('#workspace')) && $inside.has('.note')) {
    //   $currentFolder = $inside.parent();
    //   return $inside.parent().find('h5').eq(0).attr('id').slice(7);
    // }
    // else if(!($inside.parent().parent().is('#workspace')) && $inside.has('.folder')) {
    //   $currentFolder = $inside.parent();
    //   return $inside.parent().find('h5').eq(0).attr('id').slice(7);
    // }
    // else if($inside.parent().parent().is('#workspace')) {
    //   return null;
    // }
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

        $currentFolder.children().show();
        $folderh5.prepend($folderI);
        $folderDiv.append($folderh5);
        $currentFolder.parent().append($folderDiv);
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

      $folderh5.on('click', function() {
        clearInterval(window.interval);
        simplemde.value(data.content);
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
      $currentFolder.parent().append($folderDiv);
      $folderh5.removeClass('inside');
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
