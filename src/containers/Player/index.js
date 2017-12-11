import React, {Component} from 'react';
import './index.less';
import * as action from '../../redux/actions/home';
import * as action1 from '../../redux/actions/playList';
import ReactSwipe from 'react-swipe';//swipe插件;
import $ from "jquery";
import jPlayer from "jplayer";

import {connect} from 'react-redux';

class Player extends Component {

    constructor() {
        super();
        this.state = {index: 1};
        this.nameICOM="";
        this.lrc="";
        this.hot=false;
    };


    handelChange = () => {
        let width = -this.refs.swiper.clientWidth / 2 + 'px';
        this.refs.swiper.style.left = parseInt(window.getComputedStyle(this.refs.swiper).left) == 0 ? width : '0px';
        console.log(window.getComputedStyle(this.refs.swiper).left);
        let index = parseInt(window.getComputedStyle(this.refs.swiper).left) == 0 ? 0 : 1;
        this.setState({index})
    };
    classNameChange=(e)=>{
        e.preventDefault();
        switch (e.target.className){
            case 'iconfont icon-jiaochabiao-'://随机播放->单曲循环
                e.target.className='iconfont icon-danquxunhuan';
                this.props.changePlayorder(1);
                break;
            case 'iconfont icon-danquxunhuan'://单曲循环->顺序播放
                e.target.className='iconfont icon-shunxubofang';
                this.props.changePlayorder(3);
                break;
            case 'iconfont icon-shunxubofang'://顺序播放->随机播放
                e.target.className='iconfont icon-jiaochabiao-';
                this.props.changePlayorder(2);
                break;
            case'iconfont  icon-tubiao03':
                this.props.nextSong(-1);
                break;
            case"iconfont icon-qianjin":
                this.props.nextSong(1);
                break;
        }
    };
    changeXinClick=(e,item)=>{
        let ary=JSON.parse(localStorage.getItem("myLikeSong"));
        if(e.target.className=="iconfont icon-xin1"){
            e.target.className="iconfont icon-xin";
            ary=ary.filter(songs=>songs.id!=item.id);
            localStorage.setItem("myLikeSong",JSON.stringify(ary));
            return
        }
        if( e.target.className=="iconfont icon-xin"){
            ary.push(item);
            e.target.className="iconfont icon-xin1";
            localStorage.setItem("myLikeSong",JSON.stringify(ary));
            return
        }
    }
    changeProgress=(e)=>{
    let progressBar=this.refs.progressBar;
    let left=this.refs.container.clientWidth*15/100;
    let progress=(e.clientX-left)/progressBar.clientWidth;
        $(this.props.play.element).jPlayer('play',this.props.play.total*progress)
};
    playChange=(e)=>{

        if(this.props.play.isPlay==true){
            console.log(this.props.play.element);
                $(this.props.play.element).jPlayer('pause');
            e.target.className="iconfont icon-zanting"
            }else{
                $(this.props.play.element).jPlayer('play');
            e.target.className="iconfont icon-rectangle2"
        }
        this.props.changePlay();
    }

componentWillMount(){

    if(this.props.playList.type==1){
             this.nameICOM='iconfont icon-danquxunhuan';
         }else if(this.props.playList.type==2){
             this.nameICOM='iconfont icon-jiaochabiao-';
         }else{
             this.nameICOM='iconfont icon-shunxubofang';
         }

         if(this.props.playList.singOne){
             if(this.props.playList.singOne.lyric===''){
                 this.lrc='<p>暂无歌词</p>'
             }else{
                 <ul>
                     <li>{/\[ti:(\w+|\W+)\]/.exec(this.props.playList.singOne.lyric)[1]}</li>
                 </ul>
             }
         }else{
             this.lrc=''
         }
}
componentWillReceiveProps(nextProps){
    if(this.refs.lrc){
        for (var key in this.refs){
            if(key!='lrc'&&key!='container'&&key!='swiper'&&key!='progressBar'){
                if(this.refs[key].childNodes[0].innerHTML.slice(0,5)==this.props.play.currentTime){
                    for(var k in this.refs){
                        if(k!='lrc'&&k!='container'&&k!='swiper'&&k!='progressBar'){
                            this.refs[k].className='';
                        }
                    }
                    this.refs.lrc.style.top=(180-this.refs[key].offsetTop)+"px";
                    this.refs[key].className='active';
                    this.forceUpdate()
                }
            }
        }
    }

    if(this.props.playList.singOne!=nextProps.playList.singOne){

        if(nextProps.playList.singOne){
            let ary=JSON.parse(localStorage.getItem("myLikeSong"));
            this.hot=ary.some(item=>item.id==nextProps.playList.singOne.id);
        }
    }

}

