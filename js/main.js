var $photoURL = document.querySelector('img.form-image');
var $newPhotoURL = document.querySelector('input#photo-url');
var $title = document.querySelector('input#title');
var $notes = document.querySelector('textarea#notes');
var $addForm = document.querySelector('form.add-form');
var $photoURLEdit = document.querySelector('img.form-image-edit');
var $newPhotoURLEdit = document.querySelector('input#photo-url-edit');
var $titleEdit = document.querySelector('input#title-edit');
var $notesEdit = document.querySelector('textarea#notes-edit');
var $editForm = document.querySelector('form.edit-form');
var $entryDom = document.querySelector('div.entries-container');
var $createDom = document.querySelector('div.entry-form');
var $editDom = document.querySelector('div.edit-form');
var $createNewEntryButton = document.querySelector('button.entries-new');
var $seeAllEntriesButton = document.querySelector('button.entries-button');
var $entryList = document.querySelector('ul.entries-list');
var $noEntries = document.querySelector('div.no-entries');
var $allEdits = document.querySelectorAll('i');

var dataEntryValue = 0;
var editEntryValue = 0;

function switchCreate(event) {
  $createDom.setAttribute('class', 'entry-form');
  $entryDom.setAttribute('class', 'entries-container column-half-entries hidden');
  $editDom.setAttribute('class', 'edit-form hidden');
}
$createNewEntryButton.addEventListener('click', switchCreate);

function switchEntries(event) {
  $createDom.setAttribute('class', 'entry-form hidden');
  $entryDom.setAttribute('class', 'entries-container column-half-entries');
  $editDom.setAttribute('class', 'edit-form hidden');
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

function updateEditPhoto(event) {
  if (event.target.value === '') {
    $photoURLEdit.setAttribute('src', 'images/placeholder-image-square.jpg');
  } else {
    $photoURLEdit.setAttribute('src', event.target.value);
  }
}

$newPhotoURLEdit.addEventListener('input', updateEditPhoto);

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
  $addForm.reset();
  switchEntries();
  if (data.entries.length !== 0) {
    $noEntries.remove();
  }
  $photoURL.setAttribute('src', 'images/placeholder-image-square.jpg');
  $allEdits = document.querySelectorAll('i');
}

$addForm.addEventListener('submit', addEntry);

function newEntryDom(entry) {
  var $newList = document.createElement('li');
  $newList.setAttribute('class', 'column-full-entry entry-' + entry.entryId);
  var $listInfo = document.createElement('div');
  $listInfo.setAttribute('class', 'entries-list column-half');
  var $newEntryName = document.createElement('h1');
  $newEntryName.setAttribute('class', 'entry-name entry-' + entry.entryId);
  $newEntryName.textContent = entry.title;
  $listInfo.appendChild($newEntryName);
  var $editButton = document.createElement('i');
  $editButton.setAttribute('class', 'fa-solid fa-pen edit-entry-' + entry.entryId);
  $newEntryName.appendChild($editButton);
  var $newEntrySumary = document.createElement('p');
  $newEntrySumary.setAttribute('class', 'entry-' + entry.entryId);
  $newEntrySumary.textContent = entry.notes;
  $listInfo.appendChild($newEntrySumary);
  var $imageList = document.createElement('div');
  $imageList.setAttribute('class', 'column-half');
  var $entryImage = document.createElement('img');
  $imageList.appendChild($entryImage);
  $entryImage.setAttribute('class', 'entry-' + entry.entryId);
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
      $allEdits = document.querySelectorAll('i');
    }
    for (var y = 0; y < $allEdits.length; y++) {
      $allEdits[y].addEventListener('click', editCreate);
    }
  }
}

function editCreate(event) {
  $editDom.setAttribute('class', 'edit-form');
  $entryDom.setAttribute('class', 'entries-container column-half-entries hidden');
  for (var x = 1; x <= data.entries.length; x++) {
    var $testDOM = document.querySelector('i.edit-entry-' + x);
    if (event.target === $testDOM) {
      dataEntryValue = data.entries.length - x;
      editEntryValue = x;
      $photoURLEdit.setAttribute('src', data.entries[dataEntryValue].photoURL);
      $newPhotoURLEdit.value = data.entries[dataEntryValue].photoURL;
      $titleEdit.value = data.entries[dataEntryValue].title;
      $notesEdit.value = data.entries[dataEntryValue].notes;
    }
  }
}

function editEntry(event) {
  event.preventDefault();
  data.entries[dataEntryValue].title = $titleEdit.value;
  data.entries[dataEntryValue].photoURL = $newPhotoURLEdit.value;
  data.entries[dataEntryValue].notes = $notesEdit.value;
  $editForm.reset();
  var $editButtonNew = document.createElement('i');
  $editButtonNew.setAttribute('class', 'fa-solid fa-pen edit-entry-' + editEntryValue);
  var $editImage = document.querySelector('img.entry-' + editEntryValue);
  var $editTitle = document.querySelector('h1.entry-' + editEntryValue);
  var $editNotes = document.querySelector('p.entry-' + editEntryValue);

  $editImage.setAttribute('src', data.entries[dataEntryValue].photoURL);
  $editTitle.textContent = data.entries[dataEntryValue].title;
  $editTitle.appendChild($editButtonNew);
  $editNotes.textContent = data.entries[dataEntryValue].notes;
  switchEntries();
  if (data.entries.length !== 0) {
    $noEntries.remove();
  }
  $allEdits = document.querySelectorAll('i');
  $editButtonNew.addEventListener('click', editCreate);
}

$editForm.addEventListener('submit', editEntry);

window.addEventListener('DOMContentLoaded', loadingAllEntries);
