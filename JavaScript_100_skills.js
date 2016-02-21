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

//..............................移动篇..............................
//原生javascript判断是否移动设备
function isMobile(){
    if (typeof this._isMobile === 'boolean'){
        return this._isMobile;
    }
    var screenWidth = this.getScreenWidth();
    var fixViewPortsExperiment = rendererModel.runningExperiments.FixViewport || rendererModel.runningExperiments.fixviewport;
    var fixViewPortsExperimentRunning = fixViewPortsExperiment && (fixViewPortsExperiment.toLowerCase() === "new");
    if(!fixViewPortsExperiment){
        if(!this.isAppleMobileDevice()){
            screenWidth = screenWidth/window.devicePixelRatio;
        }
    }
    var isMobileScreenSize = screenWidth < 600;
    var isMobileUserAgent = false;
    this._isMobile = isMobileScreenSize && this.isTouchScreen();
    return this._isMobile;
}

//32.原生javascript判断是否移动设备访问
function isMobileUserAgent(){
    return (/iphone|ipod|android.*mobile|windows.*phone|blackberry.*mobile/i.test(window.navigator.userAgent.toLowerCase()));
}

//33.原生javascript判断是否苹果设备访问
function isAppleMobileDevice(){
    return (/iphone|ipod|ipad|Macintosh/i.test(navigator.userAgent.toLowerCase()));
}

//34.原生javascript判断是否安卓设备访问
function isAndroidMobileDevice(){
    return (/android/i.test(navigator.userAgent.toLowerCase()));
}

//35.原生javascript判断是否Touch屏幕
function isTouchScreen(){
    return (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
}

//36.原生javascript判断是否在安卓上的谷歌浏览器
function isNewChromeOnAndroid(){
    if(this.isAndroidMobileDevice()){
        var userAgent = navigator.userAgent.toLowerCase();
        if((/chrome/i.test(userAgent))){
            var parts = userAgent.split('chrome/');

            var fullVersionString = parts[1].split(" ")[0];
            var versionString = fullVersionString.split('.')[0];
            var version = parseInt(versionString);

            if(version >= 27){
                return true;
            }
        }
    }
    return false;
}

//37.原生javascript判断是否打开视窗
function isViewportOpen() {
    return !!document.getElementById('wixMobileViewport');
    //!!就是将所有其他类型都转换成boolean型
    /*例：
    var o={flag:true};
    var test=!!o.flag;//等效于var test=o.flag||false;*/
}

//38.原生javascript获取移动设备初始化大小
function getInitZoom(){
    if(!this._initZoom){
        var screenWidth = Math.min(screen.height, screen.width);
        if(this.isAndroidMobileDevice() && !this.isNewChromeOnAndroid()){
            screenWidth = screenWidth/window.devicePixelRatio;
        }
        this._initZoom = screenWidth /document.body.offsetWidth;
    }
    return this._initZoom;
}

//39.原生javascript获取移动设备最大化大小
function getZoom(){
    var screenWidth = (Math.abs(window.orientation) === 90) ? Math.max(screen.height, screen.width) : Math.min(screen.height, screen.width);
    if(this.isAndroidMobileDevice() && !this.isNewChromeOnAndroid()){
        screenWidth = screenWidth/window.devicePixelRatio;
    }
    var FixViewPortsExperiment = rendererModel.runningExperiments.FixViewport || rendererModel.runningExperiments.fixviewport;
    var FixViewPortsExperimentRunning = FixViewPortsExperiment && (FixViewPortsExperiment === "New" || FixViewPortsExperiment === "new");
    if(FixViewPortsExperimentRunning){
        return screenWidth / window.innerWidth;
    }else{
        return screenWidth / document.body.offsetWidth;
    }
}

//40./原生javascript获取移动设备屏幕宽度
function getScreenWidth(){
    var smallerSide = Math.min(screen.width, screen.height);
    var fixViewPortsExperiment = rendererModel.runningExperiments.FixViewport || rendererModel.runningExperiments.fixviewport;
    var fixViewPortsExperimentRunning = fixViewPortsExperiment && (fixViewPortsExperiment.toLowerCase() === "new");
    if(fixViewPortsExperiment){
        if(this.isAndroidMobileDevice() && !this.isNewChromeOnAndroid()){
            smallerSide = smallerSide/window.devicePixelRatio;
        }
    }
    return smallerSide;
}
//...........移动结束............


//41.原生javascript完美判断是否为网址
function IsURL(strUrl) {
    var regular = /^\b(((https?|ftp):\/\/)?[-a-z0-9]+(\.[-a-z0-9]+)*\.(?:com|edu|gov|int|mil|net|org|biz|info|name|museum|asia|coop|aero|[a-z][a-z]|((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]\d)|\d))\b(\/[-a-z0-9_:\@&?=+,.!\/~%\$]*)?)$/i
    if (regular.test(strUrl)) {
        return true;
    }
    else {
        return false;
    }
}
//42.原生javascript根据样式名称检索元素对象
function getElementsByClassName(name){
    var tags = document.getElementsByTagName('*')||document.all;
    var els = [];
    for(var i = 0;i<tags.length;i++){
        if(tags[i].classList){
            var cs = tags[i].className.split(' ');
            for(var j = 0;j<cs.length;j++){
                if(name==cs[j]){
                    els.push(tags[i]);
                    break
                }
            }
        }
    }
    return els
}

