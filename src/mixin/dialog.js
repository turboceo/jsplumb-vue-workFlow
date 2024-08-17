const DiaglogMixin = {
    data() {
        return {
            dialogVideoVisible: true,
        };
    },

    methods: {
        handleConfirm(payload) {
            this.$emit("done", payload);
        },

        handleCancel() {
            this.$emit("cancel");
        },
    },
};

export default DiaglogMixin