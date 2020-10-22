const chai = require("chai")
const chaiHttp = require("chai-http")
const expect = chai.expect
chai.use(chaiHttp)
const mapController = require("../controllers/map-controller");

describe('createMap method', () => {
  it('should return a correct response when request promise not fail', async function () {
    const row = 10;
    const col = 10;

    const response = await mapController.createMap(row, col);
    expect(response).to.be.an('array');
  })
});

describe('fillMap method', () => {
  it('should return a correct response when request promise not fail', async function () {
    const bombCount = 10;
    const map = [
      ["","","","","","","","","",""],
      ["","","","","","","","","",""],
      ["","","","","","","","","",""]
    ];
    const response = await mapController.fillMap(map,"*", bombCount);
    expect(response).to.be.an('array');
  })
});