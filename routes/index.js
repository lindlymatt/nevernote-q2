knex('users')
  .join('userNotes', 'userNotes.userId', 'users.id')
  .join('notes', 'notes.id', 'userNotes.noteId')
  .join('folders', 'folders.userId', 'user.id')
  .where('user.id', '<RANDOM NUMBER>')
  .then(data => {
    // Gives back userNotes table data, notes table data, folders table data.
    // Loop through info here, present
  })
  .catch(err => {
    next(boom.create(404, 'Notes not found.'));
  });
