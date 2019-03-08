import React,{Component} from 'react';
import { Switch , Route } from 'react-router-dom';
import {Select,message} from 'antd';
import mm from 'util/mm.js';
import ReactEcharts from 'echarts-for-react';
import DataItem from 'components/global/dataItem/index.js';
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import api from 'api/data.js';
const Option = Select.Option;
class Read extends Component{
    constructor(props){
        super(props)
        this.state = {
            startTime:mm.getTimeByNumber(Date.now(),-10),
            endTime:mm.getDateByTime(Date.now()),
            xAxis:[],
            data:[],
            total:''
        }
    }
    componentDidMount(){
        this.loadData()
    }
    loadData(t){
        // let {type} = this.props;
        let type  = t !=null ? t : this.props.type;
        let {startTime,endTime} = this.state;
        let op_code = type == '0' ? 'displaywall' : type =='1'?'slambubble':'airballoon';
        api.getBrowseData({op_code,start_time:startTime,end_time:endTime}).then(res=>{
            let xAxis = [];
            let data = res.map((item)=>{
                xAxis.push(item.op_time);
                let obj = {};
                obj.name = item.op_time;
                obj.value = item.amount;
                return obj;
            })
            let total = data.reduce((total,item)=> total+item.value,0);
            this.setState({
                xAxis,data,total
            })
        }).catch(err=>{
            message.error(err)
        })
    }
    selectDataType(val){
        this.props.selectType(val)
    }
    selectTime(date,dateString){
        let startTime = dateString[0],
            endTime = dateString[1];
        this.setState({
            startTime,endTime
        })
    }
    confirmTime(){
        this.loadData();
    }
    componentWillReceiveProps (nextProps){
        if(nextProps.type == this.props.type){
            return false;
        }else{
            this.loadData(nextProps.type)
        }
    }
    render(){
        let {startTime,endTime,xAxis,data,total} = this.state;
        let rightBar = (
            <div style={{display:'inline-block'}}>
                <Select
                    showSearch
                    style={{ width: 150 }}
                    optionFilterProp="children"
                    value = {this.props.type}
                    onChange={(value)=>{this.selectDataType(value)}}
                >
                    <Option value="0">AR展示墙</Option>
                    <Option value="1">AR空中新闻</Option>
                    <Option value="2">AR游戏</Option>
                </Select>
            </div>
        )
        var option = {
            tooltip : {
                formatter: "{a} <br/>{b} : {c}次",
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            yAxis:{
                type:'value'
            },
            xAxis :{
                type: 'category',
                data: xAxis
            },
            dataZoom:[
                {
                    type:'slider',
                    show:true,
                    start:0,
                    end:100
                }
            ],
            series : [
                {
                    name: '浏览量',
                    type: 'bar',
                    barWidth: '40%',
                    data:data,
                    itemStyle: {
                        normal: {
                            color: '#6EADF4'
                        }
                    }
                }
            ]
        };
        return (
            <div>
                <DataItem   subTitle='浏览统计' rightBar={rightBar}
                    startTime = {startTime} endTime = {endTime} selectTime = {(e,v)=>{this.selectTime(e,v)}}
                    confirmTime = {()=>{this.confirmTime()}}
                >
                    <div>总量：{total}</div>
                    <ReactEcharts
                        option={option}
                        notMerge={true}
                        lazyUpdate={true}
                        style={{height:'300px'}}
                        />
                </DataItem>
            </div>
        )
    }
}
// Read.defaultProps = {
//     type:'0'
// }
export default Read;