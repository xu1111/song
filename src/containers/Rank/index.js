import React,{Component} from 'react';
import "./index.less";
import {Link} from "react-router-dom";

import {connect} from 'react-redux';
import * as action from '../../redux/actions/rank';

class Rank extends Component{
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
            <div className="content">
                <ul className="rank-content">
                    {rankArr[0].info==""?"":rankArr.map((item,index)=>(
                        <Link to={"/rankdetail/"+item.id} key={index}>
                        <li>
                            <div className="rank_left">
                                <img src={item.info[0]["singer_img"]?item.info[0]["singer_img"]:''} alt="流行指数"/>
                                <span className="rank_box">{item["id"]==3?"歌手":item.info[0]["type-name"]}</span>
                            </div>
                            <div className="rank_right">
                                <p>
                                    <span>1 {item.info[0]["song_name"]}-{item.info[0]["singer"]}</span>
                                </p>
                                <p>
                                    <span>2 {item.info[1]["song_name"]}-{item.info[1]["singer"]}</span>
                                </p>
                                <p>
                                    <span>3 {item.info[2]["song_name"]}-{item.info[2]["singer"]}</span>
                                </p>
                            </div>
                        </li>
                    </Link>))}
                </ul>
                <div style={{width:'100%',height:'65px',background: '#232123',position:'absolute',bottom:0,left:0}}></div>
            </div>
        )
    }
}
export default connect(
    state=>({...state}),
    action
)(Rank);
