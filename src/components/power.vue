<template>
    <div style="margin-left: 100px">
        <Row>
            <Col span="1" class-name="username">
                <label>用户名：</label>
            </Col>
            <Col span="3">
                <Input v-model="userName" placeholder="请输入用户名"  style="width: 200px" />
            </Col>
            <Col span="2">
                <Button type="primary"  icon="ios-search" @click="getpowerUser()"> 查询</Button>
            </Col>
        </Row>
        <Row class-name="tableRow">
            <Col span="24">
                <Table :columns="columns1" :data="userList" border>
                    <template slot-scope="{row}" slot="action">
                        <Button type="primary" size="small" style="margin-right: 5px" @click="SetPower(row)">设置权限</Button>
                    </template>
                </Table>
            </Col>
        </Row>
        <Drawer
                title="设置权限"
                v-model="DrawerShow"
                width="720"
                :mask-closable="false"
                :styles="styles"
        >
            <div>
                <RadioGroup  @on-change="lineNav">
                  <Radio  v-for="(val,key) in userPowerObj"  :label="key" border size="small" :key="key"></Radio>
                </RadioGroup>
            </div>
            <div style="width: 400px;margin-top: 20px">
            <Tree :data="data2" show-checkbox @on-check-change="getselectData"></Tree>
            </div>
            <div class="demo-drawer-footer">
                <Button style="margin-right: 8px" @click="DrawerShow = false">Cancel</Button>
                <Button type="primary" @click="submitPowerData">Submit</Button>
            </div>
        </Drawer>

    </div>
</template>
<script>
    import 'css/power.css'
    import {addnavTree,getAllnav,addchecked} from 'components/common/util/util'
    export default {
        data () {
            return {
                columns1: [
                    {
                        title: '用户名',
                        key: 'name',
                        align:'center'
                    },
                    {
                        title: '部门',
                        key: 'department',
                        align:'center'
                    },
                    {
                        title: '电话',
                        key: 'tel',
                        align:'center'
                    },
                    {
                        title: '创建时间',
                        key: 'time',
                        align:'center'
                    },
                    {
                        title: 'Action',
                        key: 'Action',
                        slot: 'action',
                        align:'center'
                    }
                ],
                localStorageList:JSON.parse(localStorage.getItem("LoginMsg")),
                userName:'',
                userList:[],
                DrawerShow:false,
                userPowerObj:{},
                newPowerList:[],
                byPowerUser:'',
                currentLineName:'',
                styles: {
                    height: 'calc(100% - 55px)',
                    overflow: 'auto',
                    paddingBottom: '53px',
                    position: 'static'
                },
                data2: []
            }
        },
        methods:{
           getpowerUser(){
               this.userList=[];
              this.axios.get('/user/getPowerUser',{
                  params:{
                      user:this.userName
                  }
              }).then((response)=>{
                  let result=response.data.data;
                  this.userList=result;
                  this.userPowerObj=result[0].roles;
               })
           },
            SetPower(row){
                this.DrawerShow=true;
                let currentUser=this.localStorageList.user;
                this.byPowerUser=row.name;

            },
            submitPowerData(){
               // console.log(this.currentLineName);
               // console.log(this.newPowerList);
               // console.log(this.byPowerUser);
                let params={
                    line:this.currentLineName,
                    newPowerList:this.newPowerList,
                    byPowerUser:this.byPowerUser
                };
                this.axios.post('/user/setPower',params).then((response)=>{
                     if(response.data.code==200){
                         this.$Message.success('编辑成功');

                     }
                })
            },
            async lineNav(lineNmame){
               this.currentLineName=lineNmame;
               let lineList=await getAllnav(lineNmame);
                let listTree=await addnavTree(lineList,0);
                addchecked(listTree,this.userPowerObj[lineNmame]);
                this.data2=listTree
            },
            getselectData(list){
               this.newPowerList=[];
               for(let item of list){
                   if(item.hasOwnProperty('path')){
                       this.newPowerList.push(item.id)
                   }
               }
            }
        }
    }
</script>