export let whereStrFactory = () => {
    return {
        T_FieldName: "",
        T_Operation: "",
        T_Val: "",
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