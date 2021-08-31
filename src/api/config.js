/**
 * 基础的接口地址
 */
const base={
    baseUrl:'http://localhost:8888',//基础地址
    login:'/api/login',//登录接口
    setlogin:'/api/register',//注册接口
    projectList:'/api/projectList',//商品列表接口
    search:'/api/search',//搜索接口
    selectCategory:'/api/backend/itemCategory/selectItemCategoryByParentId',//类目选择 /category/data
    uploadUrl:'/upload',//上图图片
    insertTbItem:"/api/backend/item/insertTbItem",//商品添加
    deleteProduct:"/api/backend/item/deleteItemById",//删除商品列表
    deleteBatches:'/api/batchDelete',//批量删除
    updateTbItem:'/api/backend/item/updateTbItem',//修改
    getParams:"/api/backend/itemParam/selectItemParamAll",//规格参数列表
    addRulesParams:"/api/backend/itemParam/insertItemParam",//规格参数配置
    deleteparams:" /api/params/delete",//规格参数删除
}

export default  base