import React,{Component} from 'react';
import Header from "../components/Header/index";
import Player from "./Player/index";
import MinPlayer from '../components/Minplayer';
import SingsList from '../containers/SingsList';
export default class App extends Component{
    render(){
        return (
            <div style={{width:'100%',height:'100%'}}>
                <Header/>
                {this.props.children}
                <MinPlayer/>
                <Player/>
                <SingsList/>
            </div>
        )
    }
}
