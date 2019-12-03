const fs = require("fs");
 
fs.readFile("json/userList2.json", function(err, buffer) {
 if (err) throw err;
 console.log("buffer", buffer);
});
 
function readLines(input, func) {
 var remaining = "";
 
 input.on("data", function(data) {
 remaining += data;
 var index = remaining.indexOf("\n");
 var last = 0;
 while (index > -1) {
  var line = remaining.substring(last, index);
  last = index + 1;
  func(line);
  index = remaining.indexOf("\n", last);
 }
 
 remaining = remaining.substring(last);
 });
 
 input.on("end", function() {
 if (remaining.length > 0) {
  func(remaining);
 }
 });
}
 
function func(data) {
 console.log("Line: " + data);
}
 
var input = fs.createReadStream("json/userList2.json");
input.setEncoding("binary");
 
readLines(input, func);