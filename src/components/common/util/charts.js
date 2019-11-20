export function optionConfig(list,config) {
    let option={};
    let series=[];
    let legend={
        show:true,
        data:[],
        selected:{
            test:true,
            test2:true
        }
    };
    let tooltip={
            trigger: 'axis',
            axisPointer : {
                show:true,
                type : 'line'
            }
        };
    let xAxis={
            type: 'category',
            data: []
        };
    for(let item of list){
        if(item.hasOwnProperty(config.yaxisField)){
            xAxis.data.push(item[config.yaxisField])

        }else {
            console.log('接口没有返回'+config.yaxisField+'这个字段');
             return
        }
    }
    for(let key in config.listOne){
         if(key!=config.yaxisField){
             legend.data.push(key);
             let obj={
                 data: [],
                 type: config.type,
                 barWidth:30,
                 name:key,
                 // stack:'测试',
                 label: {
                     normal: {
                         show: true,
                         position: 'inside'
                     }
                 },
             };
             for(let item of list){
                 obj.data.push(item[key])
             }
             series.push(obj)
         }

    }
    option.series=series;
    option.legend=legend;
    option.xAxis=xAxis;
    option.yAxis=config.yAxis;
    option.tooltip=tooltip;
    return option
}