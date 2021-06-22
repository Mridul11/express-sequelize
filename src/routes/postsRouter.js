const express = require('express');
import db from '../../models' ;
const router = express.Router();

router.post(`/createpost`, async (req, res) => {
    const { userId, title, body } = req.body;
    try {
        const post = await db.Post.create({userId, title, body });
        return res.status(200).json(post);
    } catch (error) {
       return res.status(500).json({error}); 
    }
});

router.get('/getPosts', async (req, res) => {
    try {
        const posts= await db.Post.findAll({ attributes: [`id`,`title`, `body`, `userId`] });
        return res.status(200).json({posts});
    } catch (error) {
       return res.status(500).json({error}); 
    }
})

module.exports = router;