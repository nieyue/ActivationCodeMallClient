<!--提现管理 -->
<template>
    <div class="body-wrap">
      <div class="body-btn-wrap">
        <div class="search-wrap">
          <Select v-model="params.method"  transfer class="search-wrap-input" placeholder="全部">
              <Option v-for="item in methodParamsList" :value="item.id" :key="item.id">{{ item.value }}</Option>
          </Select>
          <Input v-model="params.accountId" class="search-wrap-input" placeholder="账户Id"></Input>
          <Input v-model="params.transactionNumber" class="search-wrap-input" placeholder="交易单号"></Input>
          <Select v-model="params.status" transfer class="search-wrap-input"  placeholder="状态，全部">
              <Option v-for="item in statusParamsList" :value="item.id" :key="item.id">{{ item.value }}</Option>
          </Select>
          <Button @click="search" type="info"  >查询</Button>
        </div>
      </div>

       <!--修改 -->
     <Modal v-model="updateFinanceRecordModel"
           title="修改状态"
           :closable="false"
           :mask-closable="false"
    >
      <Form ref="updateFinanceRecord" :model="updateFinanceRecord" :label-width="100" label-position="right"  :rules="updateFinanceRecordRules">
        <FormItem prop="status" label="状态:">
          <Select v-model="updateFinanceRecord.status" transfer class="search-wrap-input">
              <Option v-for="item in statusList" :value="item.id" :key="item.id">{{ item.value }}</Option>
          </Select>
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
    
      <Table border  :columns='financeRecordColumns' :data='financeRecordList' ref='table' size="small"></Table>
        <div style='display: inline-block;float: right; margin-top:10px;'>
        <Page style='margin-right:10px;' :total='params.total' :pageSize='params.pageSize' ref='page' :show-total='true'   @on-change='selectPage' show-elevator ></Page>
      </div>
    </div>
    
</template>
<script>
export default {
  name: 'Withdrawals',
  data () {
    return {
        params:{
            startNum:1,//初始化个数
            currentPage:1,//当前页
            pageNum:1,//获取的第几个开始
            pageSize:10,//每页的个数
            total:0//总数
        },
      //支付方式
      methodList:[
        {id:1,value:'支付宝'},
        {id:2,value:'微信'},
        {id:3,value:'余额'},
        {id:4,value:'ios内购'}
      ],
      /**
       *类型，1账户充值，2账户提现,3招收学员佣金,
       4推荐佣金,5团购账单,6拆分账单,7二级团购奖励,8vip购买,
       9分发奖励，10二级购买vip奖励,11付费课程购买
       * 
       */
      typeList:[
        {id:1,value:'账户充值'},
        {id:2,value:'账户提现'},
        {id:3,value:'招收学员佣金'},
        {id:4,value:'推荐佣金'},
        {id:5,value:'团购账单'},
        {id:6,value:'拆分账单'},
        {id:7,value:'二级团购奖励'},
        {id:8,value:'vip购买'},
        {id:9,value:'分发奖励'},
        {id:10,value:'二级购买vip奖励'},
        {id:11,value:'付费课程购买'},
      ],
      //状态
      statusList:[
        {id:1,value:'待处理'},
        {id:2,value:'成功'},
        {id:3,value:'已拒绝'}
      ],
      //查询支付方式
      methodParamsList:[
        {id:'',value:'全部'},
        {id:1,value:'支付宝'},
        {id:2,value:'微信'},
        {id:3,value:'余额'},
        {id:4,value:'ios内购'}
      ],
      //查询状态
      statusParamsList:[
        {id:'',value:'全部'},
        {id:1,value:'待处理'},
        {id:2,value:'成功'},
        {id:3,value:'已拒绝'}
      ],
      	//修改参数
			updateFinanceRecordModel:false,
			updateLoading:false,
      updateFinanceRecord:{},
      updateFinanceRecordRules:{},
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
          title: '账户id',
          key: 'accountId',
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
        	title:'金额',
            key:'money',
            align:'center'
        },
       {
        	title:'状态',
            key:'status',
            align:'center',
          render: (h, params) => {
            let statusvalue="";
            let resulth;
            this.statusList.forEach(element => {
              if(element.id==params.row.status){
                statusvalue=element.value;
              }
            });
            resulth=h('span', statusvalue);
            if(statusvalue=='待处理'){
            resulth=h('span',
             [
               statusvalue,
                h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  margin: '15px'
                },
                on: {
                  click: () => {
                    this.update(params.row)
                  }
                }
              }, '编辑')
             ]
             );

            }
             return  resulth;
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
    //查询
    search(){
      if(!this.params.transactionNumber){
      delete this.params.transactionNumber
      }
      this.getList()
    },
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
    this.params.type=2//提现的类型为2
     this.axiosbusiness.getList(this,{
       countUrl:'/financeRecord/count',
       listUrl:'/financeRecord/list',
       list:'financeRecordList'
     },this.params)
    },
    update (params) {
      this.updateFinanceRecordModel = true
     //获取修改实体
      this.axiosbusiness.get(this,{
         url:'/financeRecord/'+params.financeRecordId,
         list:'updateFinanceRecord',
       })
    },
		//修改取消
		 updateCancel () {
      if (!this.updateLoading) {
        this.updateFinanceRecordModel = false
        this.$refs.updateFinanceRecord.resetFields()
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
      ref:'updateFinanceRecord',
      url:'/financeRecord/update',
      requestObject:'updateFinanceRecord',
      loading:'updateLoading',
      showModel:'updateFinanceRecordModel'
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
