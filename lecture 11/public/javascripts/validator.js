var validator = {
	form: {
		username: {
			status: false,
			errorMessage: "6-16位字母、数字或下划线，必须以英文字母开头"	
		},
		password: {
			status: false,
			errorMessage: "6-12位字母、数字、中划线或下划线"	
		},
		'repeat-password': {
			status: false,
			errorMessage: "两次输入的密码不一致"	
		},
		sid: {
			status: false,
			errorMessage: "8位数字，不能以0开头"
		},
		phone: {
			status: false,
			errorMessage: "11位数字，不能以0开头"
		},
		email: {
			status: false,
			errorMessage: "请输入合法邮箱"
		}
	},

	findFormatErrors: function(user) {
		var errorMessages =[];
		for (var key in user) {
			if(user[key]) {
				if (!validator.isFieldValid(key, user[key]))
					errorMessages.push(validator.form[key].errorMessage);
			}
		}
		errorMessages.length > 0 ? new Error(errorMessages.join('<br />')): null;
	},

	isUsernameValid: function(username) {
		return this.form.username.status = /^[a-zA-Z][a-zA-Z0-9_]{6,18}$/.test(username);
	},

	isPasswordValid: function(password) {
		this.password = password;
		return this.form.password.status = /^[a-zA-Z0-9_\-]{6,12}$/.test(password);
	},

	isRepeatPasswordValid: function(repeatPassword) {
		return this.form['repeat-password'].status = repeatPassword == this.password;
	},

	isSidValid: function(sid) {
		return this.form.sid.status = /^[1-9]\d{7}$/.test(sid);
	},

	isPhoneValid: function(phone) {
		return this.form.phone.status = /^[1-9]\d{10}$/.test(phone);
	},

	isEmailValid: function(email) {
		return this.form.email.status = /^[a-zA-Z0-9_\-]+@([a-zA-Z0-9_\-]+\.)+[a-zA-Z]{2,4}$/.test(email);
	},

	isFieldValid: function(fieldname, value) {
		var CapFieldname = capCamelize(fieldname);
		return this["is" + CapFieldname + "Valid"](value);
	},

	isFormValid: function() {
		return this.form.username.status && this.form.sid.status && this.form.phone.status && this.form.email.status && this.form.password.status && ((typeof window !== 'object') || this.form['repeat-password'].status);
	},

	getErrorMessage: function(fieldname) {
		return this.form[fieldname].errorMessage;
	},

	/*isAttrValueUnique: function(registry, user) {
		for (var key in registry) {
			for (var attr in user) {
				if (registry.hasOwnProperty(key) && registry[key][attr] == user[attr])
					return false;
			}
		}
		return true;
	}*/
	isAttrValueUnique: function(registry, user, attr) {
		for (var key in registry) {
			if (registry.hasOwnProperty(key) && registry[key][attr] == user[attr])
				return false;
		}
		return true;
	}
};

if (typeof module == 'object') {
	module.exports = validator;
}

function capCamelize(str) {
	return str.split(/[_\-]/).map(capitalize).join('');
}

function capitalize(str) {
	return str[0].toUpperCase() + str.slice(1, str.length);
}