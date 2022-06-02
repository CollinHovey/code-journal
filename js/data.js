/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

window.addEventListener('beforeunload', saveData);

function saveData(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('allEntries', dataJSON);
}
