/**
 * Created by Sasa on 5/15/17.
 */
import SQLite from 'react-native-sqlite-storage'

export let db

function errorCB(err) {
  console.log("SQL Error: " + err)
}

function successCB() {
  console.log("SQL executed fine")
}

function openCB() {
  console.log("Database OPENED")
}

export const initDB = () => {
  db = SQLite.openDatabase("test.db", "1.0", "Test Database", 200000, openCB, errorCB)
  db.executeSql('SELECT 1 FROM Version LIMIT 1', [], () => {
    console.info('DB is Ready!')
  }, (error) => {
    console.info('DB is not Ready!', error)
    db.transaction(populateDB, (error) => {
      console.info('Failed to populate the DB!', error)
    },);
  })
}

const populateDB = () => {
  db.executeSql('CREATE TABLE IF NOT EXISTS Version( '
    + 'version_id INTEGER PRIMARY KEY NOT NULL); ', [], this.successCB, this.errorCB)

  db.executeSql('DROP TABLE IF EXISTS Quotes;')
  db.executeSql('DROP TABLE IF EXISTS Authors;')

  db.executeSql('CREATE TABLE IF NOT EXISTS Quotes( '
    + 'quote_id VARCHAR(12) PRIMARY KEY NOT NULL, '
    + 'text VARCHAR(500), '
    + 'created INTEGER,'
    + 'author_id VARCHAR(12) NOT NULL);',
    []
  )

  db.executeSql('CREATE TABLE IF NOT EXISTS Authors( '
    + 'author_id VARCHAR(12) KEY NOT NULL, '
    + 'name VARCHAR(50), '
    + 'title INTEGER PRIMARY KEY NOT NULL',
    + 'photoUrl VARCHAR(500), '
    + 'created INTEGER,'
    + ');',
    []
  )

  const authors = [
    {
      author_id: '079348fadad82777acb106ed',
      name: 'Aaron Levie',
      title: 'CEO at Box',
      photoUrl: 'https://s9.postimg.org/es5cxwynj/photo.png'
    }
    , {
      author_id: '079348fadad84777acb2c1bf',
      name: 'Sally Hogshead',
      title: 'New York Times bestselling author',
      photoUrl: 'https://image.ibb.co/kMHPGQ/woman.jpg'
    }
  ]

  const quotes = [
    {
      quote_id: '079348fadad82ac4aca126ef',
      text: '“Does it better” will always beat “did it first.”',
      author: '079348fadad82777acb106ed'
    }, {
      quote_id: '079348fadad82ac5ada12873',
      text: 'You don’t have to change who you are, you have to be more of who you are.',
      author: '079348fadad84777acb2c1bf'
    }
  ]

  for (let index in quotes) {
    db.executeSql(`INSERT INTO Authors (quote_id, text, author) VALUES (`
      + `"${quotes[index].author_id}",`
      + `"${quotes[index].name}",`
      + `"${quotes[index].title}",`
      + `"${authors[index].photoUrl}",`
      + ');'
      , []);
  }


  for (let index in quotes) {
    db.executeSql(`INSERT INTO Quotes (author_id, name, title, photoUrl) VALUES (`
      + `"${quotes[index].quote_id}",`
      + `"${quotes[index].text}",`
      + `"${quotes[index].author}",`
      + ');'
      , []);
  }
}
