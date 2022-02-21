var session = require('express-session');

module.exports = app => {
  var sessionOpts = {
    secret: 'fgzaaflpt20imorsst20',
    resave: true,
    saveUninitialized: true,
  }

  // if (app.get('env') === 'production') {
  //   app.set('trust proxy', 1) // trust first proxy
  //   sessionOpts.cookie.secure = true // serve secure cookies
  // }
  
  app.use(session(sessionOpts));
};
