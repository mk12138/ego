import base from './config' //基础路径
import axios, {
    get,
    post
} from '../utils/request'

const api = {
    //登录
    getLogin(params) {
        return post(base.login, params)
    },
    //注册
    setLogin(params) {
        return post(base.setlogin, params)
    },
    //商品列表接口
    getProductList(params) { //{page:xx}
        return get(base.projectList, params)
    },
    /**
     * 搜索接口 {search:xx}
     */
    getSearch(params) {
        return axios.get(base.search, {
            params
        })
    },

    /**
     * 选择类目  id
     */
    selectCategory(params) { //{id:cid}
        return get(base.selectCategory, params)
    },
    /**
     * 商品添加
     * title cid  category sellPoint price num desc paramsInfo image
     */
    insertTbItem(params) {
        return get(base.insertTbItem, params)
    },
    /**
     * 删除商品 {id:''}
     */
    deleteProduct(params) {
        return get(base.deleteProduct, params)
    },

    /**
     * 批量删除商品 {id:''}
     */
    deleteBatches(params) {
        return get(base.deleteBatches, params)
    },
    /**
     * 修改  title, sellPoint, price, cid,category,num, desc, paramsInfo,image, id
     */
    updateTbItem(params) {
        return get(base.updateTbItem, params)
    },
    /**
     * 规格参数列表
     */
    getParams(params) {
        return get(base.getParams, params)
    },
    /**
     * 增加规格参数配置
     * itemCatId,content,specsName
     */
    addRulesParams(params) {
        return get(base.addRulesParams, params)
    },
    //规格参数删除
    deleteparams(params) {
        return get(base.deleteparams, params)
    },
}

export default api