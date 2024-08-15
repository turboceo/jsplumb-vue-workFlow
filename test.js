let _ = require('lodash')
const async = require('async');

// 一个示例异步函数
function universalApiPromiseHandler(cacheKey, apiPromise, callback) {
    console.log('===> Execute')
    apiPromise.then(res => {
        callback(null, res);
    }).catch((err) => {
        callback(err)
    })
}

// 使用 hasher 函数进行缓存键的计算
const memoizedFunction = async.memoize(universalApiPromiseHandler, (cacheKey) => {
    console.log(`===> cacheKey: ${cacheKey}`)
    return cacheKey;
});

let getUserList = (userId) => {
    console.log(`===> User Id: ${userId}`)
    return Promise.resolve([
        {
            label: "钟生",
            value: "00001111",
        },
        {
            label: "李生",
            value: "00002222",
        },
    ]);
}

memoizedFunction('getCustomList_12348888', _.curry(getUserList)(12348888), (err, result) => {
    if (err) {
        console.log(err)
        return
    }
})

memoizedFunction('getCustomList_12349999', _.curry(getUserList)(12349999), (err, result) => {
    if (err) {
        console.log(err)
        return
    }
})

memoizedFunction('getCustomList_12348888', _.curry(getUserList)(12348888), (err, result) => {
    if (err) {
        console.log(err)
        return
    }
})

memoizedFunction('getCustomList_12348888', _.curry(getUserList)(12348888), (err, result) => {
    if (err) {
        console.log(err)
        return
    }
})