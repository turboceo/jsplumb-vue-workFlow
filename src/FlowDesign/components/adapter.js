export let whereStrItemAdapter = (item) => {
    item.T_FieldName = item.flag;
    // 对组织字段进行处理
    if (item.flag === "CompanyCode") {
        let T_Val = [
            item.CompanyCode ? "zuzhi=" + item.CompanyCode : "",
            item.Bumen ? "bumen=" + item.Bumen : "",
        ]
            .filter(Boolean)
            .join("&");
        console.log(`T_Val: ${T_Val}`);
        item.T_Val = T_Val;
    }
    return item;
};

/**
 * 节点适配器
 * @param {Object} item 
 * @returns 
 */
export let nodeAdapter = (item) => {
    item.T_FieldName = item.flag;
    // 对组织字段进行处理
    if (item.flag === "CompanyCode") {
        let T_Val = [
            item.CompanyCode ? "zuzhi=" + item.CompanyCode : "",
            item.Bumen ? "bumen=" + item.Bumen : "",
        ]
            .filter(Boolean)
            .join("&");
        console.log(`T_Val: ${T_Val}`);
        item.T_Val = T_Val;
    }
    return item;
};