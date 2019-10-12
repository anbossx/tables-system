<template>
    <div class="BusinessLines">

        <label >业务线：</label>
        <RadioGroup v-model="BusinessLinesSelect">
            <Radio v-for="(item,index) in BusinessLinesList" :label="item" :key="index" size="small" ></Radio>
        </RadioGroup>

          <!--<div>-->
              <!--<Drawer-->
                      <!--title="创建目录"-->
                      <!--v-model="value3"-->
                      <!--width="720"-->
                      <!--:mask-closable="false"-->
                      <!--:styles="styles"-->
              <!--&gt;-->
                   <!--<div>-->
                       <!--<label >业务线：</label>-->
                       <!--<RadioGroup v-model="BusinessLinesSelect">-->
                       <!--<Radio v-for="(item,index) in BusinessLinesList" :label="item" :key="index" size="small" ></Radio>-->
                        <!--</RadioGroup>-->
                   <!--</div>-->
                  <!--<div class="demo-drawer-footer">-->
                      <!--<Button style="margin-right: 8px" @click="value3 = false">Cancel</Button>-->
                      <!--<Button type="primary" @click="value3 = false">Submit</Button>-->
                  <!--</div>-->
              <!--</Drawer>-->
          <!--</div>-->

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

            }
        }
    }
</script>

<style scoped>
    .BusinessLines{
         display: flex;
        margin-left: 30px;
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