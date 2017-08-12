var express = require('express');
var router = express.Router();

// 패스워드를 처리를 위한 passport 모듈
var passport = require('passport');
// 이메일에서 gravatar 아이콘 얻기
var gravatar = require('gravatar');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express from server folder' });
});

/* GET login page. */
router.get('/login', isNotLoggedIn, function(req, res, next) {
  res.render('login', { title: 'Login Page', message: req.flash('loginMessage') });
});

/* POST 메서드용 로그인 처리 */
router.post('/login', passport.authenticate('local-login', {
  // 성공하면 프로필 페이지로, 실패하면 로그인 페이지로
  successRedirect : '/profile',
  failureRedirect : '/login',
  failurFlash : true
}));

/* GET signup page. */
router.get('/signup', isNotLoggedIn, function(req, res, next) {
  res.render('signup', { title: 'Signup Page', message: req.flash('SignupMessage') });
});

/* POST 메서드용 회원가입 처리 */
router.post('/signup', passport.authenticate('local-signup', {
  // 성공하면 프로필 페이지로, 실패하면 회원가입 페이지로
  successRedirect : '/profile',
  failureRedirect : '/signup',
  failurFlash : true
}));

/* GET profile page. */
router.get('/profile',isLoggedIn, function(req, res, next) {
  res.render('profile', { title: 'Profile Page', user: req.user, avatar: gravatar.url(req.user.email, {s: '100', r: 'x', d: 'retro'}, true) });
});

/* 사용자가 로그인했는지 확인 */
function isLoggedIn(req, res, next){
  if(req.isAuthenticated())
    return next();
  res.redirect('/login');
}

/* 사용자가 로그인했는지 확인 */
function isNotLoggedIn(req, res, next){
  if(!req.isAuthenticated())
    return next();
  res.redirect('/profile');
}


/* GET 메서드용 로그아웃 페이지 */
router.get('/logout', function(req,res){
  req.logout();
  res.redirect('/');
});

module.exports = router;
