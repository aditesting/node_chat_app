var isRealString = function(val){
	return (typeof(val) === 'string' && val.trim().length > 0)
}

module.exports = {
	isRealString
}