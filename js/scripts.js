// navigation slide-in
$(window).load(function() {
  $('.nav_slide_button').click(function() {
    $('.pull').slideToggle();
  });
});
// first-flexslider
$(window).load(function() {
  $('#firstSlider').flexslider({
    animation: "slide",
    directionNav: false,
    controlNav: true,
    touch: false,
    start: function() {
      $.waypoints('refresh');
    }
  });
});
// second-flexslider
$(window).load(function() {
  $('#secondSlider').flexslider({
    animation: "slide",
    directionNav: false,
    controlNav: false,
    touch: false,
  });
});
$('.prev, .next').on('click', function() {
  var href = $(this).attr('href');
  $('#secondSlider').flexslider(href)
  return false;
})
// waypoints
$(document).ready(function() {

  $('.wp1').waypoint(function() {
    $('.wp1').addClass('animated fadeInUp');
  }, {
    offset: '75%'
  });

  $('.wp2').waypoint(function() {
    $('.wp2').addClass('animated fadeInUp');
  }, {
    offset: '75%'
  });

  $('.wp3').waypoint(function() {
    $('.wp3').addClass('animated fadeInUpD');
  }, {
    offset: '75%'
  });

});
// smooth scroll
$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {

      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 2000);
        return false;
      }
    }
    $('.nav_slide_button').trigger("click");
  });
});
// fancyBox
$(document).ready(function() {
  $(".various").fancybox({
    maxWidth: 800,
    maxHeight: 450,
    fitToView: false,
    width: '70%',
    height: '70%',
    autoSize: false,
    closeClick: false,
    openEffect: 'none',
    closeEffect: 'none'
  });
});


const name = document.getElementById('name');
const email = document.getElementById('email');
const message = document.getElementById('message');
const errorElement = document.getElementById('error');
const successMsg = document.getElementById('success-msg');
const submitBtn = document.getElementById('submit');

const validate = (e) => {
    e.preventDefault();

    if (name.value.length < 3) {
        errorElement.innerHTML = 'Your name should be at least 3 characters long.';
        return false;
    }

    if (!(email.value.includes('.') && (email.value.includes('@')))) {
        errorElement.innerHTML = 'Please enter a valid email address.';
        return false;
    }

    if (!emailIsValid(email.value)) {
        errorElement.innerHTML = 'Please enter a valid email address.';
        return false;
    }

    if (message.value.length < 15) {
        errorElement.innerHTML = 'Please write a longer message.';
        return false;
    }

    errorElement.innerHTML = '';
    successMsg.innerHTML = 'Thank you! I will get back to you as soon as possible.';

    e.preventDefault();
    setTimeout(function () {
        successMsg.innerHTML = '';
        document.getElementById('contact-form').reset();
    }, 6000);

    return true;

}

const emailIsValid = email => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Calendar scripts
const icsUrl = 'https://calendar.google.com/calendar/ical/8eb96a10ddb00fe5dacf9e22cc0aad11d27117c35427e7e82f5246a473189670%40group.calendar.google.com/public/basic.ics';

function createEvent(title, datetime, address, description) {
    // Create elements
    var eventTitle = $('<p>').addClass('features-title').text(title);
    var eventDatetime = $('<p>').addClass('features-datetime').text(datetime);
    var eventAddress = $('<p>').addClass('feature-text').text(address);
    var eventDescription = $('<p>').addClass('feature-text').text(description);
    var moreInfoLink = $('<a>').addClass('try-btn').attr('href', '#').text('More info');
    var moreInfoButton = $('<div>').addClass('col-md-12 text-center').append(moreInfoLink);

    // Create event container and append elements
    var eventContainer = $('<div>').addClass('event-container')
        .append(eventTitle)
        .append(eventDatetime)
        .append(eventAddress)
        .append(eventDescription)
        .append(moreInfoButton);

    // Append event container to the document
    $('#left-event-container').append(eventContainer);
}

$(document).ready(function () {   
    // Fetch the ICS feed
    fetch(icsUrl)
        .then(response => response.text())
        .then(data => {
            // Parse the ICS data with the ical.js plugin
            const jcalData = ICAL.parse(data);
            const comp = new ICAL.Component(jcalData);
            const vevents = comp.getAllProperties('vevent');

            // Iterate through each event
            vevents.forEach(e => {
                // Extract event details
                const title = e.getFirstPropertyValue('description');
                const summary = e.getFirstPropertyValue('summary');
                const location = e.getFirstPropertyValue('location');
                const startDate = e.getFirstPropertyValue('dtstart').toJSDate();
                const endDate = e.getFirstPropertyValue('dtend').toJSDate();

                // Do something with event details (e.g., display on webpage)
                createEvent(
                    title,
                    startDate,
                    location,
                    summary
                );
            });
        })
        .catch(error => {
            console.error('Error fetching or parsing ICS feed:', error);
        });
});