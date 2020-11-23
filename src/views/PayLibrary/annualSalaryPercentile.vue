<template>
    <div>
        <payTab ref="payTab"></payTab>
    </div>
</template>

<script>
    import {
        Picker,
        Toast,
        DropdownMenu,
        DropdownItem,
        Col,
        Row,
        DatetimePicker,
        Popup,
        Checkbox,
        CheckboxGroup,
        Notify,
        Overlay
    } from "vant";
    import payTab from "@/components/PayLibrary/pay-tab.vue";
    import {
        findFwValueInfo,
        findPayrollDept
    } from "@/views/PayLibrary/PayLibrary.js";
    import noData from "@/components/noData.vue";
    import chooseDepartment from "@/components/chooseDepartment.vue";
    export default {
        components: {
            payTab,
            noData,
            choosedepartment: chooseDepartment
        },
        data() {
            return {};
        },
        created() {},
        mounted() {
            this.$refs.payTab.changtab('annualSalaryPercentile')
        },
        methods: {}
    };
</script>

<style lang="stylus">
    .shodowRewards {
        box-shadow: rgba(100, 101, 102, 0.12) -9px 5px 60px -10px;
    }

    .titleRewards {
        font-size: 18px;
        font-weight: 700;
        margin-top: 20px;
        color: red;
    }

    .honghe {
        width: 10px;
        height: 15px;
        display: inline-block;
        background-color: red;
    }

    .labelStyle {
        color: red;
    }

    .mClass {
        background-color: #FFEBCD;
    }

    .pClass {
        background-color: #FFDEAD;
    }

    .sClass {
        background-color: #FFEBCD;
    }

    .oClass {
        background-color: #FFDEAD;
    }

    .heClass {
        background-color: #FFEBCD;
    }

    .titleclass {
        background-color: #dc7272;
        color: #ffffff;
    }
</style>
