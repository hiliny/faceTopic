/**
 * 深拷贝函数 
 */

function deepClone(obj){
	var _toString = Object.prototype.toString;
	if(!obj || typeof obj !=="object"){
		return obj;
	}
	//DOM node
	if(obj.nodeType && 'cloneNode' in obj){
		return obj.cloneNode(true);
	}
	//date
	if(_toString.call(obj) === "[object Date]"){
		return new Date(obj.getTime());
	}
	//regexp 
	if(_toString.call(obj) === "[object RegExp]"){
		var flag = [];
		if(obj.global){
			flag.push('g');
		}
		if(obj.multiline){
			flag.push('m');
		}
		if(obj.ignoreCase){
			flag.push('i');
		}
		return new RegExp(obj.source,flag.join(''));
	}
	var result = Array.isArray(obj)?[]:obj.constructor?new obj.constructor():{};
	for(var key in obj){
		result[key] = deepClone(obj[key]);
	}
	return result;
}

//去掉字符串中出现次数最少的字符
function clearMinChar(str){
	var tmp = {},min = 0,minChar = '';
	var minKey = [],tmpExp = null;
	if(typeof str !== "string" || !str){
		return str;
	}
	for(var i=0,len=str.length;i<len;i++){
		if(!tmp[str[i]]){
			tmp[str[i]] = 1;
		}else{
			tmp[str[i]] += 1;
		}
	}
	min = tmp[str[0]];
	for(var key in tmp){
		if(tmp.hasOwnProperty(key)){
			if(tmp[key]<= min){
				min = tmp[key];
				minChar = key;
			}
		}
	}
	for(key in tmp){
		if(tmp[key] == min){
			minKey.push(key);
		}
	}
	for(i=0,len=minKey.length;i<len;i++){
		tmpExp = new RegExp(minKey[i],"g");
		str = str.replace(tmpExp,"");
	}
	return str;
}

console.log(clearMinChar("abcdefghabcdef"))

