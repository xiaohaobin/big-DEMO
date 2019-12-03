<template>
  <div class="row">
    <div class="col-sm-6">
      <h2>父组件组件模块</h2>
      <form class="form-horizontal">
          <div class="form-group">
            <label for="" class="col-sm-3">二级组件传输数据：</label>
            <div class="col-sm-9"><input type="text" class="form-control" placeholder="Search" v-model="child_content"></div>
          </div>
      </form>
      <p class="">我的弟弟说：{{title}}</p>
    </div>


    <div class="col-sm-6">
      <h2>子组件的组件模块</h2>
      <!-- <child-one :child-com="child_content" @getMessage="showMsg"></child-one> -->
      <child-one :childcom="child_content" @getMessage="showMsg"></child-one>
    </div>
  </div>
</template>

<script>
  //引入子组件
  import childOne from './pages/childOne'

  export default {
    components:{
      // childone:childOne
      childOne
    },
    name:"bigChild",//定义组件名
    data () {
      return {
          child_content:'弟弟，叫哥哥！',
          title:"没有蛀牙",
          child_data:[
            {id:1,name:"xxx"},
            {id:2,name:"yyy"},
          ],

      }
    },
    created() {

    },
    mounted() {

    },
    methods:{
      showMsg(title){
        this.title = title;
        console.log("更新子组件传过来的数据:",title);
      },
    },


  }
</script>

<style>
</style>
