'use strict';

$(document).ready(function() {
    $('#iframe').hide();

    $('#new-folder').on('click', () => {
        $('#modal-title').text('Create New Folder');
        $('#new-icon').attr('src', '../img/new-folder-icon.png');
        $('#icon-text').text('Create New RE:Folder');
        $('#icon-description').text('Enter your new folder name, and then hit the submit button to create it!');
        $('#form-description').text('Folder Name: ');
        $('#form-text').val('');
        $('#faded-background').show();
    });

    $('#new-note').on('click', () => {
        $('#modal-title').text('Create New Note');
        $('#new-icon').attr('src', '../img/new-note-icon.png');
        $('#icon-text').text('Create New RE:Note');
        $('#icon-description').text('Enter your new note name, and then hit the submit button to create it!');
        $('#form-description').text('Note Name: ');
        $('#form-text').val('');
        $('#faded-background').show();
    });

    $('#modal-submit-button').on('click', () => {
        $('#faded-background').hide();
    });

    $('#modal-close-button').on('click', () => {
        $('#faded-background').hide();
    });

    $('#workspace').click(event => {
        if($(event.target).is('h5')) {
            if($(event.target).hasClass('.inside')) {
                // $(event.target).removeClass('.inside');
                $('#workspace').find('*').removeClass('inside');
            } else {
                $('#workspace').find('*').removeClass('inside');
                $(event.target).addClass('inside');
            }
        }
        else {
            $('#workspace').find('*').removeClass('inside');
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
        else if (!isFolder && $(event.target).is('h5')) {
            $('#iframe').show();
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
        else {
            $('#iframe').hide();
            $('#workspace').find('*').removeClass('inside');
            $('#note-text').text('Note');
        }
    });

//NOTE: functionality for dropdowns //
    let emailDropdown = $("#email-dropdown");
    let helpDropdown = $("#help-dropdown");
    let sortDropdown = $("#sort-dropdown");

    $('#user-text').click(() => {
      emailDropdown.toggleClass('show');
    });

    emailDropdown.mouseleave(() => {
      emailDropdown.toggleClass('show');
    });

    $('#help-text').click(() => {
      helpDropdown.toggleClass('show');
    });

    helpDropdown.mouseleave(() => {
      helpDropdown.toggleClass('show');
    });

    $('#sort-text').click(() => {
      sortDropdown.toggleClass('show');
    });

    sortDropdown.mouseleave(() => {
      sortDropdown.toggleClass('show');
    });

//NOTE: dynamically populate email address and workspace name//

});
