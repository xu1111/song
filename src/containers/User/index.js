import React,{Component} from 'react';
import './index.less';
import {NavLink} from 'react-router-dom';
import Like from "../../components/Like/index";
import {connect} from 'react-redux';
import * as playaction from '../../redux/actions/playList';
class User extends Component{
    constructor(){
        super();
        this.state={flag:true,text1:"播放全部",text2:"暂停播放全部",tt:true,songList:[],songLike:[]};
    };
    mandleChange=()=> {
        this.setState({flag: !this.state.flag});
        if(this.state.tt){
            this.props.singerList(this.state.songLike);
        }else{
            this.props.singerList(this.state.songList);
        }
    };
    back=()=>{
        this.props.history.goBack();
    };
    componentWillMount(){

        this.state.songList=JSON.parse(localStorage.getItem("recently"));
        this.state.songLike=JSON.parse(localStorage.getItem("myLikeSong"));
        this.setState({songList:this.state.songList});
        this.setState({songLike:this.state.songLike});
    };

    render(){
        return (
            <div className="user-body">
                    <div className="user-text">
                        <i className="iconfont icon-goback" onClick={this.back}></i>
                        <ul>
                            <li className="no-bor" onClick={()=>this.setState({tt:true})}>
                                <a className={"no-bor "+(this.state.tt?" selected":"")}>我喜欢的</a></li>
                            <li onClick={()=>this.setState({tt:false})}>
                                <a className={this.state.tt?"":" selected"}>最近听的</a>
                            </li>


                        </ul>
                    </div>
                    <div className="p" onClick={this.mandleChange}>
                        <i className={this.state.flag?"iconfont icon-zanting":"iconfont icon-rectangle2"} ></i>
                        {
                            this.state.flag?<p>{this.state.text1}</p>:<p>{this.state.text1}</p>
                        }
                    </div>

                <Like tt={this.state.tt} songList={this.state.songList} songLike={this.state.songLike}/>

                <div style={{height:"65px"}}></div>
            </div>
        )
    }
}

export default connect(
    state => ({...state}),
    playaction
)(User)