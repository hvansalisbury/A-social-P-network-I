// import express router
const router = require('express').Router();
// import user-routes and thought-routes file
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');
// sets up /api route behavior
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);
// export router
module.exports = router;