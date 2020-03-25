
//路由

function route(handle, pathname, response, request) {
	console.log("About to route a request for " + pathname);
	if(typeof handle[pathname] === 'function'){
		return handle[pathname](response, request);
	} else {
		console.log("No request handler found for " + pathname);
		response.writeHead(404,{"Content-Type":"text/plain"});//发送一个HTTP状态200和HTTP头的内容类型
		response.write("404 Not found");//在HTTP相应主体中发送文本“Hello World"
		response.end();//完成响应
	}
}

exports.route = route;