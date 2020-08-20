<template>
  <div class="list">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      v-show="show"
      class="show"
      @confirm="confirm"
      @cancel="cancel"
    />
    <div class="toFixed">
      <span
        :class="activieIndex==index?'active':''"
        v-for="(item,index) in common"
        :key="index"
        @click="change(item,index)"
      >{{item.val}}</span>
      <span>生成时间</span>
      <span @click="add">添加</span>
      <span class="choose" @click.capture="choose()">
        筛选
        <span class="choose1" v-show="chooseShow">
          <i @click.stop="show=true">按时间选择</i>
          <i @click.stop='choosePhone=true'>按姓名手机号选择</i>
        </span>
      </span>
    </div>
    <van-dialog v-model="showAdd" title="添加账单" show-cancel-button @confirm="confirmAdd">
      <van-field name="radio" label="收入或支出">
        <template #input>
          <van-radio-group v-model="radio" direction="horizontal">
            <van-radio name="1">收入</van-radio>
            <van-radio name="2">支出</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field v-model="value" label="金额" placeholder="请输入金额" />
      <van-field v-model="phone" label="手机号" placeholder="请输入手机号" />
      <van-field v-model="name" label="姓名" placeholder="请输入欠款人姓名" />
    </van-dialog>

    <div class="listTitle" v-for="(item,index) in list" :key="index">
      <div class="inner">
        <p>{{item.type=='1'?'欠款人姓名:'+item.name:'收款人姓名:'}}</p>
        <p>手机号：{{item.phone}}</p>
        <p style="font-weight:bold">
          金额：
          <span
            style="color:black;font-weight:bold"
          >{{item.type=='1'?'+'+item.money:'-'+item.money}}元</span>
        </p>
        <p>创建时间:{{item.createTime}}</p>
      </div>
      <van-switch v-model="item.checked" active-color="#07c160" inactive-color="#ee0a24" @change="switchChange(item)" />
    </div>
    <p class="right">总计{{total}}元</p>



     <van-dialog v-model="choosePhone" title="手机号用户名选择" show-cancel-button @confirm="confirmChoose()">
      <van-field v-model="seachPhone" label="手机号" placeholder="请输入手机号" />
      <van-field v-model="seachName" label="姓名" placeholder="请输入欠款人姓名" />
    </van-dialog>
  </div>
</template>

<script>
import { addZd, getList ,updata} from "@/api/zd";
export default {
  data() {
    return {
      show: false, //日期的显示
      showAdd: false, //添加的显示
      currentDate: "",
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2030, 0, 31),
      radio: "1", //1是收入 2是支出
      value: "", //金额
      list: [],
      common: [
        { val: "收入", type: "1" },
        { val: "支出", type: "2" },
      ],
      activieIndex: 0,
      total: 0, //合计金额
      phone: "", //添加的姓名
      name: "",
      chooseShow:false, //筛选的下拉显示
      choosePhone:false, //筛选用户名和姓名的
      seachPhone:'', //搜索姓名
      seachName:"",
      type:'1'

    };
  },
  created() {
    this.getList({ type: this.type ,createTime:this.currentDate,phone:this.seachPhone,name:this.seachName });
  },
  methods: {
    confirm(val) {
      //时间选则确认
      console.log(val);
      this.currentDate=val
      this.show = false;
      this.getList({ type: this.type ,createTime:this.currentDate,phone:this.seachPhone,name:this.seachName });
    },
    cancel() {
      //时间选择取消
      this.show = false;
    },
    add() {
      this.showAdd = true;
    },
    async confirmAdd() {
      //账单添加确认
      var reg = /^[0-9]*$/;
      if (!reg.test(Number(this.value))) {
        this.$toast.fail("请输入正确的金额");
      } else {
        const res = await addZd({
          type: this.radio,
          money: this.value,
          checked: 0,
          phone: this.phone,
          name: this.name,
        });
        console.log(res);
        if (res.code == 200) {
          this.$toast.success("添加成功");
        }
      }
    },
    async getList(params) {
      const res = await getList(params);
      console.log(res);
      this.total= 0
      res.data.forEach((item) => {
        this.total += parseInt(item.money);
        if (item.checked == 0) {
          item.checked = false;
        } else {
          item.checked = true;
        }
      });
      this.list = res.data;
    },
    change(item, index) {
      this.type=item.type
      this.activieIndex = index;
      this.getList({ type: item.type ,createTime:this.currentDate,phone:this.seachPhone,name:this.seachName });
    },
    choose(){
      this.chooseShow=!this.chooseShow
    },
     confirmChoose(){ //姓名手机号的筛选

      this.getList({ type: this.type ,createTime:this.currentDate,phone:this.seachPhone,name:this.seachName });
  },
 async switchChange(item){
    console.log(item)
    const res  = await updata({checked:item.checked?'1':'0',id:item.id})
  }
  },
 
};
</script>


<style lang="scss" scoped>
.list {
  box-sizing: border-box;
  padding-top: 10px;
  .toFixed {
    display: flex;
    align-content: center;
    justify-content: space-around;
    span {
      padding: 5px;
      width: 15%;
      background: #cccccc;
    }
    .active {
      background: #1e90ff;
    }
  }
  .show {
    position: fixed;
    width: 100%;
    bottom: 60px;
    left: 0;
    z-index: 111;
  }
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .block {
    width: 120px;
    height: 120px;
    background-color: #fff;
  }
  .right {
    padding: 0 10px;
    text-align: right;
    font-size: 25px;
    font-weight: bold;
  }
  .listTitle {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: #1e90ff;
    margin: 0 10px;
    box-sizing: border-box;
    margin-top: 10px;
    span {
      color: white;
      font-size: 14px;
    }
    .inner {
      width: 80%;
      p {
        text-align: left;
        font-size: 13px;
        color: white;
      }
    }
  }
  .choose {
    position: relative;
    .choose1 {
      position: absolute;
      width: 200px;
      background: white;
      left: -140px;
      z-index: 100;
      top: 30px;
      i {
        display: block;
        width: 100%;
        text-align: left;
        font-size: 16px;
        margin-top: 5px;
      }
    }
  }
}
</style>