import React, {PureComponent} from 'react';
import './index.less';
import {connect} from 'react-redux';
import * as action from '../../../redux/actions/home';
import * as playaction from '../../../redux/actions/playList';

class HomeDetail extends PureComponent {
    constructor() {
        super();
        this.state = {flag: true, text1: "播放全部", text2: "播放全部", hotId: null, hotsongs: [],homestate:{}}
    };

    componentWillMount() {
    let hotId = this.props.match.params.id;
    this.props.getSong(hotId);
    this.setState({homestate:this.props.location.state});
    //this.props.clearHotSong();
}

    back = () => {
        this.props.history.goBack();
    };
    handleChange = () => {
        this.state.hotsongs=this.props.home.hotsongs;
        this.props.singerList(this.state.hotsongs);
        this.setState({flag: !this.state.flag});

    };
    handleClick=(item)=>{
        this.props.singOne(item);

    }



    render() {
        let {url,content}=this.state.homestate||{};
        return (
            <div className="detail-body">
                <img src={url}/>
                <div className="detail-text">
                    <i className="iconfont icon-goback" onClick={this.back}></i>
                    <marquee direction="left">{content}</marquee>
                </div>
                <div className="p" onClick={()=>this.handleChange()}>
                    <i className={this.state.flag ? "iconfont icon-zanting" : "iconfont icon-rectangle2"}></i>
                    {
                        this.state.flag ? <p>{this.state.text1}</p> : <p>{this.state.text2}</p>
                    }
                </div>
                {
                    this.props.home.hotsongs ? <div className="items">

                        {
                            this.props.home.hotsongs.map((item, index) => (
                                <div className="item" key={index} onClick={()=>this.handleClick(item)}>
                                        <h4>{item.song_name}</h4>
                                        <p>{item.song_info}</p>

                                </div>


                            ))


                        }</div> : <div className="items">正在加载...</div>
                }




                <div style={{height: "65px"}}></div>

            </div>
        )
    }
}

export default connect(
    state => ({...state}),
    {...action,...playaction}
)(HomeDetail)