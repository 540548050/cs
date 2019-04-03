import React,{Component} from 'react';
import propTypes from 'prop-types';
export default (mapStateToProps,mapActionToProps)=>(Com)=>{
    class ProxyComponent extends Component{
        static contextTypes = {
            store:propTypes.object
        }
        constructor(props,context){
            super(props,context)
            this.state = mapStateToProps(context.store.getState());
        }
        componentWillMount(){
            this.unSubscribe = this.context.store.subscribe(()=>{
                this.setState(mapStateToProps(this.context.store.getState()));
            })
        }
        componentWillUnMount(){
            this.unSubscribe();
        }
        render(){
            let action = typeof mapActionToProps === 'function'? mapActionToProps(this.context.store.dispatch):{};
            let obj = {
                ...this.state,
                ...action,
                ...this.props
            }
            return (
                <Com {...obj}/>
            )
        }
    }
    return ProxyComponent;
}