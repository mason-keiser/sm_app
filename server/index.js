require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client_error');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const staticMiddleware = require('./static_middleware');
const sessionMiddleware = require('./session_middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query(`select 'successfully connected' as "message"`)
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

//  SIGN UP API POST REQUEST THAT ADDS USER INFO TO DB

app.post('/api/signUp/', (req, res, next) => {
  let password =  req.body.user_password;

  const sql = `
  INSERT INTO "users" ("user_name", "user_password")
  VALUES                  ($1, $2)
  RETURNING *;
  `;

  const salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(req.body.user_password, salt)

  const params = [req.body.user_name, hash];
  
  for (let i = 0; i < params.length; i ++) {
    if (!params[i]) {
      return res.status(400).json({ error: 'all signup input forms must be filled' });
    }
  }
  db.query(sql, params)
    .then(result => {
      const row = result.rows[0];
      res.status(201).json(row);
    });
});

//  SEARCH DATABASE FOR EXISTING EMAIL AND PASSWORD API GET REQUEST

app.get('/api/login/:user_name/:user_password/', (req, res, next) => {
  const username = req.params.user_name;
  const password = req.params.user_password;

  const sqlToGetPass = `
  SELECT "user_password" from "users"
  WHERE "user_name" = $1
  `
  const sql = `
  SELECT * FROM "users"
  WHERE "user_name" = $1 
  AND "user_password" = $2;
  `;

  db.query(sqlToGetPass, [username] )
    .then(result => {
      if (!result.rows[0]) {
        return res.status(400).json({ message: `No user information contains: ${username}` });
      } else {
        let hashedPass = result.rows[0];
        bcrypt.compare(password, hashedPass.user_password, async function(err, isMatch) {
          if (err) {
            return err
          } else if (!isMatch) {
            return res.status(400).json({ message: `passwords do not match` });
          } else {
            console.log('passwords match!')
            db.query(sql, [username, hashedPass.user_password] )
            .then(result => {
              if (!result.rows[0]) {
                return res.status(400).json({ message: `No user information contains: ${username} or ${hashedPass.user_password}` });
              } else {
                return res.status(200).json(result.rows)
              }
            })
            .catch(err => {
              console.error(err);
              res.status(500).json({ error: 'An unexpected error occurred.' });
            });
          }
        })
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'An unexpected error occurred.' });
    });
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});