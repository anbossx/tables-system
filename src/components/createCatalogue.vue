<template>

    <div>
        <div class="createButtonStyle">
            <RadioGroup  @on-change="lineNav">
                <span  @dblclick="addFirstnav(item)" v-for="item in lineList" :key="item">
                  <Radio :label="item" border size="small"></Radio>
                </span>
            </RadioGroup>
        </div>
          <!--<div class="tableContainer">-->
              <!--<Table border :columns="columns1" :data="data1"></Table>-->
          <!--</div>-->
        <Modal v-model="navNameShow" draggable scrollable title="请输入目录名称" @on-ok="submitData">
            <div>
                <Input v-model="navName" placeholder="Enter something..." style="width: 300px" />
            </div>
        </Modal>
        <div style="width: 400px">
            <Tree :data="data5" :render="renderContent"></Tree>
        </div>

        <div>
            <Drawer
                    title="创建目录"
                    v-model="value3"
                    width="720"
                    :mask-closable="false"
                    :styles="styles"
            >
                <div class="demo-drawer-footer" >
                    <transition name="fade">
                    <div v-if="alertShow">
                        <Alert type='warning' show-icon>
                            <template slot="desc">
                               {{alertContent}}
                            </template>
                        </Alert>
                    </div>
                    </transition>
                    <Button style="margin-right: 8px" @click="value3 = false">Cancel</Button>
                    <Button type="primary" @click="submitData">Submit</Button>
                </div>
            </Drawer>
        </div>
    </div>

</template>

<script>
    import serviceline  from 'assets/js/mixin';
    import {addnavTree,getnav} from 'components/common/util/util'
    import dayjs from 'dayjs';
    export default {
        name: "createTable",
        mixins:[serviceline],
        data(){
            return{
                 value3: false,
                 navNameShow:false,
                 alertContent:'',
                 alertShow:false,
                 selectlineName:'',
                 navName:'',
                 userMsg:JSON.parse(localStorage.getItem("LoginMsg")),
                 lineList:[],
                 appendData:{},
                 data5: [],

            }
        },
        methods:{
            stringToHex(str){
                let idHex='';
                for(let i=0;i<str.length;i++){
                    idHex=idHex+str.charCodeAt(i).toString(16);
                }
                return idHex;
            },
            addFirstnav(line){
                this.value3=true;
            },
            pageIdDeal(){
               let timeUnix=dayjs().unix();
                let user=this.userMsg.user.split('@')[0];
                let pageid=user+timeUnix;
                return this.stringToHex(pageid);
            },
            submitData(){
                let params={};
                params.parentId=this.appendData.id;
                params.id=this.pageIdDeal();

                if(this.navName.length!=0){
                  params.name=this.navName;
                }else {
                    this.$Message['warning']({
                        background: true,
                        content: '请输入目录名称'
                    });
                    return
                }
                params.path='/'+this.selectlineName+'/'+this.pageIdDeal();
                params.serveLine=this.selectlineName;

                this.addPage(params)

            },
            addPage(param){
                this.axios.post('/nav/setnav',param).then((response)=>{
                    if(response.data.code==200){
                        this.$Message.success('目录创建成功');
                        const children = this.appendData.children || [];
                        children.push({
                            title: param.name,
                            id:param.id,
                            expand: true
                        });
                        this.$set(this.appendData, 'children', children);
                    }
                })
            },

            async lineNav(lineName){
                let user=this.userMsg.user;
                this.selectlineName=lineName;
                let navlist=await getnav(user,lineName);
                //递归形成树状数据结构
                let navTree=addnavTree(navlist,0);
                 this.addRender(navTree);
                 this.data5=navTree;
            },
            append (data) {
                this.navNameShow=true;
                 this.appendData=data;

            },
            remove (root, node, data) {
                const parentKey = root.find(el => el === node).parent;
                const parent = root.find(el => el.nodeKey === parentKey).node;
                const index = parent.children.indexOf(data);
                parent.children.splice(index, 1);
            }
        },
        created(){
            let line=this.userMsg.worksList;
            for(let item of line){
                this.lineList.push(item.workline)
            }
        }
    }
</script>
