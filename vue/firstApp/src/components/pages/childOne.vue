<template>
  <div id="box">
     <form class="form-horizontal">
        <div class="form-group">
          <label for="" class="col-sm-3">三级组件传输数据：</label>
          <div class="col-sm-9"><input type="text" class="form-control" placeholder="" v-model="sayToParent" @keyup="updatePD"></div>

        </div>
     </form>


      <div>
        <span>老大哥说：</span>
      <!-- {{childCom}} -->
       {{childcom}}
      </div>
  </div>
</template>

<script>
  export default {
    name: 'childOne',
    // props:['childCom'],
    props:['childcom'],
    data () {
      return {
          childrenSay: 'hello, parent',
          msg:"sssss",
          sayToParent:"老哥你说啥？"
      }
    },
    created() {

    },
    mounted() {
      this.$emit('getMessage',this.sayToParent);
    },
    methods:{
      updatePD(){
        console.log(this.sayToParent);
         this.$emit('getMessage',this.sayToParent);
      }
    },
    watch:{
      childcom:function(){
        console.log("更新父组件传过来的数据:",this.childcom);
      }
    }

  }
</script>

<style scoped="scoped">
  /* #box{border: 1px solid #ddd;} */
</style>
