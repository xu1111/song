import React,{Component} from 'react';
import './index.less'
import Sear from "./sear";
import {connect}from"react-redux";
import * as action from '../../redux/actions/home';
import getString from "../../method";
 class Search extends Component{
    constructor(){
        super();
        this.state={value:'',flag:true,list:[]}
    }
    searchHot=(e)=>{
        if(e.target.tagName=="LI"){
            this.setState({value:e.target.innerHTML})
        }
    };
    searchHistory=(e)=>{

        if(e.target.tagName=="LI"){
           let ary= e.target.childNodes;
           for(var i=0;i<ary.length;i++){
               if(ary[i].tagName=='SPAN'){
                   this.setState({value:ary[i].innerHTML})
               }
           }
        }
        if(e.target.tagName=="SPAN"){
            this.setState({value:e.target.innerHTML})
        }

    };
    handleClick=()=>{
        if(/^(|\s+)$/.test(this.state.value)){

        }else{
            let ary=localStorage.getItem("singList");
            if(ary==null){
                console.log(1);
                ary=[this.state.value]
            }else{
                ary=JSON.parse(ary);
                ary=ary.filter((item,index)=>item!=this.state.value);
                ary.unshift(this.state.value)
            }
            localStorage.setItem("singList",JSON.stringify(ary));
            this.setState({flag:false});

           let list= this.props.search.getList.filter((item,index)=>{
                return(item.singer.startsWith(this.state.value)||item.song_name.startsWith(this.state.value)||getString(item.singer).toLowerCase().startsWith(this.state.value.toLowerCase())||getString(item.song_name).toLowerCase().startsWith(this.state.value.toLowerCase()))
            });
           this.setState({list})



        }
    };
    giveHerSon=()=>{
        this.setState({flag:true});
        this.setState({value:""})
    };
    remove=(e)=>{
        e.preventDefault();
        let ary=localStorage.getItem("singList");
        ary=JSON.parse(ary);
        ary=ary.filter((item,index)=>index!=e.target.getAttribute("alt"));
        localStorage.setItem("singList",JSON.stringify(ary));
        this.forceUpdate();
    };
    removeAll=()=>{
            localStorage.removeItem("singList");
            this.forceUpdate();//强制刷新组件
};




    componentWillMount(){
            if(this.props.search.getList.length===0){
                this.props.getAllList();
            }

    }
    render(){
        return (
            <div className="sear-box">
                <div className="content">
                    <div className=" search">
                        <div className="search-box">
                            <i className="iconfont icon-sousuo" onClick={this.handleClick}></i>
                            <input type="text" className="searBox" placeholder="搜索歌曲、歌手" value={this.state.value} onChange={(e)=>{this.setState({value:e.target.value})}}/>
                        </div>
                        <h4 className="first-title">热门搜索</h4>
                        <ul className="search-hot" onClick={this.searchHot}>
                            <li>周杰伦</li>
                            <li>胡歌</li>
                            <li>我要你</li>
                            <li>沉默是金</li>
                            <li>梁咏琪</li>
                            <li>我的滑板鞋</li>
                            <li>张国荣</li>
                            <li>爷爷泡的茶</li>
                            <li>远走高飞</li>

                        </ul>
                        <h4 className="second-title">搜索历史</h4>
                        <i className="iconfont icon-shanchu" style={{display:localStorage.getItem("singList")==null||JSON.parse(localStorage.getItem("singList")).length==0?"none":"block"}} onClick={this.removeAll}></i>
                        <ul className="search-history" onClick={this.searchHistory} ref="history">
                            {
                                localStorage.getItem("singList")==null||JSON.parse(localStorage.getItem("singList")).length==0?"":JSON.parse(localStorage.getItem("singList")).map(
                                    (item,index)=>(
                                        <li key={index}><span>{item}</span> <i className="iconfont icon-delete2" onClick={this.remove} alt={index}></i></li>
                                    )
                                )
                            }
                            <div style={{height:'65px'}}></div>
                        </ul>
                    </div>
                </div>
                <Sear flag={this.state.flag}  giveHerSon={this.giveHerSon} list={this.state.list} value={this.state.value} />

            </div>

        )
    }
}

export default connect(
    state=>({...state}),
    action
)(Search)