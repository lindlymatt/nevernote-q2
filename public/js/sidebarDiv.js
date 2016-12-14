'use strict';

// var simplemde = document.getElementById("iframe").contentWindow.simplemde;
var simplemde;
var interval;
$(document).ready(function() {
  $('iframe').on('load', () => {
    simplemde = document.getElementById("iframe").contentWindow.simplemde;
    $.getJSON('/workspace')
    .done((workspace) => {
      addSidebarFilesToPage(workspace); // Create sidebar navigation for the user
    });
  });
});

function createSidebarStructure(folderObj) {
  /**
  * Generates a jQuery Object of divs that acts as the users navigation
  * for their files and folders with the uppermost folder being the
  * argument passed in
  * @param {Object} folderObj The uppermost folder of the list
  * @return {Object} A jquery object of nested divs that are either folders
  *     or files
  */

  let $folderDiv = createFolder(folderObj);

  folderObj.childFolders.forEach((folder) => {
    let childrenFolders = createSidebarStructure(folder);
    if (childrenFolders) {
      childrenFolders.css('display', 'none');
      $folderDiv.append(childrenFolders);
    }
  });

  folderObj.folderNotes.forEach((note) => {
    let $note = createNote(note).css('display', 'none');
    $folderDiv.append($note);
  });

  return $folderDiv;
}

function createFolder(folder) {
  /**
  * Creates a jQuery div element for a given folder
  * @param {Object} folder The folder to create the div element for
  * @return {Object} A jQuery div element with the folder's info
  */

  let $folderDiv = $('<div>')
      .addClass('folder');
  let $folderh5 = $('<h5>')
      .attr('id', `folder_${folder.id}`)
      .text(' ' + folder.name);
  let $folderI = $('<i>')
      .addClass('fa fa-folder-o fa-fw')
      .attr('aria-hidden', true);

  $folderh5.prepend($folderI);
  // NEW
  $folderDiv.attr('draggable', true);
  $folderDiv.attr('ondragstart', 'dragAndDrop(event)');
  $folderDiv.attr('ondrop', 'dropElement(event)');
  $folderDiv.attr('ondragover', 'dragOver(event)');
  // END

  return $folderDiv.append($folderh5);
}

function createNote(note) {
  /**
  * Creates a jQuery div element for a given note
  * @param {Object} note The note to create the div element for
  * @return {Object} A jQuery div element with the note's info
  */

  let $noteDiv = $('<div>')
      .addClass('note')
  let $noteh5 = $('<h5>')
      .attr('id', `note_${note.id}`)
      .on('click', function(event) {
        clearInterval(window.interval);
        simplemde.value("Loading...");
        let noteId = note.id;
        let noteName = $('#note_' + noteId).text().trim();
        let parentId = -1;
        let $current = $('*').find('.inside');
        $.get(`/notes/${noteId}`, data => {
          clearInterval(window.interval);
          simplemde.value(data.content);
          let noteId = data.id;
          let $current = $('*').find('.inside');
          $.get(`/notes/${noteId}`, data => {
            simplemde.value(data.content);
            interval = setInterval(function() {
              patchNote(simplemde.value(), noteId);
            }, 2000);
          });
        });
      })
      .text(' ' + note.name);
  let $noteI = $('<i>')
      .addClass('fa fa-sticky-note-o fa-fw')
      .attr('aria-hidden', true);

  $noteh5.prepend($noteI);

  return $noteDiv.append($noteh5);
}

function addSidebarFilesToPage(userWorkspace) {
  /**
  * Transforms a user's folders and notes as an object into HTML elements
  * and displays them on the user's workspace page in the sidebar
  * @param {Object} userWorkspace All of the user's workspace info from
  *     querying the database
  */

  // Creates the structure for all of the folders and appends to the page
  userWorkspace.folders.forEach((folder) => {
    $('#workspace').append(createSidebarStructure(folder));
  });

  // Creates all of the top level notes (not in a folder) and appends to the page
  userWorkspace.notes.forEach((note) => {
    $('#workspace').append(createNote(note));
  });

  let wsChild = $('#workspace').children().not('#search-tag').not('#search-icon');

  if(wsChild.length < 1) {
      $('#embedded-text').html('CLICK "NEW NOTE"<br /> TO CREATE YOUR<br /> FIRST NOTE<br />AND GET STARTED!');
  }
  else if(wsChild.length > 1 && wsChild.length < 5) {
      $('#embedded-text').text('Low ammo.');
  } else if (wsChild.length > 5 && wsChild.length < 15) {
      $('#embedded-text').text('Food supply: shortening.');
  } else if (wsChild.length > 15 && wsChild.length < 25) {
      $('#embedded-text').text('You won the Oregon Trail.');
  } else if (wsChild.length > 25 && wsChild.length < 40) {
      $('#embedded-text').text('RE:Note CHAMPION!');
  }

}

//return users workspace object
// var userId = 2;

//send get request for note
function getNote(id) {
  $.getJSON('/notes/' + id)
  .done((note) => {
    simplemde.value(note.content);
  });
};

//send patch request to note
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
