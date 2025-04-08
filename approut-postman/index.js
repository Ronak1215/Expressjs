import express from 'express';
const app = express();

// app.get('/student', (req, res) => {
//   res.send('All students');
// });

// app.post('/student', (req, res) => {
//   res.send('Add a student');
// });

// app.put('/student', (req, res) => {
//   res.send('Update a student');
// });

// app.delete('/student', (req, res) => {
//   res.send('Delete a student');
// });

app.route('/student')
  .get((req, res) => res.send('All students'))
  .post((req, res) => res.send('Add a student'))
  .put((req, res) => res.send('Update a student'))
  .delete((req, res) => res.send('Delete a student'));

app.listen(8000, () => console.log('Server is running on port 8000'));