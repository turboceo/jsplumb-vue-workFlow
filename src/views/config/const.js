export const DEFAULT_FLOW_DATA = {
    nodeList: [
        {
            id: "58hcvdsbpgs000",
            type: "start",
            name: "开始",
            top: "180px",
            left: "180px",
            setInfoList: [
                {
                    whereStr: [
                        {
                            T_Operation: "",
                            T_Val: "",
                        },
                    ],
                    type: "selectByUser",
                    user: "",
                    role: "",
                },
            ],
        },
        {
            id: "4g8p1kpr9wq000",
            type: "node",
            name: "审批节点",
            top: "180px",
            left: "420px",
            setInfoList: [
                {
                    whereStr: [
                        {
                            T_Operation: "",
                            T_Val: "",
                        },
                    ],
                    type: "selectByUser",
                    user: "",
                    role: "",
                },
            ],
        },
        {
            id: "4dly1u357je000",
            type: "end",
            name: "结束",
            top: "180px",
            left: "695px",
            setInfoList: [
                {
                    whereStr: [
                        {
                            T_Operation: "",
                            T_Val: "",
                        },
                    ],
                    type: "selectByUser",
                    user: "",
                    role: "",
                },
            ],
        },
    ],
    lineList: [
        {
            from: "58hcvdsbpgs000",
            to: "4g8p1kpr9wq000",
            label: "连线名称",
            id: "8mphpw7u5oc00",
            Remark: "",
        },
    ],
};