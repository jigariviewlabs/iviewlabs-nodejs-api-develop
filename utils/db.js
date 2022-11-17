const db = require('../config/config')

async function query(sql, params) {

  const [results, ] = await db.execute(sql, params)
  return results;
}

module.exports = {query}

