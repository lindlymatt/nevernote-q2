'use strict';

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
      $folderDiv.append(childrenFolders);
    }
  });

  folderObj.folderNotes.forEach((note) => {
    $folderDiv.append(createNote(note));
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
      .addClass('fa fa-folder-open-o fa-fw')
      .attr('aria-hidden', true);

  $folderh5.prepend($folderI);

  return $folderDiv.append($folderh5);
}

function createNote(note) {
  /**
  * Creates a jQuery div element for a given note
  * @param {Object} note The note to create the div element for
  * @return {Object} A jQuery div element with the note's info
  */

  let $noteDiv = $('<div>')
      .addClass('note');
  let $noteh5 = $('<h5>')
      .attr('id', `note_${note.id}`)
      .text(' ' + note.name);
  let $noteI = $('<i>')
      .addClass('fa fa-sticky-note-o fa-fw')
      .attr('aria-hidden', true)
      .on('click', function(){
        var noteId = `${note.id}`;
        getNote(noteId);
        var noteName = 'my note'; //get from name div
        var noteContent = simplemde.value();
        var interval = 1000 * 10;
        setInterval(function() {
          patchNote(name, localStorage.smde_content, noteId);
          }, interval);
        });

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
}

//return users workspace object
// var userId = 2;

const userInfo =
  $.getJSON('/workspace')
  .done((workspace) => {
    addSidebarFilesToPage(workspace); // Create sidebar navigation for the user
  });

//send get request for note
function getNote(id) {
  $.getJSON('/notes/' + id)
  .done((note) => {
    simplemde.value(note.content);
  });
};

//send patch request to note
function patchNote(name, content, id) {
  const options = {
    contentType: 'application/JSON',
    data: JSON.stringify({name, content}),
    dataType: 'json',
    type: 'PATCH',
    url: '/notes/' + id
  }
  $.ajax(options)
  .done();
};
