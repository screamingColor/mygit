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
       //  console.log(html)//���ﷵ�ص�����ҳԴ��
         //���ǣ�������ϣ���������ܽ��н������ˣ��õ�������Ҫ�ģ���������Ҫ�½ڴ��,
        filterChapters(html)

     })
 }).on('error',function(){
     console.log("wrong!!!")
 })