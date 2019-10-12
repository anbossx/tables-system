/**
 * Created by zhangxue on 2017/06/02.
 */
const optionNew=function(dataJson){
    var option = {
        title: {text:'',left:20,textStyle:{fontSize:16,fontWeight:'normal'}},
        tooltip: {trigger: "axis"},
        toolbox: {
            show : true,
            padding :5 ,
            feature : {
                mark : {show: true},
                dataView : {
                    show : true,
                    readOnly : true,
                    optionToContent : function(opt) {
                        var dataSetData = opt.dataset[0].source;
                        var table = '<table style="text-align:center;border-collapse:collapse;border: 1px solid #555;" cellpadding="5">';
                        var temp ='<textarea style="width:100%;height:100%">';
                        for (let i = 0; i<= dataSetData.length; i++) {
                            for(var item in dataSetData[i]){
                                temp += dataSetData[i][item] + '\t';
                            }
                            temp +='\n';
                        }
                        table += '</table>';
                        temp += '</textarea>';
                        return temp;
                    }
                },
                magicType: {show: true, type: ['line', 'bar']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        dataset: {source: []},
        legend: {
            top:20
        },
        grid: {},
        xAxis: {
            type: 'category',
            splitLine: {show: false},
            axisLabel:{interval:0}
        },
        series: [

        ]
    };

    //判断x轴是否有滚动条,滚动条是否在左边
    xAxisRollFunc(option, dataJson);
    //判断滚动条是否在x轴或者y轴有,判断y轴是否有滚动条
    yAxisRollFunc(option, dataJson);
    //source获取数据
    sourceDataFunc(option, dataJson);
    //more 遍历for line or bar
    moreLineORBarFunc(option, dataJson);
    //控制legendNum显隐
    legendNumFunc(option, dataJson);

    return option;
}

function xAxisRollFunc(option, dataJson){
    if(dataJson.hasDataZoom){
        option.dataZoom =[
            {
                type: 'slider',
                filterMode: 'weakFilter',
                showDataShadow: false,
                xAxisIndex: [0],
                height: 8,
                bottom:7,
                start:70,
                borderColor: '#eee',
                backgroundColor: '#fff',
                fillerColor:"#f9f2f0",
                handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z', // jshint ignore:line
                handleSize: 20,
                handleStyle: {
                    color:'#e7927a'
                },
                labelFormatter: ''
            }
        ];
        //判断滚动条是否在左边
        if(dataJson.isLeft){
            var total = dataJson.dataList.length;
            var startRatio = (total - 5) / total *10;
            option.dataZoom[0].start = 0;
            option.dataZoom[0].end = startRatio;
        }else{
            var total = dataJson.dataList.length;
            var startRatio = (total - 5) / total *100;
            option.dataZoom[0].start = startRatio;
            option.dataZoom[0].end = 100;
        }
    }

}
function yAxisRollFunc(option, dataJson){
    if(dataJson.isShaft){
        option.xAxis={};
        option.yAxis={type: 'category',splitNumber:0};
    }
    if(dataJson.isVertical){
        option.dataZoom = [{
            show: true,
            yAxisIndex: [0],
            borderColor: '#eee',
            backgroundColor: '#fff',
            fillerColor:"#f9f2f0",
            handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z', // jshint ignore:line
            handleSize: 20,
            handleStyle: {},
            width: 8,
            left: '92%',
            start: 100,
            end: 60,
            labelFormatter: ''
        }];
    }
}
function sourceDataFunc(option, dataJson){
    var legendArr = [];
    var index = 0 ;
    //console.log(dataJson.dataList);

    dataJson.dataList.forEach((item)=> {
        var sourceArr = [];
        for(let key in item){
            if(index === 0){
                legendArr.push(key);
            }
            if(item[key] === null){
                item[key] = '无';
            }
            sourceArr.push(item[key]);
        }
        index ++ ;
        option.dataset.source.push(sourceArr);
    });
    // $.each(dataJson.dataList, function(i) {
    //
    //     var resultData = dataJson.dataList[i];
    //
    //     var sourceArr = [];
    //     $.each(resultData,function(j) {
    //         //console.log(j);
    //         if(index === 0){
    //             legendArr.push(j);
    //         }
    //         if(resultData[j] === null){
    //             resultData[j] = '无';
    //         }
    //         sourceArr.push(resultData[j]);
    //     });
    //     index ++ ;
    //     option.dataset.source.push(sourceArr);
    // });
    option.dataset.source.unshift(legendArr);
}
function moreLineORBarFunc(option, dataJson){
    var seriesArr = [];
    for(var i = 1; i < option.dataset.source[0].length; i++){
        if(dataJson.type === 'line') {
            seriesArr.push(new seriesLine('{@['+ i +']}'));
        }else if(dataJson.type === 'bar') {
            if(dataJson.isBarStack){
                seriesArr.push( new seriesBar(25, 'inside','{@['+ i +']}','sum',false));
            }else {
                seriesArr.push( new seriesBar(20, 'top','{@['+ i +']}','',true));
            }
        }
    }
    option.series = seriesArr;
    // option.series.forEach(function (item,index) {
    //       item.itemStyle={
    //           "normal": {
    //               "label": {
    //                   "show": true,
    //                   "position": 'top'
    //               }
    //           }
    //
    //       }
    // })
}
function legendNumFunc(option, dataJson){
    if(dataJson.legendNum){
        var legendMap = {};
        for(var j = dataJson.legendNum; dataJson.legendNum < option.dataset.source[0].length; dataJson.legendNum++){
            legendMap[option.dataset.source[0][dataJson.legendNum]] = false ;
        }

        option.legend.selected= legendMap;

    };
}

const seriesBar=function(width, position,formatter, stack,isShow){
    return {
        type: 'bar',
        stack: stack,
        barMaxWidth: width,
        itemStyle: {
            normal: {
                label: {
                    // textStyle: {color: "#000"},
                    show: isShow,
                    position: position,
                    formatter:formatter
                },
            }
        }
    }
}

function seriesBarInclude(width, position){
    return {
        type: 'bar',
        barMaxWidth: width,
        silent: false,
        barGap: '-100%',
        itemStyle: {
            normal: {
                label: {
                    textStyle: {color: "#000"},
                    show: false,
                    position: position
                },
            }
        }
    }
}


function seriesLine(formatter){
    return {
        type: 'line',
        smooth: true,
        showAllSymbol: true,
        symbolSize: 10,
        itemStyle: {
            normal: {
                label: {
                    show: true,
                    position: 'top',
                    formatter: formatter
                }
            }
        }
    };
}
function lineTwoRoll(formatter){
    return {
        type: 'line',
        smooth: true,
        showAllSymbol: true,
        symbolSize: 10,
        yAxisIndex:1,
        itemStyle: {
            normal: {
                label: {
                    show: true,
                    position: 'top',
                    formatter: formatter
                }
            }
        }
    };
}

const yAxis=function(name,formatter){
    var yAxis = {
        type: 'value',
        name: name,
        splitLine:{show: false},
        axisLabel: {formatter: formatter}
    };
    return yAxis;
}
function xAxis(name,formatter){
    var xAxis = {
        type: 'value',
        name:name,
        axisLabel: {
            formatter: formatter,
            textStyle: {
                fontWeight: '80'
            }
        }
    };
    return xAxis;
}

function optionRange(jsonList){
    var option = {
        legend: {show:false},
        tooltip: { trigger: "axis"},
        dataset: {
            dimensions:[jsonList.dimensions1,jsonList.dimensions2],
            source: []
        },
        series: []
    };
    if(jsonList.name === 'commonRange'){
        option.dataset.source =jsonList.result;
    }else if(jsonList.name === 'otherRange'){
        var sourceArr = [];
        $.each(jsonList.result, function(i) {
            var reVal = jsonList.result[i];
            $.each(reVal, function(j) {
                var temp = {};
                temp['时间周期']= j;
                temp['data数']= reVal[j];
                sourceArr.push(temp);
            });
        });
        option.dataset.source =sourceArr;
    }

    return option;
}

function seriesPie(type,config){
    return {
        name:'',
        type:type,
        radius: ['40%', '70%'],
        center: ['50%', '50%'],
        label: {
            normal: {
                formatter: function(a){
                    if(config.dimensions1 === '教学level' || config.dimensions1 === '学生状态'){
                        return a.data[config.dimensions1] +':' +'\t' +a.data[config.dimensions2];
                    }else if(config.dimensions1 === '沉睡时间差' || config.dimensions1 === 'LEVEL' || config.dimensions1 === '开课沉睡时间差'){
                        return a.data[config.dimensions1] +':'  +'\t' +a.data[config.dimensions2] +'\t\n' + a.percent+'%';
                    }else{
                        return a.data[config.dimensions1] +':'  +'\t' +a.data[config.dimensions2] +'\t' + a.percent+'%';
                    }
                    //return a.data[config.dimensions1] +':' +'\t' +a.data[config.dimensions2] +'\t' + a.percent+'%';
                },
                backgroundColor: '#fdf9f4',
                borderColor: '#e9dfd1',
                borderWidth: 1,
                borderRadius: 3,
                fontSize: 14,
                padding:10
            }
        }
    };
}

//y轴万位数据处理
function yAxisMax(option){
    option.yAxis[0].max = function(value) {
        return (value.max)*2;

    };

}
function yAxisNumberDeal(option){

    option.yAxis[0].axisLabel = {
        formatter: function (value) {

            return value >= 10000 ?(value / 10000).toFixed(0) + '万':value;
        }
    };
}
//漏斗
function optionFunnel (){
    return {
        title: {
            text: '',
            left:'20'
        },
        legend: {
            data:[],
            show:false
        },
        series: [ {
            name:'',
            type:'funnel',
            width: '60%',
            left:'15%',
            top:10,
            label: {
                normal: {
                    formatter: function (params) {
                        return  params.name + ' ' + params.value + ' ' +params.data.BI;
                    },
                    backgroundColor: '#fdf9f4',
                    borderColor: '#e9dfd1',
                    borderWidth: 1,
                    borderRadius: 3,
                    fontSize: 14,
                    lineHeight: 38,
                    padding:10

                }
            },
            data:[]
        }]
    }
}

function rate(arr) {
    var temp = [];
    for (var i = 0; i < arr.length; i++) {
        temp[i] = Number(arr[i]);
    }
    return temp;
};

function formatFunnel(result) {
    var newResult = {};
    newResult["series"] = [];
    newResult["rate"] = [];
    newResult["legend"] = [];
    $(result).each(function (index, items) {
        var i = 0;
        for (var key in items) {
            newResult["legend"].push(key);
            newResult["series"].push(items[key]);
        }
    });
    newResult['rate'] = rate(newResult["series"]);
    return newResult;
};

const Funnel=function (data) {
    let  option = {

        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c}"
        },
        toolbox: {

        },

        calculable: true,
        series: [
            {
                name:'漏斗图',
                type:'funnel',
                left: '10%',
                top: 60,
                //x2: 80,
                bottom: 60,
                width: '80%',
                // height: {totalHeight} - y - y2,
                min: 0,
                max: 100,
                minSize: '0%',
                maxSize: '100%',
                sort: 'descending',
                gap: 2,
                label: {
                    show: true,
                    position: 'inside'
                },
                labelLine: {
                    length: 10,
                    lineStyle: {
                        width: 1,
                        type: 'solid'
                    }
                },
                itemStyle: {
                    borderColor: '#fff',
                    borderWidth: 1
                },
                emphasis: {
                    label: {
                        fontSize: 20
                    }
                },
                data: data
            }
        ]
    };
    return option
};
const optionSpecial=function (params) {
    let option = {

        xAxis: {
            type: 'category',
            data:params.yAxis
        },
        yAxis: {
            type: 'value'
        },
        tooltip:{

            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        series: [{

            barWidth:'20',

            label:{
                show:true,
                position:'top'
            },
            data: params.data,
            type: 'bar'
        }]
    };
    return option;
};
export default {
    optionNew,
    seriesBar,
    yAxis,
    lineTwoRoll,
    Funnel,
    optionSpecial
}
