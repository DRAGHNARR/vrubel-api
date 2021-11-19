const router = require('express').Router();
const processes = require('./processes');

router.use('/processes', processes);
/* router.use(auth);*/

module.exports = router;