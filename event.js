// 封装事件的常用方法

var eventUtil={
	addHandler:function(element,type,handler){
		if(element.addEventListener){
			element.addEventListener(type,handler,false);
		}else if(element.attachEvent){
			element.attachEvent('on'+type,handler);
		}else{
			element['on'+type] = handler;
		}
	},
	removeHandler:function(element,type,handler){
		if(element.removeEventListener){
			element.removeEventListener(type,handler,false);
		}else if(element.detachEvent){
			element.detachEvent('on'+type,handler);
		}else{
			element['on'+type] = null;
		}
	},
	getEvent:function(event){
		return event? event:window.event;
	},
	getType:function(event){
		return event.type;
	},
	getElement:function(event){
		return event.target || event.srcElement;
	},
	stopProgation:function(event){
		if(event.stopProgation){
			event.stopProgation()；
		}else{
			event.cancleBubble=ture;
		}
	},
	preventDault:function(event){
		if(event.preventDault){
			event.preventDault();
		}else{
			event.returnValue=false;
		}
	}
}