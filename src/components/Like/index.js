import React,{Component} from 'react';
import './index.less';
import {connect} from 'react-redux';
import * as playaction from '../../redux/actions/playList';
class Like extends Component{
    handleClick=(item)=>{
        console.log(item);
        this.props.singOne(item);

    };
    render(){
        return (
            <div className="likes">
                {
                    this.props.tt ? <div className="items-like">
                        {
                            this.props.songLike&&this.props.songLike.length>0 ?  <ul className="item-like">
                                    {
                                        this.props.songLike.map((item, index) => (
                                            <li className="item-like" key={index}
                                                onClick={() => this.handleClick(item)}>
                                                <h4>{item.song_name}</h4>
                                                <p>{item.song_info}</p>
                                            </li>
                                        ))
                                    }</ul>:<div className="item-like"><h4>暂无喜欢歌曲</h4></div>



                        }
                        </div> : <div className="items-like">
                        {
                            this.props.songList&&this.props.songList.length>0? <ul className="item-like">
                                    {
                                        this.props.songList.map((item, index) => (
                                            <li className="item-like" key={index} onClick={()=>this.handleClick(item)}>
                                                <h4>{item.song_name}</h4>
                                                <p>{item.song_info}</p>
                                            </li>
                                        ))
                                    }</ul> :<div className="item-like"><h4>暂无最近听的歌曲</h4></div>
                        }</div>
                }</div>
        )}}


export default connect(
    state => ({...state}),
    playaction
)(Like)

