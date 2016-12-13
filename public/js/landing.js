'use strict';


//   $('#modalFooter').submit((event) => {
//     event.preventDefault();
//
//     const email = $('#email').val().trim();
//     const password = $('#password').val();
//
//     if (!email) {
//       return Materialize.toast('Email must not be blank', 3000);
//     }
//
//     if (!password) {
//       return Materialize.toast('Password must not be blank', 3000);
//     }
//
//     const options = {
//       contentType: 'application/json',
//       data: JSON.stringify({ email, password }),
//       dataType: 'json',
//       type: 'POST',
//       url: '/token'
//     };
//
//     $.ajax(options)
//       .done(() => {
//         window.location.href = '/favorites.html';
//       })
//       .fail(($xhr) => {
//         Materialize.toast($xhr.responseText, 3000);
//       });
//   });
// })();
/* Using jQuery */
(function($) {

    // Init ScrollMagic
    var ctrl = new ScrollMagic.Controller({
        globalSceneOptions: {
            triggerHook: 'onLeave'
        }
    });

})(jQuery);

$(document).ready(function() {
    console.log( "ready!" );
    // $('#sickk').on('click', function() {
    //   alert($('#email').val());
    // });

    $('.tooltipped').tooltip({delay: 50});



  $('.parallax').parallax();
  $('select').material_select();
  $('.button-land').mousedown(function (e) {
    var target = e.target;
    var rect = target.getBoundingClientRect();
    var ripple = target.querySelector('.ripple');
    $(ripple).remove();
    ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + 'px';
    target.appendChild(ripple);
    var top = e.pageY - rect.top - ripple.offsetHeight / 2 -  document.body.scrollTop;
    var left = e.pageX - rect.left - ripple.offsetWidth / 2 - document.body.scrollLeft;
    ripple.style.top = top + 'px';
    ripple.style.left = left + 'px';
    return false;
});
$(document).on('click', '.ripple', function(e) {
  var $rippleElement = $('<span class="ripple-effect" />'),
    $buttonElement = $(this),
    btnOffset = $buttonElement.offset(),
    xPos = e.pageX - btnOffset.left,
    yPos = e.pageY - btnOffset.top,
    size = parseInt(Math.min($buttonElement.height(), $buttonElement.width()) * 0.5),
    animateSize = parseInt(Math.max($buttonElement.width(), $buttonElement.height()) * Math.PI);

  $rippleElement
    .css({
      top: yPos,
      left: xPos,
      width: size,
      height: size,

      backgroundColor: $buttonElement.data("ripple-color")
    })
    .appendTo($buttonElement)
    .animate({
      width: animateSize,
      height: animateSize,
      opacity: 0
    }, 700, function() {
      $(this).remove();
    });
});

  $('.modal').modal({
    dismissible: true, // Modal can be dismissed by clicking outside of the modal
      opacity: 0.5, // Opacity of modal background
      in_duration: 300, // Transition in duration
      out_duration: 200, // Transition out duration
      starting_top: '4%', // Starting top style attribute
      ending_top: '10%', // Ending top style attribute
      ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
        // alert("Ready");
        console.log(modal, trigger);
      },
      complete: function() { console.log('Closed'); } // Callback for Modal close
  });
});
