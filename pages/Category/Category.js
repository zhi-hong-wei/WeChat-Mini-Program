import { getCategory,
getSubcategory,
getCategoryDetail
} from "../../service/category"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categories: [],
    categoryData:{},
    currentIndex:0,
    ishidden:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this._getCategory()
  
    
  },
  _getCategory(){
    getCategory().then(res => {
      // console.log(res)
      const cate = res.data.category.list
      // 1.初始化每个类别的子数据
      const categoryData = {}
      for (let i = 0; i < cate.length; i++) {
        
        categoryData[i] = {
          // 此数组稍后取出第一项
          subcategories: [],  
          categoryDetail: []
          // categoryDetail: {
          //   'pop': [],
          //   'new': [],
          //   'sell': []
          // }
        }
      }
      // 2.修改data中的数据
      this.setData({
        categories: cate,
        categoryData: categoryData
      })
      this._getSubcategory(0)
      this._getCategoryDetail(0)
    })
  },
  _getSubcategory(currentIndex) {
    // 1.获取参数
    const maitkey = this.data.categories[currentIndex].maitKey;

    // 2.请求的数据
    getSubcategory(maitkey).then(res => {
      // console.log(res)
      const tempCategoryData = this.data.categoryData;
      tempCategoryData[currentIndex].subcategories = res.data.list;
      this.setData({
        categoryData: tempCategoryData
      })
    })
  },
  _getCategoryDetail(currentIndex) {
    // 1.获取对应的miniWallKey参数
    const miniWallKey = this.data.categories[currentIndex].miniWallkey;

    // 2.请求数据类别的数据，此处调用方法获取
    this._getRealCategoryDetail(currentIndex, miniWallKey, 'pop');
    // this._getRealCategoryDetail(currentIndex, miniWallKey, 'new');
    // this._getRealCategoryDetail(currentIndex, miniWallKey, 'sell');
  },
  _getRealCategoryDetail(currentIndex, miniWallKey, type) {
    getCategoryDetail(miniWallKey, type).then(res => {
      // console.log(res)
      // 1.获取categoryData
      const categoryData = this.data.categoryData;

      // 2.修改数据
      categoryData[currentIndex].categoryDetail = res;

      // 3.修改data中的数据
      this.setData({
        categoryData: categoryData
      })
    })
  },
  menuClick(e){
    // console.log(e)
    // 先打印才知道index位于哪里
    // 1.改变当前的currentIndex
    const currentIndex = e.detail.index;
    this.setData({
      currentIndex
    })

    // 2.请求对应currentIndex的数据
    this._getSubcategory(currentIndex);

    // 3.请求对应的currentIndex的详情数据
    this._getCategoryDetail(currentIndex)
  },
  hidden(){
    this.setData({
      ishidden:true
    })
  },
  show(){
    this.setData({
      ishidden: false
    })
  }
})