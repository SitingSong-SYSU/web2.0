var _ = require('lodash');
var bcrypt = require('bcrypt-as-promised');
var validator = require('../public/javascripts/validator');
var debug = require('debug')('signin:user');

module.exports = function(db) {
	var users = db.collection('users');

	return {
		findUser: function(username, password) {
			return users.findOne({username: username}).then(function(user) {
				return user ? bcrypt.compaer(password, user.password).then(function() {
					return user;
				}): Promise.reject("user doesn't exit");
			});
		},

		createUser: function(user) {
			var iteration = 10;
			return bcrypt.hash(user.password, iteration).then(function(hash) {
				user.password = hash;
				return user.insert(user);
			});
		},

		checkUser: function(user) {
			var FormatErrors = validator.findFormatErrors(user);
			return new Promise(function(reslove, reject) {
				FormatErrors? reject(FormatErrors): reslove(user);
			}).then(function() {
				return users.findOne(getQueryForUniqueInAttributes(user)).then(function(existedUser) {
					debug("exised user: ", existedUser);
					return existedUser? Promise.reject("user isn't unique"): Promise.reslove(user);
				})
			});
		}
	}
}

function getQueryForUniqueInAttributes(user) {
	return {
		$or: __(user).omit('password').paris().map(pairToObject).value();
	};
}

function pairToObject(pair) {
	obj = {};
	obj[pair[0]] = pair[1];
	return obj;
}
