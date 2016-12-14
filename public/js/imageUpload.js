'use strict';

function onFileSelected(event) {
  const selectedFile = event.target.files[0];
  const reader = new FileReader();
  reader.onload = function(event) {
    const picture = event.target.result;
    const pictureUpload = picture.slice(picture.indexOf(',') + 1);
    $.ajax({
      type: 'POST',
      url: 'https://api.imgur.com/3/image',
      data: {
        'image': pictureUpload,
        'type': 'base64'
      },
      headers: {
        'Authorization': 'Client-ID df00dc614037d2f'
      }
    })
    .done((result) => {
      const link = result.data.link;
      console.log(link);
    });
  };

  reader.readAsDataURL(selectedFile);
}
