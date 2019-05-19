const chai = require('chai');
const app = require('../server');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

chai.should();

describe('media', () => {
	describe('GET', () => {
		it('should return a responce', (done) => {
			chai.request(app).get('/media').end((err, res) => {
				res.should.have.status(200);
				done();
			});
		});
	});
});
