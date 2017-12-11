import React,{Component} from 'react';
import './index.less';
import * as action from '../../redux/actions/home'
import * as action1 from '../../redux/actions/playList';
import {connect}from 'react-redux'
import $ from "jquery";
import jPlayer from "jplayer";
 class Minplayer extends Component{
    constructor(){
        super();
        this.changePro=null;
        this.state={currentMusicItem:""}
    }

    playMusic=(musicItem)=>{
    $(this.refs.player).jPlayer('setMedia',{
        mp3:musicItem.url
    }).jPlayer("play");
    this.setState({
        currentMusicItem:musicItem
    })
    };

    componentDidMount(){

        $(this.refs.player).jPlayer({
            supplied:'mp3',
            wmode:'window'
        });
        if(this.props.playList.singOne){
            this.playMusic(this.props.playList.singOne);
        }



        $(this.refs.player).bind($.jPlayer.event.timeupdate,(e)=>{
            this.total=this.duration=e.jPlayer.status.duration;//音频总时间
            this.props.getTotal(this.total);
            let integer=Math.floor(this.duration/60);
            let a=Math.ceil(this.duration-integer*60);
            if(a<10){
                a='0'+Math.ceil(this.duration-integer*60)
            }
            this.duration=`0${integer}:${a}`;

            this.currentTime=Math.round(e.jPlayer.status.currentTime);
           if(this.currentTime<10){
               this.currentTime=`0:0${this.currentTime}`
           }else if(this.currentTime>10&&this.currentTime<60){
               this.currentTime=`0:${this.currentTime}`
           }else{
               let integer=Math.floor(this.currentTime/60);
              let  currentTime=Math.ceil(this.currentTime-integer*60);
              if(currentTime<10){
                  this.currentTime=`${integer}:0${currentTime}`
              }else{
                  this.currentTime=`${integer}:${currentTime}`
              }
           }
           this.currentTime='0'+this.currentTime;

            this.setState({
                progress:e.jPlayer.status.currentPercentAbsolute//Math.round(e.jPlayer.status.currentTime) 这是当前时间
            });

            this.props.getDuration(this.duration);
            this.props.getProgress(e.jPlayer.status.currentPercentAbsolute);//进度百分比
            this.props.getCurrentTime(this.currentTime);

            this.props.getElement(this.refs.player);

        });
        $(this.refs.player).bind($.jPlayer.event.ended,(e)=>{
            if(this.props.playList.type==1){
              this.playMusic(this.props.playList.singOne);
            }else{
                this.props.nextSong(1);
            }
        })
    }
    handleChange=(e)=>{
        if(this.props.playList.singOne!=null){
            if(e.target.className=="iconfont icon-zanting"||e.target.className=="iconfont icon-rectangle2"){
                if(this.props.play.isPlay==true){
                    $(this.refs.player).jPlayer('pause');
                    this.refs.play.className="iconfont icon-zanting"
                }else{
                    $(this.refs.player).jPlayer('play');
                    this.refs.play.className="iconfont icon-rectangle2"
                }
                this.props.changePlay();
                return;
            }
        }else{
            if(e.target.className=="iconfont icon-zanting"||e.target.className=="iconfont icon-rectangle2"){
                this.props.nextSong(1);
            }
            return
        }

        if(e.target.className=="iconfont icon-yinle1"){
            this.props.getList();
            return;
        }
        this.props.playChange();

    };
     componentWillReceiveProps(nextProps){
         if(nextProps.playList.singOne==null){
             $(this.refs.player).jPlayer('pause');
             $(this.refs.player).unbind($.jPlayer.event.timeupdate);
             $(this.refs.player).unbind($.jPlayer.event.ended);
             return;
         }
         if(this.props.playList.singOne==null&&this.props.playList.singOne!=nextProps.playList.singOne){
             $(this.refs.player).jPlayer({
                 supplied:'mp3',
                 wmode:'window'
             });
             this.playMusic(nextProps.playList.singOne);
             $(this.refs.player).bind($.jPlayer.event.timeupdate,(e)=>{
                 this.total=this.duration=e.jPlayer.status.duration;//音频总时间
                 this.props.getTotal(this.total);
                 let integer=Math.floor(this.duration/60);
                 let a=Math.ceil(this.duration-integer*60);
                 if(a<10){
                     a='0'+Math.ceil(this.duration-integer*60)
                 }
                 this.duration=`0${integer}:${a}`;

                 this.currentTime=Math.round(e.jPlayer.status.currentTime);
                 if(this.currentTime<10){
                     this.currentTime=`0:0${this.currentTime}`
                 }else if(this.currentTime>10&&this.currentTime<60){
                     this.currentTime=`0:${this.currentTime}`
                 }else{
                     let integer=Math.floor(this.currentTime/60);
                     let  currentTime=Math.ceil(this.currentTime-integer*60);
                     if(currentTime<10){
                         this.currentTime=`${integer}:0${currentTime}`
                     }else{
                         this.currentTime=`${integer}:${currentTime}`
                     }
                 }
                 this.currentTime='0'+this.currentTime;

                 this.setState({
                     progress:e.jPlayer.status.currentPercentAbsolute//Math.round(e.jPlayer.status.currentTime) 这是当前时间
                 });

                 this.props.getDuration(this.duration);
                 this.props.getProgress(e.jPlayer.status.currentPercentAbsolute);//进度百分比
                 this.props.getCurrentTime(this.currentTime);

                 this.props.getElement(this.refs.player);

             });
             $(this.refs.player).bind($.jPlayer.event.ended,(e)=>{
                 if(this.props.playList.type==1){
                     this.playMusic(this.props.playList.singOne);
                 }else{
                     this.props.nextSong(1);
                 }
             });
                return;
         }
         if(nextProps.playList.singOne.id!=this.state.currentMusicItem.id){
             this.playMusic(nextProps.playList.singOne);
         }
     }
     componentWillUnmount(){
         $(this.refs.player).unbind($.jPlayer.event.timeupdate);
         $(this.refs.player).unbind($.jPlayer.event.ended);
     }

     render(){
        return (
            <div className="minplayer" onClick={this.handleChange}>
                {
                   this.props.playList.singOne!=null?(<div className="havSong">
                       <img src={this.props.playList.singOne.singer_img} alt="" className="avatar"/>

                       <div className=" detail">
                           <p className="singerName">{this.props.playList.singOne["song_name"]}</p>
                           <p className="singleName">{this.props.playList.singOne.singer}</p>
                       </div>

                       <div className={this.props.play.isPlay?"iconfont icon-rectangle2":"iconfont icon-zanting"} ref="play"></div>
                       <div className="iconfont icon-yinle1"  ></div>
                       </div>):(<div className="nullSong"><p>小鸡音乐 听我想听的音乐</p><div className="iconfont icon-zanting"></div><div className="iconfont icon-yinle1" onClick={this.props.getList} ></div>
                       </div>)
                }

                <div className="player" ref="player"></div>
            </div>
        )
    }
}
export default connect(
    state=>({...state}),
    {...action,...action1}
)(Minplayer)