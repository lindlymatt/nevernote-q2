'use strict';

$(document).ready(function() {
    $('#iframe').hide();

    $('#new-folder').on('click', () => {
        $('#form-text').attr('type', 'text').removeAttr('accept').removeAttr('accept');
        $('#hidden-link').hide();
        $('#link-place').hide();
        $('#modal-close-button').removeAttr('style');
        $('#modal-submit-button').removeAttr('style');
        $('#icon-description').removeAttr('style');
        $('#modal').removeAttr('style');
        $('#modal-title').removeAttr('style');
        $('#modal-submit-button').show();
        $('#divider').show();
        $('#form-description').show();
        $('#form-text').show();
        $('#modal-title').text('Create New Folder');
        $('#new-icon').attr('src', '../img/new-folder-icon.png');
        $('#icon-text').text('Create New RE:Folder');
        $('#icon-description').text('Enter your new folder name, and then hit the submit button to create it!');
        $('#form-description').text('Folder Name: ');
        $('#form-text').val('');
        $('#faded-background').show();
    });

    $('#new-note').on('click', () => {
        $('#modal-submit-button').show();
        $('#form-text').attr('type', 'text').removeAttr('accept').removeAttr('accept');
        $('#hidden-link').hide();
        $('#link-place').hide();
        $('#modal-close-button').removeAttr('style');
        $('#modal-submit-button').removeAttr('style');
        $('#icon-description').removeAttr('style');
        $('#modal').removeAttr('style');
        $('#modal-title').removeAttr('style');
        $('#divider').show();
        $('#form-description').show();
        $('#form-text').show();
        $('#modal-title').text('Create New Note');
        $('#new-icon').attr('src', '../img/new-note-icon.png');
        $('#icon-text').text('Create New RE:Note');
        $('#icon-description').text('Enter your new note name, and then hit the submit button to create it!');
        $('#form-description').text('Note Name: ');
        $('#form-text').val('');
        $('#faded-background').show();
    });

    // <a id="edit-name" href="#">Edit Name</a>
    // <a id="upload-image" href="#">Upload Image (Get Link)</a>
    // <a id="delete-item" href="#">Delete Item</a>
    $('#upload-image').on('click', () => {
        $('#hidden-link').show();
        $('#link-place').show();
        $('#modal-close-button').removeAttr('style');
        $('#modal-submit-button').hide();
        $('#icon-description').removeAttr('style');
        $('#modal').removeAttr('style');
        $('#modal-title').removeAttr('style');
        $('#divider').show();
        $('#form-description').show();
        $('#form-text').show();
        $('#modal-title').text('Upload New Image');
        $('#new-icon').attr('src', '../img/imgur-item-icon.png');
        $('#icon-text').text('Get a Embeddable Link');
        $('#icon-description').text('Please select the image upload form below, and upload your image for a link!');
        $('#form-description').text('Image Uploader: ');
        $('#form-text').attr('type', 'file').attr('accept', 'image/*');
        $('#faded-background').show();
    });

    $('#edit-name').on('click', () => {
        $('#modal-submit-button').show();
        $('#form-text').attr('type', 'text').removeAttr('accept').removeAttr('accept');
        $('#hidden-link').hide();
        $('#link-place').hide();
        $('#modal-close-button').removeAttr('style');
        $('#modal-submit-button').removeAttr('style');
        $('#icon-description').removeAttr('style');
        $('#modal').removeAttr('style');
        $('#modal-title').removeAttr('style');
        $('#divider').show();
        $('#form-description').show();
        $('#form-text').show();
        $('#modal-title').text('Edit Item Name');
        $('#new-icon').attr('src', '../img/edit-item-icon.png');
        $('#icon-text').text('Change Name');
        $('#icon-description').text('Enter your new name, and then hit the submit button to change it!');
        $('#form-description').text('New Valid Name: ');
        $('#form-text').val('');
        $('#faded-background').show();
    });

    $('#delete-item').on('click', () => {
        $('#modal-submit-button').show();
        $('#hidden-link').hide();
        $('#link-place').hide();
        var currentItem = $('*').find('.inside');
        var currentType = '';
        if($('*').find('.inside').parent().hasClass('note')) {
            currentType = '[Note]';
        } else if($('*').find('.inside').parent().hasClass('folder')) {
            currentType = '[Folder]';
        }
        else {
            currentType = '[NOTHING HERE]';
        }
        $('#modal-title').text(`Deleting a ${currentType}`);
        $('#new-icon').attr('src', '../img/delete-item-icon.png');
        $('#icon-text').text('Deleting:');
        $('#icon-description').text(`${currentType} ${currentItem.text()}`).css('font-size', '2vw');
        $('#divider').hide();
        $('#form-description').hide();
        $('#form-text').hide();
        $('#modal').css('height', '13vw');
        $('#modal-title').css('font-size', '.5vw');
        $('#modal-submit-button').css('width', '15%').css('height', '20%').css('top', '73%');
        $('#modal-close-button').css('width', '15%').css('height', '20%').css('top', '73%');

        $('#faded-background').show();
    });

    $('#modal-submit-button').on('click', () => {
        if($('#modal-title').text().includes('Deleting')) {
            let currentItem = $('*').find('.inside').parent();
            currentItem.empty();
            currentItem.remove();
        }
        if($('#modal-title').text().includes('Edit')) {
            let currentItem = $('*').find('.inside');
            if($('*').parent().hasClass('folder')) {
                currentItem.html(`<i class="fa fa-folder-o fa-fw"></i> ${$('#form-text').val()}`);
            }
            else if($('*').parent().hasClass('note')) {
                currentItem.html(`<i class="fa fa-sticky-note-o fa-fw"></i> ${$('#form-text').val()}`);
            }
        }
        $('#faded-background').hide();
    });

    $('#modal-close-button').on('click', () => {
        $('#faded-background').hide();
    });

    $('#workspace').click(event => {
        if($(event.target).is('h5')) {
            $('*').find('.inside').removeClass('inside');
            $(event.target).addClass('inside');
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
            $('#embedded-text').hide();
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
            $('#embedded-text').show();
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

//NOTE: Add ability to download your notes
    $('#download-item').on('click', () => {
      const id = $('.inside').attr('id');
      if (id.startsWith('note')) {
        const noteId = id.split('_')[1];
        window.location = '/notes/download/' + noteId;
      }
    });
});

function patchNote(name, content, id, parentFolder) {
  if(parentFolder === -1) {
    let data = { name, content };
    $.ajax({
      url : `/notes/${id}`,
      data : JSON.stringify(data),
      type : 'PATCH',
      contentType : 'application/json',
      processData: false,
      dataType: 'json'
    });
  }
  else if(parentFolder === -1 && content === '') {
    let data = { name };
    $.ajax({
      url : `/notes/${id}`,
      data : JSON.stringify(data),
      type : 'PATCH',
      contentType : 'application/json',
      processData: false,
      dataType: 'json'
    });
  }
  else {
    let data = { name, content, parentFolder };
    $.ajax({
      url : `/notes/${id}`,
      data : JSON.stringify(data),
      type : 'PATCH',
      contentType : 'application/json',
      processData: false,
      dataType: 'json'
    });
  }
};
