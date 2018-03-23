<!--诚信管理 -->
<template>
    <div class="body-wrap">
    <div class="body-btn-wrap">
      <!-- <Button type='primary'  @click='add'>增加诚信</Button> -->
    </div>

      <Card v-if="!updateSincerity">暂无</Card>
      <Card v-if="updateSincerity" :bordered="true">
            <p slot="title">诚信</p>
            <p>
              <span>诚信等级：</span>
              <span v-text="updateSincerity.level"></span>
            </p>
            <p>
              <span>已充值金额：</span>
              <span v-text="updateSincerity.money"></span>元
            </p>
            <p>
              <span>升级金额：</span>
              <span v-text="updateSincerity.upgradeMoney"></span>元
            </p>
            <p>
              <span>创建时间：</span>
              <span v-text="updateSincerity.createDate"></span>
            </p>
            <p>
              <span>更新时间：</span>
              <span v-text="updateSincerity.updateDate"></span>
            </p>
      </Card>
    </div>
</template>
<script>
export default {
  name: 'Sincerity',
  data () {
    return {
        params:{
            startNum:1,//初始化个数
            currentPage:1,//当前页
            pageNum:1,//获取的第几个开始
            pageSize:10,//每页的个数
            total:0//总数
        },
	  //修改参数
	  updateSincerity:{ },
	    sincerityList: [{}]
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
     * p.data 返回列表
     */
     this.params.accountId=this.$route.params.accountId
     this.axiosbusiness.getList(this,{
       countUrl:'/sincerity/count',
       listUrl:'/sincerity/list',
       data:'sincerityList',
       success:()=>{
         this.updateSincerity=this.sincerityList[0];
       }
     },this.params)
    },
  },
  created () {
    this.getList();
  },
  mounted () {

  }
}
</script>
