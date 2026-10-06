const noteForm = document.querySelector('#note-form');
const noteInput = document.querySelector('#note-input');
const noteCategory = document.querySelector('#note-category');
const searchInput = document.querySelector('#search-input');
const notesList = document.querySelector('#notes-list');
const noteCount = document.querySelector('#note-count');
const errorMessage = document.querySelector('#error-message');
const clearAllBtn = document.querySelector('#clear-all');

const MAX_LENGTH = 200;
const STORAGE_KEY = 'quicknotes';

let notes = loadNotes();

function loadNotes() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch (error) {
    return [];
  }
}

function saveNotes() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch (error) {
    // Storage may be unavailable (private mode); the app still works in memory.
  }
}

function updateCount() {
  if (notes.length === 0) {
    noteCount.textContent = 'You have no notes yet.';
  } else if (notes.length === 1) {
    noteCount.textContent = 'You have 1 note.';
  } else {
    noteCount.textContent = 'You have ' + notes.length + ' notes.';
  }
}

function getVisibleNotes() {
  const words = searchInput.value.toLowerCase().split(/\s+/).filter(Boolean);

  if (words.length === 0) {
    return notes;
  }

  return notes.filter(function (note) {
    const text = note.text.toLowerCase();
    return words.every(function (word) {
      return text.includes(word);
    });
  });
}

function deleteNote(id) {
  notes = notes.filter(function (note) {
    return note.id !== id;
  });
  saveNotes();
  render();
}

function render() {
  notesList.textContent = '';

  const visibleNotes = getVisibleNotes();

  if (notes.length > 0 && visibleNotes.length === 0) {
    const empty = document.createElement('li');
    empty.classList.add('no-results');
    empty.textContent = 'No notes match your search.';
    notesList.append(empty);
  }

  visibleNotes.forEach(function (note) {
    const li = document.createElement('li');
    li.classList.add('note-card', 'category-' + note.category);

    const text = document.createElement('p');
    text.classList.add('note-text');
    text.textContent = note.text;

    const meta = document.createElement('div');
    meta.classList.add('note-meta');

    const label = document.createElement('span');
    label.classList.add('note-category');
    label.textContent = note.category.charAt(0).toUpperCase() + note.category.slice(1);

    const date = document.createElement('span');
    date.textContent = note.createdAt;

    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', function () {
      deleteNote(note.id);
    });

    meta.append(label, date, deleteBtn);
    li.append(text, meta);
    notesList.append(li);
  });

  updateCount();
}

noteForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const text = noteInput.value.trim();

  if (text === '') {
    errorMessage.textContent = 'Please type a note first.';
    return;
  }
  if (text.length > MAX_LENGTH) {
    errorMessage.textContent = 'Notes must be 200 characters or fewer.';
    return;
  }

  errorMessage.textContent = '';

  const note = {
    id: Date.now() + Math.random(),
    text: text,
    category: noteCategory.value,
    createdAt: new Date().toLocaleString()
  };

  notes.push(note);
  saveNotes();
  noteInput.value = '';
  render();
});

searchInput.addEventListener('input', render);

clearAllBtn.addEventListener('click', function () {
  if (notes.length === 0) {
    return;
  }
  if (confirm('Delete all notes?')) {
    notes = [];
    saveNotes();
    render();
  }
});

render();