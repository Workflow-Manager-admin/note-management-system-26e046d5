const notesService = require('../services/notes');

/**
 * NotesController handles incoming requests for notes API operations.
 */
class NotesController {
  // PUBLIC_INTERFACE
  list(req, res) {
    /**
     * List all notes.
     * GET /notes
     */
    const notes = notesService.getAllNotes();
    res.json(notes);
  }

  // PUBLIC_INTERFACE
  search(req, res) {
    /**
     * Search notes by query string.
     * GET /notes/search?q=...
     */
    const { q } = req.query;
    if (!q || typeof q !== 'string' || !q.trim()) {
      return res.status(400).json({ error: 'Query "q" parameter is required.' });
    }
    const results = notesService.searchNotes(q);
    res.json(results);
  }

  // PUBLIC_INTERFACE
  get(req, res) {
    /**
     * Get a single note by id.
     * GET /notes/:id
     */
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid note id.' });
    }
    const note = notesService.getNoteById(id);
    if (!note) {
      return res.status(404).json({ error: 'Note not found.' });
    }
    res.json(note);
  }

  // PUBLIC_INTERFACE
  create(req, res) {
    /**
     * Create a new note.
     * POST /notes
     * Body: { title, content }
     */
    const { title, content } = req.body || {};
    if (!title || typeof title !== 'string' || !title.trim()) {
      return res.status(400).json({ error: 'Title is required.' });
    }
    if (!content || typeof content !== 'string') {
      return res.status(400).json({ error: 'Content is required.' });
    }
    const newNote = notesService.createNote({ title: title.trim(), content });
    res.status(201).json(newNote);
  }

  // PUBLIC_INTERFACE
  update(req, res) {
    /**
     * Edit/update a note.
     * PUT /notes/:id
     * Body: { title, content }
     */
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid note id.' });
    }
    const { title, content } = req.body || {};
    if (title !== undefined && (typeof title !== 'string' || !title.trim())) {
      return res.status(400).json({ error: 'If set, title must be non-empty string.' });
    }
    if (content !== undefined && typeof content !== 'string') {
      return res.status(400).json({ error: 'If set, content must be a string.' });
    }
    const updatedNote = notesService.updateNote(id, { title: title?.trim(), content });
    if (!updatedNote) {
      return res.status(404).json({ error: 'Note not found.' });
    }
    res.json(updatedNote);
  }

  // PUBLIC_INTERFACE
  delete(req, res) {
    /**
     * Delete a note.
     * DELETE /notes/:id
     */
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid note id.' });
    }
    const deleted = notesService.deleteNote(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Note not found.' });
    }
    res.status(204).send();
  }
}

module.exports = new NotesController();
