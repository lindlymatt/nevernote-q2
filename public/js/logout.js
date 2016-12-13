'use strict';

$(document).ready(() => {
  $('#logout').on('click', () => {
    $.ajax({
      url: '/token',
      type: 'DELETE',
      success: function(result) {
        window.location = result.redirectTo;
      }
    });
  });
});
