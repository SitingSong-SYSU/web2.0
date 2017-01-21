var express = require('express');
var router = express.Router();
var validator = require('../public/javascripts/validator');
var debug = require('debug')('signin:routes');
var userManager = require('../models/user');

module.exports = router;

router.get('/', function(req, res, next) {
	if (req.query.username) {
		if (!req.session.user) {
			res.render('signin', {title: '登录', error: '请先登录'});
		} else if (req.query.username !== req.session.user.username) {
			res.render('detail', { title: '详情', user: req.session.user, error: '只能够访问自己的数据' });
		} else {
			res.render('detail', { title: '详情', user: req.session.user });
		}
	} else {
		res.redirect(302, '/signin');
	}
});

router.get('/signin', function(req, res, next) {
	res.render('signin', {title: '登录'});
});

router.post('/signin', function(req, res,next) {
	userManager.findUser(req.body.username, req.body.password)
		.then(function(user) {
			req.session.user = user;
			res.redirect(302, '/detail');
		})
		.catch(function(error) {
			res.render('signin', {title: '登录', error: '错误的用户名或者密码'});
		});
});

router.get('/signout', function(req, res, next) {
	delete req.session.user;
	res.redirect(302, '/signin');
});

router.get('/regist', function(req, res, next) {
	res.render('regist', { title: '注册', user: {} });
});

router.post('/regist', function(req, res, next) {
	var user = req.body;
	debug('here1');
	userManager.createUser(user)
		.then(function() {
			debug('here2');
			req.session.user = user;
			res.redirect(302, '/detail');
		})
		.catch(function(error) {
			res.render('regist', {title: '注册', user: user, error: error});
		});
});

router.all('*', function(req, res, next) {
	req.session.user ? next(): res.redirect(302, '/signin');
});

router.get('/detail', function(req, res, next) {
	res.render('detail', { title: '详情', user: req.session.user });
});

function checkUser(user) {
	var errorMessage = [];
	for (var key in user) {
		if (!validator.isFieldValid(key, user[key]))
			errorMessage.push(validator.form[key].errorMessage);
		if (!validator.isAttrValueUnique(users, user, key))
			errorMessage.push(key + "is not unique.");
	}
	if (errorMessage.length > 0)
		throw new Error(errorMessage.join("<br />"));
}
