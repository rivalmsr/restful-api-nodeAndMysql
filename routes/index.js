module.exports = {
  getHomePage: (req, res) => {
    let query = "SELECT * FROM 'players' ORDER BY id ASC "; // query database to get all

    // execute query
    db.query(query, (err, result) => {
      if(err){
        res.redirect('/');
      }
      res.render('index.js', {
        title : Welcome to dbjavascript | View Players,
        players: result
      });
    });
  },
};
