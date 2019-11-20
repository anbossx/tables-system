
<template>
    <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" >
                    <div class="layout-logo"></div>
                    <div class="layout-nav">
                        <MenuItem v-for="(item,index) in headerList" :name="item.workline"  :key="index" :to="item.defaultPath" @click.native="getslider(item.workline)">
                             {{item.workline}}
                        </MenuItem>
                    </div>
                    <div class="layout-mgr">
                        <MenuItem name="1" to="/user/createTable"> <span><Icon type="ios-person" size="30" color="white"/></span>{{user}}</MenuItem>
                    </div>
                </Menu>
            </Header>
            <Layout>
                <Sider hide-trigger :style="{background: '#fff'}">
                    <Menu :theme="theme2" active-name='123460000' >
                        <bi-navslider :navList="navlist"  @onSelect="pageChange" ></bi-navslider>
                    </Menu>
                </Sider>

                <Layout :style="{padding: '0 24px 24px'}">
                    <Content :style="{ minHeight: '280px', background: '#fff'}">
                        <div v-for="item in pageDataList" :key="item.id" >
                          <component :is="item.component" :chartsConfig="item"></component>
                       </div>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>
<script>
    import {navtree,getnav} from 'components/common/util/util'

    export default {
        data(){
            return{
                theme2: 'light',
                activename:'',
                headerList:[],
                sliderList:[],
                pageDataList:[],
                user:'',
                navlist:[],
                userMsg:JSON.parse(localStorage.getItem("LoginMsg"))
            }
        },
        methods:{
              getchars(pageId){
                  let param={
                      lineserve:this.$route.path.split('/')[1],
                      page:pageId,
                  };
                this.axios.get('/pageData',{
                    params:param,
                }).then((response)=>{
                    let list=response.data.data;
                    this.pageDataList=list;

                })
              },


            pageChange(item){
                  this.getchars(item.id)
             },
            async getslider(line){

                this.sliderList=await getnav(this.userMsg.user,line);
                //递归形成树状数据结构
                let params={
                    data:this.sliderList,
                    parentId:0,
                    path:true
                };
                this.navlist=navtree(params);
            },
        },
        mounted(){
            // this.getchars();
            // this.$nextTick(function() {
            //     this.$refs.shop.updateOpened();
            //     this.activename=this.$route.path;
            //     this.$refs.shop.updateActiveName()
            //
            // });
        },
          created(){
            let userMsg=this.userMsg;
            this.user=userMsg.user.split('@')[0];
            this.headerList=userMsg.worksList;
             let line=this.$route.path.split('/')[1];
             this.getslider(line);

        }
    }
</script>
<style scoped>
  @import '../../assets/css/layout.css';
  .ivu-menu-vertical.ivu-menu-light:after {
      display: block;
  }
</style>