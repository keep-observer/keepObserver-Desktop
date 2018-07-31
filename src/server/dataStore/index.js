

var DataStoreServer = function(){
}


//设置长期数据
DataStoreServer.prototype.setLongData = function(key,value){
    window.localStorage.setItem(key,JSON.stringify(value))
}

//读取长期数据
DataStoreServer.prototype.getLongData= function(key){
    return JSON.parse(window.localStorage.getItem(key))
}

//清除长期数据
DataStoreServer.prototype.removeLongData = function(key,clearAll){
    if(!key && clearAll){
        window.localStorage.clear();
        return false;
    }
    window.localStorage.removeItem(key)
}




//设置会话数据
DataStoreServer.prototype.set= function(key,value){
    window.sessionStorage.setItem(key,JSON.stringify(value))
}

//读取会话数据
DataStoreServer.prototype.get = function(key){
    return JSON.parse(window.sessionStorage.getItem(key))
}

//清除会话数据
DataStoreServer.prototype.remove = function(key,clearAll){
    if(!key && clearAll){
        window.sessionStorage.clear();
        return false;
    }
    window.sessionStorage.removeItem(key)
}




export default new DataStoreServer();

