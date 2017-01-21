/*

name: Chen Xiangyi
class: 1
student ID: 15331034
class time: Wednesday evening
group: 9

*/

var end = false;  // 是否结束了运算
var output = "";  // 显示的算式或结果

function check(inp) {
  switch(inp) {
    case '0':
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
    case '.':
    case '(':
    case ')':
      if (end) {  // 如果现在显示的是结果，则现在输入的作为新的算式，计算结果置零
        output = "";
        end = false;
      }
      if (output == "0") {  // 不是结果的‘0’在输入时应该去掉
        output = "";
      }
      output += inp;
      break;
    case 'd':  // 删除一格
      if (end) {  // 如果是结果则置零
        output = "0";
      } else {  // 不是结果删除一格
        if (output.length == 1) {
          output = "0";
        } else {
          output = output.substr(0, output.length-1);
        }
      }
      break;
    case 'c':
      output = "0";
      break;
    case '=':
      try {
        output = eval(output.toString());
      }
      catch(exception) {
        window.alert("输入不合法");
        output = "0";
      }
      end = true;
      break;
    default:
      end = false;
      output += inp;
  }
  document.getElementById("outp").value = output;
}