// import express router
const router = require('express').Router();
// import api routes
const apiRoutes = require('./api');
// all /api routes
router.use('/api', apiRoutes);
// message when using wrong route
router.use((req, res) => res.send('Wrong route!'));
// export router
module.exports = router;