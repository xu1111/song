/**
 * Created by Administrator on 2017/8/29.
 */
import React,{Component} from "react";
import "./index.less";
import {connect} from 'react-redux';
import * as action from '../../../redux/actions/rank';
import * as action1 from '../../../redux/actions/playList';

class RankContent extends Component{
    componentWillMount(){
        if (this.props.rank.rankInfo.length === 0) {
            this.props.getRank();
        }
    }
    render(){
        let rankInfo=this.props.rank.rankInfo.sort((a,b)=>{
            if(b["heat"]==a["heat"]){
                return b["song_name"].localeCompare(a["song_name"]);
            }else{
                return b["heat"]-a["heat"];
            }
        });
        let rank1=rankInfo.filter(item=>item["type-name"]=="流行").sort((a,b)=>{
            if(b["heat"]==a["heat"]){
                return b["song_name"].localeCompare(a["song_name"]);
            }else{
                return b["heat"]-a["heat"];
            }
        });
        let rank2=rankInfo.filter(item=>item["type-name"]=="热歌").sort((a,b)=>{
            if(b["heat"]==a["heat"]){
                return b["song_name"].localeCompare(a["song_name"]);
            }else{
                return b["heat"]-a["heat"];
            }
        });
        let rank3=rankInfo.filter(item=>item["type-name"]=="新歌").sort((a,b)=>{
            if(b["heat"]==a["heat"]){
                return b["song_name"].localeCompare(a["song_name"]);
            }else{
                return b["heat"]-a["heat"];
            }
        });
        let rank4=rankInfo.filter(item=>item["type-name"]=="网络").sort((a,b)=>{
            if(b["heat"]==a["heat"]){
                return b["song_name"].localeCompare(a["song_name"]);
            }else{
                return b["heat"]-a["heat"];
            }
        });
        let rankArr=[
            {"id":1,"info":rank1},
            {"id":2,"info":rank2},
            {"id":3,"info":rankInfo},
            {"id":4,"info":rank3},
            {"id":5,"info":rank4}
        ];
        return (
            <div className="rank-content">
                <i onClick={()=>this.props.history.push('/rank')} className="iconfont icon-goback iconGo"></i>
                {rankArr[0].info==""?"":rankArr.map((item,index)=>{
                    if(item["id"]==this.props.match.params.id){
                        return (
                            <div key={index}>
                                <div className="rank-contentT">
                                    <img src={item.info[0]["singer_img"]} alt=""/>
                                    <i onClick={()=>this.props.history.push('/rank')} className="iconfont icon-goback iconGo"></i>
                                    <h4>巅峰榜·{item["id"]==3?"歌手":item.info[0]["type-name"]}</h4>
                                    <div className="box" onClick={()=>this.props.singerList(item.info)}>
                                        <i className="iconfont icon-16 iconPlay"></i>
                                        播放全部
                                    </div>
                                </div>
                                <ul className="rank-contentB">
                                    <li onClick={()=>{this.props.singOne(item.info[0])}}>
                                        <i className="iconfont icon-jiangbei01 icon1"></i>
                                        <div className="rank-right">
                                            <p className="font-top">{item.info[0]["song_name"]}</p>
                                            <p className="font-bottom">{item.info[0]["singer"]}·{item.info[0]["song_name"]}</p>
                                        </div>
                                    </li>
                                    <li onClick={()=>{this.props.singOne(item.info[1])}}>
                                        <i className="iconfont icon-jiangbei01 icon2"></i>
                                        <div className="rank-right">
                                            <p className="font-top">{item.info[1]["song_name"]}</p>
                                            <p className="font-bottom">{item.info[1]["singer"]}·{item.info[1].song_name}</p>
                                        </div>
                                    </li>
                                    <li onClick={()=>{this.props.singOne(item.info[2])}}>
                                        <i className="iconfont icon-jiangbei01 icon3"></i>
                                        <div className="rank-right">
                                            <p className="font-top">{item.info[2]["song_name"]}</p>
                                            <p className="font-bottom">{item.info[2]["singer"]}·{item.info[2]["song_name"]}</p>
                                        </div>
                                    </li>
                                    {item.info.filter((item,index)=>!(index<=3)).map((item,index)=>(
                                        <li key={index} onClick={()=>{this.props.singOne(item)}}>
                                            <i className="icon3">{index+4}</i>
                                            <div className="rank-right">
                                                <p className="font-top">{item["song_name"]}</p>
                                                <p className="font-bottom">{item["singer"]}·{item["song_name"]}</p>
                                            </div>
                                        </li>
                                    ))}
                                    <div style={{height:'65px'}}></div>
                                </ul>
                            </div>
                        )
                    }
                })}
            </div>
        )
    }
}
export default connect(
    state=>({...state}),
    {...action,...action1}
)(RankContent);