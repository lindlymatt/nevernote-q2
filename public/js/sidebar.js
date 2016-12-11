'use strict';

function createSidebarStructure(folderObj) {
  let $li = createFolder(folderObj);
  let $ul = $li.find('ul');
  folderObj.childFolders.forEach((folder) => {
    let childrenFolders = createSidebarStructure(folder);
    if (childrenFolders) {
      $ul.append(childrenFolders);
    }
  });
  folderObj.folderNotes.forEach((note) => {
    $ul.append(createNote(note));
  });
  return $li;
}

function createFolder(folder) {
  let $li = $('<li>');
  let $a = $('<a>')
      .addClass('collapsible-header folder')
      .attr('id', `folder_${folder.id}`)
      .text(folder.name);
  let $div = $('<div>')
      .addClass('collapsible-body');
  let $ul = $('<ul>')
      .addClass('collapsible collapsible-accordion');
  $div.append($ul);
  $li.append($a).append($div);
  return $li;
}

function createNote(note) {
  let $noteLi = $('<li>');
  let $noteA = $('<a>')
      .addClass('note')
      .attr('id', `note_${note.id}`)
      .text(note.name);
  return $noteLi.append($noteA);
}

function addUserSidebarFiles(userWorkspace) {
  userWorkspace.folders.forEach((folder) => {
    $('#folders').append(createSidebarStructure(folder));
  });

  userWorkspace.notes.forEach((note) => {
    $('#folders').append(createNote(note));
  });
}

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

addUserSidebarFiles(userInfo);
