module.exports = {
  getHomePage: (req, res) => {
    let query = "SELECT * FROM 'players' ORDER BY id ASC "; // query database to get all

    // execute query
    db.query(query, (err, result) => {
      if(err){
        res.redirect('/');
      }
      res.render('views/index.ejs', {
        title : Welcome to Socka | View players
        ,players: result
      });
    });require('./routes/index.js');
cons
  },
};
