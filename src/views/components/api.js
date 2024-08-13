
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

export let getBumenList = 90 + .