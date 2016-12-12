'use strict';

  var options = [
  {selector: '#staggered-test', offset:1000, callback: function(el) {
    Materialize.toast("This is our ScrollFire Demo!", 1500 );
  } },
  {selector: '#staggered-test', offset: 205, callback: function(el) {
    Materialize.toast("Please continue scrolling!", 1500 );
  } },
  {selector: '#staggered-test', offset: 400, callback: function(el) {
    Materialize.showStaggeredList($(el));
  } },
  {selector: '#image-test', offset: 500, callback: function(el) {
    Materialize.fadeInImage($(el));
  } }
  ];

Materialize.scrollFire(options);

$(document).ready(function() {
    console.log( "ready!" );

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
