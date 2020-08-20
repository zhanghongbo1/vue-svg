<template>
  <div class="selet">
    <div class="search" @click="changeShow()">
      <img class="show" src="./up.png" v-if="show" alt />
      <img class="show" src="./down.png" v-else alt />
      <span class="choose" v-for="(item,index) in choose" :key="index">
        <span>{{item.imnick}}&lt;{{item.immcode}}>{{item.pos_name}}</span>
        <span class="xxx" @click.stop="deleteItem(item)">x</span>
      </span>
      <input
        type="text"
        ref="input"
        v-model="title"
        @input="change()"
        :placeholder="newplaceholder"
        @keyup.delete="deleteOne()"
        @keyup.enter="enter()"
        @keyup.up="up()"
        @keyup.down="down()"
      />
      <div class="inner" v-show="show">
        <p
          v-for="(item,index) in newData"
          :key="index"
          @click.stop="chooseItem(item,index)"
          :class="index==newIndex?'color':''"
          @mouseenter.stop="into(item,index)"
        >
          <span>{{item.imnick}}&lt;{{item.immcode}}>{{item.pos_name}}</span>
          <img v-show="item.show" class="gou" src="./gou.png" alt />
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import PinyinMatch from "pinyin-match";
export default {
  name: "selet",
  props: {
    data: {
      type: Array,
      require: true,
    },
    placeholder: {
      type: String,
    },
  },
  data() {
    return {
      title: "", //输入的文字
      show: false, //显示向上和向下
      newList: [], //用于拼接传入的值组成数组用于拼音搜索的值
      newData: [], //把父组件出入的值重新赋值方便拼音搜索重新赋值
      choose: [], //标签数组
      newplaceholder: "",
      newIndex: "", //鼠标移入的索引
      newItem: "",
      falg: true,
      delFlag: false,
    };
  },
  created() {
    this.newplaceholder = this.placeholder;

    this.newData = this.data; //把父组件出入的值重新赋值方便拼音搜索
    this.data.forEach((item) => {
      //拼接传入的值组成数组用于拼音搜索的值，因为要匹配所有的
      this.newList.push(item.imnick + item.immcode + item.pos_name);
    });
  },
  mounted() {
    document.querySelector(".inner").style.top =
      document.querySelector(".search").offsetHeight + "px"; //定位高度是自适应的 动态获取高度
  },
  methods: {
    change() {
      //搜索
      if(this.title!=""){
        this.delFlag = false;
      }
      this.show = true; //输入内容下面就显示
      let arr = [];
      this.newList.forEach((item, index) => {
        if (PinyinMatch.match(item, this.title)) {
          arr.push(index); //取到符合拼音搜索符合条件该项的索引组成的数组
        }
      });
      let arr2 = [];
      arr.forEach((item, index) => {
        arr2.push(this.data[item]); //取到符合条件的数组
      });
      this.newData = arr2; //对渲染的数组重新赋值
    },
    chooseItem(item, index) {
      //选择
      // alert(1)
      this.newplaceholder = "";
      item.show = !item.show;
      if (item.show) {
        this.choose.push(item); //选中的数组
      } else {
        let index = this.choose.indexOf(item); //取到选中的数组
        this.choose.splice(index, 1); //删除点击的这一项
      }
      this.$nextTick(() => {
        document.querySelector(".inner").style.top =
          document.querySelector(".search").offsetHeight + "px"; //定位高度是自适应的 动态获取高度
        this.$refs.input.focus();
      });
      this.$emit("hasChoose", this.choose); //暴露选中的数组
    },
    changeShow() {
      //下拉框的显示和隐藏
      this.show = !this.show;
      this.$refs.input.focus();
    },
    deleteItem(item) {
      item.show = false; //删除的钩去除
      let index = this.choose.indexOf(item); //取到选中的数组
      this.choose.splice(index, 1); //删除点击的这一项
      if (this.choose.length == 0) {
        //删除玩 placeholder显示
        this.newplaceholder = this.placeholder;
      }
      this.$nextTick(() => {
        document.querySelector(".inner").style.top =
          document.querySelector(".search").offsetHeight + "px"; //定位高度是自适应的 动态获取高度
        this.$refs.input.focus();
      });
      this.$emit("hasChoose", this.choose); //暴露选中的数组
    },
    into(item, index) {
      if (this.falg) {
        //防抖节流
        this.falg = false;
        this.newIndex = index;
        this.newItem = this.newData[index];
        console.log(this.newIndex, "in");
        this.falg = true;
      }
    },
    deleteOne() {
      //按下删除键盘
      console.log(this.delFlag)
      if (this.delFlag) {
        if (this.choose.length > 0) {
          let index = this.newData.indexOf(this.choose[this.choose.length - 1]);
          this.newData[index].show = false;
          this.choose.splice(this.choose.length - 1, 1);
        }
        this.$nextTick(() => {
          document.querySelector(".inner").style.top =
            document.querySelector(".search").offsetHeight + "px"; //定位高度是自适应的 动态获取高度
          this.$refs.input.focus();
        });
      }
        if (this.title == "") {
        this.delFlag = true;
      } else {
        this.delFlag = false;
      }
    },
    enter() {
      //回车事件
      this.chooseItem(this.newData[this.newIndex], this.newIndex);
    },
    up() {
      //向上
      this.newIndex--;
      if (this.newIndex < 0) {
        this.newIndex = this.newData.length - 1;
      }
      console.log(this.newIndex, "up");
    },
    down() {
      //向下
      this.newIndex++;
      if (this.newIndex > this.newData.length - 1) {
        this.newIndex = 0;
      }
    },
  },
};
/**
 * 使用说明：
 * 图片文件
 * 请先引入pinyin-match      npm install pinyin-match --save
 * import selet from "@/components/selet/index";
 * <selet :data='list' @hasChoose='choose' ref='select'  :placeholder='placeholder'></selet>
 *  data传入的数据  placeholder默认文字
 * 取到选中数组的方法：
 * choose(val){
      console.log(val) val是选中数组 或者console.log(this.$refs.select.choose,'this.$refs.select.choose') this.$refs.select.choose,'this.$refs.select.choose'也是选中数组
      
    }
 * 
 * 
 * 
 * 
 */
