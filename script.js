module.exports = function registration(pool) {






    async function regInput(regist) {

        try {
  
            var starterString = regist.charAt(0).toUpperCase() + regist.slice(1).toUpperCase();

            let start = starterString.substring(0, 2);
      

            let ForeignKey = await getForeignKey(start)

            let duplicates = await pool.query('SELECT regnumber FROM registrations WHERE regnumber =$1', [regist]);
            if (duplicates.rowCount === 0) {

                await pool.query('INSERT INTO registrations(foreign_id,regnumber) VALUES ($1,$2)', [ForeignKey, starterString]);
            }



        } catch (error) {
            console.log(`regInput function :==> ${error}`);
        }
    }

    async function getForeignKey(regStart) {
     let start = regStart.substring(0, 2);
        let value = await pool.query('SELECT id FROM towns WHERE regstring = $1', [start]);

        return value.rows[0].id
    }

    async function displayRegistrations() {

        let registrationOutput = await pool.query('SELECT regnumber from registrations');


        return registrationOutput.rows
    }

    async function filterRegs(town_tag) {

        // let start = reg.substring(0, 2)
        // let start1 = Number(start)
        var getId = await getForeignKey(town_tag);
        let starts = await pool.query('SELECT regnumber FROM registrations WHERE  foreign_id = $1', [getId]);

        return starts.rows
    }

    async function resetBTn() {
        let reset = await pool.query('DELETE  FROM registrations');
return reset.rows;
    }

    async function showAllRegs(){
        let showAll = await pool.query('SELECT * FROM registrations');
        return showAll.rows
    }


    return {
        regInput,
        getForeignKey,
        displayRegistrations,
        filterRegs,
        resetBTn,
        showAllRegs
    }

}
