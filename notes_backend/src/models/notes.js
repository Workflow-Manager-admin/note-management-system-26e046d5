const fs = require('fs');
const path = require('path');

// Path to notes storage file
const NOTES_FILE = path.join(__dirname, '../../data/notes.json');

// Helper to safely load notes file or return empty array
function loadNotesFromFile() {
  try {
    if (!fs.existsSync(NOTES_FILE)) {
      return [];
    }
    const data = fs.readFileSync(NOTES_FILE, 'utf8');
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error('Failed to load notes from file:', err);
    return [];
  }
}

// Helper to save notes to file
function saveNotesToFile(notes) {
  try {
    fs.mkdirSync(path.dirname(NOTES_FILE), { recursive: true });
    fs.writeFileSync(NOTES_FILE, JSON.stringify(notes, null, 2));
  } catch (err) {
    console.error('Failed to save notes to file:', err);
  }
}

/**
 * NotesModel handles CRUD operations for notes, using file-based persistence.
 */
class NotesModel {
  constructor() {
    this.notes = loadNotesFromFile();
    this.nextId = this.notes.length > 0 ? Math.max(...this.notes.map(n => n.id)) + 1 : 1;
  }

  // PUBLIC_INTERFACE
  getAll() {
    /** Get all notes, ordered by id descending (newest first). */
    // Clone to avoid accidental external modifications
    return [...this.notes].sort((a, b) => b.id - a.id);
  }

  // PUBLIC_INTERFACE
  search(query) {
    /** Search notes by title or content, case-insensitive substring match. */
    const q = query.trim().toLowerCase();
    if (!q) return this.getAll();
    return this.notes.filter(
      note =>
        note.title.toLowerCase().includes(q) ||
        note.content.toLowerCase().includes(q)
    );
  }

  // PUBLIC_INTERFACE
  getById(id) {
    /** Get a note by its id. Returns null if not found. */
    return this.notes.find(n => n.id === id) || null;
  }

  // PUBLIC_INTERFACE
  create({ title, content }) {
    /** Create a new note and persist. */
    const now = new Date().toISOString();
    const newNote = {
      id: this.nextId++,
      title: title || '',
      content: content || '',
      createdAt: now,
      updatedAt: now,
    };
    this.notes.push(newNote);
    saveNotesToFile(this.notes);
    return newNote;
  }

  // PUBLIC_INTERFACE
  update(id, { title, content }) {
    /** Update an existing note by id. Returns updated note or null if not found. */
    const note = this.getById(id);
    if (!note) return null;
    if (title !== undefined) note.title = title;
    if (content !== undefined) note.content = content;
    note.updatedAt = new Date().toISOString();
    saveNotesToFile(this.notes);
    return note;
  }

  // PUBLIC_INTERFACE
  delete(id) {
    /** Delete a note by id. Returns true if deleted, false if not found. */
    const idx = this.notes.findIndex(n => n.id === id);
    if (idx === -1) return false;
    this.notes.splice(idx, 1);
    saveNotesToFile(this.notes);
    return true;
  }
}

module.exports = new NotesModel();
