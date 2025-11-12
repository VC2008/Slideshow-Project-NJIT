let mCurrentIndex = 0 // Tracks the current image index
let mImages = [] // Array to hold GalleryImage objects
const mUrl = 'https://your-json-url.com' // Replace with actual JSON URL
const mWaitTime = 5000 // Timer interval in milliseconds

$(document).ready(() => {
  $('.details').hide(); // Hide details initially

  // Event handlers
  $('.moreIndicator').click(() => {
    $('.details').slideToggle(); 
    $('.moreIndicator').toggleClass('rot90 rot270');
  });
  $('#nextPhoto').click(showNextPhoto);
  $('#prevPhoto').click(showPrevPhoto);
  fetchJSON();
   // Load JSON data
});


// Fetch JSON and populate mImages
function fetchJSON() {
  $.ajax({
    url: mUrl,
    dataType: 'json',
    success: function (data) {
      mImages = data.images;
      swapPhoto(); 
      startTimer(); 
    },
    error: function (err) {
      console.error('Failed to load JSON:', err);
    }
  });
}

// Display current photo and metadata
function swapPhoto() {
  let img = mImages[mCurrentIndex];
  $('#photo').attr('src', img.imgCat);
  $('.location').text('Location: ' + img.imgbreed); 
  $('.description').text('Description: ' + img.description);
  $('.date').text('Date: ' + img.date);
}

// Show next photo
function showNextPhoto() {
  mCurrentIndex++;
  if (mCurrentIndex >= mImages.length) mCurrentIndex = 0;
  swapPhoto();
}

// Show previous photo
function showPrevPhoto() {
  mCurrentIndex--;
  if (mCurrentIndex < 0) mCurrentIndex = mImages.length - 1;
}

// Automatic slideshow timer
function startTimer() {
  if (slideshowTimer) clearInterval(slideshowTimer); 
  slideshowTimer = setInterval(showNextPhoto, mWaitTime);
}