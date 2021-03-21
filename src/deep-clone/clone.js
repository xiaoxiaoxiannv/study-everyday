let cache = []

function deepClone(source) {
    if (source instanceof Object) {
        let cacheResult = findCache(source)
        if (cacheResult) {
            return cacheResult
        } else {
            let result
            if (source instanceof Array) {
                result = new Array()
            } else if (source instanceof Function) {
                result = function () {
                    return source.apply(this, arguments)
                }
            } else {
                result = new Object()
            }
            cache.push([source,result])
            for (let key in source) {
                result[key] = deepClone(source[key])
            }
            return result
        }
    }
    return source
}

function findCache(source) {
    for (let i = 0; i < cache.length; i++) {
        if (cache[i][0] === source) {
            return cache[i][1]
        }
    }
}

module.exports = deepClone;