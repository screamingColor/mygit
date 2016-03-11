var EventEmitter = require('events').EventEmitter
var life = new EventEmitter()
life.setMaxListeners(11)//官方建议事件监听不要超过十，所以超过十会用警告
//这里我们修改一下最大监听值


//addEventListener也可以
life.on('hello',function(who){
	console.log('give '+who+' a 1')
})
life.on('hello',function(who){
	console.log('give '+who+' a 2')
})
life.on('hello',function(who){
	console.log('give '+who+' a 3')
})
life.on('hello',water)
function water(){
	console.log('give '+who+' a 4')
}
life.on('bye',function(who){
	console.log('give '+who+' a 4')
})
life.emit('hello','taylor')
life.emit('hello',water)
life.removeListener('hello',water)
//life.removeAllListeners() //移除所有监听

console.log(life.listeners('hello').length)
//console.log(EventEmitter.listenerCount(life,'hello')) //同 计算监听数

var haveListener=life.emit('helo','taylor')//返回布尔值

