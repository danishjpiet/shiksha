const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).json({ message: 'api working' });
});

app.use('/', require('./routes/index'))

app.all('*', (req, res) => {
  const response = {
    status: "error",
    status_code: 404,
    message: 'route does not exist',

  }
  return res.status(response.status_code).json(response);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server started at port ${PORT}`);
});

