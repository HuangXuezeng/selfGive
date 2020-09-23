<template>
  <div>
    <van-form @submit="addTeam" label-width="100">
      <van-field name="stepper" label="团队规模">
        <template #input>
          <van-stepper v-model="addForm.a8TDPYXX014" theme="round" button-size="22" disable-input />
        </template>
      </van-field>
      <van-field
        v-model.trim="addForm.a8TDPYXX015"
        name="继任者1"
        label="继任者1"
        placeholder="必填"
        :rules="[{ required: true, message: '请填写继任者1' }]"
      />
      <van-field
        readonly
        clickable
        name="picker"
        :value="addForm.a8TDPYXX016name"
        label="继任者1成熟度"
        placeholder="必填"
        @click="selectProficiency('a8TDPYXX016name')"
        :rules="[{ required: true, message: '请选择继任者1成熟度' }]"
      />
      <van-field v-model.trim="addForm.a8TDPYXX017" name="继任者2" label="继任者2" placeholder="选填" />
      <van-field
        readonly
        clickable
        name="picker"
        :value="addForm.a8TDPYXX018name"
        label="继任者2成熟度"
        placeholder="选填"
        @click="selectProficiency('a8TDPYXX018name')"
      />
      <van-field v-model.trim="addForm.a8TDPYXX019" name="继任者3" label="继任者3" placeholder="必填" />
      <van-field
        readonly
        clickable
        name="picker"
        :value="addForm.a8TDPYXX020name"
        label="继任者3成熟度"
        placeholder="选填"
        @click="selectProficiency('a8TDPYXX020name')"
      />
      <van-popup v-model="showPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          @confirm="onConfirm"
          @cancel="showPicker = false"
        />
      </van-popup>
      <choosedepartment @transferFa="selctdept" :Farequired="true" :opennode='addForm.a8TDPYXX013'></choosedepartment>
      <van-row type="flex" justify="center">
        <van-col span="8">
          <van-button
            type="primary"
            size="small"
            color="#fc5f10"
            style="font-size:16px"
            native-type="submit"
          >确认添加</van-button>
        </van-col>
        <van-col span="6">
          <van-button
            type="primary"
            size="small"
            color="#fc5f10"
            style="font-size:16px"
            @click="backHome"
          >取消</van-button>
        </van-col>
      </van-row>
    </van-form>
  </div>
</template>

<script>
import { Form, Toast, Notify } from "vant";
import chooseDepartment from "@/components/chooseDepartment.vue";
import { updateTeamBuildingInfo } from "./teamFosterApi";
export default {
  components: {
    choosedepartment: chooseDepartment
  },
  data() {
    return {
      stepper: 1,
      password: "",
      value: "",
      columns: ["立即可用", "一年可用", "两年可用", "三年可用"],
      showPicker: false,
      addForm: {
        a8TDPYXX014: 1, //团队规模
        a8TDPYXX015: "", //继任者1：
        a8TDPYXX016: "", //继任者1成熟度：
        a8TDPYXX016name: "",
        a8TDPYXX017: "", //继任者2：
        a8TDPYXX018: "", //继任者2成熟度：
        a8TDPYXX018name: "",
        a8TDPYXX019: "", //继任者3：
        a8TDPYXX020: "", //继任者3成熟度：
        a8TDPYXX020name: "",
        a8TDPYXX013Name: "", //团队所属机构：
        a8TDPYXX013: "",
        //测试用
        a0190: "9050104"
      },
      selecttype: "",
      selectNametype: ""
    };
  },
  created(){
    let sDatas = this.$route.params.sData
    this.addForm = sDatas
  },
  methods: {
    onConfirm(value) {
      for (let key in this.addForm) {
        if (key == this.selecttype) {
          this.addForm[key] = value;
          this.addForm[this.selectNametype] = this.toolsProficiency(value);
          break;
        }
      }
      this.showPicker = false;
    },
    selctdept(data) {
      this.addForm.a8TDPYXX013Name = data.content;
      this.addForm.a8TDPYXX013 = data.deptId;
    },
    //取消
    backHome() {
      this.$router.push({ name: "teamFoster" });
    },
    //下拉选择
    selectProficiency(type) {
      this.selecttype = type;
      if (type == "a8TDPYXX016name") {
        this.selectNametype = "a8TDPYXX016";
      } else if (type == "a8TDPYXX018name") {
        this.selectNametype = "a8TDPYXX018";
      } else if (type == "a8TDPYXX020name") {
        this.selectNametype = "a8TDPYXX020";
      }
      this.showPicker = true;
    },
    //添加团队
    addTeam() {
      this.addForm.flag = 2;
      updateTeamBuildingInfo(this.addForm).then(res => {
        if (res.code == "1000") {
          Notify({ type: "success", message: "添加成功" });
        } else {
          Toast.fail(res.msg);
        }
        this.$router.push({ name: "editTeamFoster" });
      });
    },
    //工具
    toolsProficiency(string) {
      switch (string) {
        case "立即可用":
          return "01";
          break;
        case "一年可用":
          return "02";
          break;
        case "两年可用":
          return "03";
          break;
        case "三年可用":
          return "04";
          break;
        default:
          return false;
          break;
      }
    }
  }
};
</script>

<style>
</style>
