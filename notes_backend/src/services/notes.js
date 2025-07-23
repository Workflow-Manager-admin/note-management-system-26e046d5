const notesModel = require('../models/notes');

/**
 * NotesService provides methods for managing notes.
 */
class NotesService {
  // PUBLIC_INTERFACE
  getAllNotes() {
    /** Retrieve all notes. */
    return notesModel.getAll();
  }

  // PUBLIC_INTERFACE
  searchNotes(query) {
    /** Search notes by query string. */
    return notesModel.search(query);
  }

  // PUBLIC_INTERFACE
  getNoteById(id) {
    /** Retrieve a single note by ID. */
    return notesModel.getById(id);
  }

  // PUBLIC_INTERFACE
  createNote({ title, content }) {
    /** Create a new note. */
    // Additional business validation can go here
    return notesModel.create({ title, content });
  }

  // PUBLIC_INTERFACE
  updateNote(id, { title, content }) {
    /** Update an existing note. */
    return notesModel.update(id, { title, content });
  }

  // PUBLIC_INTERFACE
  deleteNote(id) {
    /** Delete an existing note by id. */
    return notesModel.delete(id);
  }
}

module.exports = new NotesService();
