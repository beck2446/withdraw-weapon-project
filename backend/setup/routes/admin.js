const router = require('express').Router()
const {isAdmin} = require('../middleware/middleware')
const db = require('../database-config')
router.use(isAdmin)

router.get('/ARMORY', async(req, res) =>{
    try {
        const [result] = await db.query("SELECT * FROM ARMORY")
        res.send(result)     
    } catch (error) {
        console.log(error)
        res.status(500).end()
    } 
})

router.get('/borrow', async(req, res) =>{
    try {
        const [result] = await db.query('SELECT * FROM borrow')
        res.send(result)
    } catch (error) {
        console.log(error)
        res.status(500).end()
    }
})

router.get('/military', async(req, res) =>{
    try {
       const [result] =  await db.query('SELECT * FROM MILITARY')
        return res.send(result)
    } catch (error) {
        console.log(error)
        res.status(500).end()
    }
})

router.get('/unit', async(req, res) =>{
    try {
        const [result] = await db.query('SELECT * FROM UNIT')
        res.send(result)
    } catch (error) {
        console.log(error)
        res.status(500).end()
    }
    
})

router.get('/weapon', async(req, res) =>{
    try {
        const [result] = await db.query('SELECT * FROM WEAPON')
        res.send(result)
    } catch (error) {
        console.log(error)
        res.status(500).end()
    }

})

router.put('/borrow/:id', async (req, res) => {
  try {
    const requestId = req.params.id;
    const borrowStatus = req.body.borrowStatus;

    const[result] = await db.query("UPDATE borrow set borrowStatus = ? WHERE borrowID = ?", [
        borrowStatus, requestId
    ])
    res.send(result);
  } catch (err) {
    console.error('Error updating borrow status', err);
    res.status(500).end();
  }
});

module.exports = router