/**
 * Created by blue on 2016/2/20.
 */

/*RegExp构造函数第一个参数为正则表达式的文本内容,而第一个参数则为可选项标志.标志可以组合使用
?g （全文查找）
?i （忽略大小写）
?m （多行查找）*/


//1.原生javascript实现字符串长度截取
function cutstr(str,len){
    var temp;
    var icount = 0;
    var patrn = /[^\x00-\xff]/; //[^\x00-\xFF]表示匹配Ascii码大于255的那些字符
    var strre = "";
    for(var i = 0;i < str.length;i++){
        if(icount<len -1){
            temp = str.substr(i,1);//从字符串变量str的第i个字符开始,取出一位字符
            if(patrn.exec(temp)==null){ //exec() 方法用于检索字符串中的正则表达式的匹配
                icount = icount + 1
            }else{
                icount = icount + 2;
            }
            strre+=temp
        }else{
            break
        }

    }
    return strre + "..."
}

//2.原生javascript获取域名主机
function getHost(url){
    var host = 'null';
    if(typeof null=="undefined"||null ==url){
        url = window.location.href;
    }
    var regex = /^\w+\:\/\/([^\/]*).*/;
    var match = url.match(regex);
    if(typeof match != "undefined" && null != match){
        host = match[1];
    }
    return host;
}

//3.原生javascript清除空格
String.prototype.trim = function(){
    var reExtraSpace = /^\s*(.*?)\s+$/;
    return  this.replace(reExtraSpace,"$1")//$1、$2、...、$99 	与 regexp 中的第 1 到第 99 个子表达式相匹配的文本。
}

//4.原生javascript替换全部
String.prototype.replaceAll = function(s1,s2){
    return this.replace(new RegExp(s1,"gm"),s2)
    //g 执行全局匹配（查找所有匹配而非在找到第一个匹配后停止）。
    //m 执行多行匹配。
}

