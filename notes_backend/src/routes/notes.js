const express = require('express');
const notesController = require('../controllers/notes');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Notes
 *   description: CRUD operations for notes
 */

/**
 * @swagger
 * /notes:
 *   get:
 *     summary: Retrieve the list of notes
 *     tags: [Notes]
 *     responses:
 *       200:
 *         description: A list of notes
 */
router.get('/', notesController.list.bind(notesController));

/**
 * @swagger
 * /notes/search:
 *   get:
 *     summary: Search notes by query string (title or content)
 *     tags: [Notes]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         required: true
 *         description: Query string to match against notes
 *     responses:
 *       200:
 *         description: Notes matching the query
 *       400:
 *         description: Query parameter missing
 */
router.get('/search', notesController.search.bind(notesController));

/**
 * @swagger
 * /notes/{id}:
 *   get:
 *     summary: Get a note by ID
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the note
 *     responses:
 *       200:
 *         description: The requested note
 *       400:
 *         description: Invalid note ID
 *       404:
 *         description: Note not found
 */
router.get('/:id', notesController.get.bind(notesController));

/**
 * @swagger
 * /notes:
 *   post:
 *     summary: Create a new note
 *     tags: [Notes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, content]
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created note
 *       400:
 *         description: Validation error
 */
router.post('/', notesController.create.bind(notesController));

/**
 * @swagger
 * /notes/{id}:
 *   put:
 *     summary: Edit/update a note
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the note to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated note
 *       400:
 *         description: Validation error
 *       404:
 *         description: Note not found
 */
router.put('/:id', notesController.update.bind(notesController));

/**
 * @swagger
 * /notes/{id}:
 *   delete:
 *     summary: Delete a note by id
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the note to delete
 *     responses:
 *       204:
 *         description: Deleted successfully
 *       400:
 *         description: Invalid note ID
 *       404:
 *         description: Note not found
 */
router.delete('/:id', notesController.delete.bind(notesController));

module.exports = router;
