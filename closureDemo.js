(function(
 var _userId=23492;
 var _typeId='item';
 var export={};

 function converter(userId){
 	return + userId;
 }

 export.getUserId=function(){
 	return converter(_userId);
 }
 export.getTypeId=function(){
 	return _typeId;
 }
 window.export=export;
	){}());


export.getTypeId();
export.getUserId();