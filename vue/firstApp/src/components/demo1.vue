<template>
  <div class="sectionContent">

    <div class="btn-group" role="group" aria-label="...">
         <button type="button" class="btn btn-default">
            <router-link :to="{name:'demoChild1'}" >demoChild1</router-link>
         </button>
         <button type="button" class="btn btn-default">
           <router-link :to="{name:'demoChild2'}" >demoChild2</router-link>
         </button>
         <button type="button" class="btn btn-default">
           <router-link :to="{name:'demoChild3'}" >demoChild3</router-link>
         </button>
    </div>

    <!-- Button trigger modal -->
    <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">
      Launch demo modal
    </button>

    <!-- Modal -->
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="myModalLabel">Modal title</h4>
          </div>
          <div class="modal-body">
            ...
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>

        <div class="childView">
         
             <router-view/>
         

        </div>


  </div>
</template>

<script>
  //引入静态资源文件
  import demo_data from '.././static/new_file';
  // console.log(demo_data);
   // import '.././router/demo1';

export default {

  data () {
    return {
        childrenSay: 'hello, parent',
        msg:"sssss"
    }
  },
  created() {

  }


}
</script>

<style>
</style>
