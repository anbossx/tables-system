<style scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
        height: 100%;
    }
    .layout-logo{
        width: 100px;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 15px;
        left: 20px;
    }
    .layout-nav{
        width: 420px;
        margin: 0 auto;
        margin-right: 20px;
        display:-webkit-inline-box;
    }
    .layout-footer-center{
        text-align: center;
    }
    .ivu-layout {
        display: flex;
        flex-direction: column;
        flex: auto;
        background: #f5f7f9;
        height: 100%;
    }
    .ivu-card {
        background: #fff;
        border-radius: 4px;
        font-size: 14px;
        position: relative;
        transition: all .2s ease-in-out;
        height: 100%;
    }
    .ivu-layout-content{
        padding: 0px 10px !important;
    }
</style>
<template>
    <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo"></div>
                    <div class="layout-nav">
                        <MenuItem name="1" to="/user/createCatalogue">
                            <Icon type="ios-navigate-outline" />
                            创建目录
                        </MenuItem>
                        <MenuItem name="1" to="/user/createTable">
                            <Icon type="ios-book-outline" />
                            创建报表
                        </MenuItem>
                        <MenuItem name="1" to="/user/power">
                            <Icon type="ios-book-outline" />
                            权限分配
                        </MenuItem>
                    </div>

                        <MenuItem name="1" :to="firstUrl">
                            home
                        </MenuItem>


                </Menu>
            </Header>
            <Content :style="{padding: '0 50px'}">
                <Card>
                    <div style="min-height: 200px;">
                        <router-view></router-view>
                    </div>
                </Card>
            </Content>
            <Footer class="layout-footer-center">2011-2016 &copy; TalkingData</Footer>
        </Layout>
    </div>
</template>
<script>
    export default {
         data(){
             return{
                 firstUrl:'',
             }
         },
        created(){
           this.firstUrl=JSON.parse(localStorage.getItem('LoginMsg')).firstUrl;
        }
    }
</script>
>