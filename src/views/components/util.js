const cache = {};
import to from 'await-to-js'

export let fetchDataWithCache = async (apiName, apiPromise, adapter) => {
    console.log('log apiName: ', apiName)
    if (cache[apiName]) {
        console.log("Returning cached data");
        return cache[apiName];
    }
    let [err, res] = await to(apiPromise)
    if (err) {
        console.log('请求失败')
        return
    }
    cache[apiName] = res; // 将结果存储在缓存中
    return res;
}