var querystring = require('querystring');
var fs = require('fs');
var newhtml = require('./newhtml');

function create_new_user(res, req, json_usersave) {
	var postData = "";
	var new_json_usersave;
    req.addListener('data', function(data) {
        postData += data;
    });
    req.addListener('end', function() {
        if (json_usersave == "") {
            json_usersave = {
                user:[],number:[],phone:[],email:[]
            };
        }
        new_json_usersave = {
        	user:[],number:[],phone:[],email:[]
        };
        new_json_usersave.user = querystring.parse(postData).user;
        new_json_usersave.number = querystring.parse(postData).number;
        new_json_usersave.phone = querystring.parse(postData).phone;
        new_json_usersave.email = querystring.parse(postData).email;
        new_user(res, new_json_usersave, json_usersave, postData);
    });
};


function new_user(res, new_json_usersave, json_usersave, postData) {
	json_usersave.user.push(new_json_usersave.user);
	json_usersave.number.push(new_json_usersave.number);
	json_usersave.phone.push(new_json_usersave.phone);
	json_usersave.email.push(new_json_usersave.email);
	var json_usersave = JSON.stringify(json_usersave);
  	fs.writeFile('./data/data.txt', json_usersave, function(err) {
    	    if (err) throw err;
    	    console.log(new_json_usersave);
    	    newhtml.newpage(res, new_json_usersave);
  	});
};

exports.create_new_user = create_new_user;