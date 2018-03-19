<!--财务管理 -->
<template>
    <div class="body-wrap">

		 <!--修改 -->
     <Modal v-model="updateFinanceModel"
           title="修改财务管理"
           :closable="false"
           :mask-closable="false"
    >
      <Form ref="updateFinance" :model="updateFinance" :label-width="100" label-position="right"  :rules="updateFinanceRules">
       <FormItem prop="password" label="支付密码:">
          <Input type="text" v-model="updateFinance.password" placeholder="支付密码">
          </Input>
        </FormItem>
      </Form>
      <div slot='footer'>
        <Button type='ghost' @click='updateCancel'>取消</Button>
        <Button type='primary' :loading='updateLoading'>
          <span v-if="!updateLoading" @click='updateSure'>确定</span>
          <span v-else>Loading...</span>
        </Button>
      </div>
    </Modal>
    <!--修改end -->
      <Table border  :columns='financeColumns' :data='financeList' ref='table' size="small"></Table>
        <div style='display: inline-block;float: right; margin-top:10px;'>
        <Page style='margin-right:10px;' :total='params.total' :pageSize='params.pageSize' ref='page' :show-total='true'   @on-change='selectPage' show-elevator ></Page>
      </div>
    </div>
    
</template>
<script>
export default {
  name: 'Finance',
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
			updateFinanceModel:false,
			updateLoading:false,
			updateFinanceRules: {
                },
			updateFinance:{},
	    financeList: [],
	    financeColumns: [
        {
          title: '序号',
          width:80,
          align:'center',
          render: (h, params) => {
            return h('span', params.index
            +(this.params.currentPage-1)*this.params.pageSize+this.params.startNum);
          }
        },
        {
          title: '财务id',
          key: 'financeId',
          width:100,
          align:'center'
        },
        {
        	title:'支付密码',
            key:'password',
             width:100,
            align:'center',
          render: (h, params) => {
            return h('span','*******')
          }
        },
        {
        	title:'余额',
            key:'money',
             width:100,
            align:'center'
        },
        {
        	title:'充值金额',
            key:'recharge',
            width:100,
            align:'center'
        },
        {
        	title:'消费金额',
            key:'consume',
            width:100,
            align:'center'
        },
        {
        	title:'提现金额',
            key:'withdrawals',
            width:100,
            align:'center'
        },
        {
        	title:'招收学员佣金',
            key:'recruitingCommission',
            width:100,
            align:'center'
        },
        {
        	title:'推荐佣金',
            key:'recommendCommission',
            width:100,
            align:'center'
        },
        {
        	title:'团购账单',
            key:'teamPurchasePrice',
            width:100,
            align:'center'
        },
        {
        	title:'拆分奖励',
            key:'splitReward',
            width:100,
            align:'center'
        },
        {
        	title:'拆分上级奖励',
            key:'splitParentReward',
            width:100,
            align:'center'
        },
        {
        	title:'赠送金钱',
            key:'baseProfit',
            width:100,
            align:'center'
        },
        {
          title:'创建时间',
          key:'createDate',
          width:100,
          sortable: true,
          align:'center'
        },
        {
          title:'修改时间',
          key:'updateDate',
          width:100,
          sortable: true,
          align:'center'
        },
				{
          title: '操作',
          key: 'action',
          width:150,
          align:'center',
          fixed: 'right',
          render: (h, params) => {
            var varhh1=  h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginLeft: '10px'
                },
                on: {
                  click: () => {
                  
                    this.update(params.row)
                  }
                }
              }, '修改支付密码');
			let s=h("div",[
              varhh1
            ]);
            return s;
          }
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
       countUrl:'/finance/count',
       listUrl:'/finance/list',
       list:'financeList'
     },this.params)
    },
	 update (params) {
      this.updateFinanceModel = true
     //获取修改实体
      this.axiosbusiness.get(this,{
         url:'/finance/'+params.financeId,
         list:'updateFinance',
       })
    },
		//修改取消
		 updateCancel () {
      if (!this.updateLoading) {
        this.updateFinanceModel = false
      }
    },
		//修改确定
    updateSure () {
      /**
     * 修改
     * $this  vue组件
     * p.ref 验证
     * p.url 修改url
     * p.requestObject 请求参数对象
     * p.loading loading
     * p.showModel 界面模型显示隐藏
     */

    this.axiosbusiness.update(this,{
      ref:'updateFinance',
      url:'/finance/updatePasswordByFinanceId',
      requestObject:'updateFinance',
      loading:'updateLoading',
      showModel:'updateFinanceModel'
    })
 
    }
  },
  created () {
    this.getList();
  },
  mounted () {

  }
}
</script>
