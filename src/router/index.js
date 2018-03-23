import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Main from '@/components/main/Main'
import ArticleCate from '@/components/main/article/ArticleCate'
import Article from '@/components/main/article/Article'
import ArticleComment from '@/components/main/article/ArticleComment'
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
import Notice from '@/components/main/config/Notice'
import TeamPurchaseInfo from '@/components/main/teamPurchaseInfo/TeamPurchaseInfo'


Vue.use(Router)

export default new Router({
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
        }
        ,
        {
          path: 'notice',
          name: '通知',
          component: Notice
        }
      ]
    }
  ]
})
