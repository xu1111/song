import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import * as play from '../../redux/actions/playList';
import * as action from '../../redux/actions/home';
import './index.less';
import $ from 'jquery';

class SingsList extends Component{
    constructor(){
        super();
        this.state={oneSong:null,index:null,playedSongs:[]};
        this.nameICOM="";
        this.text='循环播放';
        this.ary=[];
    }

    componentWillMount(){
        this.text='循环播放';
        this.ary=localStorage.getItem("myLikeSong")?JSON.parse(localStorage.getItem("myLikeSong")):[];
    }
    componentDidMount(){
        let songsList = JSON.parse(localStorage.getItem('songsList')) ? JSON.parse(localStorage.getItem('songsList')) : [];
        this.props.firstList(songsList);

        let newInd = null;
        if(this.props.playList.singOne){
            let singOneInd = this.props.playList.singerList.findIndex(item => item.id == this.props.playList.singOne.id);
            newInd = singOneInd;
            this.props.playOne(this.props.playList.singOne);
            this.state.oneSong = this.props.playList.singOne;
        }else if(JSON.parse(localStorage.getItem('curPlay'))){
            let curInd = JSON.parse(localStorage.getItem('songsList')).findIndex(item => {
                let playId = JSON.parse(localStorage.getItem('curPlay')).id;
                    return item.id == playId;
            });
            newInd = curInd;
            this.state.oneSong = JSON.parse(localStorage.getItem('curPlay'));
        }else{
            newInd = 0;
        }
        this.setState({index:newInd});

        let nowStorage = localStorage.getItem('recently');
        nowStorage ? null : localStorage.setItem('recently',JSON.stringify([]));
    }

    componentWillReceiveProps(nextProps){//this.props.playList.songOne
        window.onbeforeunload = () => {
            localStorage.setItem('songsList',JSON.stringify(this.props.playList.singerList));
            localStorage.setItem('curPlay',JSON.stringify(this.props.playList.singOne));
            return "quit?";
        };
        if(nextProps.playList.singOne){
            localStorage.setItem('curPlay',JSON.stringify(nextProps.playList.singOne));
            let newInd = nextProps.playList.singerList.findIndex(item => item.id == nextProps.playList.singOne.id);
            this.setState({index:newInd});
        }

        if(nextProps.playList.singOne != this.props.playList.singOne){
            if(nextProps.playList.singOne){
                if(localStorage.getItem('recently')){
                    JSON.parse(localStorage.getItem('recently')).filter(item => item.id != nextProps.playList.singOne.id)
                }
                this.state.playedSongs.push(nextProps.playList.singOne);
                this.setState({playedSongs:this.state.playedSongs},() => {
                    localStorage.setItem('recently',JSON.stringify(this.state.playedSongs));
                });
            }

        }

        if(this.props.playList.type==3){
            let oldInd = this.props.playList.singerList.indexOf(this.props.playList.singOne);
            let listLen = this.props.playList.singerList.length;
            if((nextProps.playList.nextSong-this.props.playList.nextSong)==1){//顺序循环的下一首歌曲
                let newInd =  (oldInd == listLen-1) ? 0 : oldInd + 1;
                this.props.playOne(this.props.playList.singerList[newInd]);
            }
            if((nextProps.playList.nextSong-this.props.playList.nextSong)==-1){//顺序循环的上一首歌曲
                let newInd =  (oldInd ==0) ? listLen-1 : oldInd - 1;
                this.props.playOne(this.props.playList.singerList[newInd]);
            }
        }
        if(this.props.playList.type==2){//随机播放
            let newInd =  Math.floor(Math.random() * this.props.playList.singerList.length);
            if((nextProps.playList.nextSong-this.props.playList.nextSong)==1){//随机播放的下一首歌曲
                this.props.playOne(this.props.playList.singerList[newInd]);
            }
            if((nextProps.playList.nextSong-this.props.playList.nextSong)==-1){//随机播放的上一首歌曲
                this.props.playList.singerList.length == 1 ? this.props.singOne(this.props.playList.singerList[0]) : this.props.playOne(this.state.playedSongs[this.state.playedSongs.length-2]);
            }
        }
        if(this.props.playList.type==1){   //单曲循环
            let oldInd = this.props.playList.singerList.indexOf(this.props.playList.singOne);
            if((nextProps.playList.nextSong-this.props.playList.nextSong)==1){//随机播放的下一首歌曲
                let oldInd = this.props.playList.singerList.indexOf(this.props.playList.singOne);
                this.props.playOne(this.props.playList.singerList[oldInd+1]);
            }
            if((nextProps.playList.nextSong-this.props.playList.nextSong)==-1){//随机播放的上一首歌曲
                if(this.props.playList.singerList.length == 1){
                    this.props.singOne(this.props.playList.singerList[0]);
                }else{
                    if(oldInd == 0){
                        this.props.singOne(this.props.playList.singerList[this.props.playList.singerList.length-1]);
                    }else {
                        this.props.singOne(this.props.playList.singerList[0]);
                    }
                }

            }
        }

        if(this.props.playList.singOne!=nextProps.playList.singOne){

        }

        this.ary=localStorage.getItem("myLikeSong")?JSON.parse(localStorage.getItem("myLikeSong")):[];


        if(!this.props.playList.singOne){
            if((nextProps.playList.nextSong-this.props.playList.nextSong)==1){//当歌单被清空，再发送下一首请求的时候
                this.props.singerList(JSON.parse(localStorage.getItem('recently')));
            }
        }


    }

