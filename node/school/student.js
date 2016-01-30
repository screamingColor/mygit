/**
 * 简单的模块
 */
function add(student) {
    console.log('add student:' + student)
}
add(['lu','zi','jun'])
exports.add = add//创建模块