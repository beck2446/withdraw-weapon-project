const router = require('express').Router()
const db = require('../database-config')
const { isGuard } = require('../middleware/middleware')

router.use(isGuard)

router.get('/borrow', async(req, res) => {
    try {
        const [rows] = await db.query(`SELECT armoryID FROM guard WHERE militaryID=?`,[
            req.session.passport.user
        ])
        console.log(rows)
        const guardID = rows[0].armoryID

        const [result] = await db.query(`SELECT * FROM borrow JOIN MILITARY ON 
        borrow.militaryID = MILITARY.militaryID 
        JOIN WEAPON ON borrow.weaponID = WEAPON.weaponID
        WHERE borrow.borrowStatus = ? `, ['รออนุมัติ'])

        console.log(result)
        res.send(result);
        
    } catch (error) {
        console.log(error);
        res.status(500).end()
    }
});

router.post('/updateborrowdata', (req, res) => {
    const key = req.body.key;
    const weapon = req.body.weapon;
    const attributeValue = req.body.attribute;

    try {
        db.query(`UPDATE borrow SET borrow.borrowStatus = ? 
        WHERE borrow.militaryID = ? AND borrow.weaponID = ?`,[
            attributeValue, key, weapon
        ])
        .then(()=>{
            console.log('Borrow status updated successfully');
            res.sendStatus(200);
        })

    } catch (error) {
        console.error('Error updating borrowStatus:', error);
        res.status(500).json({ error: 'Error updating borrowStatus' });
    }
});

router.post('/updatereturndata', (req, res) => {
    const key = req.body.key;
    const weapon = req.body.weapon;
    const attributeValue = req.body.attribute;

    try {
        db.query(`UPDATE borrow SET borrow.returnStatus = ? 
        WHERE borrow.militaryID = ? AND borrow.weaponID = ?`,[
            attributeValue, key, weapon
        ])
        .then(()=>{
            console.log('Return status updated successfully');
            res.sendStatus(200);
        })

    } catch (error) {
        console.error('Error updating returnStatus:', error);
        res.status(500).json({ error: 'Error updating returnStatus' });
    }
});


router.get('/checkArmory', async (req, res) => {
    const [rows] = await db.query(`SELECT WEAPON.* FROM WEAPON 
        JOIN MILITARY ON ? = MILITARY.militaryID
        JOIN ARMORY ON MILITARY.unitID = ARMORY.unitID 
        WHERE WEAPON.armoryID = ARMORY.armoryID`,
        [req.session.passport.user])
    res.send(rows).end()
})

router.get('/return',async (req, res) => {
    try {
        const [rows] = await db.query(`SELECT armoryID FROM guard WHERE militaryID=?`,[
            req.session.passport.user
        ])
        const guardID = rows[0].armoryID

        const [result] = await db.query(`SELECT * FROM borrow JOIN MILITARY ON 
        borrow.militaryID = MILITARY.militaryID 
        JOIN WEAPON ON borrow.weaponID = WEAPON.weaponID
        WHERE borrow.returnStatus = ? `, ['รอส่งมอบ'])
        res.send(result);
        
    } catch (error) {
        console.log(error);
        res.status(500).end()
    }
     
});
module.exports = router