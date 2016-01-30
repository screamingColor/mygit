/**
 * Created by blue on 2016/1/30.
 */

var student = require('./student')
var teacher = require('./teacher')


function add(teacherName,students){
    teacher.add(teacherName)

    students.forEach(function(item,index){
        student.add(item)
    })
}

exports.add = add