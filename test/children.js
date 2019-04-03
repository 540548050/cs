import React,{Component} from 'react';
import {connect} from './react-redux';
class Test extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div>
                <div>{this.props.name}</div>
                <div>children</div>
                <div>{this.props.number}</div>
                <button onClick = {this.props.add}>添加</button>
            </div>
        )
    }
}
const mapStateToProps = state => state;
const mapActionToProps = dispatch =>({
    add(){
        dispatch({type:'add'})
    }
})
export default connect(mapStateToProps,mapActionToProps)(Test);