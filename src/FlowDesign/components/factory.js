export let whereStrFactory = () => {
    return {
        flag: "",
        T_FieldName: "",
        T_Operation: "",
        T_Val: "",
        CompanyCode_Options: [],
        Bumen_Options: [],
    };
};

export let shenpiObjFactory = () => {
    return {
        jop: "",
        NodeName: "",
        // 默认审批人按用户选择
        type: "selectByUser",
        user: [],
        role: [],
        userOptions: [],
        roleOptions: [],
    }
}

export let ruleFormFactory = () => {
    return {
        id: "",
        name: "",
        type: "",
        shenpi: shenpiObjFactory(),
        // whereStr: [whereStrFactory()],
        whereStr: []
    }
}