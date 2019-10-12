
<template>
    <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" >
                    <div class="layout-logo"></div>
                    <div class="layout-nav">
                        <MenuItem v-for="(item,index) in headerList" :name="item.name"  :key="index" :to="item.defaultPath" @click.native="getslider(item.name)">
                             {{item.name}}
                        </MenuItem>
                    </div>
                    <div class="layout-mgr">

                        <MenuItem name="1" to="/user/createTable"> <span><Icon type="ios-person" size="30" color="white"/></span>{{user}}</MenuItem>

                    </div>

                </Menu>
            </Header>
            <Layout>
                <Sider hide-trigger :style="{background: '#fff'}">
                    <Menu  :active-name="activename"  ref="shop">
                        <Submenu v-for="(value,key) in sliderList" :name="key" :key="key" v-if="Array.isArray(value)">
                            <template slot="title">
                            <Icon type="ios-paper" />
                              {{key}}
                            </template>
                            <Submenu v-for="(valueOne,keyOne) in value[0]" :key="keyOne" :name="keyOne" v-if="Array.isArray(valueOne)">
                                <template slot="title">
                                    <Icon type="ios-paper" />
                                    {{keyOne}}
                                </template>
                                <MenuItem v-for="(valueTwo) in valueOne[0]" :key="valueTwo.path" :name="valueTwo.path" :to="valueTwo.path" @click.native="getchars">{{valueTwo.name}}</MenuItem>
                            </Submenu>
                            <MenuItem :name="valueOne.path" v-else :to="valueOne.path" @click.native="getchars">{{valueOne.name}}</MenuItem>
                        </Submenu>
                        <MenuItem  :name="value.path" v-else :to="value.path" @click.native="getchars">{{value.name}}</MenuItem>

                    </Menu>
                </Sider>



                <Layout :style="{padding: '0 24px 24px'}">
                    <!--<Breadcrumb :style="{margin: '24px 0'}">-->
                        <!--<BreadcrumbItem>Home</BreadcrumbItem>-->
                        <!--<BreadcrumbItem>Components</BreadcrumbItem>-->
                        <!--<BreadcrumbItem>Layout</BreadcrumbItem>-->
                    <!--</Breadcrumb>-->
                    <Content :style="{ minHeight: '280px', background: '#fff'}">
                       <!--<div id="main" style="width: 500px;height: 500px;background-color: bisque"></div>-->
                        <div v-for="item in pageDataList" >
                          <component :is="item.component" :chartsConfig="item"></component>
                       </div>

                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>
<script>
    export default {
        data(){
            return{
               activename:'',
               headerList:[],
               sliderList:[],
                pageDataList:[],
               user:'',

            }
        },
        methods:{
              getchars(){
                  let param={
                      lineserve:this.$route.path.split('/')[1],
                      page:this.$route.path.split('/')[2],
                  };
                this.axios.get('/pageData',{
                    params:param,
                }).then((response)=>{
                    let list=response.data.data;
                    this.pageDataList=list;

                })
              },
             getData(){
                 return new Promise((res)=>{
                     this.axios.post('/nav',{
                         key:['company','market']
                     }).then((response)=>{
                         let list=response.data.data;

                         for(let item of list){
                             item.defaultPath=this.getDaultPath(item.children);
                             // if(item.key==param){
                             //     this.sliderList=item.children;
                             // }
                         }
                         this.headerList=list;
                          res(this.headerList)
                         // console.log(list);

                         // this.$store.commit('getDataList',list);
                         // console.log(this.$store.state.Navlist);
                     })
                 });

             },
            getslider(name){
               for(let item of this.headerList){
                   if(item.name==name){
                       this.sliderList=item.children;
                       this.getchars();
                   }
               }
            },

            getDaultPath(data){
                for(let key in data){
                    if(Array.isArray(data[key])){
                          return this.getDaultPath(data[key][0])
                    }else {
                        return data[key].path
                    }
                }
            },


        },
        mounted(){
            this.getchars();
            this.$nextTick(function() {
                this.$refs.shop.updateOpened();
                this.activename=this.$route.path;
                this.$refs.shop.updateActiveName()

            });
        },
        async created(){
            let url=window.location.hash;
             let currentLin=url.split('/')[1];
            let userMsg=JSON.parse(localStorage.getItem("LoginMsg"));
            this.user=userMsg.user.split('@')[0];
            await this.getData();
            this.getslider(currentLin);

        }
    }
</script>