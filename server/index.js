require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client_error');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const staticMiddleware = require('./static_middleware');
const sessionMiddleware = require('./session_middleware');

const app = express();

app.use(express.json({limit: '1000mb'}));

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
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.user_password, salt)

  const sql = `
  INSERT INTO "users" ("user_name", "user_password")
  VALUES                  ($1, $2)
  RETURNING *;
  `;

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

// API GET POSTS

app.get('/api/getPosts', (req, res, next) => {
  const sql = `
  SELECT * FROM posts
  INNER JOIN users ON posts.user_id=users.user_id
  `
  db.query(sql)
  .then(result => {
    if (!result.rows[0]) {
      return res.status(400).json({ message: `get posts attempt was unsuccessful` });
    } else {
      result.rows.forEach((i) => {
        delete i.user_password
      })
     
      return res.status(200).json(result.rows)
    }
  })
  .catch(err => {
    console.error(err);
    res.status(500).json({ error: 'An unexpected error occurred.' });
  });
})

// API POST REQUEST TO ADD TO POSTS DB

app.post('/api/posts/', (req, res, next) => {
  const user_id = req.body.user_id;
  const post = req.body.post;
  const post_image = req.body.post_image;
  const likes = req.body.likes;
  const params = [user_id, post, likes];
  let sql

  (!user_id) 
     ? res.status(404).json({error: `missing user_id`})
     : (!post)
        ? res.status(404).json({error: `missing post input`})
        : null
  
  if (!post_image) {
    sql = `
      INSERT INTO posts ("user_id", "post", "likes")
      VALUES ($1, $2, $3) 
      RETURNING *
    `
  } else {
    params.push(post_image)
    sql = `
      INSERT INTO posts ("user_id", "post", "likes" "post_image")
      VALUES ($1, $2, $3, $4) 
      RETURNING *
    `
  }

  db.query(sql, params)
  .then(result => {
    if (!result.rows[0]) {
      return res.status(400).json({ message: `post attempt was unsuccessful` });
    } else {
      return res.status(200).json(result.rows)
    }
  })
  .catch(err => {
    console.error(err);
    res.status(500).json({ error: 'An unexpected error occurred.' });
  });
})

// API PUT REQUEST TO INCREASE LIKES

app.put('/api/like', (req, res, next) => {
  const post_id = req.body.post_id;
  const sql = `
  UPDATE posts
  SET likes = likes + 1
  WHERE post_id = $1
  `
  db.query(sql, [post_id])
  .then(result => {
    if (!result) {
      return res.status(400).json({ message: `post attempt was unsuccessful` });
    } else {
      return res.status(200).json(result.rows)
    }
  })
  .catch(err => {
    console.error(err);
    res.status(500).json({ error: 'An unexpected error occurred.' });
  });
})

// API GET REQUEST FOR SINGULAR POST

app.get('/api/singPost/:post_id', (req, res, next) => {
  const post_id = req.params.post_id
  const sql = `
  SELECT * FROM posts
  INNER JOIN users ON posts.user_id=users.user_id
  WHERE post_id = $1
  `

  if (!post_id) return res.status(400).json({ message: `no post_id was given` });

  db.query(sql, [post_id])
  .then(result => {
    if (!result) {
      return res.status(400).json({ message: `post attempt was unsuccessful` });
    } else {
      result.rows.forEach((i) => {
        delete i.user_password
      })
      return res.status(200).json(result.rows)
    }
  })
  .catch(err => {
    console.error(err);
    res.status(500).json({ error: 'An unexpected error occurred.' });
  });
})

// API GET USERS POSTS

app.get('/api/getUserPosts/:user_id', (req, res, next) => {
  const user_id = req.params.user_id
  const sql = `
  SELECT * FROM posts
  WHERE user_id = $1
  `

  const userSql = `
  SELECT * FROM users
  WHERE user_id = $1
  `

  if (!user_id) return res.status(400).json({ message: `no user_id was given` });

  db.query(sql, [user_id])
  .then(result => {
    if (!result) {
      return res.status(400).json({ message: `post attempt was unsuccessful` });
    } else {
      return res.status(200).json(result.rows)
    }
  })
  .catch(err => {
    console.error(err);
    res.status(500).json({ error: 'An unexpected error occurred.' });
  });
})

// API REQUEST TO CHANGE BIO

app.put('/api/changeBio', (req, res, next) => {
  const user_id = req.body.user_id
  const bio = req.body.bio
  const sql = `
  UPDATE users
  SET user_bio = $1
  WHERE user_id = $2
  RETURNING *
  `

  const params = [bio, user_id]

  db.query(sql, params)
  .then(result => {
    if (!result) {
      return res.status(400).json({ message: `post attempt was unsuccessful` });
    } else {
      result.rows.forEach((i) => {
        delete i.user_password
      })
      return res.status(200).json(result.rows)
    }
  })
  .catch(err => {
    console.error(err);
    res.status(500).json({ error: 'An unexpected error occurred.' });
  });

})

// API PUT REQUEST FOR PROFILE IMG

app.put('/api/changeProfileImg', (req, res, next) => {
  const user_id = req.body.user_id;
  const img = req.body.img;
  const sql = `
  UPDATE users
  SET user_profile_image = $1
  WHERE user_id = $2
  RETURNING *
  `

  const params = [img, user_id]

  db.query(sql, params)
  .then(result => {
    if (!result) {
      return res.status(400).json({ message: `post attempt was unsuccessful` });
    } else {
      result.rows.forEach((i) => {
        delete i.user_password
      })
      return res.status(200).json(result.rows)
    }
  })
  .catch(err => {
    console.error(err);
    res.status(500).json({ error: 'An unexpected error occurred.' });
  });

})

// API PUT REQUEST TO CHANGE HEADER IMAGE

app.put('/api/changeHeaderImg', (req, res, next) => {
  const user_id = req.body.user_id;
  const img = req.body.img;
  const sql = `
  UPDATE users
  SET user_header_image = $1
  WHERE user_id = $2
  RETURNING *
  `

  const params = [img, user_id]

  db.query(sql, params)
  .then(result => {
    if (!result) {
      return res.status(400).json({ message: `post attempt was unsuccessful` });
    } else {
      result.rows.forEach((i) => {
        delete i.user_password
      })
      return res.status(200).json(result.rows)
    }
  })
  .catch(err => {
    console.error(err);
    res.status(500).json({ error: 'An unexpected error occurred.' });
  });

})

// API TO POST A REPLY 

app.post('/api/postReply', (req, res, next) => {
  const post_id = req.body.post_id;
  if (!post_id) return res.status(400).json({ message: `no post_id was given` });

  const sql = `
  UPDATE customer
  SET replies = $2
  WHERE post_id = $1;
  `
  const params = [post_id, req.body.reply]

  db.query(sql, params)
    .then(result => {
      if (!result){
        return res.status(400).json({ message: `post attempt was unsuccessful`})
      }
      return res.status(200).json(result.rows)
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'An unexpected error occurred.' });
    });
  
})

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