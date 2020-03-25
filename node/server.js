var http = require("http"),//请求（require）Node.js自带的 http 模块，并且把它赋值给 http 变量
	url = require("url");


//服务器模块
//一个侦听某个端口的服务器
function start(route,handle){//路由函数作为参数
	function onRequest(request,response){//这个函数会返回一个对象，这个对象有一个叫做 listen 的方法,
		//第一个也是唯一一个参数是一个函数定义。直接在createServer的括号中定义和传递这个函数,匿名函数
		//两个参数被传入： request 和 response，
		//它们是对象，你可以使用它们的方法来处理HTTP请求的细节，并且响应请求（比如向发出请求的浏览器发回一些东西）。
		// var postData = "";
		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + " received.");

		// request.setEncoding("utf8");//设置了接收数据的编码格式为UTF-8

		// //注册了“data”事件的监听器，用于收集每次接收到的新数据块，并将其赋值给postData 变量
		// request.addListener("data",function(postDataChunk){
		// 	postData += postDataChunk;
		// 	console.log("Received POST data chunk '" + postDataChunk + "'.");//这个日志生产环境要去掉
		// });

		// //最后，我们将请求路由的调用移到end事件处理程序中，以确保它只会当所有数据接收完毕后才触发，并且只触发一次。我们同时还把POST数据传递给请求路由，因为这些数据，请求处理程序会用到。
		// request.addListener("end",function(){
		// })
		route(handle, pathname, response, request);//把handle对象作为第一个参数传递给了route()回调函数。


		// response.writeHead(200,{"Content-Type":"text/plain"});//发送一个HTTP状态200和HTTP头的内容类型
		// response.write("Hello World");//在HTTP相应主体中发送文本“Hello World"
		// var content = route(handle, pathname);
		// response.write(content);
		// response.end();//完成响应
	}


	http.createServer(onRequest).listen(8888);//指定这个HTTP服务器监听的端口号

	console.log("Server has started.")
}

//我们创建了服务器，并且向创建它的方法传递了一个函数。无论何时我们的服务器收到一个请求，这个函数就会被调用，即回调函数
//函数式编程，将函数作为参数传递
exports.start = start;