const assert = require('assert')
const pg = require("pg");
const Pool = pg.Pool;


const connectionString = process.env.DATABASE_URL || 'postgresql://bonisiwecukatha:pg123@localhost:5432/registrationdb';

const regs = require('../script');

const pool = new Pool({
    connectionString
});


describe('The registration web app', function () {

    beforeEach(async function () {
        console.log("*****");
        await pool.query("delete from registrations;");
        // await pool.query("delete from towns;");

    });
    var regApp = regs(pool);


    it('should be able to store registration numbers entered', async function () {
        var word = "CA 55890"

      await regApp.regInput(word)
        // theGreet.greetings(contain, word)
console.log(await regApp.displayRegistrations() + "ddssdsdsds") 
        assert.deepEqual( [ { regnumber: 'CA 55890' } ], await regApp.displayRegistrations());

    });
    it('should be able  to reset the database', async function () {
        // let regApp = regs(pool);

        await regApp.regInput('CK 98765');

        assert.deepEqual([], await regApp.resetBTn());

    });
    it('should be able  to filter registration numbers by town', async function () {
        // let regApp = regs(pool);


        await regApp.regInput('CK 98765');
        await regApp.regInput('CK 98765');
        await regApp.regInput('CA 98765');

       
        // await regApp.filterRegs('CY 98765');


        assert.deepEqual([ { regnumber: 'CA 98765' } ],  await regApp.filterRegs('CA'));

    });
    it('should be able  to prohibit duplicate regs', async function () {
      
        await regApp.regInput('CK 98765');
        await regApp.regInput('CK 98765');
        await regApp.regInput('CK 98765');
        await regApp.regInput('CA 11111');



       
    


        assert.deepEqual( [ { regnumber: 'CK 98765' }, { regnumber: 'CA 11111' } ], await regApp.displayRegistrations());

    });

    after(function () {
        pool.end();
    });
});


