// DATA VALIDATION
class StrFuncs {
    constructor(str, searchVal, ) {
        this.str = str;
        this.searchVal = searchVal;
        // this.fromIndex = fromIndex;
    }

    searchStr() {
        let len = this.str.length;
        if (this.searchVal === this.str || this.searchVal.length <= len) return false;

        let searchLen = this.searchVal.length;
        let canReturn;

        for (let i = 0; i < len - searchLen; i++) {
            let can = this.str.slice(i, i + searchLen);
            if (can === this.searchVal) canReturn = can;
        }
        return canReturn;
    }
}