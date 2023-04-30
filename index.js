const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;
const mysql = require('mysql');

/*const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'movie_reviews'
});*/
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));


/*app.get('/api/get', (req, res) => {
    const sqlSelect = "SELECT * FROM movies";
    db.query(sqlSelect,(err,result) => {
        res.send(result);
    });
        
    
});
app.post('/api/insert', (req, res) => {
    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;
    const insert = "INSERT INTO movies (movies, review) VALUES (?, ?);";
    db.query(insert, [movieName, movieReview], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send("Values inserted");
        }
    });
});
app.delete('/api/delete/:movies', (req, res) => {
    const name = req.params.movies;
    const deleteMovie = "DELETE FROM movies WHERE movies = ?";
    db.query(deleteMovie, name, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});
app.put('/api/update', (req, res) => {
    const name = req.body.movieName;
    const review = req.body.movieReview;
    const update = "UPDATE movies SET review = ? WHERE movies = ?";
    db.query(update, [review, name], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);

        }
    });
});







app.listen(port, () => console.log(`Example app listening on port ${port}!`));*/
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'librerie'
});
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

const multer = require('multer');
const path = require('path');

// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploads'); // set the destination folder for uploaded files
    },
    filename: (req, file, callback) => {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // set the filename for uploaded files
    }
});

// Multer upload configuration
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // set the file size limit to 1MB
    fileFilter: (req, file, callback) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return callback(null, true);
        } else {
            callback('Error: Images only!');
        }
    }
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

// Route to handle file upload
app.post('/api/uploadImage', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No files were uploaded.');
    }

    res.send('File uploaded successfully!');
});
app.get('/api/getUser', (req, res) => {
    const sqlSelect = "SELECT * FROM user";
    db.query(sqlSelect,(err,result) => {
        res.send(result);
    });
        
    
});
app.post('/api/insertUser', (req, res) => {
    const login = req.body.login;
    const tel = req.body.tel;
    const join_time = req.body.join_time;
    const role = req.body.role;
    const email = req.body.email;
    const password= req.body.password;
    
    const insert = "INSERT INTO user (login, tel,join_time,role,email,password) VALUES (?,?,?,?,?,?);";
    db.query(insert, [login,tel,join_time,role,email,password], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send("Values inserted");
        }
    });
});
/*app.delete('/api/deleteUser/:login', (req, res) => {
    const name = req.body.login;
    const deleteUser = "DELETE FROM user WHERE login = ?";
    db.query(deleteUser, name, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});*/
app.delete('/api/deleteUser/:id', (req, res) => {
    const id = req.params.id;
    const deleteUser = "DELETE FROM user WHERE id = "+id;
    db.query(deleteUser, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});
app.put('/api/updateUser', (req, res) => {
    const login = req.body.login;
    const tel = req.body.tel;
    const join_time = req.body.join_time;
    const role = req.body.role;
    const email = req.body.email;
    const id = req.body.id;
    const update = "UPDATE user SET login = ?,tel = ?,join_time = ?, role = ? , email = ? WHERE id = ?";
    db.query(update, [login, tel,join_time,role,email,id], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);

        }
    });
});
app.get('/api/User/:id', (req, res) => {
    const id = req.params.id;
    const sqlSelect = `SELECT * FROM user WHERE id = ${id}`;
    db.query(sqlSelect, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  });
  app.put('/api/User/:id', (req, res) => {
    const id = req.params.id;
    const login = req.body.login;
    const tel = req.body.tel;
    const join_time = req.body.join_time;
    const role = req.body.role;
    const email = req.body.email;
    const password = req.body.password;
    const sqlUpdate = 'UPDATE user SET login = ?, tel = ?, join_time = ?, role = ?, email = ?,password = ? WHERE id = ?';
    db.query(sqlUpdate, [login, tel, join_time, role, email,password, id], (err, result) => {
      if (err) throw err;
      console.log(`${result.affectedRows} record(s) updated`);
      res.send('User updated successfully');
    });
  });
app.get('/api/getSales', (req, res) => {
    const sqlSelect = "SELECT * FROM sales";
    db.query(sqlSelect,(err,result) => {
        res.send(result);
    });
        
    
});
app.post('/api/insertSales', (req, res) => {
    const name = req.body.name;
    const product = req.body.product;
    const quality = req.body.quality;
    const budget = req.body.budget;
    const time = req.body.time;
    
    const insert = "INSERT INTO sales (name, product,quality,budget,time) VALUES (?,?,?,?,?);";
    db.query(insert, [name,product,quality,budget,time], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send("Values inserted");
        }
    });
});
app.delete('/api/deleteSales/:id', (req, res) => {
    const id = req.params.id;
    const deleteUser = "DELETE FROM sales WHERE id = "+id;
    db.query(deleteUser, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});
app.put('/api/updateSales', (req, res) => {
    const name = req.body.name;
    const product = req.body.product;
    const quality = req.body.quality;
    const budget = req.body.budget;
    const time = req.body.time;
    const id = req.body.id;

    const update = "UPDATE sales SET name = ?,product = ?,quality = ?, budget = ?,time = ? WHERE id = ?";
    db.query(update, [name, product,quality,budget,time,id], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);

        }
    });
});
app.put('/api/updateSales/:id', (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const product = req.body.product;
    const quality = req.body.quality;
    const budget = req.body.budget;
    const time = req.body.time;
    
    const sql = 'UPDATE sales SET name = ?,product = ?,quality = ?, budget = ?,time = ? WHERE id = ?';
    db.query(sql, [name, product,quality,budget,time,id], (err, result) => {
      if (err) throw err;
      console.log(' record(s) updated');
      res.send('Sales updated successfully');
    });
  });
  app.get('/api/getSales/:id', (req, res) => {
    const id = req.params.id;
    const sql = `SELECT * FROM sales WHERE id = ${id}`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  });
