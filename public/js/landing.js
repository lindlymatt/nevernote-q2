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

var progressCounter = 0;

/* Using jQuery */
(function($) {

    // var $noteText = $('.logo-color2');
    // Init ScrollMagic
    var ctrl = new ScrollMagic.Controller({
        globalSceneOptions: {
            // triggerHook: (0.35)
            newReverse: true

        }
    });
    // Create scene
    $('.logo-color2').each(function() {

      var tweenObj = $('#postColonLogo');
      var tweenQuant = 1;
      var tweenParams = {};
      tweenParams.y = 400;
      tweenParams.x = 400;

        new ScrollMagic.Scene({
            triggerElement: $('#postColonLogo'),
            duration: 9000,
            offset: 160
        })
        .setPin($('#postColonLogo'))
        .setTween($('.logo-color2'), 0.5, {scrollTo: {y: 50}})
        .addTo(ctrl)
        .on("change update", function (event) {
          console.log(event.type);
          // $('#postColonLogo').text("Note");
        })
        .on("progress", function (event) {
          console.log(event.type);
          ++progressCounter;
          if (progressCounter % 69 === 0) {

            var randomSelect = Math.floor(Math.random() * 12);
            switch (randomSelect) {
              case (0):
                $('#postColonLogo').text("Vise");
                break;
              case (1):
                $('#postColonLogo').text("Markable");
                break;
              case (2):
                $('#postColonLogo').text("View");
                break;
              case (3):
                $('#postColonLogo').text("Warding");
                break;
              case (4):
                $('#postColonLogo').text("Member");
                break;
              case (5):
                $('#postColonLogo').text("Invent");
                break;
              case (6):
                $('#postColonLogo').text("New");
                break;
              case (7):
                $('#postColonLogo').text("Call");
                break;
              case (8):
                $('#postColonLogo').text("Juvinate");
                break;
              case (9):
                $('#postColonLogo').text("Wire");
                break;
              case (10):
                $('#postColonLogo').text("Alize");
                break;
              case (11):
                $('#postColonLogo').text("Note");
                break;
              default:
                console.log('nope');
            }
          }
        });
    });

    // $('#pencilIcon').each(function() {
    //
    //
    //     new ScrollMagic.Scene({
    //         triggerElement: $('#postColonLogo'),
    //         duration: 9000,
    //         offset: 410
    //     })
    //     .setPin($('#pencilIcon'))
    //     .addTo(ctrl)
    //     .on("leave", function (event) {
    //       console.log(event.type);
    //       $('#pencilIcon').addClass("fa fa-pencil fa-3x");
    //     })
    //     .on("progress", function (event) {
    //       console.log(event.type);
    //       $('#pencilIcon').addClass("fa fa-pencil fa-3x");
    //
    //     });
    // });
    //

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
