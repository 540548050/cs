import _mm from 'util/mm.js';
const getToken = () =>{
    return _mm.getStorage('token')
}
const Api = {
    //浏览量统计
    getBrowseData(data){
        return _mm.POST({
            url:'/data/browseData',
            data:data
        })
    },
    //获取展示墙列表
    getWallList(data){
        return _mm.POST({
            url:'/data/itemData',
            data:data
        })
    }
}
export default Api;