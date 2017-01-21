var _ = require('lodash');
var mycrypt = require('./mycrypt');
var fatalError = require('./fatalError');
var validator = require('../public/javascripts/validator');
var debug = require('debug')('signin:user');

module.exports = new dataManager();

function dataManager() {
	var db;
	var users;

	require('mongodb').MongoClient.connect('mongodb://localhost:27017/userData').then(function(newdb) {
		debug('database connection succeed.');
		db = newdb;
		users = db.collection('users');
	}).then(showCurrentUsersNumber).then(function() {
		debug('initialization finish.');
	}).catch(fatalError);

	function showCurrentUsersNumber() {
		return users.find().toArray().then(function showCurrentUsersNumber(array) {
			debug(arguments.callee.name, array.length, 'users exist.');
		});
	}

	return {
		findUser: function(username, password) {
			return users.findOne({username: username}).then(function(user) {
				if (!user || mycrypt.decrypt(user.password) !== password)
			        return Promise.reject("user doesn't exit");
			    return Promise.resolve(user);
			});
		},

		createUser: function(user) {
			return this.checkUser(user || {}).then(function(validUser) {
				validUser.password = mycrypt.encrypt(validUser.password);
				users.insert(validUser);
				return validUser;
			});
		},

		checkUser: function(user) {
			var FormatErrors = validator.findFormatErrors(user);
			return new Promise(function(resolve, reject) {
				FormatErrors? reject(FormatErrors): resolve(user);
			}).then(checkExistenceFunc('username', '用户名'))
				.then(checkExistenceFunc('id', '学号'))
				.then(checkExistenceFunc('phone', '电话'))
				.then(checkExistenceFunc('mail', '邮箱'));

			function checkExistenceFunc(name, chineseName) {
				return function(data) {
					var obj = {};
					obj[name] = data[name];
					return users.findOne(obj).then(function(foundData) {
						if (foundData)
							return Promise.reject(chineseName + '已存在');
						return Promise.resolve(data);
					});
				}
			}
		}
	}
}
