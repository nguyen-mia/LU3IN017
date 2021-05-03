const chaiHttp = require('chai-http');
const chai = require('chai');
const app = require('../src/app.js'); // c'est l'app "express"
//import { describe, it } from 'mocha'
const mocha = require('mocha');

// Configurer chai
chai.use(chaiHttp);
chai.should();

mocha.describe("Test de l'API follow", () => {
    mocha.it("follow", (done) => {
        const request = chai.request(app.default).keepOpen();
        const user1 = {
            username: "naruto",
            password: "1234",
            lastname: "pika",
            firstname: "chu"
        };
        const user2 = {
            username: "sasuke",
            password: "1234",
            lastname: "pika",
            firstname: "chu"
        };
        request
        .post('/api/users')
        .send(user1)
        .then((res) => {
            res.should.have.status(401); //user existe déjà
            console.log(`Retrieving user ${user1.username}`)
            return Promise.all([
                request
                .get(`/api/users/${user1.username}`)
                .then((res) => {
                    console.log(res.body)
                    res.should.have.status(200) //user existe donc res.body pas vide
                }),
                request
                .get(`/api/users/4`)
                .then((res) => {
                    res.should.have.status(404) //user 4 n'existe pas
                }),
            ])
        })

        
        request
        .post('/api/users')
        .send(user2)
        .then((res) => {
            res.should.have.status(401); //user existe déjà
            console.log(`Retrieving user ${user2.username}`)
            return Promise.all([
                request
                .get(`/api/users/${user2.username}`)
                .then((res) => {
                    console.log(res.body)
                    res.should.have.status(200) //user existe donc res.body pas vide
                }),
                request
                .get(`/api/users/4`)
                .then((res) => {
                    res.should.have.status(404) //user 4 n'existe pas
                }),
            ])
        })
        .then(() => done(), (err) => done(err))
        .finally(() => {
            request.close()
        })
    })
})
mocha.describe("Test de l'API message", () => {
    mocha.it("message", (done) => {
        const request = chai.request(app.default).keepOpen();
        const message = {
            username : "naruto", 
            message : "datteboya"}
        request
        .post('/api/messages')
        .send(message)
        .then((res) => {
            console.log(res.body) //message posté
            return Promise.all([
                request
                .get(`/api/users/${res.body.author_username}/messages`)
                .then((res) => {
                    console.log(res.body) //retourne tous les messages l'user
                }),
                request
                .delete(`/api/messages/${res.body._id}`)
                .then((res) => {
                    res.should.have.status(200) //message supprimé
                })
            ])
        })
        .then(() => done(), (err) => done(err))
        .finally(() => {
            request.close()
        })
    })
})
