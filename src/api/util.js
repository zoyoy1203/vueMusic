import _ from 'lodash'
const localStorage = window.localStorage;
export default{
	getLocalData(item){
		return _.isEmpty(JSON.parse(localStorage.getItem(item)))? null : JSON.parse(localStorage.getItem(item));
	},

	setLocalData(item,obj){
		localStorage.setItem(item, JSON.stringify(obj))   /*JSON.stringify() 方法将 JavaScript 对象转换为字符串*/
	}
}
