import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Main from '@/components/main/Main'
import ArticleCate from '@/components/main/article/ArticleCate'
import Article from '@/components/main/article/Article'
import ArticleComment from '@/components/main/article/ArticleComment'
import MerSearch from '@/components/main/mer/MerSearch'
import MerCommon from '@/components/main/mer/MerCommon'
import MerCate from '@/components/main/mer/MerCate'
import Mer from '@/components/main/mer/Mer'
import MerCardCipher from '@/components/main/mer/MerCardCipher'
import MerNotice from '@/components/main/mer/MerNotice'
import MerImg from '@/components/main/mer/MerImg'
import VideoSetCate from '@/components/main/video/VideoSetCate'
import VideoSetSearch from '@/components/main/video/VideoSetSearch'
import VideoSet from '@/components/main/video/VideoSet'
import VideoSetTag from '@/components/main/video/VideoSetTag'
import VideoCache from '@/components/main/video/VideoCache'
import VideoPlayRecord from '@/components/main/video/VideoPlayRecord'
import VideoSetCollect from '@/components/main/video/VideoSetCollect'
import Video from '@/components/main/video/Video'
import AccountLevel from '@/components/main/account/AccountLevel'
import Account from '@/components/main/account/Account'
import BankCard from '@/components/main/account/BankCard'
import Sincerity from '@/components/main/account/Sincerity'
import Withdrawals from '@/components/main/account/Withdrawals'
import Finance from '@/components/main/finance/Finance'
import FinanceRecord from '@/components/main/finance/FinanceRecord'
import Integral from '@/components/main/integral/Integral'
import IntegralDetail from '@/components/main/integral/IntegralDetail'
import Order from '@/components/main/order/Order'
import Config from '@/components/main/config/Config'
import Banner from '@/components/main/config/Banner'
import Notice from '@/components/main/config/Notice'
import TeamPurchaseInfo from '@/components/main/teamPurchaseInfo/TeamPurchaseInfo'
import Role from '@/components/main/rolePermission/Role'
import Permission from '@/components/main/rolePermission/Permission'
import RolePermission from '@/components/main/rolePermission/RolePermission'


Vue.use(Router)

const router= new Router({
 // export default new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      redirect: "/index"
    },
    {
      path: '/index',
      name: '首页',
      component: Index
    },
    {
      path: '/main',
      name: '主页',
      component: Main,
      children:[
        {
          path: 'articleCate',
          name: '文章分类',
          component: ArticleCate
        },
        {
          path: 'article',
          name: '文章',
          component: Article,
        },
        {
          path: 'merSearch',
          name: '商品搜索',
          component: MerSearch
        },
        {
          path: 'merCommon',
          name: '商品公用',
          component: MerCommon
        },
        {
          path: 'merCate',
          name: '商品类型',
          component: MerCate
        },
        {
          path: 'mer',
          name: '商品',
          component: Mer
        },
        {
          path: 'merCardCipher/:merId',
          name: '商品卡密',
          component: MerCardCipher
        },
        {
          path: 'merNotice/:merId',
          name: '商品公告',
          component: MerNotice
        },
        {
          path: 'merImg/:merId',
          name: '商品图片',
          component: MerImg
        },
        {
          path: 'articleComment/:articleId',
          name: '文章评论',
          component: ArticleComment
        },
        {
          path: 'videoSetCate',
          name: '视频集类型',
          component: VideoSetCate
        },
        {
          path: 'videoSetSearch',
          name: '视频集搜索',
          component: VideoSetSearch
        },
        {
          path: 'videoSet',
          name: '视频集',
          component: VideoSet
        },
        {
          path: 'videoSetTag/:videoSetId',
          name: '视频集标签',
          component: VideoSetTag
        },
        {
          path: 'video/:videoSetId',
          name: '视频',
          component: Video
        },
        {
          path: 'videoCache',
          name: '视频缓存',
          component: VideoCache
        },
        {
          path: 'videoPlayRecord',
          name: '视频播放记录',
          component: VideoPlayRecord
        },
        {
          path: 'videoSetCollect',
          name: '视频集收藏',
          component: VideoSetCollect
        },
        {
          path: 'accountLevel',
          name: '账户等级',
          component: AccountLevel
        },
        {
          path: 'account',
          name: '账户',
          component: Account
        },
        {
          path: 'account',
          name: '账户',
          component: Account,
          children:[
            {
              path: 'managerAccount',
              name: '管理员账户',
              component: Account
            },
            {
              path: 'userAccount',
              name: '用户账户',
              component: Account
            },
            {
              path: 'spreadAccount',
              name: '推广户账户',
              component: Account
            },
            {
              path: 'sellerAccount',
              name: '商户账户',
              component: Account
            }
          ]
        },
        {
          path: 'bankCard/:accountId',
          name: '银行卡',
          component: BankCard
        },
        {
          path: 'sincerity/:accountId',
          name: '诚信',
          component: Sincerity
        },
        {
          path: 'withdrawals',
          name: '提现',
          component: Withdrawals
        },
        {
          path: 'finance/:accountId',
          name: '财务',
          component: Finance
        },
        {
          path: 'financeRecord/:accountId',
          name: '财务记录',
          component: FinanceRecord
        },
        {
          path: 'integral/:accountId',
          name: '积分',
          component: Integral
        },
        {
          path: 'integralDetail/:accountId',
          name: '积分详情',
          component: IntegralDetail
        },
        {
          path: 'teamPurchaseInfo/:accountId',
          name: '团购信息',
          component: TeamPurchaseInfo
        },
        {
          path: 'order',
          name: '订单',
          component: Order
        },
        {
          path: 'config',
          name: '公共配置',
          component: Config
        },
        {
          path: 'banner',
          name: 'banner',
          component: Banner
        }
        ,
        {
          path: 'notice',
          name: '通知',
          component: Notice
        },
        {
          path: 'role',
          name: '角色',
          component: Role
        },
        {
          path: 'permission',
          name: '权限',
          component: Permission
        },
        {
          path: 'rolePermission/:roleId',
          name: '角色权限',
          component: RolePermission
        }
      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  if(to.fullPath.indexOf("role")>0
  ||to.fullPath.indexOf("permission")>0
  ||to.fullPath.indexOf("rolePermission")>0){
    //判断是否超级管理员，是就显示账户管理
    if(sessionStorage.getItem("account")){
      let account=JSON.parse(sessionStorage.getItem("account"));
      if(account.role.name=="超级管理员"){
        next()
      }else{
        next(false)
      }
    }
  }else{

    next()
  }

  
})
export default router