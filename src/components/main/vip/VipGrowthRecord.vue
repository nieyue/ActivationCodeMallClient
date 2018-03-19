<!--VipGrowthRecord成长记录管理 -->
<template>
    <div class="body-wrap">
      <Table border  :columns='vipGrowthRecordColumns' :data='vipGrowthRecordList' ref='table' size="small"></Table>
        <div style='display: inline-block;float: right; margin-top:10px;'>
        <Page style='margin-right:10px;' :total='params.total' :pageSize='params.pageSize' ref='page' :show-total='true'   @on-change='selectPage' show-elevator ></Page>
      </div>
    </div>
    
</template>
<script>
export default {
  name: 'VipGrowthRecord',
  data () {
    return {
        params:{
            startNum:1,//初始化个数
            currentPage:1,//当前页
            pageNum:1,//获取的第几个开始
            pageSize:10,//每页的个数
            total:0//总数
        },
	    vipGrowthRecordList: [],
	    vipGrowthRecordColumns: [
        {
          title: '序号',
          align:'center',
          render: (h, params) => {
            return h('span', params.index
            +(this.params.currentPage-1)*this.params.pageSize+this.params.startNum);
          }
        },
        {
          title: 'vip成长记录Id',
          key: 'vipGrowthRecordId',
          align:'center'
        },
        {
          title: '等级名',
          key: 'name',
          align:'center'
        },
        {
          title: '等级',
          key: 'level',
          align:'center'
        },
        {
        	title:'金额',
            key:'price',
            align:'center'
        },
        {
          title:'创建时间',
          key:'createDate',
          sortable: true,
          align:'center'
        }
      ],
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
       countUrl:'/vipGrowthRecord/count',
       listUrl:'/vipGrowthRecord/list',
       list:'vipGrowthRecordList'
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
