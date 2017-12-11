import React, {Component} from 'react';
import "../../../node_modules/jquery/dist/jquery"
import './index.less'
import {MUSIC_LIST} from '../../common/MusicList'
import getString from '../../api/method';
import *as action from '../../redux/actions/playList';
import {connect}from 'react-redux'


 class Singer extends Component {
    constructor() {
        super();
        this.state = {miss: 'singer-false',
            item: '', sings: [],
            list:MUSIC_LIST.sort(function(a,b){
                return getString(a.singer.slice(0,2)).localeCompare(getString(b.singer.slice(0,2)))})
            ,flag:"",
            singetrHotPink:'热门',
            singerStyle:''
    };
    this.flag="";
    this.flag1=""
    }

    handleClick = (item) => {
        let singerHotHot=item
        let aabbcc=MUSIC_LIST.filter(item => item.singer==singerHotHot)



        item=typeof(item)=="string"?aabbcc[0]:item;

        if (this.state.miss === 'singer-false') {
            MUSIC_LIST.map((data, index) => {
                if (item.singer == data.singer) {
                    this.state.sings.push(data);
                    this.setState({miss: 'singers-true', item})
                }
            })
        } else {
            this.setState({miss: 'singer-false', sings: []})
        }
    };
     handleClickPosition=(e)=>{

         for(var key in this.refs) {
             if(e.target.innerHTML=="热"){

                 this.refs.singerPosition.scrollTop=0
             }

             if(key.toLowerCase()==e.target.innerHTML){
                 this.refs.singerPosition.scrollTop=this.refs[key].offsetTop-80
             }

         }
     }
     singerScroll=(e)=>{
         if((this.refs["A"].offsetTop-e.target.scrollTop)>100){

             this.refs.singerHot.className="active";
             this.refs.memeda.childNodes.forEach(item=>{
                 if(item.innerHTML=="热"){
                     this.setState({singetrHotPink:"热门"})
                     return
                 }
                 item.className='';
             })
         };
         for(var key in this.refs) {

             if(key!='memeda'&&key!='singerHot'&&key!="singerPosition"){
                 /*
              console.log(this.refs[key].offsetTop-this.refs.scroll.scrollTop,key);*/


                 if ((this.refs[key].offsetTop-e.target.scrollTop)<100) {

                     this.refs.memeda.childNodes.forEach(item=>{
                         if(item.innerHTML==key.toLowerCase()){

                             this.setState({singetrHotPink:key})
                             item.className="active"
                         }else{
                             item.className='';
                         }})
                 }
             }
         }
     }

    handlePlayAll=()=>{
        this.props.singerList(this.state.sings)
}
    handlePlayThisOne=(item)=>{
        this.props.singOne(item);
    }


    render() {
        let singerAbc=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];


        return (
            <div className="singer-all " >
                <div className="singer-first">
                    <div className="singer-header"></div>
                    <div className="singer-keyword">
                        <span className="singer-keywords"> {this.state.singetrHotPink} </span>
                    </div>
                    <div className="singer-scroll" ref="singerPosition"  onScroll={this.singerScroll}>


                        <ul>
                            <li className="singer-one" onClick={() => this.handleClick("周杰伦")}  >
                                <img src="//y.gtimg.cn/music/photo_new/T002R300x300M000000MkMni19ClKG.jpg?max_age=2592000"
                                     className="singer-image" alt=""/>
                                <span className="singer-name">周杰伦</span>
                            </li>
                            <li className="singer-one" onClick={() => this.handleClick("张杰")}  >
                                <img src="//y.gtimg.cn/music/photo_new/T002R300x300M000002gnOZC4T8gXF.jpg?max_age=2592000"
                                     className="singer-image" alt=""/>
                                <span className="singer-name">张杰</span>
                            </li>
                            <li className="singer-one" onClick={() => this.handleClick("本兮")}  >
                                <img src="http://tupian.enterdesk.com/2016/hxj/12/122706/e37e6ee4d4dbbbf3015d057c86b93.jpg"
                                     className="singer-image" alt=""/>
                                <span className="singer-name">本兮</span>
                            </li>
                            <li className="singer-one" onClick={() => this.handleClick("邓丽君")}  >
                                <img src="http://www3.yxlady.com/yl/UploadFiles_5361/2013086/2013080615111956.jpg"
                                     className="singer-image" alt=""/>
                                <span className="singer-name">邓丽君</span>
                            </li>
                            <li className="singer-one" onClick={() => this.handleClick("金志文")}  >
                                <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1504189200552&di=725ad9276820aaca28c43f9bf3006a23&imgtype=0&src=http%3A%2F%2Fimg.9ku.com%2Fgeshoutuji%2Fsingertuji%2F3%2F3287%2F3287_5.jpg"
                                     className="singer-image" alt=""/>
                                <span className="singer-name">金志文</span>
                            </li>


                            {
                                this.state.list.map((item, index) => {
                                    if(getString(item.singer)[0]!=this.flag){
                                        this.flag=getString(item.singer)[0];
                                        this.flag1=item.singer;


                                        return(
                                            <li key={index} className="singer-one" onClick={() => this.handleClick(item)}  >
                                           <p ref={getString(item.singer)[0]}>&nbsp;{getString(item.singer)[0]}</p>
                                            <img src={item.singer_img}
                                        className="singer-image" alt=""/>
                                            <span className="singer-name"> {item.singer} </span>
                                    </li>)

                                    }else{
       if(item.singer!=this.flag1){
           this.flag1=item.singer;
           return (

               <li key={index} className="singer-one" onClick={() => this.handleClick(item)}>
                   <img src={item.singer_img}
                        className="singer-image" alt=""/>
                   <span className="singer-name"> {item.singer} </span>
               </li>)
       }
               return ""                         }

                            })
                            }
                        </ul>
                        <div className="singer-bottom"></div>
                    </div>
                    <div className="singer-right" ref="memeda">
                        <p ref="singerHot" className="active" onClick={(e)=>this.handleClickPosition(e)}>热</p>
                        {
                            singerAbc.map((item,index)=>(
                                <p key={index}  style={this.state.singerStyle=="热"?{offsetTop:0}:{opacity:1}}  onClick={(e)=>this.handleClickPosition(e)}>{item}</p>
                            ))

                        }
                    </div>
                </div>
                <div className={this.state.miss}>
                    <div className="singers-image">
                        <img src={this.state.item.singer_img} alt=""/>
                        <i className="singers-back" onClick={this.handleClick}></i>
                        <div className="singer-play" onClick={this.handlePlayAll}>
                            <strong className="iconfont icon-zanting"> </strong>
                            <strong> 播放全部</strong>
                        </div>
                    </div>
                    <div className="singers-singer">
                        <ul>
                            {
                                this.state.sings.map((item, index) => (
                                    <li className="singers-list" key={index} onClick={()=>this.handlePlayThisOne(item)}>
                                        <strong className="singers-singName">{item.song_name}</strong>
                                        <span className="singer-singerName">{item.song_info}</span>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
export default connect(state=>({...state}),action)(Singer)
