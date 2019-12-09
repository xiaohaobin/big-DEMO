<template>
  <div id="app">


    <!-- <img src="./assets/logo.png"> -->
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">Brand</a>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav">
            <li class="">
              <router-link to="/" exact>首页</router-link>
             </li>
            <li>
               <router-link to="/demo1">Go to demo1</router-link>
             </li>
            <li>
               <router-link to="/bigChild">父子组件通讯</router-link>
             </li>
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">同个页面不同参数 <span class="caret"></span></a>
              <ul class="dropdown-menu">
                <li v-for="(v,i) in child_data">
                  <router-link v-bind:to="v.path">{{v.id}}</router-link>
                </li>

               <li role="separator" class="divider"></li>
                <li>
                   <router-link to="/routerParam2/123/post/p123">/routerParam2/123/post/p123</router-link>
                 </li>
                <li>
                   <router-link to="/routerParam2/456/post/s456">/routerParam2/456/post/s456</router-link>
                 </li>
              </ul>
            </li>
          </ul>


          <ul class="nav navbar-nav navbar-right">
            <li>
              <router-link to="/i18">i18 国际化demo</router-link>
            </li>
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Lang <span class="caret"></span></a>
              <ul class="dropdown-menu">
                <li @click="switchLang('zh')"><a href="javascript:;">中文</a></li>      
                <li @click="switchLang('en')"><a href="javascript:;">English</a></li>                    
              </ul>
            </li>
          </ul>
        </div><!-- /.navbar-collapse -->
      </div><!-- /.container-fluid -->
    </nav>

     <div class="row" id="mainSection">
         <div class="col-sm-2 col-xs-12 mainNavBox">
          <!-- <main-nav></main-nav> -->
          <div class="list-group">
            <button type="button" class="list-group-item">Cras justo odio</button>
            <button type="button" class="list-group-item">Dapibus ac facilisis in</button>
            <button type="button" class="list-group-item">Morbi leo risus</button>
            <button type="button" class="list-group-item">Porta ac consectetur ac</button>
            <button type="button" class="list-group-item">Vestibulum at eros</button>
          </div>
         </div>
         <div class="col-sm-10 col-xs-12">
           <!-- transition引入，跳转加载有过度的动画 -->
           <!--路由视图标签 该组件标签必须存在，才可以使用 router-link 标签-->
           <transition :name="transitionName"> <router-view/></transition>
            <!-- <router-view/> -->
            <!--路由视图标签 该组件标签必须存在，才可以使用 router-link 标签-->
         </div>
     </div>



  </div>
</template>

<script>
// import $ from 'jquery';//引入最新node_modules中的动态资源，需要定义命名空间
import '../static/jquery.min';//引入静态资源，不需要定义命名空间
import '../static/lib/bootstrap/js/bootstrap.min'

//引入子组件
import mainNav from './components/nav'


export default {
  name: 'App',
  components:{
    mainNav
  },
  data () {
     return {
         child_content:'儿子，叫爸爸！',
         title:"没有蛀牙",
         child_data:[
           {id:"xhb",name:"xxx",path:"/routerParam/xhb"},
           {id:"flp",name:"yyy",path:"/routerParam/flp"},
           {id:"xyx",name:"zzz",path:"/routerParam/xyx"}
         ],
          transitionName:"slide-right"
     }
   },
   methods: {
       showMsg(title){
         this.title = title;
       },
       //切换语言
       switchLang(lang){
         this.$i18n.locale = lang;
       }
   },
   watch: {
     '$route' (to, from) {
       const toDepth = to.path.split('/').length
       const fromDepth = from.path.split('/').length
       this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
     }
   }
}
</script>

<!-- style 如加上scoped则其样式变成局部样式，不会影响其他组件 -->
<style>

@import "../static/lib/bootstrap/css/bootstrap.min.css";

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
/* router-link 选中状态class */
.router-link-active{
      background-color: #e7e7e7 !important;
}
.navbar.navbar-default{margin-bottom: 0;}
/* .mainNavBox{
  height: 100%;
  background: #00B3EE;
}
#mainSection{height: calc(100% - 52px);} */
</style>
