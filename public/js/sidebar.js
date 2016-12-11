'use strict';

let userInfo = {
    "folders": [
        {
            "childFolders": [
                {
                    "childFolders": [],
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
            "folderNotes": [],
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

function createFolders(folderObj) {
  let $li = $('<li>');
  let $a = $('<a>')
      .addClass('collapsible-header')
      .text(folderObj.name);
  let $div = $('<div>')
      .addClass('collapsible-body');
  let $ul = $('<ul>')
      .addClass('collapsible collapsible-accordion');
  $div.append($ul);
  $li.append($a).append($div);
  for (let prop in folderObj.childFolders) {
    let childrenFolders = createFolders(folderObj.childFolders[prop]);
    if (childrenFolders) {
      $ul.append(childrenFolders);
    }
  }
  for (let prop in folderObj.folderNotes) {
    let $noteA = $('<a>').text(folderObj.folderNotes[prop].name);
    $ul.append($('<li>').append($noteA));
  }
  return $li;
}

userInfo.folders.forEach((folder) => {
  $('#folders').append(createFolders(folder));
});
