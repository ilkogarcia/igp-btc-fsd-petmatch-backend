import fs from 'fs'

export const saveToDatabase = (DB) => {
  const fileStar = 'export const DB = { pets: '
  const fileEnd = '}'

  fs.writeFileSync('./src/database/db.js',
    fileStar.concat(JSON.stringify(DB, null, 2), fileEnd), {
      encoding: 'utf-8'
    })
}

export default saveToDatabase
