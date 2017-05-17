# Quotes
Quotes app, built with React Native, GraphQL backend.
LOOKING FOR CONTRIBUTORS. More quotes are needed.
If anyone has more famous quotes, please write me.

A simple React Native app to show quotes, built with
[Tinder Cards for React Native!](https://github.com/meteor-factory/react-native-tinder-swipe-cards)

![Image](https://raw.githubusercontent.com/sasasim/Quotes/master/resources/portfolio.jpg)
### Thanks To
- [Tinder Cards for React Native!](https://github.com/meteor-factory/react-native-tinder-swipe-cards)
- [React Native SQLite Storage](https://github.com/andpor/react-native-sqlite-storage)
- [DB Browser for SQLite](http://sqlitebrowser.org/)

### Todo (PRs welcome!)
- [x] Local Cache with SQLite
- [x] Initial SQLite DB file(iOS)
- [ ] Initial SQLite DB file(Android)
- [ ] Backend
- [ ] Sync with Backend(GraphQL)
- [ ] Dynamic Categories

### How to modify Quotes?

#### iOS
You can edit /ios/Quotes/www/quotes.db with [DB Browser for SQLite](http://sqlitebrowser.org/)
Please note the following for the schemas:

#### Android
Not ready yet: PRs are welcome! [DB Browser for SQLite](http://sqlitebrowser.org/)

### Schemas
#### Quotes
- quote_id TEXT PRIMARY KEY NOT NULL
- text TEXT'
- created INTEGER, '
- author TEXT
#### Authors
- author_id TEXT PRIMARY KEY NOT NULL
- name TEXT
- title TEXT
- photoUrl TEXT
- created INTEGER
