import React,{Component} from 'react';
import './sear.less';
import {connect}from 'react-redux';
import * as action from '../../redux/actions/playList';
 class Sear extends Component{
    handleChange=(item)=>{
        this.props.giveHerSon();
        this.props.singOne(item);
    };
    render(){
        return (
            <div className="con" style={{display:this.props.flag?"none":"block"}}>
                <div className="search-box">
                    <i className="iconfont icon-sousuo"></i>
                    <input type="text" className="searBox" value={this.props.value} onClick={this.props.giveHerSon}/>
                    <input type="submit" value="取消" className="sear-but" onClick={this.props.giveHerSon}/>
                </div>
                <h5>共找到{this.props.list.length}首歌</h5>

                <ul className="search-content">
                    {this.props.list.map((item,index)=>(
                        <li className="item" key={index} onClick={(e)=>this.handleChange(item)}>
                            <h4>{item.song_name}</h4>
                            <p>{item.singer}</p>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}
export default connect(state=>({...state}),action)(Sear)
