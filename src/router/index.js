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
import AccountParent from '@/components/main/account/AccountParent'
import Account from '@/components/main/account/Account'
import Withdrawals from '@/components/main/account/Withdrawals'
import VipNumber from '@/components/main/vip/VipNumber'
import Finance from '@/components/main/finance/Finance'
import FinanceRecord from '@/components/main/finance/FinanceRecord'
import Integral from '@/components/main/integral/Integral'
import IntegralDetail from '@/components/main/integral/IntegralDetail'
import IntegralBoard from '@/components/main/integral/IntegralBoard'
import Vip from '@/components/main/vip/Vip'
import VipGrowthRecord from '@/components/main/vip/VipGrowthRecord'
import Order from '@/components/main/order/Order'
import Config from '@/components/main/config/Config'
import Feedback from '@/components/main/config/Feedback'
import Notice from '@/components/main/config/Notice'
import AppVersion from '@/components/main/config/AppVersion'
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
          path: 'accountParent',
          name: '账户上级',
          component: AccountParent
        },
        {
          path: 'account',
          name: '账户',
          component: Account
        },
        {
          path: 'withdrawals',
          name: '提现',
          component: Withdrawals
        },
        {
          path: 'vipNumber',
          name: 'vip购买次数',
          component: VipNumber
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
          path: 'integralBoard',
          name: '积分排行榜',
          component: IntegralBoard
        },
        {
          path: 'vip/:accountId',
          name: 'vip',
          component: Vip
        },
        {
          path: 'vipGrowthRecord/:accountId',
          name: 'vip成长记录',
          component: VipGrowthRecord
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
          path: 'feedback',
          name: '意见反馈',
          component: Feedback
        }
        ,
        {
          path: 'notice',
          name: '通知',
          component: Notice
        }
        ,
        {
          path: 'appVersion',
          name: 'app版本',
          component: AppVersion
        }
      ]
    }
  ]
})
