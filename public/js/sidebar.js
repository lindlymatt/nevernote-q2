'use strict';

// function sidebarGenerator(ul, userInfo) {
//   const folders = userInfo.folders;
//   const notes = userInfo.notes;
//
//   folders.forEach((folder) => {
//
//   });
//
// }

let userInfo = {
    "childFolders": [
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

let folderStructure;

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
  return $li;
}

let test = createFolders(userInfo.childFolders[0]);
console.log(test);
$('#folders').append(test);


//
// function appendFolder(ul, folderObj) {
//   let test; // create variable outside of there and then return after the loop
//   for (let i = 0; i < folderObj.childFolders.length; i++) {
//     let currentFolder = folderObj.childFolders[i];
//     let $li = $('<li></li>');
//     let $a = $('<a></a>')
//               .addClass('collapsible-header')
//               .text(currentFolder.name);
//     $li.append($a);
//     let $ul = $('<ul></ul>')
//               .addClass('collapsible collapsible-header');
//     let $div = $('<div></div>')
//               .addClass('collapsible-body');
//     $div.append($ul);
//     $li.append($div);
//     ul.append(appendFolder(currentFolder));
//   }
//   return $('<li>Test</li>'); // return create new file
//
//
//
//
//
//   // folderObj.childFolders.forEach((folder) => {
//   //   // console.log(folder);
//   //   let $li = $('<li></li>');
//   //   let $a = $('<a></a>')
//   //             .addClass('collapsible-header')
//   //             .text(folder.name);
//   //   $li.append($a);
//   //   let $div = $('<div></div>')
//   //             .addClass('collapsible-body');
//   //   let $ul = $('<ul></ul>')
//   //             .addClass('collapsible collapsible-header');
//   //   console.log('ul', $ul);
//   //   $div.append($ul);
//   //   console.log('div', $div);
//   //   $li.append($div);
//   //   console.log('li', $li);
//   //   // console.log($li);
//   //   return ul.append(appendFolder($ul, folder));
//   // });
//   //
//   // return ul;
// }
//
//
// let ul = $('.side-nav');
//
//
//
// let test = appendFolder(ul, userInfo);
// console.log(test.children()[1]);
// ul.append(test.children()[1]);
// // console.log(ul);
//
// // let sidebar = $('.side-nav');
// // let thing = appendFolder(sidebar, userInfo);
// // console.log(thing);
// // sidebar.append(thing);
