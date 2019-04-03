import React,{Component} from 'react';
import propTypes from 'prop-types';
 class Provider extends Component{
    static childContextTypes = {
        store : propTypes.object
    }
    constructor(props){
        super(props)
    }
    getChildContext(){
        return {
            store:this.props.store
        }
    }
    render(){
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}
export default Provider;