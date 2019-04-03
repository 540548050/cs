import React,{Component} from 'react';
import style from './index.scss';
import {Provider}   from './react-redux/index.js'
import store from './store';
import Chilren from './children.js';
class Test extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <Provider store={store}>
                <Chilren name='qzz'/>
            </Provider>
        )
    }
}
export default Test;