'use strict';

$(document).ready(function() {
    $('iframe').on('load', () => {
        simplemde = document.getElementById("iframe").contentWindow.simplemde;
    });
    $('#iframe').hide();
    $('#edit-name').hide();
    $('#delete-item').hide();
    $('#download-item').hide();

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
            let id = 0;
            let type = '';
            let currentItem = $('*').find('.inside');
            if(currentItem.parent().hasClass('folder')) {
                id = currentItem.attr('id').slice(7);
                type = 'folder';
            }
            else if(currentItem.parent().hasClass('note')) {
                id = currentItem.attr('id').slice(5);
                type = 'note';
            }
            currentItem.parent().empty();
            currentItem.parent().remove();
            $('#faded-background').hide();
            $('#iframe').hide();
            deleteItem(type, id);
        }
        if($('#modal-title').text().includes('Edit')) {
            let id = 0;
            let type = '';
            let currentItem = $('*').find('.inside');
            if(currentItem.parent().hasClass('folder')) {
                currentItem.html(`<i class="fa fa-folder-o fa-fw"></i> ${$('#form-text').val()}`);
                id = currentItem.attr('id').slice(7);
                type = 'folder';
            }
            else if(currentItem.parent().hasClass('note')) {
                currentItem.html(`<i class="fa fa-sticky-note-o fa-fw"></i> ${$('#form-text').val()}`);
                id = currentItem.attr('id').slice(5);
                type = 'note';
            }
            name = $('#form-text').val();
            $('#faded-background').hide();
            $('#iframe').hide();
            patchName(type, name, id);
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
            $('#edit-name').show();
            $('#delete-item').show();
            $('#download-item').hide();
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
            $('#edit-name').show();
            $('#delete-item').show();
            $('#download-item').show();
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
            $('#edit-name').hide();
            $('#delete-item').hide();
            $('#download-item').hide();
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

    emailDropdown.on('mouseenter', () => {
        emailDropdown.on('mouseleave', () => {
            emailDropdown.toggleClass('show');
        });
    });

    $('#help-text').click(() => {
      helpDropdown.toggleClass('show');
    });

    helpDropdown.on('mouseenter', () => {
        helpDropdown.on('mouseleave', () => {
            helpDropdown.toggleClass('show');
        });
    });

    $('#sort-text').click(() => {
      sortDropdown.toggleClass('show');
    });

    sortDropdown.on('mouseenter', () => {
        sortDropdown.on('mouseleave', () => {
            sortDropdown.toggleClass('show');
        });
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

function patchName(type, name, id) {
  if(type === 'folder') {
      if(name === '') {
        name = 'Untitled Folder';
      }
    type = 'folders';
  }
  else if(type === 'note') {
      if(name === '') {
        name = 'Untitled Note';
      }
    type = 'notes';
  }

  let data = { name };
  $.ajax({
    url : `/${type}/${id}`,
    data : JSON.stringify(data),
    type : 'PATCH',
    contentType : 'application/json',
    processData: false,
    dataType: 'json'
  }).done(data => console.log(data));
};

function deleteItem(type, id) {
    if(type === 'folder') {
        $.ajax({
            url: `/folders/${id}`,
            type: 'DELETE',
            contentType:'application/json',
            dataType: 'json',
            success: function(result) {console.log(result)},
            error: function(result) {console.log(result)}
        });
    }
    else if(type === 'note') {
        $.ajax({
            url: `/notes/${id}`,
            type: 'DELETE',
            contentType:'application/json',
            dataType: 'json',
            success: function(result) {console.log(result)},
            error: function(result) {console.log(result)}
        });
    }
}


// NEW
function dragAndDrop(event) {
  event.dataTransfer.setData('Text', $(event.target)[0].outerHTML);
  event.dataTransfer.dropEffect = 'move';
}

function dropElement(event) {
  event.preventDefault();

  const data = event.dataTransfer.getData('Text');
  const $element = $(data);
  $element.css('display', 'none');

  const oldElementId = $element.find('h5').attr('id');

  const oldFolderId = oldElementId.split('_')[1];

  if ($(event.target).attr('id') !== oldElementId) {
    let childElements = $element.find('h5');

    $element.find('h5').each((index, element) => {
      if ($(element).attr('id').includes('note')) {
        let noteId = $(element).attr('id').split('_')[1];
        $(element).on('click', function(event) {
          clearInterval(window.interval);
          simplemde.value("Loading...");
          $.get(`/notes/${noteId}`, data => {
            clearInterval(window.interval);
            simplemde.value(data.content);
            $.get(`/notes/${data.id}`, data => {
              simplemde.value(data.content);
              interval = setInterval(function() {
                patchNote(simplemde.value(), noteId);
              }, 2000);
            });
          });
        });
      }
    });

    $(`#${oldElementId}`).parent().remove();

    $(event.target).parent().append($element);

    $.ajax({
      url: `/folders/${oldFolderId}`,
      method: 'PATCH',
      data: {
        parentFolder: Number.parseInt($(event.target).attr('id').split('_')[1])
      }
    }).done((results) => {
      console.log('updated');
    });
  }
}

function dragOver(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
}
