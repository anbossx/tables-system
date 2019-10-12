<template>

    <div>
        <div class="createButtonStyle">
            <Button @click="value3 = true" type="primary">创建目录</Button>
        </div>
        <div>
            <Drawer
                    title="创建目录"
                    v-model="value3"
                    width="720"
                    :mask-closable="false"
                    :styles="styles"
            >
                <div>
                    <label >业务线：</label>
                    <RadioGroup v-model="BusinessLinesSelect">
                        <Radio v-for="(item,index) in BusinessLinesList" :label="item" :key="index" size="small" ></Radio>
                    </RadioGroup>
                </div>

                  <div>
                      <div class="muluListStyle">
                          <span>一级目录：</span>
                          <span>
                               <Input  placeholder="一级目录名称" style="width: 300px" v-model="catalogOne"/>
                          </span>
                      </div>
                      <div class="muluListStyle">
                          <span>二级目录：</span>
                          <span>
                                  <Input  placeholder="二级目录名称" style="width: 300px" v-model="catalogTwo" />
                          </span>
                      </div>
                      <div class="muluListStyle">
                          <span>三级目录：</span>
                          <span>
                                  <Input  placeholder="三级目录名称" style="width: 300px" v-model="catalogThree" />
                          </span>
                      </div>
                  </div>

                <div class="demo-drawer-footer" >
                    <div v-if="alertShow">
                        <Alert :type='alertType' show-icon>
                            <template slot="desc">
                                {{alertContent}}
                            </template>
                        </Alert>
                    </div>

                    <Button style="margin-right: 8px" @click="value3 = false">Cancel</Button>
                    <Button type="primary" @click="submitData">Submit</Button>
                </div>
            </Drawer>
        </div>
    </div>

</template>

<script>
    import serviceline  from 'assets/js/mixin'
    export default {
        name: "createTable",
        mixins:[serviceline],
        data(){
            return{
                value3: false,
                catalogOne:'',
                catalogTwo:'',
                catalogThree:'',
            }
        },
        methods:{
            submitData(){
                if(this.catalogOne.length==0){
                    this.alertShow=true;
                    this.alertContent='一级目录为必填项，请您重新填写';
                    this.alertType='warning';
                    return
                }
                console.log(123)
            }
        }
    }
</script>

<style scoped>
    .createButtonStyle{
        display: flex;
        margin-left: 30px;
        margin-top: 20px;
    }
    .muluListStyle{
       margin-top: 20px;
    }
    .demo-drawer-footer{
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        border-top: 1px solid #e8e8e8;
        padding: 10px 16px;
        text-align: right;
        background: #fff;
    }

</style>