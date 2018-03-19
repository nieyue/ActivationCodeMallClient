<!--团购信息管理 -->
<template>
    <div class="body-wrap">
        <div style="text-align:center;" v-if="!isHaveTeamPurchaseInfo">暂无团购信息</div>
        <Card :bordered="false" v-if="isHaveTeamPurchaseInfo">
            <p slot="title">团购信息</p>
            <p>
                <div>
                    <small>团购卡余量：</small>
                    <span v-text="teamPurchaseInfoList[0].teamPurchaseCardAllowance"></span>
                </div>
                <div>
                    <small>已团购（张）：</small>
                    <span v-text="teamPurchaseInfoList[0].alreadyTeamPurchase"></span>
                </div>
                <div>
                    <small>待处理（张）：</small>
                    <span v-text="teamPurchaseInfoList[0].waitDispose"></span>
                </div>
                <div>
                    <small>待处理总额：</small>
                    <span v-text="teamPurchaseInfoList[0].waitDisposePrice"></span>
                </div>
                <div>
                    <small>待处理更新时间：</small>
                    <span v-text="teamPurchaseInfoList[0].waitDisposeUpdateDate"></span>
                </div>
                <div>
                    <small>团购成功（张）：</small>
                    <span v-text="teamPurchaseInfoList[0].teamPurchaseSuccess"></span>
                </div>
                <div>
                    <small>团购成功总额：</small>
                    <span v-text="teamPurchaseInfoList[0].teamPurchaseSuccessPrice"></span>
                </div>
                <div>
                    <small>团购成功更新时间：</small>
                    <span v-text="teamPurchaseInfoList[0].teamPurchaseSuccessUpdateDate"></span>
                </div>
                <div>
                    <small>已拆分（张）：</small>
                    <span v-text="teamPurchaseInfoList[0].alreadySplit"></span>
                </div>
                <div>
                    <small>已拆分总额：</small>
                    <span v-text="teamPurchaseInfoList[0].alreadySplitPrice"></span>
                </div>
                <div>
                    <small>已拆分更新时间：</small>
                    <span v-text="teamPurchaseInfoList[0].alreadySplitUpdateDate"></span>
                </div>
                <div>
                    <small>已推荐给上级（张）：</small>
                    <span v-text="teamPurchaseInfoList[0].alreadyRecommend"></span>
                </div>
                <div>
                    <small>已推荐给上级总额：</small>
                    <span v-text="teamPurchaseInfoList[0].alreadyRecommendPrice"></span>
                </div>
                <div>
                    <small>已推荐给上级更新时间：</small>
                    <span v-text="teamPurchaseInfoList[0].alreadyRecommendUpdateDate"></span>
                </div>
                <div>
                    <small>创建时间：</small>
                    <span v-text="teamPurchaseInfoList[0].createDate"></span>
                </div>
                <div>
                    <small>更新时间：</small>
                    <span v-text="teamPurchaseInfoList[0].updateDate"></span>
                </div>
            </p>
        </Card>
    </div>
    
</template>
<script>
export default {
  name: 'TeamPurchaseInfo',
  data () {
    return {
        params:{
            startNum:1,//初始化个数
            currentPage:1,//当前页
            pageNum:1,//获取的第几个开始
            pageSize:10,//每页的个数
            total:0//总数
        },
        isHaveTeamPurchaseInfo:false,//是否有团购信息，默认没有
	    teamPurchaseInfoList: []
    }
  },
  methods: {
    //分页点击
    selectPage (currentPage) {
      this.params.currentPage=currentPage;
      this.params.pageNum = (this.params.currentPage-1)*this.params.pageSize+this.params.startNum;
      this.getList()
    },
  //获取列表
   getList () {
     /**
     * 获取列表
     * $this  vue组件
     * p.countUrl 数量url
     * p.listUrl 列表url
     * p.list 返回列表
     */
    this.params.accountId=this.$route.params.accountId
     this.axiosbusiness.getList(this,{
       countUrl:'/teamPurchaseInfo/count',
       listUrl:'/teamPurchaseInfo/list',
       list:'teamPurchaseInfoList',
       success:()=>{
           if(this.teamPurchaseInfoList.length>0){
               this.isHaveTeamPurchaseInfo=true;
           }
       }
     },this.params)
    }
  },
  created () {
    this.getList();
  },
  mounted () {

  }
}
</script>
