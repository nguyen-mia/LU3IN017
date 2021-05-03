const chaiHttp = require('chai-http');
const chai = require('chai');
const app = require('../src/app.js'); // c'est l'app "express"
//import { describe, it } from 'mocha'
const mocha = require('mocha');

// Configurer chai
chai.use(chaiHttp);
chai.should();

mocha.describe("Test de l'API user", () => {
    mocha.it("users", (done) => {
        const request = chai.request(app.default).keepOpen();
        const user = {
            username: "pikachu",
            password: "1234",
            lastname: "chu",
            firstname: "pika"
        };

        request
        .post('/api/users')
        .send(user)
        .then((res) => {
            res.should.have.status(401);
            console.log(`Retrieving user ${user.username}`)
            return Promise.all([
                request
                .get(`/api/users/${user.username}`)
                .then((res) => {
                    console.log(res.body)
                }),
                request
                .get(`/api/users/4`)
                .then((res) => {
                    res.should.have.status(404)
                }),
            ])
        }).then(() => done(), (err) => done(err))
        .finally(() => {
            request.close()
        })
    })
})