//43.原生javascript判断是否以某个字符串开头
String.prototype.startWith = function(s){
    return this.indexOf(s)==0
}

//44.原生javascript判断是否以某个字符串结束
String.prototype.endWith = function(s){
    var d = this.length - s.length;
    return(d>=0 && this.lastIndexOf(s)==d)
}

//45.原生javascript返回IE浏览器版本号
function getIE(){
    if(window.ActiveXObject){
        var v =navigator.userAgent.match(/MSIE ([^;]+)/)[1];
        return parseFloat(v.substring(0, v.indexOf(".")))
    }
    return false
}

//46.原生javascript获取页面高度
function getPageHeight(){
    var g = document,
        a = g.body,
        f = g.documentElement,
        d = g.compatMode == 'BackCompat'? a : g.documentElement;
    return Math.max(f.scrollHeight, a.scrollHeight, d.clientHeight);
}
/*document.compatMode用来判断当前浏览器采用的渲染方式。

官方解释：

BackCompat：标准兼容模式关闭。
CSS1Compat：标准兼容模式开启。
当document.compatMode等于BackCompat时，浏览器客户区宽度是document.body.clientWidth；
当document.compatMode等于CSS1Compat时，浏览器客户区宽度是document.documentElement.clientWidth。*/

//47.原生javascript获取scrollLeft
function getPageScrollLeft(){
    var a = document;
    return a.documentElement.scrollLeft || a.body.scrollLeft;
}

//48.原生javascript获取页面可视宽度
function getPageViewWidth(){
    var d = document,
        a = d.compatMode == 'BackCompat'
        ? d.body : d.documentElement;
    return a.clientWidth;
}
//49.原生javascript获取页面宽度
function getPageWidth(){
    var g = document, a = g.body, f = g.documentElement, d = g.compatMode == "BackCompat"
        ? a
        : g.documentElement;
    return Math.max(f.scrollWidth, a.scrollWidth, d.clientWidth);
}

//50.原生javascript获取页面scrollTop
function getPageScrollTop(){
    var a = document;
    return a.documentElement.scrollTop || a.body.scrollTop;
}

//51.原生javascript获取页面可视高度
function getPageViewHeight() {
    var d = document, a = d.compatMode == "BackCompat"
        ? d.body
        : d.documentElement;
    return a.clientHeight;
}

//52.原生javascript跨浏览器添加事件
function addEvt(oTarget,sEvtType,fnHandle){
    if(!oTarget){return;}
    if(oTarget.addEventListener){
        oTarget.addEventListener(sEvtType,fnHandle,false);
    }else if(oTarget.attachEvent){
        oTarget.attachEvent("on"+sEvtType,fnHandle);
    }else{
        oTarget["on"+sEvtType] = fnHandle;
    }
}

