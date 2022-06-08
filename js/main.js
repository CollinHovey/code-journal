var $photoURL = document.querySelector('img.form-image');
var $newPhotoURL = document.querySelector('input#photo-url');
var $title = document.querySelector('input#title');
var $notes = document.querySelector('textarea#notes');
var $form = document.querySelector('form');
var $entryDom = document.querySelector('div.entries-container');
var $createDom = document.querySelector('div.entry-form');
var $createNewEntryButton = document.querySelector('button.entries-new');
var $seeAllEntriesButton = document.querySelector('button.entries-button');
var $entryList = document.querySelector('ul.entries-list');
var $noEntries = document.querySelector('div.no-entries');

function switchCreate(event) {
  $createDom.setAttribute('class', 'entry-form');
  $entryDom.setAttribute('class', 'entries-container column-half-entries hidden');
}
$createNewEntryButton.addEventListener('click', switchCreate);

function switchEntries(event) {
  $createDom.setAttribute('class', 'entry-form hidden');
  $entryDom.setAttribute('class', 'entries-container column-half-entries');
}
$seeAllEntriesButton.addEventListener('click', switchEntries);

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
  data.entries.unshift(newEntry);
  data.nextEntryId += 1;
  $entryList.prepend(newEntryDom(newEntry));
  $form.reset();
  switchEntries();
  if (data.entries.length !== 0) {
    $noEntries.remove();
  }
  $photoURL.setAttribute('src', 'images/placeholder-image-square.jpg');
}

$form.addEventListener('submit', addEntry);

function newEntryDom(entry) {
  var $newList = document.createElement('li');
  $newList.setAttribute('class', 'column-full-entry');
  var $listInfo = document.createElement('div');
  $listInfo.setAttribute('class', 'entries-list column-half');
  var $newEntryName = document.createElement('h1');
  $newEntryName.setAttribute('class', 'entry-name');
  $newEntryName.textContent = entry.title;
  $listInfo.appendChild($newEntryName);
  var $newEntrySumary = document.createElement('p');
  $newEntrySumary.textContent = entry.notes;
  $listInfo.appendChild($newEntrySumary);
  var $imageList = document.createElement('div');
  $imageList.setAttribute('class', 'column-half');
  var $entryImage = document.createElement('img');
  $imageList.appendChild($entryImage);
  $entryImage.setAttribute('src', entry.photoURL);
  $entryImage.setAttribute('alt', 'Content Image');
  $newList.appendChild($imageList);
  $newList.appendChild($listInfo);
  return $newList;
}

function loadingAllEntries(entry) {
  if (data.entries.length !== 0) {
    $noEntries.remove();
    for (var x = (data.entries.length - 1); x > -1; x--) {
      $entryList.prepend(newEntryDom(data.entries[x]));
    }
  }
}

window.addEventListener('DOMContentLoaded', loadingAllEntries);
