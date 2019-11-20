<template>
    <div>
        <bi-bar :config="testConfig"></bi-bar>
    </div>


</template>

<script>
    export default {
        name: "chartsTest",
        data(){
            return{
                testConfig:{
                    factorConfig:[
                        {   component:'DatePicker',
                            label:'日期范围',
                            type:'daterange',
                            field:['startDate','endDate'],
                            date:['2019-11-03','2019-11-13']
                        },
                    ] ,
                    chartsConfig:{
                        id:'chartsTestId',
                        yaxisField:'date',
                        yAxis:{
                            type: 'value',
                            name:'测试',
                            axisLabel:{
                                formatter:'{value}'
                            }
                        },
                    },

                }
            }
        },



    }
</script>

<style scoped>
  #chartsTestId{
      width: 100%;
      height: 500px;
  }
</style>