import express from 'express';
import db from '../../models' ;
const router = express.Router();

router.post('/createrole', async (req, res) => {
    const { userId, status } = req.body;
    try {
        const role = await db.Role.create({ userId, status });
        return res.status(200).json({role});
    } catch (error) {
        return res.status(500).json({error});    
    }
});

router.get('/getRoles', async (req, res) => {
    try {
        const roles = await db.Role.findAll({attributes: [`status`]});
        return res.status(200).json({roles});
    } catch (error) {
        return res.status(500).json({error});    
    }
});

router.put(`/updaterole`, async(req, res) => {
    const {userId} = req.query;
    const { status } = req.body;
    try {
        const role = await db.Role.findOne({ where:  {userId} });
        role.update({status});
        return res.status(200).json({role});
    } catch (error) {
        return res.status(500).json({error});    
    }
});

module.exports = router;