import React,{Component} from 'react';
import { Switch , Route } from 'react-router-dom';
import {message} from 'antd';
import Read from './components/read.js';
import DataItem from 'components/global/dataItem/index.js';
import TableList from 'components/global/tableList/index.js';
import mm from 'util/mm.js';
import api from 'api/data.js';
class Data extends Component{
    constructor(props){
        super(props)
        this.state = {
            type:'0',
            wallStartTime:mm.getTimeByNumber(Date.now(),-10),
            wallEndTime:mm.getDateByTime(Date.now()),
            //展示墙数据
            data:{}
        }
    }
    //切换空中新闻、展示墙
    selectType(type){
        this.setState({type})
    }
    componentDidMount(){
        this.loadWall();
    }
    //加载展示墙数据
    loadWall(){
        let {wallStartTime,wallEndTime} = this.state;
        api.getWallList({start_time:wallStartTime,end_time:wallEndTime}).then(res=>{
            this.setState({data:res})
        }).catch(err=>{
            message.error(err);
        })
    }
    //设置时间
    selectTime(date,dateString){
        let startTime = dateString[0],
            endTime = dateString[1];
        this.setState({
            wallStartTime:startTime,wallEndTime:endTime
        })
    }
    confirmTime(){
        this.loadWall();
    }
    render(){
        let {type,wallStartTime,wallEndTime,data} = this.state;
        // console.log(type)
        return (
            <div>
                <Read type={type} selectType={(type)=>{this.selectType(type)}} />
                <DataItem title='栏目统计' subTitle='AR 展示墙'
                    startTime = {wallStartTime} endTime = {wallEndTime} selectTime = {(e,v)=>{this.selectTime(e,v)}}
                    confirmTime = {()=>{this.confirmTime()}}
                >
                    <TableList 
                    thead={[{width:'9.1%',name:'排名'},{width:'9.1%',name:'1'},
                    {width:'9.1%',name:'2'},{width:'9.1%',name:'3'},{width:'9.1%',name:'4'},
                    {width:'9.1%',name:'5'},{width:'9.1%',name:'6'},{width:'9.1%',name:'7'},
                    {width:'9.1%',name:'8'},{width:'9.1%',name:'9'},{width:'9.1%',name:'10'}]}
                     >
                        <tr>
                            <td style={{background:'#F4A12F',color:'#fff'}}>栏目</td>
                            <td>智慧街道</td>
                            <td>智慧党建</td>
                            <td>文化E管家</td>
                            <td>市县媒体</td>
                            <td>花儿剧场</td>
                            <td>游戏</td>
                            <td>智能选题</td>
                            <td>度客直播</td>
                            <td>看度</td>
                            <td>视频</td>
                        </tr>
                        <tr>
                            <td style={{background:'#F4A12F',color:'#fff'}}>浏览量</td>
                            <td>{data.Street}</td>
                            <td>{data.partybuilding}</td>
                            <td>{data.culturalsteward}</td>
                            <td>{data.mediacenter}</td>
                            <td>{data.flower}</td>
                            <td>{data.airballoon}</td>
                            <td>{data.selectedtopic}</td>
                            <td>{data.livebroadcast}</td>
                            <td>{data.candu}</td>
                            <td>{data.video}</td>
                        </tr>
                    </TableList>
                </DataItem> 
            </div>
        )
    }

}
export default Data;