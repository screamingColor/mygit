/**
 * Created by blue on 2016/1/30.
 */
var http = require('http')
var cheerio = require('cheerio')
var url =  'http://www.imooc.com/learn/348'



function filterChapters(html) {
    var $ = cheerio.load(html)
    var chapters = $('.chapter')


    chapters.each(function () {
        var chapter = $(this)
        var chapterTitle = chapter.find('strong').text()
        console.log(chapterTitle);
    })
}

 http.get(url,function(res){
     var html = " "
     res.on('data',function(data) {
         html += data
     })
     res.on('end',function(){
       //  console.log(html)//这里返回的是网页源码
         //但是！！我们希望服务器能进行解析过滤，拿到我们想要的，这里我们要章节大纲,
        filterChapters(html)

     })
 }).on('error',function(){
     console.log("wrong!!!")
 })