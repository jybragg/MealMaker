const express = require('express');
const router = express.Router();

router.use('/',require('../routes/html-routes'));

router.use('/api',require('../routes/api-routes'));


module.exports = router;