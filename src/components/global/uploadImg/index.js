import React,{Component} from 'react';
import { NavLink } from 'react-router-dom';
import {message,Modal,Button} from 'antd';
import commonApi from 'api/common.js';
import style from './index.scss';
// import uploadImg from 'images/zs2.png';
import _mm from 'util/mm.js';
import {connect} from 'react-redux';
// import Cropper from 'react-cropper';
import {SHOW_MODAL} from 'store/actionCreater.js';
//传入 getUrl 回调函数获取数据；
class UploadImg extends Component{
    constructor(props){
        super(props)
        this.state = {
            modalShow:false,
            imgBase64:'',
            initBase64:''
        }
    }
    upload(e){
        let _this = this;
        let file = e.target.files[0];
        let msg = _mm.checkFile(file,['jpg','jpeg','png','gif'],10);
        if(!msg.status){
            message.error(msg.message);
        }else{
            _mm.fileToBase64(file,function(data){
                _this.setState({
                    initBase64:data,
                    imgBase64:data
                })
            });
        }
    }
    _crop(){
        let imgBase64 = this.cropper.getCroppedCanvas().toDataURL();
       this.setState({
            imgBase64
       })
    }
    ok(){
        let {imgBase64} = this.state;
        if(!imgBase64){
            message.error('请先选择图片！')
        }else{
            commonApi.uploadImg({
                    data:imgBase64
                }).then(res=>{
                    this.props.getUrl(res,this.props.index);
                    this.setState({
                        modalShow:false,
                        imgBase64:'',
                        initBase64:''
                    })
                }).catch(err=>{
                    message.error(err);
                })
        }
    }
    render(){
        let {modalShow,imgBase64,initBase64} = this.state;
        return (
           <div>
                <div className={style.uploadDiv}>
                    <Button type='primary' onClick={(e)=>{this.props.showModal(e,(res)=>{this.props.getUrl(res,this.props.index)},this.props.aspectRatio)}}>替换</Button>
                    {/* <img onClick = {(e)=>{this.props.showModal(e,(res)=>{this.props.getUrl(res,this.props.index)},this.props.aspectRatio)}} src={this.props.imgUrl?this.props.imgUrl:this.props.defaultImgUrl} width={this.props.imgWidth} height={this.props.imgHeight}/> */}
                </div>
           </div>
                
        )
    }
}
UploadImg.defaultProps={
    imgWidth:328,
    imgHeight:140,
    index : 0,
    aspectRatio : 1334 / 750
}
const mapActionsToProps = (dispatch) =>{
    return {
        showModal:(e,fn,aspectRatio)=>{
            dispatch(SHOW_MODAL(fn,aspectRatio));
        }
    }
}
export default  connect(null,mapActionsToProps)(UploadImg);