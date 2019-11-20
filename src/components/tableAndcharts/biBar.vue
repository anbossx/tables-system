<template>
  <div>
    <!--<div class="titleContainer"><span class="biTitle">{{chrtsTitle}}</span></div>-->
               <span v-for="(item,index) in barConfig.factorConfig" :key="index">
                     <label class="labelStyle">{{item.label}}： </label>
                     <component :is="item.component"  v-model="item.value" :type="item.type"  range-separator="-" :placeholder="item._like" :options="item.data"  expand-trigger="hover" filterable clearable change-on-select  :style="{width:item.width?item.width+'px':200+'px'} " ></component>
                </span>
               <!--<span class="conditionContainer" v-else>-->
                     <!--<label class="buttonLabelStyle"> </label>-->
                     <!--<component :is="item.component"  size="mini"  :style="{width:item.width?item.width+'px':70+'px'}" :type="item.type" :key="item.key" v-if="item.show" @click="getData(item.text)">{{item.text}}</component>-->
               <!--</span>-->

    <div :id="barConfig.chartsConfig.id"></div>
  </div>
</template>

<script>

    import {optionConfig} from '../common/util/charts.js'
    import chartsCommon from 'assets/js/chartsCommon.js'
    export default {
        name: "chartsTest",
        mixins:[chartsCommon],
        props:['config'],
        data(){
            return{
                barConfig:this.config,
                url:'',
                option:{},
            }
        },
        methods:{
            getcharts(){
                let myCharts = this.$echarts.init(document.getElementById(this.barConfig.chartsConfig.id));
                myCharts.setOption(this.option,true);
            },
            getData(){
                let params={
                    startDate: '2019-11-03',
                    endDate: '2019-11-13'
                };
                this.axios.get(this.url,{
                    params:params
                }).then((response)=>{
                    let list=response.data.data.list;
                    this.optionDel(list);
                    this.getcharts();
                })
            },
            optionDel(list){
                let listOne=list[0];
                let configData={};
                configData=this.barConfig.chartsConfig;
                configData['listOne']=listOne;
                configData['type']='bar';
                let option=optionConfig(list,configData);
                this.option.legend=option.legend;
                this.option.series=option.series;
                this.option.xAxis=option.xAxis;
                this.option.yAxis=option.yAxis;
                this.option.tooltip=option.tooltip;
            }
        },
        mounted(){

        },
        created(){
            this.getData();
        }

    }
</script>

<style scoped>
    #chartsTestId{
        width: 100%;
        height: 500px;
    }
</style>