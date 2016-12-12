'use strict';

$(document).ready(function() {
    console.log("ready!");
      // Initialize collapse button
    // $(".button-collapse").sideNav();
      // Initialize collapsible (uncomment the line below if you use the dropdown variation)
    // $('.collapsible').collapsible();
    // $('.dropdown-button').dropdown();
    $('#new-folder').on('click', () => {
        $('#modal-title').text('Create New Folder');
        $('#new-icon').attr('src', '../img/new-folder-icon.png');
        $('#icon-text').text('Create New RE:Folder');
        $('#icon-description').text('Enter your new folder name, and then hit the submit button to create it!');
        $('#form-description').text('Folder Name: ');
        $('#faded-background').show();
    });

    $('#new-note').on('click', () => {
        $('#modal-title').text('Create New Note');
        $('#new-icon').attr('src', '../img/new-note-icon.png');
        $('#icon-text').text('Create New RE:Note');
        $('#icon-description').text('Enter your new note name, and then hit the submit button to create it!');
        $('#form-description').text('Note Name: ');
        $('#faded-background').show();
    });

    $('#modal-submit-button').on('click', () => {
        $('#faded-background').hide();
    });

    $('#modal-close-button').on('click', () => {
        $('#faded-background').hide();
    });

    $('#workspace').click(event => {
        $('#workspace').find('*').removeClass('inside');
        if($(event.target).is('h5')) {
            $(event.target).addClass('inside');
        }

        let isFolder = $(event.target).parent().hasClass('folder');
        if (isFolder) {
            if($(event.target).children().first().is('i')) {
                $(event.target).children().first().toggleClass('fa-folder-o');
                $(event.target).children().first().toggleClass('fa-folder-open-o');
            }
            let children = $(event.target).parent().children();
            for (let i = 0; i < children.length; i++) {
                let child = children[i];
                if ($(child).is('div')) {
                    $(child).toggle();
                }
            }
        }
        if (!isFolder) {
            if($(event.target).text().length < 10) {
                $('.logo').css('left', '50%');
                $('#note-text').text($(event.target).text());
            }
            else {
                $('.colon').css('font-size', '2rem');
                $('.logo').css('left', '50%').css('font-size', '2rem');
                $('#note-text').text($(event.target).text());
            }
        }
    });
    let emailDropdown = $("#email-dropdown");
    let helpDropdown = $("#help-dropdown");
    let sortDropdown = $("#sort-dropdown");

    $('#user-text').click((event) => {
      emailDropdown.toggleClass('show');
    });

    $('#help-text').click((event) => {
      helpDropdown.toggleClass('show');
    });

    $('#sort-text').click((event) => {
      sortDropdown.toggleClass('show');
    });
    /* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
// function myFunction() {
//     $("#sort-dropdown").toggleClass("show");
// }

// Close the dropdown menu if the user clicks outside of it
// $(window).click = function(event) {
//   if ($(!event.target).matches($('.dropa'))) {
//
//     var dropdowns = $(".dropdown-content");
//     for (var i = 0; i < dropdowns.length; i++) {
//       var openDropdown = dropdowns[i];
//       if (openDropdown.classList.contains('show')) {
//         openDropdown.classList.remove('show');
//       }
//     }
//   }
// };
});
