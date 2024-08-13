
export let getUserList = () => {
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

export let getRoleList = () => {
    return Promise.resolve([
        {
            label: "总经理",
            value: "99991111",
        },
        {
            label: "运营部长",
            value: "99992222",
        },
    ]);
}

export let getBumenList = () => {
    return Promise.resolve([
        {
            label: "行政部",
            value: "111",
        },
        {
            label: "销售部",
            value: "222",
        },
        {
            label: "研发部",
            value: "333",
        },
    ])
}

export let getZuzhiList = () => {
    return Promise.resolve([
        {
            label: "品易智联",
            value: "company-111",
        },
        {
            label: "测试公司",
            value: "company-222",
        }
    ])
}

export let getCustomList = () => {
    return Promise.resolve([
        {
            label: "消费金额",
            value: "c-01",
        },
        {
            label: "发票额",
            value: "c-02",
        }
    ])
}