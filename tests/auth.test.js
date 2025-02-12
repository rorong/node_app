process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const { sequelize } = require('../models');

chai.should();
chai.use(chaiHttp);

describe('Auth Routes', () => {
  before(async () => {
    await sequelize.sync({ force: true });
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user', (done) => {
      chai.request(server)
        .post('/api/auth/register')
        .send({ email: 'test@example.com', password: 'Password123', phone: '1234567890' })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('message').eql('User registered successfully');
          done();
        });
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login the user', (done) => {
      chai.request(server)
        .post('/api/auth/login')
        .send({ email: 'test@example.com', password: 'Password123' })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('token');
          done();
        });
    });
  });
});