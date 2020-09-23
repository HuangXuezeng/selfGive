<template>
  <div>
    <van-form @submit="addTeam" label-width='100'>
      <van-field name="stepper" label="团队规模">
        <template #input>
          <van-stepper v-model="value" theme="round" button-size="22" disable-input />
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
        :value="addForm.a8TDPYXX016"
        label="继任者1成熟度"
        placeholder="必填"
        @click="selectProficiency('a8TDPYXX016')"
        :rules="[{ required: true, message: '请选择继任者1成熟度' }]"
      />
      <van-field v-model.trim="addForm.a8TDPYXX017" name="继任者2" label="继任者2" placeholder="选填" />
      <van-field
        readonly
        clickable
        name="picker"
        :value="addForm.a8TDPYXX018"
        label="继任者2成熟度"
        placeholder="选填"
        @click="selectProficiency('a8TDPYXX018')"
      />
      <van-field v-model.trim="addForm.a8TDPYXX019" name="继任者3" label="继任者3" placeholder="必填" />
      <van-field
        readonly
        clickable
        name="picker"
        :value="addForm.a8TDPYXX020"
        label="继任者3成熟度"
        placeholder="选填"
        @click="selectProficiency('a8TDPYXX020')"
      />
      <van-popup v-model="showPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          @confirm="onConfirm"
          @cancel="showPicker = false"
        />
      </van-popup>
      <choosedepartment @transferFa="selctdept"></choosedepartment>
      <van-row type="flex" justify="center">
      <van-col span="8"><van-button
          type="primary"
          size="small"
          color="#fc5f10"
          style="font-size:16px"
          native-type="submit"
        >确认添加</van-button></van-col>
      <van-col span="6"><van-button
          type="primary"
          size="small"
          color="#fc5f10"
          style="font-size:16px"
          @click="backHome"
        >取消</van-button></van-col>
    </van-row>
    </van-form>
  </div>
</template>

<script>
import { Form } from "vant";
import chooseDepartment from "@/components/chooseDepartment.vue";
import { updateTeamBuildingInfo } from './api'
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
        a8TDPYXX017: "", //继任者2：
        a8TDPYXX018: "", //继任者2成熟度：
        a8TDPYXX019: "", //继任者3：
        a8TDPYXX020: "", //继任者3成熟度：
        a8TDPYXX013Name: "", //团队所属机构：
        a8TDPYXX013: "",
      },
      selecttype:''
    };
  },
  methods: {
    onConfirm(value) {
      for(let i in this.addForm){
        
      }
      this.showPicker = false;
    },
    selctdept(data) {
      this.addForm.a8TDPYXX013Name = data.content;
      this.addForm.a8TDPYXX013 = data.deptId;
    },
    //取消
    backHome(){
        this.$router.push({name:'teamFoster'})
    },
    //下拉选择
    selectProficiency(type){
      this.selecttype = type
      this.showPicker = true
    },
    //添加团队
    addTeam(){
      this.addForm.flag = 2
      updateTeamBuildingInfo(this.addForm).then((res) =>{
        debugger
        this.$router.push({name:'teamFoster'})
      })
    }
  }
};
</script>

<style>
</style>
