const express = require('express');
const cors = require('cors');
const app = express();
const base64url = require('base64url');
// app.use(rateLimiter);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api', (req, res) => {
  res.status(200).json({ message: 'api working' });
});

app.get('/api/getColleges/:page_no', async (req, res) => {
    const jsonObj = JSON.stringify({
        "uaf": [
          "state"
        ],
        "rf": "filters",
        "url": "/colleges"+"-"+req.params.page_no,
        "dn": "national"
    });
    const buffer = Buffer.from(jsonObj);
    const token = base64url(buffer);
    const response = await fetch('https://apis.shiksha.com/apigateway/categorypageapi/v2/info/getCategoryPageFull?data='+token);
    const data = await response.json(); 
    console.log(data);

    res.status(200).json({ message: data });
  });

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

