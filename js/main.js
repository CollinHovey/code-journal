var $photoURL = document.querySelector('img');
var $newPhotoURL = document.querySelector('input#photo-url');
var $title = document.querySelector('input#title');
var $notes = document.querySelector('textarea#notes');
var $submit = document.querySelector('button.submit');

function updatePhoto(event) {
  if (event.target.value === '') {
    $photoURL.setAttribute('src', 'images/placeholder-image-square.jpg');
  } else {
    $photoURL.setAttribute('src', event.target.value);
  }
}

$newPhotoURL.addEventListener('input', updatePhoto);

function addEntry(event) {
  event.preventDefault();
  var newEntry = {};
  newEntry.entryId = data.nextEntryId;
  newEntry.title = $title.value;
  newEntry.photoURL = $newPhotoURL.value;
  newEntry.notes = $notes.value;
  data.entries.push(newEntry);
  data.nextEntryId += 1;
  $newPhotoURL.value = '';
  $photoURL.setAttribute('src', 'images/placeholder-image-square.jpg');
  $title.value = '';
  $notes.value = '';
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('allEntries', dataJSON);
}

$submit.addEventListener('click', addEntry);
