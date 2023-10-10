const router = require('express').Router();
const base64url = require('base64url');

router.get('/api/getColleges', (req, res, next)=>{
      res.status(200).json({ message: 'api working' });

});

router.get('/api/getColleges/:page_no', async (req, res, next) => {
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

    res.status(200).json({ message: data });
  });


module.exports = router;