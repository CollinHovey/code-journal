/* exported data */
var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

window.addEventListener('beforeunload', saveData);

window.addEventListener('load', pullData);

function saveData(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('allEntries', dataJSON);
}

function pullData(event) {
  var savedDataJSON = localStorage.getItem('allEntries');
  var savedData = JSON.parse(savedDataJSON);
  if (savedData !== null) {
    data = savedData;
  }
}
