import React,{Component} from 'react';
import * as play from '../../redux/actions/playList';
import * as action from '../../redux/actions/home';
import {connect} from 'react-redux';
import {Link}from 'react-router-dom';
import './index.less';

class AddToList extends Component{
    constructor(){
        super();
        this.state = {success:false};
    }
    //添加歌曲li点击事件
    handleAdd = (item) => {
        this.props.addOne(item);
        console.log(this.refs.addFinished);
        this.refs.addFinished.disabled = true;
        this.setState({success:true},() => {
            setTimeout(() => {
                this.setState({success:false});
                this.refs.addFinished.disabled = false;
            },1500);
        });
    };
    componentWillUnmount(){
        localStorage.setItem('songsList',JSON.stringify(this.props.playList.singerList));
        // localStorage.setItem('curPlay',JSON.stringify(this.props.playList.singOne));
    }
    render(){
        return(
            <div className="sings-add">
                {
                    this.state.success ? <div className='add-success'>添加成功</div> : null
                }
                <div className="sings-add-header">添加歌曲到列表<button ref='addFinished' onClick={() => this.props.history.goBack()}>完成</button></div>
                <Link to="/search" onClick={this.props.getList}><div className="search-sings">
                    <i className="iconfont icon-sousuo"></i>搜索歌曲
                </div>
                </Link>

                <div className="sings-classify-list">
                    <div className="sings-classify">
                        最近播放
                    </div>
                    <div className="sings-classList">
                        <ul ref="recently">
                            {localStorage.getItem('recently')?( JSON.parse(localStorage.getItem('recently')).reverse().splice(0,10).map((item,index) => (
                                    <li key={index} onClick={() => this.handleAdd(item)}>
                                        <div>
                                            {item.song_name}
                                            <p>{item.song_info}</p>
                                        </div>
                                        <div className="add-songs"><span>+</span></div>
                                    </li>
                                ))):""

                            }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({...state}),
    {...play,...action}
)(AddToList);