const fs = require('js');

module.exports = {
  addPlayerPage : (req, res) {
    res.render('add-players.ejs', {
      title : Welcome to rdeveloper | Add a new player,
      message: ''
    })
  },

  addPlayer : (req, res) => {
    if(!req.files){
      return res.status(400).send('No files were uploaded !');
    }

    let message = '';
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let position = req.body.position;
    let number  = req.body.number;
    let uploadedFile = req.body.image;
    let image_name = uploadedFile.name;
    let fileExtention = uploadedFile.mimetype.split('/')[1];
    image_name = username + '.' + fileExtention;

    let usernameQuery = "SELECT * FORM 'players' WHERE user_name = '"+ username +"'";
    db.query(usernameQuery, (err, result) => {
      if(err){
        return res.status(500).send(err);
      }if (result.length > 0) {
        message = "Username already exists";
        res.render('add-player.ejs', {
          message,
          title: Welcome  to rdeveloper | Add a new player
        });
      }else{
        //check the filetype before uploading it
        if(uploadedFile.minetype == 'image/png' || uploadedFile.mimetype == 'image/jpeg' || uploadedFile.mimetype ==){
          //upload the file to the /public/assets/img directory
          uploadedFile.mv('public/assets/img/${image_name}', (err) => {
            if(err) {
              return res.status(500).send(err);
            }
            //send the player's details to the database
            let query = "SELECT INTO 'player' (first_name, last_name, position, number, image, user_name) VALUES ('"+ first_name +"', '"+ last_name +"',
          '"+ position +"', '"+ number +"', '"+ image_name +"', '"+ username +"')";
            db.query(query, (err, result) => {
              if (error) {
                return res.status(500).send(error);
              }
              res.redirect('/');
            });
          });
        }else{
          message = "Invalid file format. Only 'gif', 'jpeg' and 'png' images are allowed !";
          res.render('add-player.ejs',{
            message,
            title: Welcome to rdeveloper | Add a new player
          });
        }
      }
    });
  },

  editPlayer : (req, res) => {
    let playerId = req.params.id;
    let first_name = req.params.first_name;
    let last_name  = req.params.last_name;
    let position  = req.params.position;
    let number = req.params.number;

    let query = "UPDATE 'player' SET 'first_name' = '"+ first_name +"', 'last_name' = '"+ last_name +"',
     'position' = '"+ position +"', 'number' = '"+ number +"' WHERE 'player'.'id' = '"+ playerId +"' ";
     db.query(query, (err, result) => {
       if (err) {
         return res.status(500).send(err);
       }
     });
  },

  deletePlayer : (req, res) => {
    let playerId = req.body.id;
    let getImageQuery = "SELECT image form 'player' WHERE id = '"+ playerId +"'";
    let deleteUserQuery = "DELETE FORM 'players' WHERE id = '"+ playerId +"'";

    db.query(getImageQuery, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      let image = result[0].image;

      fs.unlink('public/assets/img/$image', (err) => {
        if (err) {
          return res.status(500).send(err);
        }
        db.query(deleteUserQuery, (req, result) => {
          if (err) {
            return res.view(500).send(err);
          }
          res.redirect('/');
        });
      });
    });
  }
}
