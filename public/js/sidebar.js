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

// An example of a workspace object returned from the database
const userInfo = {
    "folders": [
        {
            "childFolders": [
                {
                    "childFolders": [{
                      "childFolders": [],
                      "folderNotes": [{
                        "id": 13,
                        "name": "Aidan's Dank Note",
                        "note_id": 13,
                        "parent_folder": 3
                      }],
                      "id": 14,
                      "name": "This is another folder",
                      "parent_folder": 3,
                      "user_id": 2
                    }],
                    "folderNotes": [
                        {
                            "content": "This is Matt Pestridge's note \n ## This is the second line.",
                            "created_at": "2016-12-10T20:28:40.197Z",
                            "id": 2,
                            "name": "Pestridge Test Note",
                            "note_id": 3,
                            "parent_folder": 3,
                            "read_only": false,
                            "updated_at": "2016-12-10T20:28:40.197Z",
                            "user_id": 2
                        }
                    ],
                    "id": 3,
                    "is_secure": false,
                    "name": "I gave my wife to Lindly",
                    "parent_folder": 4,
                    "user_id": 2
                },
                {
                    "childFolders": [],
                    "folderNotes": [],
                    "id": 5,
                    "is_secure": false,
                    "name": "New Foldaa",
                    "parent_folder": 4,
                    "user_id": 2
                }
            ],
            "folderNotes": [],
            "id": 4,
            "is_secure": false,
            "name": "Lindly over Pestridge",
            "parent_folder": null,
            "user_id": 2
        },
        {
            "childFolders": [],
            "folderNotes": [{
              id: 50,
              name: 'This is a note!'
            }],
            "id": 2,
            "is_secure": true,
            "name": "Passwords Folder",
            "parent_folder": null,
            "user_id": 2
        }
    ],
    "notes": [
      {
        id: 20,
        name: 'My Random Note'
      }
    ]
};

addSidebarFilesToPage(userInfo); // Create sidebar navigation for the user


function getNote(id) {
  $.getJSON('/notes/' + id)
  .done((note) => {
    simplemde.value(note.content);
    console.log(note);
  });
};
