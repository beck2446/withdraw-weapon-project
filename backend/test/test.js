const app = require('../index')
const request = require('supertest')

describe('Testing a login api', () => {
    let agent
    beforeEach(() => {
        agent = request.agent(app)
    })

    it('should return 401 status when with a invalid username or password', ((done) => {
        agent.post('/login').send({
            username: 'invalid',
            password: 'invalid'
        }).expect(302).expect('Location', '/unauthorized').end((err, res) => {
            if (err) return done(err)
            return done()
        })
    }))

    it('should return 200 status and reached /authorized endpoint with a valid username and password', ((done) => {
        agent.post('/login').send({
            username: '66000001',
            password: '1234'
        }).expect(302).expect('Location', '/authorized').end((err, res) => {
            if (err) return done(err)
            agent.get('/checkauth').expect(200).end((err, res) => {
                if (err) return done(err)
                return done()
            })
        })
    }))
})

describe('Test each role api',()=>{
    let agent
    beforeEach(() => {
        agent = request.agent(app)
    })

    it('Test a valid user api',(done)=>{
        agent.post('/login').send({
            username: '66000002',
            password: '1234'
        }).expect(302).expect('Location', '/authorized').end((err, res) => {
            if (err) return done(err)
            agent.get('/getRole').expect(200).end((err, res) => {
                if (err) return done(err)
                agent.get('/user/userTest').expect(200).end((err,res)=>{
                    if(err) return done(err)
                    return done()
                })
            })
        })

    })

    it('Test a valid admin api',(done)=>{
        agent.post('/login').send({
            username: '66000001',
            password: '1234'
        }).expect(302).expect('Location', '/authorized').end((err, res) => {
            if (err) return done(err)
            agent.get('/getRole').expect(200).end((err, res) => {
                if (err) return done(err)
                agent.get('/admin/adminTest').expect(200).end((err,res)=>{
                    if(err) return done(err)
                    return done()
                })
            })
        })

    })

    it('Test a valid guard api',(done)=>{
        agent.post('/login').send({
            username: '66000003',
            password: '1234'
        }).expect(302).expect('Location', '/authorized').end((err, res) => {
            if (err) return done(err)
            agent.get('/getRole').expect(200).end((err, res) => {
                if (err) return done(err)
                agent.get('/guard/guardTest').expect(200).end((err,res)=>{
                    if(err) return done(err)
                    return done()
                })
            })
        })

    })

})