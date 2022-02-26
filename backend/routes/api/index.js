const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const searchRouter = require('./search.js');
const reviewsRouter = require('./reviews');
const albumsRouter = require('./albums');
const listsRouter = require('./lists');
const commentsRouter = require('./comments');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/search', searchRouter);
router.use('/reviews', reviewsRouter);
router.use('/albums', albumsRouter);
router.use('/lists', listsRouter);
router.use('/comments', commentsRouter);

module.exports = router;
