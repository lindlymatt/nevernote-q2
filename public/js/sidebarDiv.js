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
      .html(`<i class="fa fa-folder-open-o fa-fw" aria-hidden="true"></i> ${folder.name}`);

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
      .html(`<i class="fa fa-sticky-note-o fa-fw" aria-hidden="true"></i> ${note.name}`);

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
