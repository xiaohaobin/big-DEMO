//文件上传
var express = require('express');
var app = express();
var fs = require("fs");
 
var bodyParser = require('body-parser');
var multer  = require('multer');
var util = require('util');
var mysql = require('mysql');

//响应数据头参数
var res_head = {
	'Content-Type': 'text/html; charset=utf8'
};

//连接本地数据库
var connection = mysql.createConnection({
  host:'localhost',
  port:'3306',
  user:'root',
  password:'000000',
  database:'my_datatables_1'//数据库名称
});
connection.connect();

//新增sql语句
var sql_add = "INSERT INTO file_upload (file_name) VALUES ";

//查询所有列表


//开放目录 
app.use('/public', express.static('public'));
app.use('/pages', express.static('pages'));
app.use('/uploadFile', express.static('uploadFile'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ dest: '/tmp/'}).array('image'));
 
 
 //允许请求的页面  ajax请求方式上传文件
 app.get('/pages/file_upload_ajax.html', function (req, res) {
 	//打印cookie
   console.log("Cookies: " + util.inspect(req.cookies));
   res.sendFile( __dirname + "/" + "pages/file_upload_ajax.html" );
})
 
 
 
 //请求失败回调
function backErr(errInfo){
	var oErr = {
		code:1,
		data:errInfo
	};
	return oErr;
}

//请求成功的回调
function backSucc(){
	var oSucc = {
		code:0,
		data:"操作成功"
	};
	return oSucc;
}

 /**
 * 添加数据
 * @param {String} addSql 新增数据的语句
 * @param {Array} addSqlParams 新增进来的数据数组
 * */
function optionDatabase(addSql,callback){
	connection.query(addSql,function (err, result) {
      	if(callback){		 	
      		//console.log(result.affectedRows,"result.affectedRows");
      		if(err){
      			callback(backErr(err.message));
      		}
      		if(result.affectedRows == 1){
      			callback(backSucc());
      		}
	        
		} 
	});
}
 
 //查询列表
 function queryDatabase(p,callback){
 	var list_sql = "SELECT * FROM file_upload";
 	connection.query(list_sql,function (err, result) {
		if(callback){		 
	       // err ? callback(backErr(err.message)) : callback(result);	       
	       if(err){
	          callback(backErr(err.message));
	          return;
	        }
	 
	       //数据库的行格式，先转化为string类型
	       var list = [];
	       for(var i=0;i<result.length;i++){
		       	list.push(JSON.stringify(result[i]));
	       }
	     
	       callback(list);
		}	
        
	});
 }
 
 
 //获取文件列表
app.get('/list', function(req, res) {
	//设置响应头
	res.writeHead(200, res_head);
	var p = req.query;
	//console.log("页码：",p.pageNum);
	queryDatabase(
		p,
		function(mainData){
			for(var i=0;i<mainData.length;i++){
				mainData[i] = JSON.parse(mainData[i]);
			}		
			var oR = backSucc();
	        oR.data = mainData;
			res.end(JSON.stringify(oR));
		}
	);
	
});
 
 //文件上传接口
app.post('/file_upload', function (req, res) {
	//设置响应头
   res.writeHead(200, res_head);
   
   console.log(req.files[0],"上传的文件信息");  // 上传的文件信息
   
   //上传文件目录
   var des_file = __dirname + "/uploadFile/" + req.files[0].originalname;
    console.log("上传文件的名称：" + des_file);
   
   var fname = "/uploadFile/" + req.files[0].originalname;
 
   var sql_add2 = sql_add + '("' + fname + '")';
   
   //
   optionDatabase(sql_add2,function(mainData){
   		//存储文件夹
   		fs.readFile( req.files[0].path, function (err, data) {
	        fs.writeFile(des_file, data, function (err) {
	         if( err ){
	              console.log( err );
	         }else{
	              
		          //响应前台数据
		          res.end(JSON.stringify(mainData));
	          }
	          
	       });
	   });
   	
   		
   });
   
   
   
})
 
 //开启服务
var server = app.listen(8081, function () { 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})