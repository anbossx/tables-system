<template>
    <div >
        <div class="titleContainer"><span class="biTitle">{{chrtsTitle}}</span></div>
        <div class="preparation" v-for="(item,index) in propList.preparation" :key="index">
              <span v-for="item1 in item" class="conditionContainer" v-if="!item1.show" :key="item1.label">
                <label class="labelStyle">{{item1.label}}： </label>
                     <component :is="item1.component" :linkConfig="lineAge" v-model="item1.value" :type="item1.type" size="small" range-separator="-" :placeholder="item1._like" :options="item1.data"  expand-trigger="hover" filterable clearable change-on-select  :style="{width:item1.width?item1.width+'px':200+'px'} "></component>
              </span>
            <span class="conditionContainer" v-else>
                <label class="buttonLabelStyle"> </label>
                <component :is="item1.component"  size="small"  :style="{width:item1.width?item1.width+'px':70+'px'}" :type="item1.type" :key="item1.key" v-if="item1.show" @click="getData(item1.text)">{{item1.text}}</component>
               </span>
        </div>
        <div class="sayabc_charts" :id="propList.id"></div>
    </div>

</template>

<script>
    import dayjs from 'dayjs';
    export default {
        name: "biCharts",
        props:['chartsConfig'],
        data(){
            return{
                propList:this.chartsConfig,
                param:{},
                url:''+this.chartsConfig.url,//因为涉及公司安全，所以请自行填写
                chrtsTitle:'',
                lineAge:[],
            }
        },

        methods:{
            getData(){
                let selt=this;
                var myCharts = this.$echarts.init(document.getElementById(this.propList.id));
                myCharts.showLoading();
                this.paramsDel();
                this.axios.get(this.url,{
                    params:this.param
                }).then((response)=>{
                    let list=response.data.data.list;

                    if(this.propList.hasOwnProperty('xAxisFormat')){
                        for(let item of this.propList.xAxisFormat){
                            for(let item1 of list){
                                if(item1.hasOwnProperty(item.label)){
                                    item1[item.label]=dayjs(item1[item.label].toString()).format(item.format)
                                }
                            }
                        }
                    }
                    this.chrtsTitle=response.data.data.title;
                    let dataJson = {
                        dataList:list,
                        isLeft:false,
                        hasDataZoom:true,
                        type:'bar'
                    };

                    if(selt.propList.hasOwnProperty('type')){
                        dataJson['type']=selt.propList['type'];
                    }
                    let option = this.$biCharts.optionNew(dataJson);
                    option.yAxis = [new this.$biCharts.yAxis('数量','{value}')];
                    if(this.propList.type=='bar_sum'){
                        let seriesBarArr=[];
                        for(let i=1;i<=this.propList.barNum;i++){
                            seriesBarArr.push( new this.$biCharts.seriesBar(20,'inside',`{@[${i}]}`,'sum',true));

                        }
                        option.series=seriesBarArr;
                        option.yAxis = [new this.$biCharts.yAxis(this.propList.yAxisTitle[0],'{value}')];
                    }
                    if((this.propList.type=='line_bar' || this.propList.type=='line_bar_sum') && this.propList.lineNum>0){
                        delete dataJson.type;
                        let seriesBarArr=[];
                        if(this.propList.type=='line_bar_sum'){
                            for(let i=1;i<=this.propList.barNum;i++){
                                seriesBarArr.push( new this.$biCharts.seriesBar(20,'inside',`{@[${i}]}`,'sum',true));

                            }
                        }else {
                            for(let i=1;i<=this.propList.barNum;i++){
                                seriesBarArr.push( new this.$biCharts.seriesBar(20,'inside',`{@[${i}]}`,'',true));

                            }
                        }
                        option.series=seriesBarArr;
                        for(let j=this.propList.barNum+1;j<=this.propList.lineNum+this.propList.barNum;j++){
                            option.series.push( new this.$biCharts.lineTwoRoll(`{@[${j}]}`))
                        }

                        if(this.propList.yAxisTitle[1].includes('%')){
                            option.yAxis = [new this.$biCharts.yAxis(this.propList.yAxisTitle[0],'{value}'),new this.$biCharts.yAxis('率','{value}%')];
                        }else {
                            option.yAxis = [new this.$biCharts.yAxis(this.propList.yAxisTitle[0],'{value}'),new this.$biCharts.yAxis(this.propList.yAxisTitle[1],'{value}')];
                        }
                    }
                    option.grid.left=90;
                    myCharts.hideLoading();

                    myCharts.setOption(option,true);

                });


            },
            paramsDel(){
                if(this.propList.hasOwnProperty('defaltParams')){
                    for(let key in this.propList.defaltParams) {
                        this.param[key]=this.propList.defaltParams[key]
                    }
                }
                if(this.propList.hasOwnProperty('preparation')){
                    for(let row of this.propList.preparation){
                        for(let item of row){
                            if(item.component!='el-button'){
                                if(item.type=='daterange'){
                                    if(item.value==null){
                                        this.param['start'+item.key]='';
                                        this.param['end'+item.key]='';
                                    }else if(item.value.length==0){
                                        this.param['start'+item.key]='';
                                        this.param['end'+item.key]='';
                                    }else {
                                        if(item.hasOwnProperty('postfix')){
                                            this.param['start'+item.key]=dayjs(item.value[0]).format(item.format)+item.postfix;
                                            this.param['end'+item.key]=dayjs(item.value[1]).format(item.format)+item.postfix;
                                        }else {

                                            this.param['start'+item.key]=dayjs(item.value[0]).format(item.format);
                                            this.param['end'+item.key]=dayjs(item.value[1]).format(item.format);
                                        }

                                    }

                                }else if(item.type=='date'){
                                    this.param[item.key]=dayjs(item.value).format(item.format)+' '+item.postfix;
                                }else if(item.component=='el-cascader'){
                                    for(let i=0;i<item.key.length;i++){
                                        if(item.value[i]==undefined){
                                            this.param[item.key[i]]=''
                                        }else {
                                            this.param[item.key[i]]=item.value[i];
                                        }

                                    }
                                }else if(item.component=='link-age'){
                                    this.lineAge=[];
                                    this.lineAge.push(item);
                                    this.param[item.key]=item.value;
                                    this.param[item.children.key]=item.children.value;
                                }
                                else if (item.component=='bi-radio') {
                                    if(item.hasOwnProperty('urlchange')&& (item['urlchange']==true ||  item['urlchange']=='true')){
                                        this.url=''+item.value;
                                    }else {
                                        this.param[item.key]=item.value;
                                    }
                                }else {
                                    this.param[item.key]=item.value;
                                }
                            }

                        }
                    }
                }

            }

        },
        mounted(){
            this.getData()
        },
        created(){

            let preparas=this.chartsConfig.preparation;
            for(let item of preparas){
                for(let item1 of item){
                    if(item1.component=="DatePicker"){
                        if(item1.type=="daterange"){
                            item1.value=item1.value.map((item)=>{
                                if(item.toString().length<3){
                                    return dayjs().add(item, "days").format("YYYYMMDD");
                                }else {
                                    return dayjs(item).format("YYYYMMDD");
                                }
                            });
                        }
                    }
                }
            }
            this.propList.preparation=preparas;

        }
    }
</script>

<style scoped>

</style>
