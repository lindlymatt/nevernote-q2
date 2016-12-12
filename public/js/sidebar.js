'use strict';

function createSidebarStructure(folderObj) {
  /**
  * Generates a jQuery Object of collapsible lists that acts as
  * the users navigation for their files and folders with the
  * uppermost folder being the argument passed in
  * @param {Object} folderObj The uppermost folder of the list
  * @return {Object} A jquery object of nested collapsible lists
  *     and list elements that are either folders or files
  */

  let $li = createFolder(folderObj); // Create basic folder template
  let $ul = $li.find('ul'); // Select the list where elements will be appended

  // Traverse children folders and recursively create their elements
  folderObj.childFolders.forEach((folder) => {
    let childrenFolders = createSidebarStructure(folder);
    if (childrenFolders) {
      $ul.append(childrenFolders);
    }
  });

  // Traverse folder notes and append to the current list
  folderObj.folderNotes.forEach((note) => {
    $ul.append(createNote(note));
  });

  return $li; // Return jQuery object with folders and files
}

function createFolder(folder) {
  /**
  * Creates a jQuery list element that includes a header, body, and an
  * unordered list where new elements can be appended
  * @param {Object} folder The folder to create the list element for
  * @return {Object} A jQuery list element with the folder's info
  */

  // Create basic materialize collapsible menu template
  let $li = $('<li>');
  let $a = $('<a>')
      .addClass('collapsible-header folder')
      .attr('id', `folder_${folder.id}`) // Give folder its id in the database
      .text(folder.name); // Give header the name of the folder
  let $div = $('<div>')
      .addClass('collapsible-body');
  let $ul = $('<ul>')
      .addClass('collapsible collapsible-accordion');
  $div.append($ul);
  $li.append($a).append($div);

  return $li; // Return jQuery object with basic folder structure
}

function createNote(note) {
  /**
  * Creates a jQuery list element for a given note
  * @param {Object} note The note to create the list element for
  * @return {Object} A jQuery list element with the note's info
  */

  // Create basic note template
  let $noteLi = $('<li>');
  let $noteA = $('<a>')
      .addClass('note')
      .attr('id', `note_${note.id}`) // Give note its id in the database
      .on('click', function(){
        var noteId = `${note.id}`;
        getNote(noteId);
        var noteName = 'my note'; //get from name div
        var noteContent = simplemde.value();
        var interval = 1000 * 10;
        setInterval(function() {
          patchNote(name, localStorage.smde_content, noteId);
          }, interval);
        })
      .text(note.name); // Give note element the name of the note in database

  return $noteLi.append($noteA); // Return jQuery object with basic note
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
    $('#folders').append(createSidebarStructure(folder));
  });

  // Creates all of the top level notes (not in a folder) and appends to the page
  userWorkspace.notes.forEach((note) => {
    $('#folders').append(createNote(note));
  });
}

//return users workspace object
var userId = 2;

const userInfo =
  $.getJSON('/workspace/' + userId)
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
