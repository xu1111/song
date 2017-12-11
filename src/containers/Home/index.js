import React, {Component} from 'react';
import './index.less';
import Swiper from "../../components/Swiper/index";
import {Link} from 'react-router-dom';

import {connect} from 'react-redux';
import * as action from '../../redux/actions/home';
import * as playaction from '../../redux/actions/playList';
import util from '../../common/util';
class Home extends Component {

    componentDidMount() {
        //判断redux中是否存放数据 如果有则不去获取数据
        if (this.props.home.sliders.length === 0) {
            this.props.getSlider();
        }
        if (this.props.home.hots.length === 0) {
            this.props.getHot();
        }
        if(this.props.home.hots.length>0){
            //将记录好的滚动条状态取出来赋给content元素
            this.forceUpdate();//让所有组件前置更新
            this.refs.scroll.scrollTop=util.get('homeLocation');
        }
    };
    componentWillUnmount() {//组件将要销毁的时候 记住滚动条的位置
        // sessionStorage.setItem()
        util.set('homeLocation',this.refs.scroll.scrollTop);
    }

    render() {

        return (
            <div className="content home" ref="scroll">
                <Swiper data={this.props.home.sliders}/>

                <div className="items">
                    <h3>热门歌单推荐</h3>
                    {
                        this.props.home.hots.length ? <div>{
                            this.props.home.hots.map((item, index) => (
                                <Link to={{pathname:`/home/detail/${item.hotId}`,state:item}} className="item" key={index} onClick={()=>this.props.sendId(item.hotId)}>
                                    <img src={item.url} alt="主题图片"/>
                                    <div className="right">
                                        <h4>{item.title}</h4>
                                        <p>{item.content}</p>
                                    </div>
                                </Link>
                            ))
                        }</div> : <div>正在加载...</div>
                    }

                </div>
                <div style={{height: "65px"}}></div>
            </div>
        )
    }
}

export default connect(
    state => ({...state}),
    {...action,...playaction}
)(Home);
