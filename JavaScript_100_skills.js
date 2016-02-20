/**
 * Created by blue on 2016/2/20.
 */

/*RegExp���캯����һ������Ϊ������ʽ���ı�����,����һ��������Ϊ��ѡ���־.��־�������ʹ��
?g ��ȫ�Ĳ��ң�
?i �����Դ�Сд��
?m �����в��ң�*/


//1.ԭ��javascriptʵ���ַ������Ƚ�ȡ
function cutstr(str,len){
    var temp;
    var icount = 0;
    var patrn = /[^\x00-\xff]/; //[^\x00-\xFF]��ʾƥ��Ascii�����255����Щ�ַ�
    var strre = "";
    for(var i = 0;i < str.length;i++){
        if(icount<len -1){
            temp = str.substr(i,1);//���ַ�������str�ĵ�i���ַ���ʼ,ȡ��һλ�ַ�
            if(patrn.exec(temp)==null){ //exec() �������ڼ����ַ����е�������ʽ��ƥ��
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

//2.ԭ��javascript��ȡ��������
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

//3.ԭ��javascript����ո�
String.prototype.trim = function(){
    var reExtraSpace = /^\s*(.*?)\s+$/;
    return  this.replace(reExtraSpace,"$1")//$1��$2��...��$99 	�� regexp �еĵ� 1 ���� 99 ���ӱ��ʽ��ƥ����ı���
}

//4.ԭ��javascript�滻ȫ��
String.prototype.replaceAll = function(s1,s2){
    return this.replace(new RegExp(s1,"gm"),s2)
    //g ִ��ȫ��ƥ�䣨��������ƥ��������ҵ���һ��ƥ���ֹͣ����
    //m ִ�ж���ƥ�䡣
}

//5.ԭ��javascriptת��html��ǩ
function HtmlEncode(text){
    return text.replace(/&/g, '&amp').replace(/\"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

//6.ԭ��javascript��ԭhtml��ǩ
function HtmlDecode(text){
    return text.replace(/&amp;/g, '&').replace(/&quot;/g, '\"').replace(/&lt;/g, '<').replace(/&gt;/g, '>')

}
//7.ԭ��javascriptʱ�����ڸ�ʽת��
Date.prototype.Format = function(formatStr) {
    var str = formatStr;
    var Week = ['��', 'һ', '��', '��', '��', '��', '��'];
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

//8.ԭ��javascript�ж��Ƿ�Ϊ��������
function isDigit(value){
    var patrn = /[0-9]*$/;
    if(patrn.exec(value)==null|| value==""){
        return false
    }else{
        return true
    }
}

//9.ԭ��javascript����cookieֵ
function setCookit(name,value,Hours){
    var d = new Date();
    var offset =8;
    var utc = d.getTime()+(d.getTimezoneOffset()*6000);
    //getTimezoneOffset() �����ɷ��ظ�������ʱ��ͱ���ʱ��֮���ʱ��Է���Ϊ��λ��
    var nd = utc + (3600000*offset);
    var exp = new Date(nd);
    exp.setTime(exp.getTime() + Hours * 60 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";path=/;expires=" + exp.toGMTString() + ";domain=360doc.com;"
    //toGMTString() �����ɸ��ݸ�������ʱ�� (GMT) �� Date ����ת��Ϊ�ַ����������ؽ����
}
//10.ԭ��javascript��ȡcookieֵ
function getCookie(name) {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return unescape(arr[2]);
    return null
}

//11.ԭ��javascript�����ղؼ�
function AddFavorite(sURL,sTitle){
    try{
        window.external.addFavorite(sURL,sTitle)
    }catch(e){
        try{
            window.sidebar.addPanel(sTitle,sURL,'')
        }catch(e){
            alert('�����ղؼ�ʧ�ܣ���ʹ��ctrl+d�������')
        }
    }
}
//12.ԭ��javascript������ҳ
function setHomepage() {
    if (document.all) {
        document.body.style.behavior = 'url(#default#homepage)';
        document.body.setHomePage('http://www.jq-school.com')
    } else if (window.sidebar) {
        if (window.netscape) {
            try {
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect")
            } catch (e) {
                alert("�ò�����������ܾ�����������øù��ܣ����ڵ�ַ�������� about:config,Ȼ���� signed.applets.codebase_principal_support ֵ��Ϊtrue")
            }
        }
        var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
        prefs.setCharPref('browser.startup.homepage', 'http://www.jq-school.com')
    }
}


//13.ԭ��javascript�ж�ie6
var ua = navigator.userAgent.toLowerCase();
var isIE6 = ua.indexOf('msie 6') > -1;//msie������ں�
if(isIE6){
    try{
        document.execCommand("BackgroundImageCache",false,true)
        //execCommand������ִ��һ���Ե�ǰ�ĵ�����ǰѡ����߸�����Χ�����
        //�ڶ������� �Ƿ���ʾ�Ի���
        //���������� ��̬����һ��Ϊһ����ֵ������ֵ����true
    }catch(e){ }
}

//14.ԭ��javascript������ʽ�ļ�
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

//15.ԭ��javascript���ؽű�����
function evalscript(s){
    if(s.indexOf('<script') == -1) return s;
    // indexOf() �����Դ�Сд���У�
    //���Ҫ�������ַ���ֵû�г��֣���÷������� -1
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

//16.ԭ��javascript����ű�����
function stripscript(s){
    return s.replace(/<script.*?>.*?<\/script>/ig, '');
}

//17.ԭ��javascript��̬���ؽű��ļ�
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

//18.ԭ��javascript����������汾����
function $(id){
    return !id ? null :��document.getElementById(id);
}
//19.ԭ��javascript����������汾����
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

//20.ԭ��javascriptԪ����ʾ��ͨ�÷���
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
//21.ԭ����javascript����insertBefore��������ȴû��inserAfter����
function insertAfter(newChild,refChild){
    var parElem = refChild.parentNode;
    if(parElem.lastChild == refChild){
        refChild.appendChild(newChild);
    }else{
        parElem.insertBefore(newChild,refChild.nextSibling);
    }
}

//22.ԭ��javascript�м����������Ԫ���¼�
function addEventSamp(obj,evt,fn){
    if(obj.addEventListener){
        obj.addEventListener(evt,fn,false);
    }else if(obj.attachEvent){
        obj.attachEvent('on'+evt,fn);
    }
}

//23.ԭ��javascript���ͣ�����ֺ��棬�ı����ý���ʱ����
function focuslast(){
    var e = event.srcElement;
    var r = e.createTextRange();
    r.moveStart('character', e.value.length);
    r.collapse(true);
    r.select();
}
//24.ԭ��javascript����URL�����Ƿ���Ч
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

//25.ԭ��javascript��ʽ��CSS��ʽ����
function formatCss(s){//��ʽ������
    s = s.replace(/\s*([\{\}\:\;\,])\s*/g, "$1");
    s = s.replace(/;\s*;/g, ";"); //��������ֺ�
    s = s.replace(/\,[\s\.\#\d]*{/g, "{");
    s = s.replace(/([^\s])\{([^\s])/g, "$1 {\n\t$2");
    s = s.replace(/([^\s])\}([^\n]*)/g, "$1\n}\n$2");
    s = s.replace(/([^\s]);([^\s\}])/g, "$1;\n\t$2");
    return s;
}

//26.ԭ��javascriptѹ��CSS����
function yasuoCss (s) {//ѹ������
    s = s.replace(/\/\*(.|\n)*?\*\//g, ""); //ɾ��ע��
    s = s.replace(/\s*([\{\}\:\;\,])\s*/g, "$1");
    s = s.replace(/\,[\s\.\#\d]*\{/g, "{"); //�ݴ���
    s = s.replace(/;\s*;/g, ";"); //��������ֺ�
    s = s.match(/^\s*(\S+(\s+\S+)*)\s*$/); //ȥ����β�հ�
    return (s == null) ? "" : s[1];
}
//27.ԭ��javascript��ȡ��ǰ·��
var currentPageUrl = "";
if (typeof this.href === "undefined") {
    currentPageUrl = document.location.toString().toLowerCase();
}
else {
    currentPageUrl = this.href.toString().toLowerCase();
}

//28.ԭ��javascript IP ת������
function _ip2int(ip){
    var num = 0;
    ip = ip.split('.')
    num = Number(ip[0])*256*256*256+Number(ip[1])*256*256+Number(ip[2])*256 + Number(ip[3]);
    num = num>>>0;//���з���ֵת����0,���д��ڵ��� 0 ��ȡ��������

    return num;
}

//29.ԭ��javascript���ͽ�����IP��ַ
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

//30.ԭ��javascriptʵ��checkboxȫѡ�벻ѡ
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

//...............................�ƶ�ƪ..............................