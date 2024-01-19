const router = require('express').Router()
const db = require('../database-config')

router.post('/borrow', async (req, res) => {
    const weaponList = req.body.weapon

    try {
        weaponList.map((val) => {
            db.query(`UPDATE WEAPON set status = 0 WHERE WEAPON.weaponName=? LIMIT ?`,
                [val.weaponName, val.amount])
        })
    } catch (err) {
        console.log(err)
        res.status(500).end()
    }

    const weaponObj = []
    let obj = {}
    weaponList.map(async (val) => {
        const [rows] = await db.query('SELECT weaponID FROM WEAPON WHERE weaponName=? LIMIT ?', [
            val.weaponName,
            val.amount
        ])
        if (rows.length === 1) {
            obj = {
                weaponID: rows[0].weaponID,
                borrowDate: val.borrowDate,
                returnDate: val.returnDate
            }
            weaponObj.push(obj)
        } else if (rows.length === 2) {
            let obj1 = {
                weaponID: rows[0].weaponID,
                borrowDate: val.borrowDate,
                returnDate: val.returnDate
            }
            weaponObj.push(obj1)

            let obj2 = {
                weaponID: rows[1].weaponID,
                borrowDate: val.borrowDate,
                returnDate: val.returnDate
            }
            weaponObj.push(obj2)

        }

        const [l] = await db.query('SELECT * FROM borrow')

        let i = 0
        if (l.length > 0) {
            i = l[l.length - 1].borrowID
        }

        weaponObj.map((val) => {
            db.query(`INSERT INTO borrow 
            (militaryID,weaponID,borrowDate,returnDate,borrowStatus,returnStatus,borrowID,borrowReason)
            VALUES (?,?,?,?,?,?,?,?)`, [
                req.session.passport.user,
                val.weaponID,
                val.borrowDate,
                val.returnDate,
                'รออนุมัติ',
                'รอส่งมอบ',
                ++i,
                req.body.reason
            ])
        })
    })
    res.send({ role: req.session.role })
})

router.post('/searchRegx', async (req, res) => {
    const name = req.body.name
    if (name) {
        const [rows] = await db.query(`
    SELECT 
    (SELECT COUNT(*) FROM WEAPON 
     JOIN MILITARY ON ? = MILITARY.militaryID
     JOIN ARMORY ON MILITARY.unitID = ARMORY.unitID 
     WHERE WEAPON.armoryID = ARMORY.armoryID and WEAPON.status=1 and WEAPON.weaponName LIKE ?) as num_available, 
    WEAPON.*,ARMORY.armoryName 
    FROM WEAPON 
    JOIN MILITARY ON ? = MILITARY.militaryID
    JOIN ARMORY ON MILITARY.unitID = ARMORY.unitID 
    WHERE WEAPON.armoryID = ARMORY.armoryID and WEAPON.status=1 and WEAPON.weaponName LIKE ? 
    LIMIT 1`, [
        req.session.passport.user, name + '%', req.session.passport.user, name + '%'
    ]);
    
    res.send(rows).end()
    }
    res.end()
})

router.get('/search:name', async (req, res) => {
    const name = req.params.name
    const [rows] = await db.query(`
    SELECT 
    (SELECT COUNT(*) FROM WEAPON 
     JOIN MILITARY ON ? = MILITARY.militaryID
     JOIN ARMORY ON MILITARY.unitID = ARMORY.unitID 
     WHERE WEAPON.armoryID = ARMORY.armoryID and WEAPON.status=1 and WEAPON.weaponName = ?) as num_available, 
    WEAPON.*,ARMORY.armoryName 
    FROM WEAPON 
    JOIN MILITARY ON ? = MILITARY.militaryID
    JOIN ARMORY ON MILITARY.unitID = ARMORY.unitID 
    WHERE WEAPON.armoryID = ARMORY.armoryID and WEAPON.status=1 and WEAPON.weaponName = ? 
    LIMIT 1`, [
        req.session.passport.user, name, req.session.passport.user, name
    ])
    res.send(rows).end()
})

router.get('/profilename', async (req, res) => {
    var result = await db.query('SELECT prefix FROM MILITARY WHERE militaryID = ?', [req.session.passport.user]);
    var name = result[0][0].prefix;

    result = await db.query('SELECT Fname FROM MILITARY WHERE militaryID = ?', [req.session.passport.user]);
    name = name + result[0][0].Fname;

    result = await db.query('SELECT Lname FROM MILITARY WHERE militaryID = ?', [req.session.passport.user]);
    name = name + " " + result[0][0].Lname;
    res.send(name);
});

router.get('/profileid', async (req, res) => {
    var id = "Military ID: " + req.session.passport.user;
    res.send(id);
});

router.get('/profilemforce', async (req, res) => {
    var result = await db.query('SELECT affiliation FROM MILITARY WHERE militaryID = ?', [req.session.passport.user]);
    var mforce = result[0][0].affiliation;

    result = await db.query('SELECT militaryForce FROM MILITARY WHERE militaryID = ?', [req.session.passport.user]);
    mforce = mforce + " " + result[0][0].militaryForce;

    res.send(mforce);
});

router.get('/borrow', async(req, res) =>{
    try {
        const [result] = await db.query('SELECT * FROM borrow WHERE militaryID = ?',[
            req.session.passport.user
        ])
        res.send(result)
    } catch (err) {
        console.log(err)
    }

})

router.get('/military', async(req, res) =>{
    try {
        const [result] = await db.query('SELECT * FROM MILITARY WHERE militaryID = ?',[
            req.session.passport.user
        ])
        res.send(result)
    } catch (err) {
        console.log(err)
    }
})


router.get('/WEAPON', async(req, res) =>{
    try {
        const [result] = await db.query('SELECT * FROM WEAPON')
        res.send(result)
    } catch (err) {
        console.log(err)
    }
})

router.get('/department', async (req, res) => {
    var result = await db.query('SELECT department FROM UNIT JOIN MILITARY ON UNIT.unitID = MILITARY.unitID WHERE militaryID = ?', [req.session.passport.user]);
    var d = result[0][0].department;
    d = "สังกัด" + d

    res.send(d);
});

module.exports = router