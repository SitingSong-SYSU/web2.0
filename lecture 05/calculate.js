var quit = 0; //防止重复输入运算符

function command(num) {
	var str = String(document.calculator.numScreen.value);
	str = (str != "0") ? str : ""; //如果当前值不是"0"，则返回当前值，否则返回空值;
	str = str + String(num); //给当前值追加字符
	document.calculator.numScreen.value = str; //刷新显示
	quit = 0;
} 

function dot() {
	var str = String(document.calculator.numScreen.value);
	str = (str != "0") ? str : "0"; //如果当前值不是"0"，且状态为0，则返回当前值，否则返回"0";
	for (i = str.length - 1; i >= 0; i--) { //判断是否已经有一个小数点
		if (str.substr(i, 1) == ".") return; //如果有则不再插入
		else if (isNaN(str.substr(i, 1))) break; //遇到运算符则停止查找
	}
	str = str + ".";
	document.calculator.numScreen.value = str;
	quit = 0;
}

function del() {
	var str = String(document.calculator.numScreen.value);
	if (str.length >= 1) str = str.substr(0, str.length - 1);
	str = (str == "") ? "0" : str;
	document.calculator.numScreen.value = str;
	if (isNaN(str.substr(str.length - 1, 1)) && str.substr(str.length - 1, 1) != "." 
		&& str.substr(str.length - 1, 1) != "(" && str.substr(str.length - 1, 1) != ")" )
		quit = 1;
	else
		quit = 0;
}

function clearscreen() {
	document.calculator.numScreen.value="0";
	quit = 0;
}

function operator(op) {
	var str = String(document.calculator.numScreen.value); //获得当前显示数据
	if (quit == 1 && op != "(" && op != ")") return;
	str = (str != "0") ? str : ""; //如果当前值不是"0"，则返回当前值，否则返回空值;
	str = str + String(op); //给当前值追加字符
	document.calculator.numScreen.value = str; //刷新显示
	if (op == "(" || op == ")") quit = 0;
	else quit = 1;
}

function equal() {
	calc();
}

String.prototype.trim = function () {
	return this.replace(/^\s+/, '').replace(/\s+$/, '');
};

function calc() {
	var expression = String(document.calculator.numScreen.value);
	try {
		document.calculator.numScreen.value = calcBasic(calcComplex(expression));
	} catch(e) {
		alert(e.message);
	}
}

function calcComplex(complexExpression) {
	var arr = new Array();
	var left = 0;
	var right = 0;
	for (var i = 0; i < complexExpression.length; i++) {
		if (complexExpression.charAt(i) == '(') {
			arr.push(i);
			left++;
		}
		if (complexExpression.charAt(i) == ')') {
			arr.push(i);
			right++;
		}
	}
	if (left != right) {
		throw new Error('括号不匹配！','2');
	}
	var brackets = complexExpression.replace(/[^\(|^\)]/g, '');

	for (i = 0; i < brackets.length; i++) {
		if (brackets.charAt(i) == "(" && brackets.charAt(i + 1) == ")") {
			var simpleExpression = complexExpression.substr(arr[i] + 1, arr[i + 1] - arr[i] - 1);
			if (calcBasic(simpleExpression) < 0) {
				complexExpression = complexExpression.substr(0, arr[i]) + '[' + Math.abs(calcBasic(simpleExpression)) + '' + complexExpression.substr(arr[i + 1] + 1);
			} else {
				complexExpression = complexExpression.substr(0, arr[i]) + '' + calcBasic(simpleExpression) + '' + complexExpression.substr(arr[i + 1] + 1);
			}
			complexExpression=calcComplex(complexExpression);
			break;
		}
	}
	return complexExpression;
} 

function calcBasic(baseExpression) {
	if (baseExpression.charAt(0)=='-') {
		baseExpression = '[' + baseExpression.substr(1);
	}
	var constants = baseExpression.trim().replace(/[\*|\/|\+|\-]/g, ' ').split(/\s+/g);
	for (var index in constants) {
		//只留下符号
		baseExpression = baseExpression.replace(/\s+/g, '').replace(constants[index], '');
		//将提取的常量字符串转化为数字
		var item;
		if (constants[index].trim().charAt(0)=='[') {
			item = parseFloat(constants[index].trim().replace('[','-'));
		} else {
			item = parseFloat(constants[index].trim());
		}
		if (isNaN(item)) {
			throw new Error('存在非法符号！','0');
		} else {
			constants[index] = item;
		}
	}
	if (constants.length != baseExpression.length + 1) {
		throw new Error('表达式有误！','1');
	}
	for (var i = 0; i < baseExpression.length; i++) {
		switch (baseExpression.charAt(i)) {
			case '*':
				constants.splice(i, 2, constants[i] * constants[i + 1]);
				baseExpression = baseExpression.replace('*', '');
				i -= 1;
				break;
			case '/':
				if (constants[i + 1] == 0) {
				throw new Error('除数不能为0！');
				}
				constants.splice(i, 2, constants[i] / constants[i + 1]);
				baseExpression = baseExpression.replace('/', '');
				i -= 1;
				break;
			default: break;
		}
	}
	for (var j = 0; j < baseExpression.length; j++) {
		switch (baseExpression.charAt(j)) {
			case '+':
				constants.splice(j, 2, constants[j] + constants[j + 1]);
				baseExpression = baseExpression.replace('+', '');
				j -= 1;
				break;
			case '-':
				constants.splice(j, 2, constants[j] - constants[j + 1]);
				baseExpression = baseExpression.replace('-', '');
				j -= 1;
				break;
			default: break;
		}
	}
	return constants[0];
}


document.onkeydown = function(event) {
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if (e && e.keyCode >= 48 && e.keyCode <= 57){ // 按数字键
    	if (!event.shiftKey) command(e.keyCode - 48);
    }
    if (e && e.keyCode >= 96 && e.keyCode <= 105){ // 按小键盘数字键
        command(e.keyCode - 96);
    }
    if ((e && e.keyCode == 187 && event.shiftKey) || (e && e.keyCode == 107)){ // 按+
        operator('+');
    }
    if (e && (e.keyCode == 189 ||  e.keyCode == 109)) { // 按-
        operator('-');
    }
    if ((e && e.keyCode == 56 && event.shiftKey) || (e && e.keyCode == 106)){ // 按*
        operator('*');
    }
    if (e && (e.keyCode == 191 ||  e.keyCode == 111)) { // 按/
        operator('/');
    }
    if (e && (e.keyCode == 190 ||  e.keyCode == 110)) { // 按.
        dot();
    }
    if (e && e.keyCode == 13) { // 按回车
        equal();
    }
    if (e && e.keyCode == 8) { // 按返回
        del();
    }
};
