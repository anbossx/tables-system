<template>
    <div style="height: 100%">
        <Row class-name="createTable-Row">
            <Col span="6" class-name="leftCreatedCharts" >
                <div>
                    <div class="Container">
                    <label>业务线：</label>
                    <RadioGroup  @on-change="lineNav" v-model="firstline">
                    <Radio :label="item"  size="small" v-for="item in lineList" :key="item"></Radio>
                    </RadioGroup>
                    </div>
                </div>
                <div class="tableTreeContainer">
                    <!--<Tree :data="data1" @on-select-change="setCharts"></Tree>-->
                    <Sider hide-trigger :style="{background: '#fff'}">
                        <Menu :theme="theme2" active-name='123460000' width="auto" >
                            <bi-navslider :navList="navTree" @onSelect="pageChange"  path='false'></bi-navslider>
                        </Menu>
                    </Sider>
                </div>
            </Col>
            <Col span="18">
                <div>

                    <div class="Container">
                        <label>展示类型：</label>
                        <RadioGroup  v-model="chartsConfig.component">
                            <Radio label="bi-bar"  size="small">柱状图</Radio>
                            <Radio label="bi-line"  size="small">折线图</Radio>
                            <Radio label="bi-barsum"  size="small">柱状堆积图</Radio>
                            <Radio label="bi-linebar"  size="small">柱状图&折线图</Radio>
                            <Radio label="bi-barsumline"  size="small">柱状堆积图&折线图</Radio>
                            <Radio label="bi-pie"  size="small">饼图</Radio>
                            <Radio label="bi-funel"  size="small">漏斗图</Radio>
                        </RadioGroup>
                    </div>
                    <div class="Container">
                        <label style="padding-top: 6px">API：</label>
                        <Input v-model="chartsConfig.url" placeholder="Enter API..." style="width: 300px" />
                        <span class="APIConfirm">
                            <Checkbox v-model="APIConfirm" @on-change="getAPIData()">是否使用此API</Checkbox>
                        </span>

                    </div>
                </div>
            </Col>
        </Row>
    </div>



</template>

<script>
    import {navtree,getnav} from 'components/common/util/util'
    import dayjs from 'dayjs';
    export default {
        name: "createTable",
        data(){
            return{
                APIConfirm:false,
                navTree:[],
                theme2: 'light',
                firstline:'',
                pageName:'',
                selectlineName:'',
                lineList:[],
                userMsg:JSON.parse(localStorage.getItem("LoginMsg")),
                chartsConfig:{
                   id:'',
                   url:'',
                   component:'',
                   lineserve:'',
                   page:'',
                  preparation:[]
                }
            }
        },
        methods:{
            getAPIData(){
               console.log(this.APIConfirm)
            },
           async lineNav(lineName){
                let user=this.userMsg.user;
                this.selectlineName=lineName;
                this.chartsConfig.lineserve=lineName;
                let navlist=await getnav(user,lineName);
               let params={
                   data:navlist,
                   parentId:0,
                   path:false
               };
                this.navTree=navtree(params);
            },
            chartsIdDeal(){
                let timeUnix=dayjs().unix();
                let user=this.userMsg.user.split('@')[0];
                let pageid=user+timeUnix;
                return this.stringToHex(pageid);
            },
            setCharts(data){
               console.log(data);
            },
            pageChange(item){
                this.pageName=item.name;
                this.chartsConfig.page=item.id;

            },

        },

        created(){

            let line=this.userMsg.worksList;
            for(let item of line){
                this.lineList.push(item.workline)
            }
            this.firstline=this.lineList[0];
            this.selectlineName=this.lineList[0];
            this.lineNav(this.lineList[0]);
        }
    }
</script>

<style scoped>
    @import '../assets/css/createTable.css';
</style>