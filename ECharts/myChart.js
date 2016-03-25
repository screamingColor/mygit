(function setpie1(){
    var chartPie1 = echarts.init(document.getElementById('pie1')); 
    var option = {
    title : {
        text: '货源信息（吨）',
        x:'center',
        textStyle:{
        fontSize: 10,
        fontWeight: 'bolder',
        color: '#000'
        }             
    },
    tooltip : {
                trigger: 'item',
                formatter: "{c} ({d}%)"
            },
                 
    legend: {
        orient : 'horizontal',
        x : 'center',
        y : 'bottom',
        textStyle:{
        fontSize:11,
        },   
        itemWidth:10, 
        itemHeight:10,         
        data:['西湖区','东湖区','红谷滩','新建区','青山湖','高新区']
    },
    
    
    calculable : true,
    series : [
        {
            
            type:'pie',
            radius : '42%',
            center: ['50%', '45%'],
            data:[
                {value:1000, name:'西湖区'},
                {value:300, name:'东湖区'},
                {value:200, name:'红谷滩'},
                {value:300, name:'新建区'},
                {value:240, name:'青山湖'},
                {value:224, name:'高新区'}
            ]
        }
    ]
};
                    
    chartPie1.setOption(option);
})();


/*---------------------*/
(function setpie2(){
    var chartPie2 = echarts.init(document.getElementById('pie2')); 
    var option = {
     title : {
        text: '车辆分布（辆）',
        x:'center',
        textStyle:{
        fontSize: 10,
        fontWeight: 'bolder',
        color: '#000'
        }             
    },
     tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient : 'horizontal',
        x : 'center',
        y : 'bottom',
        textStyle:{
        fontSize:11,
        },   
        itemWidth:10, 
        itemHeight:10,         
        data:['西湖区','东湖区','红谷滩','新建区','青山湖']
    },
    
    calculable : true,
    series : [
        {
            
            type:'pie',
            center: ['50%', '45%'],
            radius : ['30%', '50%'],
            itemStyle : {
                normal : {
                    label : {
                        show : false
                    },
                    labelLine : {
                        show : false
                    }
                },
                emphasis : {
                    label : {
                        show : true,
                        position : 'center',
                        textStyle : {
                            fontSize : '10',
                            fontWeight : 'bold'
                        }
                    }
                }
            },
            data:[
                {value:35, name:'西湖区'},
                {value:24, name:'东湖区'},
                {value:12, name:'红谷滩'},
                {value:13, name:'新建区'},
                {value:16, name:'青山湖'}
                
            ]
        }
    ]
};
                    
    chartPie2.setOption(option);
})();

/*--------------------------------*/

(function setbar1(){
    var chartBar1 = echarts.init(document.getElementById('bar1')); 
    var option = {
    grid: {y: 40, y2:50, x2:0,x:10,borderWidth:0,backgroundColor:'rgba(0,0,0,1)'},
    title : {
        text: '仓储面积（平方米）',
        x:'center',
        textStyle:{
            fontSize: 10,
            fontWeight: 'bolder',
            color: '#000'
        }             
    },
     
    tooltip : {
        trigger: 'axis'
    },
    legend: {
        x:'left',
        y:'bottom',
        data:['仓储面积']
    },
 
    calculable : true,
    xAxis : [
        {
            type : 'category',

            data : ['西湖区','东湖区','红谷滩','新建区','青山湖','高新区']
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
         {
           
            type:'bar',
            stack: 'sum',
            barCategoryGap: '50%',
            itemStyle: {
                normal: {
                    color: 'tomato',
                    barBorderColor: 'tomato',
                    barBorderWidth: 6,
                    barBorderRadius:0,
                    label : {
                        show: true, position: 'insideTop'
                    }
                }
            },
             
            data:[100000, 22000, 23000,90000, 60000, 220000]
        },
        
        
           
        
    ]
};
                    
    chartBar1.setOption(option);
})();