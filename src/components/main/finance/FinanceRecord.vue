<!--财务记录管理 -->
<template>
    <div class="body-wrap">
      <Table border  :columns='financeRecordColumns' :data='financeRecordList' ref='table' size="small"></Table>
        <div style='display: inline-block;float: right; margin-top:10px;'>
        <Page style='margin-right:10px;' :total='params.total' :pageSize='params.pageSize' ref='page' :show-total='true'   @on-change='selectPage' show-elevator ></Page>
      </div>
    </div>
    
</template>
<script>
export default {
  name: 'FinanceRecord',
  data () {
    return {
        params:{
            startNum:1,//初始化个数
            currentPage:1,//当前页
            pageNum:1,//获取的第几个开始
            pageSize:10,//每页的个数
            total:0//总数
        },
      //支付方式，1支付宝，2微信,3百度钱包,4Paypal,5网银
      methodList:[
        {id:1,value:'支付宝'},
        {id:2,value:'微信'},
        {id:3,value:'百度钱包'},
        {id:4,value:'Paypal'},
        {id:5,value:'网银'}
      ],
      /**
       *类型，1购买商品，2账户提现，3退款，4诚信押金
       * 
       */
      typeList:[
        {id:1,value:'购买商品'},
        {id:2,value:'账户提现'},
        {id:3,value:'退款'},
        {id:4,value:'诚信押金'}
      ],
      //状态
      statusList:[
        {id:1,value:'待处理'},
        {id:2,value:'成功'},
        {id:3,value:'已拒绝'}
      ],
	    financeRecordList: [],
	    financeRecordColumns: [
        {
          title: '序号',
          align:'center',
          render: (h, params) => {
            return h('span', params.index
            +(this.params.currentPage-1)*this.params.pageSize+this.params.startNum);
          }
        },
        {
          title: '财务记录id',
          key: 'financeRecordId',
          align:'center'
        },
        {
        	title:'支付方式',
            key:'method',
            align:'center',
          render: (h, params) => {
            let methodvalue="";
            this.methodList.forEach(element => {
              if(element.id==params.row.method){
                methodvalue=element.value;
              }
            });
             return  h('span',methodvalue);
          }
        },
        {
        	title:'支付类型',
            key:'type',
            align:'center',
          render: (h, params) => {
            let typevalue="";
            this.typeList.forEach(element => {
              if(element.id==params.row.type){
                typevalue=element.value;
              }
            });
             return  h('span',typevalue);
          }
        },
        {
        	title:'交易单号',
            key:'transactionNumber',
            align:'center'
        },
        {
        	title:'手续费',
            key:'brokerage',
            align:'center'
        },
        {
        	title:'金额',
            key:'money',
            align:'center'
        },
        {
        	title:'实际金额',
            key:'realMoney',
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
     * p.data 返回列表
     */
    this.params.accountId=this.$route.params.accountId
     this.axiosbusiness.getList(this,{
       countUrl:'/financeRecord/count',
       listUrl:'/financeRecord/list',
       data:'financeRecordList'
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
