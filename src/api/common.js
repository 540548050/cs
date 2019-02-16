import _mm from 'util/mm.js';
const getToken = () =>{
    return _mm.getStorage('token')
}
const Api = {
    uploadImg(data){
        return _mm.POST({
            url:'/wall/uploadIMG',
            data:data
        })
    }
}
export default Api;