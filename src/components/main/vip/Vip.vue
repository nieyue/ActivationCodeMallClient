<!--vip管理 -->
<template>
    <div class="body-wrap">
      <Table border  :columns='vipColumns' :data='vipList' ref='table' size="small"></Table>
        <div style='display: inline-block;float: right; margin-top:10px;'>
        <Page style='margin-right:10px;' :total='params.total' :pageSize='params.pageSize' ref='page' :show-total='true'   @on-change='selectPage' show-elevator ></Page>
      </div>
    </div>
    
</template>
<script>
export default {
  name: 'Vip',
  data () {
    return {
        params:{
            startNum:1,//初始化个数
            currentPage:1,//当前页
            pageNum:1,//获取的第几个开始
            pageSize:10,//每页的个数
            total:0//总数
        },
      /**
       *状态
       * 
       */
      statusList:[
        {id:0,value:'到期'},
        {id:1,value:'没到期'}
      ],
	    vipList: [],
	    vipColumns: [
        {
          title: '序号',
          align:'center',
          render: (h, params) => {
            return h('span', params.index
            +(this.params.currentPage-1)*this.params.pageSize+this.params.startNum);
          }
        },
        {
          title: 'vipid',
          key: 'vipId',
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
        	title:'状态',
            key:'status',
            align:'center',
          render: (h, params) => {
            let statusvalue="";
            this.statusList.forEach(element => {
              if(element.id==params.row.status){
                statusvalue=element.value;
              }
            });
             return  h('span',statusvalue);
          }
        },
        {
          title:'到期时间',
          key:'expireDate',
          sortable: true,
          align:'center'
        },
        {
          title:'创建时间',
          key:'createDate',
          sortable: true,
          align:'center'
        },
        {
          title:'修改时间',
          key:'updateDate',
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
       countUrl:'/vip/count',
       listUrl:'/vip/list',
       list:'vipList'
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
