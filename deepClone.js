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
/*函数 柯里化的 应用*/
function add() {
    // 第一次执行时，定义一个数组专门用来存储所有的参数
    var _args = [].slice.call(arguments);
    // 在内部声明一个函数，利用闭包的特性保存_args并收集所有的参数值
    var adder = function () {
        var _adder = function() {
            [].push.apply(_args, [].slice.call(arguments));
            return _adder;
        };
        // 利用隐式转换的特性，当最后执行时隐式转换，并计算最终的值返回
        _adder.toString = function () {
            return _args.reduce(function (a, b) {
                return a + b;
            });
        }
        return _adder;
    }
    return adder.apply(null, [].slice.call(arguments));
}
// 输出结果，可自由组合的参数
console.log(add(1, 2, 3, 4, 5));

