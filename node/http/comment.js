var http = require('http')
var querystring = require('querystring')
var postData = querystring.stringify({
	'content':'很喜欢这个课程',
	'mid':8837
})

var options={
	hostname:'wwww.baidu.com',
	port:80,
	path:'/course/docoment',
	method:'POST',
	headers:{
		'Accept':'application/json, text/javascript, */*; q=0.01',
		'Accept-Encoding':'gzip, deflate',
		'Accept-Language':'zh-CN,zh;q=0.8',
		'Connection':'keep-alive',
		'Content-Length':postData.length,
		'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
		'Cookie':'imooc_uuid=fd47667a-0ba1-4879-84e3-da4fff362288; imooc_isnew_ct=1454157678; PHPSESSID=9p9sg9tj86b5k0s8bg4lp96155; loginstate=1; apsid=I0Mjk4MTc1YWVmNzZkZjJkNmU4NjBkZjVhNjAwNmQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjc1NzU1NgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAxMTIxMDk5Nzc5QHFxLmNvbQAAAAAAAAAAAAAAAAAAADA3ZTNlZmRhZGMwM2Q5ZmFhOWExODQzN2U2NTY3NTM16XH6Vulx%2BlY%3DZj; last_login_username=1121099779%40qq.com; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1459253704; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1459253738; jwplayer.qualityLabel=è¶æ¸; imooc_isnew=2; cvde=56fa71c72a3a9-9',
		'Host':'www.imooc.com',
		'Origin':'http://www.imooc.com',
		'Referer':'http://www.imooc.com/video/8837',
		'User-Agent':'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.75 Safari/537.36',
		'X-Requested-With':'XMLHttpRequest'
	}
}

var req = http.request(options,function(res){
	console.log('Status:'+res.statusCode)
	console.log('headers'+JSON.stringify(res.headers))

	res.on('data',function(chunk){
		console.log(Buffer.isBuffer(chunk))
		console.log(typeof chunk)
	})
	res.on('end',function(){
		console.log('评论完毕')
	})
})

req.on('error',function(e){
	console.log('error:'+e.message)
})
req.write(postData)
req.end()