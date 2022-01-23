const express = require('express');
const router = express.Router();
const news_controller = require('../Controllers/news_controller');
const auth = require('../Middlewares/auth');
const { check, validationResult } = require('express-validator');
const upload = require('../Middlewares/upload');

//retrieving News 
router.get('/news/show', news_controller.showNews);  /// showing all news
router.get('/news/showOneNewsR/:news_id', news_controller.showOneNewsR); ///Comment with reply 
router.get('/news/showOneNew/:news_id', news_controller.showOneNews); /// comment without reply for android

//Adding News
router.post('/news/add',
    // [
    //     check('title', "Title is required").not().isEmpty(),
    //     check('description', "Description is required!!").not().isEmpty()
    // ]
    // ,
    auth.verifyUser, auth.verifyAdmin, upload.single('files'), auth.verifyAdmin, news_controller.addNews);

//update
router.get('/news/showOne/:news_id', news_controller.showOne);  //// retreving only news while updating
router.put('/news/update/:id', auth.verifyUser, auth.verifyAdmin, upload.single('files'),  news_controller.update);
//

// router.put('/news/like', auth.verifyUser,news_controller.hitLike)
router.delete('/news/delete/:id', auth.verifyUser, auth.verifyAdmin, news_controller.deleteNews);
// router.get('/news/show/:type',news_controller.showNewsOf)




//Comments
//adding Comments
router.post('/news/comment/add', auth.verifyUser, news_controller.addComment);

//Deleting Comments
router.delete('news/comment/delete:id', auth.verifyUser, news_controller.deleteComment);

//Updating Comments
router.put('/news/update/:id', auth.verifyUser, auth.verifyAdmin, news_controller.updateComment)


module.exports = router;