app.get('/api/getProduct', (req, res) => {
    const sqlSelect = "SELECT * FROM product";
    db.query(sqlSelect,(err,result) => {
        res.send(result);
    });
        
    
});
app.post('/api/insertProduct', (req, res) => {
    const prix = req.body.prix;
    const Qstock = req.body.Qstock;
    const category = req.body.category;
    const name = req.body.name;
    const state = req.body.state;

    
    const insert = "INSERT INTO product (prix, Qstock,category,name,state) VALUES (?,?,?,?,?);";
    db.query(insert, [prix,Qstock,category,name,state], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send("Values inserted");
        }
    });
});
app.delete('/api/deleteProduct/:id', (req, res) => {
    const id = req.params.id;
    const deleteUser = "DELETE FROM product WHERE id = "+id;
    db.query(deleteUser, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});
app.put('/api/updateProduct', (req, res) => {
    const prix = req.body.prix;
    const Qstock = req.body.Qstock;
    const category = req.body.category;
    const name = req.body.name;
    const id = req.body.id;
    const update = "UPDATE product SET prix = ?,Qstock = ?,category = ?,name = ?, WHERE id = ?";
    db.query(update, [prix,Qstock,category,name,id], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);

        }
    });
});

app.get('/api/getProduct/:id', (req, res) => {
    const productId = req.params.id;
    const sqlSelect = `SELECT * FROM product WHERE id = ${productId}`;
    db.query(sqlSelect, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error retrieving product from database');
      } else {
        if (result.length > 0) {
          res.send(result[0]);
        } else {
          res.status(404).send(`Product with id ${productId} not found`);
        }
      }
    });
  });
  app.put('/api/updateState/:id', (req, res) => {
    const productId = req.params.id;
    const  state  = req.body;
    const update = `UPDATE product SET state = 'unavailable' WHERE id = ${productId}`;
    db.query(update, [state, productId], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error updating product in database');
        } else {
            if (result.affectedRows > 0) {
                res.send(`Product with id ${productId} updated successfully`);
            } else {
                res.status(404).send(`Product with id ${productId} not found`);
            }
        }
    });
});


  app.put('/api/updateProduct/:id', (req, res) => {
    const productId = req.params.id;
    const { prix, Qstock, category, name } = req.body;
    const update = "UPDATE product SET prix = ?, Qstock = ?, category = ?, name = ? WHERE id = ?";
    db.query(update, [prix, Qstock, category, name, productId], (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error updating product in database');
      } else {
        if (result.affectedRows > 0) {
          res.send(`Product with id ${productId} updated successfully`);
        } else {
          res.status(404).send(`Product with id ${productId} not found`);
        }
      }
    });
  });
app.get('/api/getCategorie', (req, res) => {
    const sqlSelect = "SELECT * FROM categorie";
    db.query(sqlSelect,(err,result) => {
        res.send(result);
    });
        
    
});
app.post('/api/insertCategorie', (req, res) => {
    const description = req.body.description;
    const name = req.body.name;

    
    const insert = "INSERT INTO categorie (name,description) VALUES (?,?);";
    db.query(insert, [name,description], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send("Values inserted");
        }
    });
});
/*app.delete('/api/deleteCategorie/:id', (req, res) => {
    const id = req.body.id;
    const deleteUser = "DELETE FROM categorie WHERE id = ?";
    db.query(deleteUser, id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});*/
app.delete('/api/deleteCategorie/:id', (req, res) => {
    const id = req.params.id;
    const deleteUser = "DELETE FROM categorie WHERE id = "+id;
    db.query(deleteUser, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});
app.put('/api/updateCategorie', (req, res) => {
    const description = req.body.description;
    const name = req.body.name;
    const id = req.body.id;
    const update = "UPDATE categorie SET name = ?,description = ? WHERE id = ?";
    db.query(update, [name,description,id], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);

        }
    });
});
app.put('/api/categories/:id', (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const description = req.body.description;
    const sql = 'UPDATE categorie SET name = ?, description = ? WHERE id = ?';
    db.query(sql, [name, description, id], (err, result) => {
      if (err) throw err;
      console.log(' record(s) updated');
      res.send('Category updated successfully');
    });
  });
  app.get('/api/categories/:id', (req, res) => {
    const id = req.params.id;
    const sql = `SELECT * FROM categorie WHERE id = ${id}`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  });
app.listen(port, () => console.log(`Example app listening on port ${port}!`));