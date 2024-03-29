const http = require("http");
const fs = require("fs");
const util = require("util");
const querystring = require("querystring");

//用http模块创建一个http服务端
http.createServer(function(req, res) {
		if(req.url == "/upload" && req.method.toLowerCase() === "get") {

			//显示一个用于文件上传的form
			res.writeHead(200, {
				"content-type": "text/html"
			});
			res.end(
				'<form action="/upload" enctype="multipart/form-data" method="post">' +
				'<input type="file" name="upload" multiple="multiple" />' +
				'<input type="submit" value="Upload" />' +
				"</form>"
			);
		} else if(req.url == "/upload" && req.method.toLowerCase() === "post") {
			if(req.headers["content-type"].indexOf("multipart/form-data") !== -1)
				parseFile(req, res);
		} else {
			res.end("pelease upload img");
		}
	})
	.listen(3000);

function parseFile(req, res) {
	var _f = req.setEncoding("binary");
	let body = ""; // 文件数据
	let fileName = ""; // 文件名

	// 边界字符串 ----WebKitFormBoundaryoMwe4OxVN0Iuf1S4
	const boundary = req.headers["content-type"]
		.split("; ")[1]
		.replace("boundary=", "");

	req.on("data", function(chunk) {
		body += chunk;
	});

	req.on("end", function() {
		const file = querystring.parse(body, "\r\n", ":");

		// 只处理图片文件;
		if(file["Content-Type"].indexOf("image") !== -1) {
			//获取文件名
			var fileInfo = file["Content-Disposition"].split("; ");
			for(value in fileInfo) {
				if(fileInfo[value].indexOf("filename=") != -1) {
					fileName = fileInfo[value].substring(10, fileInfo[value].length - 1);

					if(fileName.indexOf("\\") != -1) {
						fileName = fileName.substring(fileName.lastIndexOf("\\") + 1);
					}
					console.log("文件名: " + fileName);
				}
			}

			// 获取图片类型(如：image/gif 或 image/png))
			const entireData = body.toString();
			const contentTypeRegex = /Content-Type: image\/.*/;

			contentType = file["Content-Type"].substring(1);

			//获取文件二进制数据开始位置，即contentType的结尾
			const upperBoundary = entireData.indexOf(contentType) + contentType.length;
			const shorterData = entireData.substring(upperBoundary);

			// 替换开始位置的空格
			const binaryDataAlmost = shorterData
				.replace(/^\s\s*/, "")
				.replace(/\s\s*$/, "");

			// 去除数据末尾的额外数据，即: "--"+ boundary + "--"
			const binaryData = binaryDataAlmost.substring(
				0,
				binaryDataAlmost.indexOf("--" + boundary + "--")
			);

			// console.log("binaryData", binaryData);
			const bufferData = new Buffer.from(binaryData, "binary");
			console.log("bufferData", bufferData);

			// fs.writeFile(fileName, binaryData, "binary", function(err) {
			// res.end("sucess");
			// });
			fs.writeFile(fileName, bufferData, function(err) {
				res.end("sucess");
			});
		} else {
			res.end("reupload");
		}
	});
}