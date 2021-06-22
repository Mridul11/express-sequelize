import express from 'express';
import db from '../../models' ;
import bcrypt from 'bcrypt';

const router = express.Router();

router.get('/getUsers', async (_, res) => {
    try {
        const users = await db.User.findAll({ include: [
            { model: db.Post, as: `Posts`, attributes: [`title`, `body`] },
            { model: db.Role, as: `Roles`, attributes: [`status`] }
        ]
        });
        return res.status(200).json({users});
    } catch (error) {
        return res.status(500).json({error});
    }
});

router.post('/signup', async (req, res) => {
    const { email, password, full_name } = req.body;
    const saltRounds = 10;
    const hash = bcrypt.hashSync(password, saltRounds);
    try {
        const user = await db.User.create({ email, password: hash, full_name });
        return res.status(200).json({user});
    } catch (error) {
        return res.status(500).json({error});    
    }
});

router.get('/getuser/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const user = await db.User.findOne( { where: {id} });
        const role = await db.Role.findOne({ where: { userId: user.id }});
        return res.status(200).json({user, status: role});
    } catch (error) {
        return res.status(500).json({error});
    }
});

router.delete('/deleteuser/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const user = await db.User.findOne({where: { id }});
        if(user === null){ return res.status(500).json({error: `User is not there!`}) }
        user = await db.User.destroy({ where:{id} });
        return res.status(200).json({user});
    } catch (error) {
       return res.status(500).json({error}); 
    }
});

router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    const userFound = await db.User.findOne({ where: {email} });
    if(userFound === null){
        return res.status(500).json({ error: 'User is not there!'});
    }
    bcrypt.compare(password, userFound.password, function (err, user) {
        if(err){
            return res.status(500).json({ error: 'User is not there!'});
        }else{ 
            return res.status(200).json({ userFound });
        }
    });
});

module.exports = router;
