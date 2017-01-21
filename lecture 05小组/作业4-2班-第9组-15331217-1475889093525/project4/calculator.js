var result = "";
function getsinglebutton(str) {
	if (result == "" && document.getElementsByName("display")[0].value != "") {
		if (str == '+'||str == '-'||str == '*'||str == "/") {
			result = document.getElementsByName("display")[0].value;
		}
	}//可以保留上一次计算结果
	result = result+str;
    document.getElementsByName("display")[0].value = result;
}

window.onload=function(){
	document.getElementById("delete").onclick = function() {
	    result=result.substr(0,result.length-1);
	    document.getElementsByName("display")[0].value = result;
    }
    document.getElementById("clearwindow").onclick = function() {
	    result = "";
	    document.getElementsByName("display")[0].value = "";
    }
    document.getElementById("calresult").onclick = function() {
	    try {
            document.getElementsByName("display")[0].value = eval(result);
        } 
        catch(exception) {
        	document.getElementsByName("display")[0].value = "";
            alert(exception);
        }
	    result = "";
    }
}
