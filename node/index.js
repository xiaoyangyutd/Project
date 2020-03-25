var server = require("./server");
var router = require("./router");
var requestHandler = require("./requestHandlers");

var handle = {};//一些请求处理程序的集合
handle["/"] = requestHandler.start;
handle["/start"] = requestHandler.start;
handle["/upload"] = requestHandler.upload;
handle["/show"] = requestHandler.show;


server.start(router.route, handle);//将路由函数注入到服务器中  函数式编程传递的是函数，不是对象