//53.原生javascript跨浏览器删除事件
function addEvt(oTarget,sEvtType,fnHandle){
    if(!oTarget){return;}
    if(oTarget.addEventListener){
        oTarget.addEventListener(sEvtType,fnHandle,false);
    }else if(oTarget.attachEvent){
        oTarget.attachEvent("on"+sEvtType,fnHandle);
    }else{
        oTarget["on"+sEvtType] = null;
    }
}

//54.原生javascript去掉url前缀
function removeUrlPrefix(a){
    a= a.replace(/:/g,".").replace(/／/g,"/");
    while(trim(a).toLocaleLowerCase().indexOf("http://")==0){
        a = trim(a.replace(/http:\/\//i,""));
    }
    return a;
}

//55.原生javascript随机时间戳
function uniqueId(){
    var a = Math.random,b=parseInt;
    return Number(new Date()).toString()+b(10*a())+b(10*a())+b(10*a());
}
//56.原生javascript全角半角转换，icase:0全到半，1 半到全，其他不转化
function chgCase(sStr,iCase){
    if(typeof sStr != "string" || sStr.length <= 0 || !(iCase === 0 || iCase == 1)){
        return sStr;
    }
    var i,oRs=[],iCode;
    if(iCase){/*半->全*/
        for(i=0; i<sStr.length;i+=1){
            iCode = sStr.charCodeAt(i);
            if(iCode == 32){
                iCode = 12288;
            }else if(iCode < 127){
                iCode += 65248;
            }
            oRs.push(String.fromCharCode(iCode));
        }
    }else{/*全->半*/
        for(i=0; i<sStr.length;i+=1){
            iCode = sStr.charCodeAt(i);
            if(iCode == 12288){
                iCode = 32;
            }else if(iCode > 65280 && iCode < 65375){
                iCode -= 65248;
            }
            oRs.push(String.fromCharCode(iCode));
        }
    }
    return oRs.join("");
}

//57.原生加javascript确认是否键盘有效输入值
function checkKey(iKey){
    if(iKey == 32 || iKey == 229){return true;}/*空格和异常*/
    if(iKey>47 && iKey < 58){return true;}/*数字*/
    if(iKey>64 && iKey < 91){return true;}/*字母*/
    if(iKey>95 && iKey < 108){return true;}/*数字键盘1*/
    if(iKey>108 && iKey < 112){return true;}/*数字键盘2*/
    if(iKey>185 && iKey < 193){return true;}/*符号1*/
    if(iKey>218 && iKey < 223){return true;}/*符号2*/
    return false;
}

//58.原生javascript获取网页被卷去的位置
function getScrollXY(){
    return document.body.scrollTop ?{
        x:document.body.scrollLeft,
        y:document.body.scrollTop
    }:{
        x:document.documentElement.scrollLeft,
        y:document.documentElement.scrollTop
    }
}

//59.原生JavaScript另一种正则日期格式化函数+调用方法
Date.prototype.format = function(format){ //author: meizz
    var o = {
        "M+" : this.getMonth()+1, //month
        "d+" : this.getDate(),    //day
        "h+" : this.getHours(),   //hour
        "m+" : this.getMinutes(), //minute
        "s+" : this.getSeconds(), //second
        "q+" : Math.floor((this.getMonth()+3)/3),  //quarter
        "S" : this.getMilliseconds() //millisecond
    }
    if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
        (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)if(new RegExp("("+ k +")").test(format))
        format = format.replace(RegExp.$1,
            RegExp.$1.length==1 ? o[k] :
                ("00"+ o[k]).substr((""+ o[k]).length));
    return format;
}
alert(new Date().format("yyyy-MM-dd hh:mm:ss"));

//60.原生JavaScript时间个性化输出功能
/*
 1、< 60s, 显示为“刚刚”
 2、>= 1min && < 60 min, 显示与当前时间差“XX分钟前”
 3、>= 60min && < 1day, 显示与当前时间差“今天 XX:XX”
 4、>= 1day && < 1year, 显示日期“XX月XX日 XX:XX”
 5、>= 1year, 显示具体日期“XXXX年XX月XX日 XX:XX”
 */
function timeFormat(time){
    var date = new Date(time)
        , curDate = new Date()
        , year = date.getFullYear()
        , month = date.getMonth() + 1
        , day = date.getDate()
        , hour = date.getHours()
        , minute = date.getMinutes()
        , curYear = curDate.getFullYear()
        , curHour = curDate.getHours()
        , timeStr;

    if(year < curYear){
        timeStr = year +'年'+ month +'月'+ day +'日 '+ hour +':'+ minute;
    }else{
        var pastTime = curDate - date
            , pastH = pastTime/3600000;

        if(pastH > curHour){
            timeStr = month +'月'+ day +'日 '+ hour +':'+ minute;
        }else if(pastH >= 1){
            timeStr = '今天 ' + hour +':'+ minute +'分';
        }else{
            var pastM = curDate.getMinutes() - minute;
            if(pastM > 1){
                timeStr = pastM +'分钟前';
            }else{
                timeStr = '刚刚';
            }
        }
    }
    return timeStr;
}

//61.原生javascript解决offsetX兼容性问题
//针对火狐不支持offsetX/Y
// 针对火狐不支持offsetX/Y
function getOffset(e){
    var target = e.target, // 当前触发的目标对象
        eventCoord,
        pageCoord,
        offsetCoord;

    // 计算当前触发元素到文档的距离
    pageCoord = getPageCoord(target);

    // 计算光标到文档的距离
    eventCoord = {
        X : window.pageXOffset + e.clientX,
        Y : window.pageYOffset + e.clientY
    };

    // 相减获取光标到第一个定位的父元素的坐标
    offsetCoord = {
        X : eventCoord.X - pageCoord.X,
        Y : eventCoord.Y - pageCoord.Y
    };
    return offsetCoord;
}

function getPageCoord(element){
    var coord = { X : 0, Y : 0 };
    // 计算从当前触发元素到根节点为止，
    // 各级 offsetParent 元素的 offsetLeft 或 offsetTop 值之和
    while (element){
        coord.X += element.offsetLeft;
        coord.Y += element.offsetTop;
        element = element.offsetParent;
    }
    return coord;
}

//62.原生javascript常用的正则表达式
/*
//正整数
/^[0-9]*[1-9][0-9]*$/;
//负整数
/^-[0-9]*[1-9][0-9]*$/;
//正浮点数
/^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/;
//负浮点数
/^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/;
//浮点数
/^(-?\d+)(\.\d+)?$/;
//email地址
/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
//url地址
/^[a-zA-z]+://(\w+(-\w+)*)(\.(\w+(-\w+)*))*(\?\S*)?$/;
//年/月/日（年-月-日、年.月.日）
/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/;
//匹配中文字符
/[\u4e00-\u9fa5]/;
//匹配帐号是否合法(字母开头，允许5-10字节，允许字母数字下划线)
/^[a-zA-Z][a-zA-Z0-9_]{4,9}$/;
//匹配空白行的正则表达式
/\n\s*\r/;
//匹配中国邮政编码
/[1-9]\d{5}(?!\d)/;
//匹配身份证
/\d{15}|\d{18}/;
//匹配国内电话号码
/(\d{3}-|\d{4}-)?(\d{8}|\d{7})?/;
//匹配IP地址
/((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)/;
//匹配首尾空白字符的正则表达式
/^\s*|\s*$/;
//匹配HTML标记的正则表达式
< (\S*?)[^>]*>.*?|< .*? />;
*/

//63.原生javascript实现返回顶部的通用方法
//ceil() 方法执行的是向上取整计算,它返回的是大于或等于函数参数,并且与之最接近的整数。
function backTop(btnId) {
    var btn = document.getElementById(btnId);
    var d = document.documentElement;
    var b = document.body;
    window.onscroll = set;
    btn.style.display = "none";
    btn.onclick = function() {
        btn.style.display = "none";
        window.onscroll = null;
        this.timer = setInterval(function() {
                d.scrollTop -= Math.ceil((d.scrollTop + b.scrollTop) * 0.1);
                b.scrollTop -= Math.ceil((d.scrollTop + b.scrollTop) * 0.1);
                if ((d.scrollTop + b.scrollTop) == 0) clearInterval(btn.timer, window.onscroll = set);
            },
            10);
    };
    function set() {
        btn.style.display = (d.scrollTop + b.scrollTop > 100) ? 'block': "none"
    }
};
backTop('goTop');

//64.原生javascript获取url中的GET参数值
// 用法：如果地址是 test.htm?t1=1&t2=2&t3=3, 那么能取得：GET["t1"], GET["t2"], GET["t3"]
function get_get(){
    querystr = window.location.href.split('?');
    if(querystr[1]){
        GETs = querystr[1].split("&");
        GET = new Array();
        for(var i=0;i<GETs.length;i++){
            tmp_arr = GETs[i].split("=");
            key = tmp_arr[0];
            GET[key] = tmp_arr[1]
        }
    }
    return querystr[1];
}

//66.原生javascript实现全部取消选择通用方法
function checkall(form, prefix, checkall) {
    var checkall = checkall ? checkall : 'chkall';
    for(var i = 0; i < form.elements.length; i++) {
        var e = form.elements[i];
        if(e.type=="checkbox"){
            e.checked = form.elements[checkall].checked;
        }
    }
}

//67.原生javascript实现打开一个窗体通用方法
function openWindow(url,windowName,width,height){
    var x = parseInt(screen.width / 2.0) - (width / 2.0);
    var y = parseInt(screen.height / 2.0) - (height / 2.0);
    var isMSIE= (navigator.appName == "Microsoft Internet Explorer");
    if (isMSIE) {
        var p = "resizable=1,location=no,scrollbars=no,width=";
        p = p+width;
        p = p+",height=";
        p = p+height;
        p = p+",left=";
        p = p+x;
        p = p+",top=";
        p = p+y;
        retval = window.open(url, windowName, p);
    } else {
        var win = window.open(url, "ZyiisPopup", "top=" + y + ",left=" + x + ",scrollbars=" + scrollbars + ",dialog=yes,modal=yes,width=" + width + ",height=" + height + ",resizable=no" );
        eval("try { win.resizeTo(width, height); } catch(e) { }");
        win.focus();
    }
}
//68.原生javascript判断是否为客户端设备
function client(o){
    var b = navigator.userAgent.toLowerCase();
    var t = false;
    if (o == 'isOP'){
        t = b.indexOf('opera') > -1;
    }
    if (o == 'isIE'){
        t = b.indexOf('msie') > -1;
    }
    if (o == 'isFF'){
        t = b.indexOf('firefox') > -1;
    }
    return t;
}

//69.原生javascript判断是否为客户端设备
function client(o){
    var b = navigator.userAgent.toLowerCase();
    var t = false;
    if (o == 'isOP'){
        t = b.indexOf('opera') > -1;
    }
    if (o == 'isIE'){
        t = b.indexOf('msie') > -1;
    }
    if (o == 'isFF'){
        t = b.indexOf('firefox') > -1;
    }
    return t;
}

//69.原生JavaScript获取单选按钮的值
function get_radio_value(field){
    if(field&&field.length){
        for(var i=0;i<field.length;i++){
            if(field[i].checked){
                return field[i].value;
            }
        }
    }else {
        return ;
    }
}
/*checked 属性可设置或返回某个单选按钮是否被选中。
语法:
radioObject.checked=true|false
*/


//70.原生javascript获取复选框的值
function get_checkbox_value(field){
    if(field&&field.length){
        for(var i=0;i<field.length;i++){
            if(field[i].checked && !field[i].disabled){
                return field[i].value;
            }
        }
    }else {
        return;
    }
}