//5.原生javascript转义html标签
function HtmlEncode(text){
    return text.replace(/&/g, '&amp').replace(/\"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

//6.原生javascript还原html标签
function HtmlDecode(text){
    return text.replace(/&amp;/g, '&').replace(/&quot;/g, '\"').replace(/&lt;/g, '<').replace(/&gt;/g, '>')

}
//7.原生javascript时间日期格式转换
Date.prototype.Format = function(formatStr) {
    var str = formatStr;
    var Week = ['日', '一', '二', '三', '四', '五', '六'];
    str = str.replace(/yyyy|YYYY/, this.getFullYear());
    str = str.replace(/yy|YY/, (this.getYear() % 100) > 9 ? (this.getYear() % 100).toString() : '0' + (this.getYear() % 100));
    str = str.replace(/MM/, (this.getMonth() + 1) > 9 ? (this.getMonth() + 1).toString() : '0' + (this.getMonth() + 1));
    str = str.replace(/M/g, (this.getMonth() + 1));
    str = str.replace(/w|W/g, Week[this.getDay()]);
    str = str.replace(/dd|DD/, this.getDate() > 9 ? this.getDate().toString() : '0' + this.getDate());
    str = str.replace(/d|D/g, this.getDate());
    str = str.replace(/hh|HH/, this.getHours() > 9 ? this.getHours().toString() : '0' + this.getHours());
    str = str.replace(/h|H/g, this.getHours());
    str = str.replace(/mm/, this.getMinutes() > 9 ? this.getMinutes().toString() : '0' + this.getMinutes());
    str = str.replace(/m/g, this.getMinutes());
    str = str.replace(/ss|SS/, this.getSeconds() > 9 ? this.getSeconds().toString() : '0' + this.getSeconds());
    str = str.replace(/s|S/g, this.getSeconds());
    return str
}

//8.原生javascript判断是否为数字类型
function isDigit(value){
    var patrn = /[0-9]*$/;
    if(patrn.exec(value)==null|| value==""){
        return false
    }else{
        return true
    }
}

//9.原生javascript设置cookie值
function setCookit(name,value,Hours){
    var d = new Date();
    var offset =8;
    var utc = d.getTime()+(d.getTimezoneOffset()*6000);
    //getTimezoneOffset() 方法可返回格林威治时间和本地时间之间的时差，以分钟为单位。
    var nd = utc + (3600000*offset);
    var exp = new Date(nd);
    exp.setTime(exp.getTime() + Hours * 60 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";path=/;expires=" + exp.toGMTString() + ";domain=360doc.com;"
    //toGMTString() 方法可根据格林威治时间 (GMT) 把 Date 对象转换为字符串，并返回结果。
}
//10.原生javascript获取cookie值
function getCookie(name) {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return unescape(arr[2]);
    return null
}

//11.原生javascript加入收藏夹
function AddFavorite(sURL,sTitle){
    try{
        window.external.addFavorite(sURL,sTitle)
    }catch(e){
        try{
            window.sidebar.addPanel(sTitle,sURL,'')
        }catch(e){
            alert('加入收藏夹失败，请使用ctrl+d进行添加')
        }
    }
}
//12.原生javascript设置首页
function setHomepage() {
    if (document.all) {
        document.body.style.behavior = 'url(#default#homepage)';
        document.body.setHomePage('http://www.jq-school.com')
    } else if (window.sidebar) {
        if (window.netscape) {
            try {
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect")
            } catch (e) {
                alert("该操作被浏览器拒绝，如果想启用该功能，请在地址栏内输入 about:config,然后将项 signed.applets.codebase_principal_support 值该为true")
            }
        }
        var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
        prefs.setCharPref('browser.startup.homepage', 'http://www.jq-school.com')
    }
}


//13.原生javascript判断ie6
var ua = navigator.userAgent.toLowerCase();
var isIE6 = ua.indexOf('msie 6') > -1;//msie浏览器内核
if(isIE6){
    try{
        document.execCommand("BackgroundImageCache",false,true)
        //execCommand方法是执行一个对当前文档，当前选择或者给出范围的命令。
        //第二个参数 是否显示对话框
        //第三个参数 动态参数一般为一可用值或属性值，如true
    }catch(e){ }
}

//14.原生javascript加载样式文件
function LoadStyle(url){
    try{
        document.createStyleSheet(url)
    }catch(e){
        var cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.type = 'text/css';
        cssLink.href = url;
        var head = document.getElementsByClassName('head')[0];
        head.appendChild(cssLink)
    }
}

//15.原生javascript返回脚本内容
function evalscript(s){
    if(s.indexOf('<script') == -1) return s;
    // indexOf() 方法对大小写敏感！
    //如果要检索的字符串值没有出现，则该方法返回 -1
    var p = /<script[^\>]*?>([^\x00]*?)<\/script>/ig;
    var arr = [];
    while(arr = p.exec(s)) {
        var p1 = /<script[^\>]*?src=\"([^\>]*?)\"[^\>]*?(reload=\"1\")?(?:charset=\"([\w\-]+?)\")?><\/script>/i;
        var arr1 = [];
        arr1 = p1.exec(arr[0]);
        if(arr1) {
            appendscript(arr1[1], '', arr1[2], arr1[3]);
        } else {
            p1 = /<script(.*?)>([^\x00]+?)<\/script>/i;
            arr1 = p1.exec(arr[0]);
            appendscript('', arr1[2], arr1[1].indexOf('reload=') != -1);
        }
    }
    return s;
}

//16.原生javascript清除脚本内容
function stripscript(s){
    return s.replace(/<script.*?>.*?<\/script>/ig, '');
}

//17.原生javascript动态加载脚本文件
function appendscript(src, text, reload, charset) {
    var id = hash(src + text);
    if (!reload && in_array(id, evalscripts)) return;
    if (reload && $(id)) {
        $(id).parentNode.removeChild($(id));
    }
    evalscripts.push(id);
    var scriptNode = document.createElement("script")
    scriptNode.type = 'text/javascript';
    scriptNode.id = id;
    scriptNode.charset = charset ? charset : (browser.firefox ? document.characterSet : document.charset);
    try {
        if (src) {
            scriptNode.src = src;
            scriptNode.onloadDone = false;
            scriptNode.onload = function () {
                scriptNode.onloadDone = true;
                JSLOADED[src] = 1;
            };
            scriptNode.onreadystatechange = function () {
                if ((scriptNode.readyState == 'loaded' || scriptNode.readyState == 'complete') && !scriptNode.onloadDone) {
                    scriptNode.onloadDone = true;
                    JSLOADED[src] = 1;
                }
            };
        } else if (text) {
            scriptNode.text = text;
        }
        document.getElementsByTagName('head')[0].appendChild(scriptNode);
    } catch (e) {
    }
}

//18.原生javascript返回浏览器版本内容
function $(id){
    return !id ? null :　document.getElementById(id);
}
//19.原生javascript返回浏览器版本内容
function browserVersion(types) {
    var other = 1;
    for(i in types) {
        var v = types[i] ? types[i]: i;
        if(USERAGENT.indexOf(v) != -1) {
            var re = new RegExp(v + '(\\/|\\s)([\\d\\.]+)', 'ig');
            var matches = re.exec(USERAGENT);
            var ver = matches != null ? matches[2] : 0;
            other = ver !== 0 && v != 'mozilla' ? 0 : other;
        }else {
            var ver = 0;
        }
        eval('BROWSER.' + i + '= ver');
    }
    BROWSER.other = other;
}

//20.原生javascript元素显示的通用方法
function $(id) {
    return !id ? null : document.getElementById(id);
}
function display(id) {
    var obj = $(id);
    if(obj.style.visibility) {
        obj.style.visibility = obj.style.visibility == 'visible' ? 'hidden' : 'visible';
    } else {
        obj.style.display = obj.style.display == '' ? 'none' : '';
    }
}
//21.原生的javascript中有insertBefore方法，但却没有inserAfter方法
function insertAfter(newChild,refChild){
    var parElem = refChild.parentNode;
    if(parElem.lastChild == refChild){
        refChild.appendChild(newChild);
    }else{
        parElem.insertBefore(newChild,refChild.nextSibling);
    }
}

//22.原生javascript中兼容浏览器绑定元素事件
function addEventSamp(obj,evt,fn){
    if(obj.addEventListener){
        obj.addEventListener(evt,fn,false);
    }else if(obj.attachEvent){
        obj.attachEvent('on'+evt,fn);
    }
}

//23.原生javascript光标停在文字后面，文本框获得焦点时调用
function focuslast(){
    var e = event.srcElement;
    var r = e.createTextRange();
    r.moveStart('character', e.value.length);
    r.collapse(true);
    r.select();
}
//24.原生javascript检验URL链接是否有效
function getUrlState(URL){
    var xmlhttp = new ActiveXObject('microsoft.xmlhttp');
    xmlhttp.open('GET',URL,false);
    try{
        xmlhttp.send();
    }catch(e){
    }finally{
        var result = xmlhttp.responseText;
        if(result){
            if(xmlhttp.STATUS_CODES==200){
                return true
            }else{
                return false
            }
        }else{
            return false
        }
    }
}

//25.原生javascript格式化CSS样式代码
function formatCss(s){//格式化代码
    s = s.replace(/\s*([\{\}\:\;\,])\s*/g, "$1");
    s = s.replace(/;\s*;/g, ";"); //清除连续分号
    s = s.replace(/\,[\s\.\#\d]*{/g, "{");
    s = s.replace(/([^\s])\{([^\s])/g, "$1 {\n\t$2");
    s = s.replace(/([^\s])\}([^\n]*)/g, "$1\n}\n$2");
    s = s.replace(/([^\s]);([^\s\}])/g, "$1;\n\t$2");
    return s;
}

//26.原生javascript压缩CSS代码
function yasuoCss (s) {//压缩代码
    s = s.replace(/\/\*(.|\n)*?\*\//g, ""); //删除注释
    s = s.replace(/\s*([\{\}\:\;\,])\s*/g, "$1");
    s = s.replace(/\,[\s\.\#\d]*\{/g, "{"); //容错处理
    s = s.replace(/;\s*;/g, ";"); //清除连续分号
    s = s.match(/^\s*(\S+(\s+\S+)*)\s*$/); //去掉首尾空白
    return (s == null) ? "" : s[1];
}
//27.原生javascript获取当前路径
var currentPageUrl = "";
if (typeof this.href === "undefined") {
    currentPageUrl = document.location.toString().toLowerCase();
}
else {
    currentPageUrl = this.href.toString().toLowerCase();
}

//28.原生javascript IP 转成整型
function _ip2int(ip){
    var num = 0;
    ip = ip.split('.')
    num = Number(ip[0])*256*256*256+Number(ip[1])*256*256+Number(ip[2])*256 + Number(ip[3]);
    num = num>>>0;//所有非数值转换成0,所有大于等于 0 数取整数部分

    return num;
}

//29.原生javascript整型解析成IP地址
function _int2iP(num){
    var str;
    var tt = new Array();
    tt[0] = (num >>> 24) >>> 0;
    tt[1] = ((num << 8) >>> 24) >>> 0;
    tt[2] = (num << 16) >>> 24;
    tt[3] = (num << 24) >>> 24;
    str = String(tt[0]) + "." + String(tt[1]) + "." + String(tt[2]) + "." + String(tt[3]);
    return str;
}

//30.原生javascript实现checkbox全选与不选
function checkAll(){
    var selectall = document.getElementById("selectall");
    var allbox = document.getElementsByName("allbox");
    if(selectall.checked){
        for(var i = 0;i<allbox.length;i++){
            allbox[i].checked = true;
        }
    }else{
        for(var i = 0;i<allbox.length;i++){
            allbox[i].checked = false;
        }
    }
}

//...............................移动篇..............................