</script>


<style lang="scss" scoped>
.selet {
  width: 100%;

  .search {
    width: 100%;
    position: relative;
    box-sizing: border-box;
    border: 1px solid #cccccc;
    min-height: 20px;
    text-align: left;
    padding-right: 10px;
    input {
      // position: absolute;
      // left: 0;
      // top: 0;
      // width: 100%;
      // height: 100%;
      border: none;
      outline: none;
      // box-sizing: border-box;
      // z-index: 0;
    }
    .show {
      position: absolute;
      right: 0;
      width: 18px;
      height: 18px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .inner {
    position: absolute;
    // min-height: 100px;
    width: 100%;
    border: 1px solid #cccccc;
    box-sizing: border-box;
    // border-radius: 10px;
    left: 0;

    p {
      font-size: 16px;
      text-align: left;
      padding-bottom: 10px;
      color: #cccccc;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    p:hover {
      color: #87cefa;
    }
    .gou {
      width: 16px;
      height: 16px;
    }
  }
  .choose {
    display: inline-block;
    height: 20px;
    background: #cccccc;
    border-radius: 4px;
    margin-right: 5px;
    margin-bottom: 5px;
    position: relative;
    z-index: 11;
    .xxx {
      width: 20px;
      height: 20px;
      line-height: 20px;
      display: inline-block;
      text-align: center;
      background: gray;
      border-radius: 50%;
    }
    // .xxx:hover {
    //   color: white;
    //   cursor: pointer;
    // }
  }
  .color {
    color: #87cefa !important;
  }
}
</style>