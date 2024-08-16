export let whereStrItemAdapter = (item) => {
    let obj = {
        T_FieldName: item.CompanyCode,
        T_Operation: item.T_Operation,
        T_Val: item.T_Val,
    }
    debugger
    return obj;
};