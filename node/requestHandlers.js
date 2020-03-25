// var exec = require("child_process").exec;//exec()非阻塞操作
// var querystring = require("querystring"),
// 	fs = require("fs");



// //请求处理程序

// //对于每一个请求处理程序，添加一个占位用函数，随后将这些函数作为模块的方法导出：

// function start(response){
// 	console.log("Request handler 'start' was called.");


// 	// function sleep(milliSeconds){//阻塞线程
// 	// 	var startTime = new Date().getTime();
// 	// 	while(new Date().getTime() < startTime + milliSeconds);
// 	// }
// 	// sleep(10000);

// 	// var content = "empty";

// 	//它从Node.js来执行一个shell命令。在上述例子中，我们用它来获取当前目录下所有的文件（“ls -lah”）,然后，当/startURL请求的时候将文件信息输出到浏览器中
// 	// exec("find /",
// 	// 	{ timeout:10000, maxBuffer:20000*1024 },
// 	// 	 function(error, stdout, stderr){//ls -lah
// 	// 		response.writeHead(200,{"Content-Type":"text/plain"});
// 	// 		response.write(stdout);
// 	// 		response.end();
// 	// 	});


// 	// return content;

// 	var body ='<html>'+
//     '<head>'+
//     '<meta http-equiv="Content-Type" content="text/html; '+
//     'charset=UTF-8" />'+
//     '</head>'+
//     '<body>'+
//     '<form action="/upload" enctype="multipart/form-data" method="post">'+
//     '<input type="file" name="upload">'+
//     '<input type="submit" value="Upload file" />'+
//     '</form>'+
//     '</body>'+
//     '</html>';


//     response.writeHead(200,{"Content-Type":"text/html"});
// 	response.write(body);
// 	response.end();
// }

// function upload(response, request){
// 	console.log("Request handler'upload' was called.");

// 	var form = new formidable.IncomingForm();
// 	console.log("about to parse");
// 	form.parse(request, function(error,fields,files){
// 		console.log("parsing done");
// 		fs.renameSync(files.upload.path,"/tmp/test.png");
// 		response.writeHead(200,{"Content-Type":"text/html"});
// 		response.write("received image:<br/>");
// 		response.write("<img src='/show' />");
// 		response.end();
// 	})

// 	response.writeHead(200,{"Content-Type":"text/plain"});
// 	response.write("You've sent the text:" + querystring.parse(postData).text);//使用querystring获取我们需要的部分（text）
// 	response.end();
// }

// function show(response){
// 	console.log("Request handler 'show' was called.");
// 	fs.readFile("/tmp/test.png","binary",function(error, file){
// 		if(error){
// 			response.writeHead(500,{"Content-Type":"text/plain"});
// 			response.write(error+"\n");
// 			response.end();
// 		} else {
// 			response.writeHead(200,{"Content-Type":"img/png"});
// 			response.write(file,"binary");
// 			response.end();
// 		}
// 	})
// }

// exports.start = start;
// exports.upload = upload;
// exports.show = show;


var querystring = require("querystring"),
    fs = require("fs"),
    formidable = require("formidable");

function start(response){
  console.log("Request handler 'start' was called.");

  var body ='<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" enctype="multipart/form-data" '+
    'method="post">'+
    '<input type="file" name="upload" multiple="multiple">'+
    '<input type="submit" value="Upload file" />'+
    '</form>'+
    '</body>'+
    '</html>';

    response.writeHead(200,{"Content-Type":"text/html"});
    response.write(body);
    response.end();
}

function upload(response, request){
  console.log("Request handler 'upload' was called.");

  var form =new formidable.IncomingForm();
  console.log("about to parse");
  form.parse(request,function(error, fields, files){
    console.log("parsing done");
    fs.renameSync(files.upload.path,"/tmp/test.png");
    response.writeHead(200,{"Content-Type":"text/html"});
    response.write("received image:<br/>");
    response.write("<img src='/show' />");
    response.end();
  });
}

function show(response){
  console.log("Request handler 'show' was called.");
  fs.readFile("/tmp/test.png","binary",function(error, file){
    if(error){
      response.writeHead(500,{"Content-Type":"text/plain"});
      response.write(error +"\n");
      response.end();
    }else{
      response.writeHead(200,{"Content-Type":"image/png"});
      response.write(file,"binary");
      response.end();
    }
  });
}

exports.start = start;
exports.upload = upload;
exports.show = show;