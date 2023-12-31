const pg = require('pg')
const client = new pg.Client('postgres://localhost/petfinderz')
const cors = require('cors')
const express = require('express')
const app = express()

app.use(cors())

app.get('/api/pets', async (req, res, next) => {
    try {
        const SQL = `
            SELECT *
            FROM pets
        `
        const response = await client.query(SQL)
        console.log(response.rows)
        res.send(response.rows)


    } catch (error) {
        next(error)
    }
})

const init = async () => {
    await client.connect()
    console.log("connected to database")
    const SQL = `
        DROP TABLE IF EXISTS pets;
        CREATE TABLE pets(
            id SERIAL PRIMARY KEY,
            name VARCHAR(100),
            is_favorite BOOLEAN
        );
        INSERT INTO pets (name) VALUES ('dog');
        INSERT INTO pets (name, is_favorite) VALUES ('monkey', true);
        INSERT INTO pets (name) VALUES ('cat');
        INSERT INTO pets (name) VALUES ('hamster');
        INSERT INTO pets (name) VALUES ('parrot');
        INSERT INTO pets (name) VALUES ('guana');
        INSERT INTO pets (name) VALUES ('goldfish');
        INSERT INTO pets (name) VALUES ('pokemon');
        `
    await client.query(SQL)
    console.log("table created!")

    const port = 3000;
    app.listen(port, () => {
        console.log(`listening on port ${port}`)
    })
}

init()