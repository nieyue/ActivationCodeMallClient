<!--视频集收藏管理 -->
<template>
    <div class="body-wrap">
      <Table border :columns='videoSetCollectColumns' :data='videoSetCollectList' ref='table' size="small"></Table>
        <div style='display: inline-block;float: right; margin-top:10px;'>
        <Page style='margin-right:10px;' :total='params.total' :pageSize='params.pageSize' ref='page' :show-total='true'  @on-change='selectPage' show-elevator ></Page>
      </div>
    </div>
</template>
<script>
export default {
  name: 'videoSetCollect',
  data () {
    return {
        params:{
            startNum:1,//初始化个数
            currentPage:1,//当前页
            pageNum:1,//获取的第几个开始
            pageSize:10,//每页的个数
            total:0//总数
        },
      //状态
      statusList:[
        {id:0,value:'下架'},
        {id:1,value:'上架'}
        ],
      //列表
         videoSetCollectList: [],
	     videoSetCollectColumns: [
        {
          title: '序号',
          width:100,
          align:'center',
          render: (h, params) => {
            return h('span', params.index
            +(this.params.currentPage-1)*this.params.pageSize+this.params.startNum);
          }
        },
        {
          title: '视频集收藏id',
          key: 'videoSetCollectId',
          align:'center'
        },
        {
          title: '视频集id',
          key: 'videoSetId',
          align:'center'
        },
        {
          title: '观看者id',
          key: 'accountId',
          align:'center'
        },
        {
            title:'视频集收藏名称',
            key:'name',
            align:'center'
        },
        {
        	title:'封面',
        	key:'imgAddress',
          align:'center',
          render: (h, params) => {
            return h('img', {
              attrs: {
                src: params.row.imgAddress
              },
              style: {
                width: '45px'
              }
            })
          }
        },
        {
          title: '时长',
          key: 'duration',
          align:'center'
        },
        {
          title: '容量,MB',
          key: 'size',
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
     //根据id获取数据
     this.axiosbusiness.getList(this,{
       countUrl:'/videoSetCollect/count',
       listUrl:'/videoSetCollect/list',
       list:'videoSetCollectList'
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
