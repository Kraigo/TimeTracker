var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.send('Api page');
});

router.use(require('./users'));
router.use(require('./tasks'));
router.use(require('./teams'));
router.use(require('./projects'));
router.use(require('./categories'));
router.use(require('./invitation'));

module.exports = router;