    //点击关闭按钮该歌曲列表关闭
    handleSingsClick = (e) => {
        let singsMark = this.refs.singsMark;
        let propsCon = this.refs.propsCon;
        if(e.target.className == 'iconfont icon-shanchu'){
            singsMark.className += ' disBlo';
            propsCon.className += ' disBlo';
        }
    };

    //点击此行播放这首歌
    liClick=(i)=>{
        this.state.oneSong=this.props.playList.singerList.find((item,index)=>{
            return index==i;
        });
        this.props.playOne(this.state.oneSong);

        this.setState({oneSong:this.state.oneSong,index:i},()=>{
            let recent = JSON.parse(localStorage.getItem('recently'));
            if(recent == []){
                recent.push(this.state.oneSong);
            }else{
                recent = recent.filter((item,index) => item.id != this.state.oneSong.id);
                recent.push(this.state.oneSong);
            }
        });
    };

    //确认删除歌曲列表的弹出层事件
    handleDel = (e) => {
        let singsCon = this.refs.singsCon;
        let singsMark = this.refs.singsMark;
        let propsCon = this.refs.propsCon;
        if(e.target.innerText == "取消"){
            propsCon.className = 'prop-content';
            singsMark.className = 'sings-mark';
        }else if(e.target.innerText == "确定"){
            this.props.deleteAll();
            this.props.getList();
            propsCon.className = 'prop-content';
            singsMark.className = 'sings-mark';
        }
    };

    //播放顺序
    changeOrder = (e) => {
        switch (e.target.className){
            case 'iconfont icon-shunxubofang':   //顺序变随机
                e.target.className='iconfont icon-jiaochabiao-';
                this.props.changePlayorder(2);
                e.target.nextElementSibling.innerHTML = `随机播放<em>(${this.props.playList.singerList.length}首)</em>`;
                break;
            case 'iconfont icon-danquxunhuan':   //单曲变顺序
                e.target.className='iconfont icon-shunxubofang';
                this.props.changePlayorder(3);
                e.target.nextElementSibling.innerHTML = `循环播放<em>(${this.props.playList.singerList.length}首)</em>`;
                break;
            case 'iconfont icon-jiaochabiao-':    //随机变单曲
                e.target.className='iconfont icon-danquxunhuan';
                this.props.changePlayorder(1);
                e.target.nextElementSibling.innerHTML = `单曲循环`;
                break;
        }
    };

    //我喜欢的歌曲
    changeLike = (e,song) => {
        let nowClass = e.target.className;
        if(nowClass == 'iconfont icon-xin1'){
            e.target.className = 'iconfont icon-xin';
            let myLike = JSON.parse(localStorage.getItem('myLikeSong'));
            myLike = myLike.filter(item => item.id != song.id);
            localStorage.setItem('myLikeSong',JSON.stringify(myLike));
        }else{
            e.target.className = 'iconfont icon-xin1';
            if(localStorage.getItem('myLikeSong')){
                let myLike = JSON.parse(localStorage.getItem('myLikeSong'));
                myLike.push(song);
                localStorage.setItem('myLikeSong',JSON.stringify(myLike));
            }else{
                let myLike = [];
                myLike.push(song);
                localStorage.setItem('myLikeSong',JSON.stringify(myLike));
            }
        }
    };

    render(){

        let songs = this.props.playList.singerList;
        return (
            <div className="singsLi" style={{display:this.props.play.getPlayList?"block":"none"}}>
                <div className="sings-list-bg"></div>
                <div className="sings-content" ref="singsCon" onClick={this.handleSingsClick}>
                    <div className="sings-content-top">
                        <div className="sings-top-btn"><i className={this.nameICOM} onClick={(e) => this.changeOrder(e)}></i> <span>{this.text}</span></div>
                        <div><i className="iconfont icon-shanchu"></i></div>
                    </div>
                    <div className="sings-content-center">
                        <ul>
                            {
                                songs.map((song,index) => (
                                    <li key={index} data-song={song}>
                                        <div className="li-prev" onClick={()=>this.liClick(index)}>
                                            <i className={'iconfont'+ (index==this.state.index ? ' icon-16' : '')}></i>
                                            <span>{song.song_name} - <em>{song.singer}</em></span>
                                        </div>
                                        <div className="li-right">
                                            <i className={this.ary.find(item=>item.id==song.id)?"iconfont icon-xin1":"iconfont icon-xin"} onClick={(e) => this.changeLike(e,song)}></i>
                                            <i className="iconfont icon-delete2" onClick={() => this.props.deleteOne(song.id)}></i>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>

                        <Link className="sings-content-special" to={'/history'}>+ 添加歌曲到队列</Link>
                    </div>
                    <div className="sings-content-bottom" onClick={this.props.getList}>关闭</div>
                </div>
                <div className="sings-mark" ref='singsMark'></div>
                <div className="prop-content" ref='propsCon' onClick={this.handleDel}>
                    提示
                    <p>确定清空所有歌曲？</p>
                    <div>
                        <span style={{color:'#f3cf6a'}}>取消</span>
                        <span>确定</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({...state}),
    {...play,...action}
)(SingsList);