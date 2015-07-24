// Server Side JS
var mongoose = require('mongoose'),
	express = require('express'),
	session = require('express-session'),
	bodyParser = require('body-parser'),
	app = express(),
	User = require('./public/models/user.js'),
  Supplement = require('./public/models/log.js'); 
	

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: 'SuperSecretCookie',
  cookie: { maxAge: 60000 }
}));

// connect to mongodb
mongoose.connect(
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/getswole'
);

// this is the middleware used to manage the sessions
app.use('/', function (req, res, next) {
  // this is saving the user's id for that session
  req.login = function (user) {
    req.session.userId = user._id;
  };

  // this is going to find the current user dependning on the session
  req.currentUser = function (callback) {
    User.findOne({_id: req.session.userId}, function (err, user) {
      req.user = user;
      callback(null, user);
    });
  };

  //now this is going to get rid of that user
  req.logout = function () {
    req.session.userId = null;
    req.user = null;
  };

  next();
});


app.get('/', function (req, res) {

  res.sendFile(__dirname + '/public/views/index.html');
});

//this is my static route
app.get('/signup', function(req,res){
  req.currentUser(function(err,user){
    if (user){
      res.redirect('/profile')
    } else {
      res.sendFile(__dirname + '/public/views/signup.html')    
    }
  });
});

app.get('/profile', function (req,res){
    res.sendFile(__dirname + '/public/views/profile.html');
});


app.post('/users', function (req, res) {
  var email = req.body.user.email;
  var password = req.body.user.password;
  console.log(email , password);
  User.createSecure(email, password, function (err, user) {
  req.login(user);    
  res.redirect('/profile');
  });
});


app.get('/login',function(req,res){
  req.currentUser(function (err, user) {
    if (user) {
      res.redirect('/profile');
    } else {
    res.sendFile(__dirname + '/public/views/login.html') //probably wont use this
    }
  });
});


app.post('/login', function(req, res){
  var email = req.body.user.email;
  var password = req.body.user.password;
  User.authenticate(email, password, function (err, user) {
    req.login(user);
    res.redirect('/profile');
  });
});

app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/login');
});

  app.post('/profile', function (req, res) {
  var newLog = new Supplement({
    title: req.body.title,
    dosage: req.body.dosage,
    reason: req.body.reason
  });

  newLog.save();

  req.currentUser(function (err, user) {
    user.supplements.push(newSupplement);
    user.save();
    res.json(newSupplement);
  });
});


// API routes //

// the supps index
app.get('/api/supplements', function (req, res) {
  Supplement.find(function (err, supplements) {
    res.json(supplements);
  });
});

app.post('/api/supplements', function (req, res) {
  var newSupplement = new Supplement({
    title: req.body.title,
    dosage: req.body.dosage,
    reason: req.body.reason
  });
  console.log(newSupplement)
  newSupplement.save(function (err, savedSupplement) {
    res.json(savedSupplement);
  });
});

//update the supp
app.put('/api/supplements/:id', function (req, res) {

  //now you'll have to set the value of the id
  var targetId = parseInt(req.params.id);

  //now you'll need to find item in `supps` array matching the id
  var foundSupplement = _.findWhere(supplements, {id: targetId});

  //now you update the supps' info
  foundSupplement.title = req.body.title;

  //now update the supps' dosage
  foundSupplement.dosage = req.body.dosage;

  //now update the supps' reason
  foundSupplement.reason = req.body.reason;

  //now you have to send back the edited object
  res.json(foundSupplement);

});

// delete a supp
app.delete('/api/supplements/:id', function (req, res) {
  
  //okay now, set the value of the id
  var targetId = parseInt(req.params.id);

  //find the item in the supps array matching the id
  var foundSupplement = _.findWhere(supplements, {id: targetId});

  //now, get the index of the found item
  var index = supplements.indexOf(foundSupplement);
  
  //now this is when you remove the item at that index, only get rid of 1 thing
  supplements.splice(index, 1);

  //and now you send back deleted object, so you're getting rid of it
  res.json(foundSupplement);

});

app.listen(process.env.PORT || 3000, function() {
 console.log('server started on locahost:3000');
});





