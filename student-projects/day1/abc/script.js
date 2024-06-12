let notes = JSON.parse(localStorage.getItem('notes')) || [];

document.addEventListener('DOMContentLoaded', function() {
    displayNotes(notes);
});

document.getElementById('add-note-button').addEventListener('click', function() {
    const noteInput = document.getElementById('note-input');
    const noteText = noteInput.value.trim();
    if (noteText !== '') {
        const note = { id: Date.now(), text: noteText };
        notes.push(note);
        localStorage.setItem('notes', JSON.stringify(notes));
        displayNotes(notes);
        noteInput.value = '';
    }
});

document.getElementById('search-input').addEventListener('input', function() {
    const searchTerm = this.value.trim().toLowerCase();
    const filteredNotes = notes.filter(note => note.text.toLowerCase().includes(searchTerm));
    displayNotes(filteredNotes);
});

function displayNotes(notes) {
    const noteList = document.getElementById('note-list');
    noteList.innerHTML = '';
    notes.forEach(note => {
        const listItem = document.createElement('li');
        listItem.className = 'note-item';
        listItem.innerHTML = `
            <span contenteditable="false" onblur="updateNoteText(${note.id}, this)">${note.text}</span>
            <div>
                <button class="edit-button" onclick="editNoteText(this)">Edit</button>
                <button onclick="deleteNote(${note.id})">Delete</button>
            </div>
        `;
        noteList.appendChild(listItem);
    });
}

function editNoteText(button) {
    const noteItem = button.closest('.note-item');
    const noteSpan = noteItem.querySelector('span');
    const isEditable = noteSpan.isContentEditable;
    noteSpan.contentEditable = !isEditable;
    noteSpan.focus();
    button.textContent = isEditable ? "Edit" : "Save";
}

function updateNoteText(id, span) {
    const note = notes.find(note => note.id === id);
    note.text = span.textContent;
    localStorage.setItem('notes', JSON.stringify(notes));
}

function deleteNote(id) {
    notes = notes.filter(note => note.id !== id);
    localStorage.setItem('notes', JSON.stringify(notes));
    displayNotes(notes);
}
