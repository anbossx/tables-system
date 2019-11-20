<template>

    <div>
        <div class="createButtonStyle">
            <RadioGroup  @on-change="lineNav">
                <span  @dblclick="firstNavNameShow=true" v-for="item in lineList" :key="item">
                  <Radio :label="item" border size="small"></Radio>
                </span>
            </RadioGroup>
        </div>
        <Modal v-model="navNameShow" draggable scrollable title="请输入目录名称" @on-ok="submitData">
            <div>
                <Input v-model="navName" placeholder="请输入目录名称..." style="width: 300px" />
            </div>
        </Modal>
        <Modal v-model="firstNavNameShow" draggable scrollable title="请输入目录名称" @on-ok="firstsubmitData">
            <div>
                <Input v-model="firstnavName" placeholder="请输入目录名称..." style="width: 300px" />
            </div>
        </Modal>
        <div class="treeContainer">
            <Tree :data="data5" :render="renderContent"></Tree>
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

                 navNameShow:false,
                 firstNavNameShow:false,
                 alertContent:'',
                 alertShow:false,
                 selectlineName:'',
                 navName:'',
                 firstnavName:'',
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
            firstsubmitData(){
                let params={
                    parentId:0,
                    id:this.pageIdDeal(),
                    serveLine:this.selectlineName,
                };
                 params.path='/'+this.selectlineName+'/'+params.id
                if(this.firstnavName.length!=0){
                    params.name=this.firstnavName
                }else {
                    this.$Message['warning']({
                        background: true,
                        content: '请输入目录名称'
                    });
                    return
                }

                this.axios.post('/nav/setnav',params).then((response)=>{
                    if(response.data.code==200){
                        this.$Message.success('目录创建成功,请联系相关人员给您开次目录权限');
                        this.data5.push({
                            expand:true,
                            id:params.id,
                            parentId:params.parentId,
                            title:params.name,
                            render:this.renderfun

                        });
                    }
                })

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
                params.path='/'+this.selectlineName+'/'+params.id;
                params.serveLine=this.selectlineName;

                this.addPage(params)

            },
            addPage(param){
                this.axios.post('/nav/setnav',param).then((response)=>{
                    if(response.data.code==200){
                        this.$Message.success('目录创建成功,请联系相关人员给您开次目录权限');
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
        },

    }
</script>
<style scoped>
    @import '../assets/css/createCatalogue.css';
</style>
