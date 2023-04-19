const mysql = require('mysql2/promise');
const bluebird = require('bluebird');

const query = 'INSERT INTO contacts (email) VALUES (?)';

const handler = async (request) => {
  const body = JSON.parse(request.body)
  
  // Check if email is empty or missing
  if (body.email && body.email === '') {
    return {
      statusCode: 500
    }
  }

  try {
    const connection = await mysql.createConnection(process.env.DATABASE_URL, { Promise: bluebird });
    console.log('Connected to PlanetScale!')

    const [results] = await connection.query(query, [body.email]);
    console.log(results)
  
    // TODO: Improve error handling
    // Throws an error in the results if email is already in the database, however we don't want to show that in the UI

    return {
      statusCode: 200
    }
  } catch(error) {
    console.log(error)
    return {
      statusCode: 500
    }
  }
}

module.exports = { handler }

