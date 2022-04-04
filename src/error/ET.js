
class ET {  //ErrorType
    constructor(code, message, result) {
        this.code = code;
        this.message = message || '';
        this.result = result || '';
    }
}

// 导出ET
module.exports = ET;