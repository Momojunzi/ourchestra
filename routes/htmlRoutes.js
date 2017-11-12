
module.exports = function(app){

  app.get('/', function(req, res){
    res.render('pages/index');
  });

  app.get('/about', function(req, res){
    res.render('pages/about');
  });

  app.get('/signup', function(req, res){
    res.render('pages/signup');
  });

  app.get('/signin', function(req, res){
    res.render('pages/signin');
  });
};