    render() {

        let ary=[];
        if(this.props.playList.singOne){
            if(this.props.playList.singOne.lyric){
                this.props.playList.singOne.lyric.replace(/\[\d{2}\:\d{2}\.\d+\]([\u4e00-\u9fa5]|[a-z]|[A-Z]|\w|\:|\s)+/g,function () {
                    ary.push(arguments[0])
                });
            }
        }



        return (
            <div className="player-container" style={{display: (this.props.play.isChange ? "block" : "none")}} ref="container">
                <div className="player" style={this.props.playList.singOne?{
                    background: `url(${this.props.playList.singOne["singer_img"]}) 0% 0% /cover no-repeat`
                }:{}}>
                </div>
                <div className="play-content">
                    <div className="play-top">
                        <div className="goback"  onClick={this.props.playChange}></div>
                        <p className="singName">{this.props.playList.singOne?this.props.playList.singOne["song_name"]:null}</p>
                        <p className="singleName">{this.props.playList.singOne?this.props.playList.singOne["singer"]:null}</p>
                    </div>
                    <div className="play-wrap">
                        <div className="play-swiper" ref="swiper" onTouchEnd={this.handelChange}>
                            <div className="div1">
                                <img src={this.props.playList.singOne?this.props.playList.singOne["singer_img"]:null} alt=""
                                     className="avatar"/>
                                <p className="lyrics">小鸡音乐 听我想听的歌</p>
                            </div>
                            <div className="div2">

                            <div className="lrc">
                                {this.props.playList.singOne==null?'':(this.props.playList.singOne.lyric?(<ul ref="lrc">
                                    {ary.map((item,index)=>(
                                        <li key={index} ref={index+''}><span style={{fontSize:"0px"}}>{/\[(\d{2}:\d{2}\.\d+)\]/.exec(item)[1]}</span>{item.replace(/\[(\d{2}:\d{2}\.\d+)\]/,"")}</li>
                                    ))}
                                </ul>):(<p>暂无歌词</p>))}

                            </div>


                            </div>
                        </div>
                        <div className="footer-bar">
                            <div className="dot">
                                <span className={this.state.index == 1 ? "active" : ''}></span>
                                <span className={this.state.index == 1 ? "" : 'active'}></span>
                            </div>

                            <div className="control-bar" onClick={this.changeProgress} ref="progressBar">
                                <span className="begin">{this.props.play.currentTime}</span>
                                <div className="control" style={{width:`${this.props.play.progress}%`}}>
                                    <div className="circle">
                                        <div></div>
                                    </div>
                                </div>
                                <span className="total">{this.props.play.duration}</span>
                            </div>
                            <div className="player-control" onClick={this.classNameChange}>
                                <i className={this.nameICOM}></i>
                                <i className="iconfont  icon-tubiao03"></i>
                                <i className={this.props.play.isPlay?"iconfont icon-rectangle2":"iconfont icon-zanting"} onClick={this.playChange}></i>
                                <i className="iconfont icon-qianjin"></i>
                                <i className={this.hot?"iconfont icon-xin1":"iconfont icon-xin"}onClick={(e)=>this.changeXinClick(e,this.props.playList.singOne)} ></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default connect(
    state => ({...state}),
    {...action,...action1}
)(Player)