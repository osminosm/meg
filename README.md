# Meg - a minimalistic blog/personal site

[Meg](https://en.wiktionary.org/wiki/meg#Norwegian_Bokm%C3%A5l) [ the pronoun 'me' in norwegian : /mæɪ̯/], is a lightweight, minimalistic Blog/Personal site, with the sole goal to give its users an easy to run, fast, secure blog.

## Clone, Setup and Run:

Clone the project to a local repo:

```
git clone https://github.com/osminosm/meg.git
cd ./meg
```

Install dependencies

```
npm install
## OR ##
yarn
```

Run for development:

```
npm start
## OR ##
yarn start
```

Run for production:

```
node index.js --configFile /path/to/config.json
```

### Config file

This is how a config file should look like (more or less), if an option is not specified it will default to its value on `utils/config-default.json`

```
{
  "host":"localhost",
  "port":"3000",
  
  "db": {
    "dbname": "blog",
    "username": "username",
    "password": "",
    "options": {
      "dialect": "sqlite",
      "storage": "./database.sqlite"
    }
  },
  "bcryptSaltWorkFactor": 10,
  "jwtSecret": "<secret>",
  "jwtUserExpiresIn": 86400,
  "tokenCookieName": "access_token"
}
```

## Keywords
`blog`
`minimalistic`
`node`
`express`
`sequelize`
`ejs`
`jwt`