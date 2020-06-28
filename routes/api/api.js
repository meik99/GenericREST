const express = require('express');
const router = express.Router();
const genericRoutes = require('./v1/generic');

router.use('/v1', genericRoutes);

module.exports = router;