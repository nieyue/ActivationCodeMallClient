<!--公共配置管理 -->
<template>
    <div class="body-wrap">
    <div class="body-btn-wrap">
      <!-- <Button type='primary'  @click='add'>增加公共配置</Button> -->
      <Button type='primary'  @click='update(updateConfig)'>修改公共配置</Button>
    </div>
		 <!--新增 -->
     <Modal v-model="addConfigModel"
           title="新增公共配置管理"
           :closable="false"
           :mask-closable="false"
    >
      <Form ref="addConfig" :model="addConfig" :label-width="100" label-position="right"  :rules="addConfigRules">
        <FormItem prop="customerServicePhone" label="客服电话:">
          <Input type="text" v-model="addConfig.customerServicePhone" placeholder="客服电话">
          </Input>
        </FormItem>
        <FormItem prop="orderMerMaxNumber" label="最大订单商品数量:">
          <Input type="text" v-model="addConfig.orderMerMaxNumber" placeholder="最大订单商品数量">
          </Input>
        </FormItem>
        <FormItem prop="sellerIntegralPer" label="商户每盈利一元钱获得积分:">
          <Input type="text" v-model="addConfig.sellerIntegralPer" placeholder="商户每盈利一元钱获得积分">
          </Input>
        </FormItem>
        <FormItem prop="userIntegralPer" label="用户每消费一元钱获得积分:">
          <Input type="text" v-model="addConfig.userIntegralPer" placeholder="用户每消费一元钱获得积分">
          </Input>
        </FormItem>
        <FormItem prop="sellerSincerityUpgradeMoney" label="商户诚信升级金额:">
          <Input type="text" v-model="addConfig.sellerSincerityUpgradeMoney" placeholder="商户诚信升级金额">
          </Input>
        </FormItem>
        <FormItem prop="freezeDayNumber" label="冻结天数:">
          <Input type="text" v-model="addConfig.freezeDayNumber" placeholder="冻结天数">
          </Input>
        </FormItem>
        <FormItem prop="platformProportion" label="平台分成比例，单位%:">
          <Input type="text" v-model="addConfig.platformProportion" placeholder="平台分成比例，单位%">
          </Input>
        </FormItem>
        <FormItem prop="spreadProportion" label="推广分成比例，单位%:">
          <Input type="text" v-model="addConfig.spreadProportion" placeholder="推广分成比例，单位%">
          </Input>
        </FormItem>
        <FormItem prop="minWithdrawals" label="提现最低额度:">
          <Input type="text" v-model="addConfig.minWithdrawals" placeholder="提现最低额度">
          </Input>
        </FormItem>
        <FormItem prop="withdrawalsProportion" label="提现手续费比例，单位%:">
          <Input type="text" v-model="addConfig.withdrawalsProportion" placeholder="提现手续费比例，单位%">
          </Input>
        </FormItem>
        <FormItem prop="withdrawalsMinBrokerage" label="无提现手续费最低额度:">
          <Input type="text" v-model="addConfig.withdrawalsMinBrokerage" placeholder="无提现手续费最低额度">
          </Input>
        </FormItem>
      </Form>
      <div slot='footer'>
        <Button type='ghost' @click='addCancel'>取消</Button>
        <Button type='primary' :loading='addLoading'>
          <span v-if="!addLoading" @click='addSure'>确定</span>
          <span v-else>Loading...</span>
        </Button>
      </div>
    </Modal>
    <!--新增end -->
		 <!--修改 -->
     <Modal v-model="updateConfigModel"
           title="修改公共配置管理"
           :closable="false"
           :mask-closable="false"
    >
      <Form ref="updateConfig" :model="updateConfig" :label-width="100" label-position="right"  :rules="updateConfigRules">
              <FormItem prop="customerServicePhone" label="客服电话:">
          <Input type="text" v-model="updateConfig.customerServicePhone" placeholder="客服电话">
          </Input>
        </FormItem>
        <FormItem prop="orderMerMaxNumber" label="最大订单商品数量:">
          <Input type="text" v-model="updateConfig.orderMerMaxNumber" placeholder="最大订单商品数量">
          </Input>
        </FormItem>
        <FormItem prop="sellerIntegralPer" label="商户每盈利一元钱获得积分:">
          <Input type="text" v-model="updateConfig.sellerIntegralPer" placeholder="商户每盈利一元钱获得积分">
          </Input>
        </FormItem>
        <FormItem prop="userIntegralPer" label="用户每消费一元钱获得积分:">
          <Input type="text" v-model="updateConfig.userIntegralPer" placeholder="用户每消费一元钱获得积分">
          </Input>
        </FormItem>
        <FormItem prop="sellerSincerityUpgradeMoney" label="商户诚信升级金额:">
          <Input type="text" v-model="updateConfig.sellerSincerityUpgradeMoney" placeholder="商户诚信升级金额">
          </Input>
        </FormItem>
        <FormItem prop="freezeDayNumber" label="冻结天数:">
          <Input type="text" v-model="updateConfig.freezeDayNumber" placeholder="冻结天数">
          </Input>
        </FormItem>
        <FormItem prop="platformProportion" label="平台分成比例，单位%:">
          <Input type="text" v-model="updateConfig.platformProportion" placeholder="平台分成比例，单位%">
          </Input>
        </FormItem>
        <FormItem prop="spreadProportion" label="推广分成比例，单位%:">
          <Input type="text" v-model="updateConfig.spreadProportion" placeholder="推广分成比例，单位%">
          </Input>
        </FormItem>
        <FormItem prop="minWithdrawals" label="提现最低额度:">
          <Input type="text" v-model="updateConfig.minWithdrawals" placeholder="提现最低额度">
          </Input>
        </FormItem>
        <FormItem prop="withdrawalsProportion" label="提现手续费比例，单位%:">
          <Input type="text" v-model="updateConfig.withdrawalsProportion" placeholder="提现手续费比例，单位%">
          </Input>
        </FormItem>
        <FormItem prop="withdrawalsMinBrokerage" label="无提现手续费最低额度:">
          <Input type="text" v-model="updateConfig.withdrawalsMinBrokerage" placeholder="无提现手续费最低额度">
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
      <Card v-if="!updateConfig">暂无</Card>
      <Card v-if="updateConfig" :bordered="true">
            <p slot="title">配置项</p>
            <p>
              <span>客服电话：</span>
              <span v-text="updateConfig.customerServicePhone"></span>
            </p>
            <p>
              <span>最大订单商品数量：</span>
              <span v-text="updateConfig.orderMerMaxNumber"></span>
            </p>
            <p>
              <span>商户每盈利一元钱获得积分：</span>
              <span v-text="updateConfig.sellerIntegralPer"></span>
            </p>
            <p>
              <span>用户每消费一元钱获得积分：</span>
              <span v-text="updateConfig.userIntegralPer"></span>
            </p>
            <p>
              <span>商户诚信升级金额：</span>
              <span v-text="updateConfig.sellerSincerityUpgradeMoney"></span>元
            </p>
            <p>
              <span>冻结天数：</span>
              <span v-text="updateConfig.freezeDayNumber"></span>天
            </p>
            <p>
              <span>平台分成比例：</span>
              <span v-text="updateConfig.platformProportion"></span>%
            </p>
            <p>
              <span>推广分成比例：</span>
              <span v-text="updateConfig.spreadProportion"></span>%
            </p>
            <p>
              <span>提现最低额度：</span>
              <span v-text="updateConfig.minWithdrawals"></span>
            </p>
            <p>
              <span>提现手续费比例：</span>
              <span v-text="updateConfig.withdrawalsProportion"></span>%
            </p>
            <p>
              <span>无提现手续费最低额度：</span>
              <span v-text="updateConfig.withdrawalsMinBrokerage"></span>元
            </p>
            <p>
              <span>创建时间：</span>
              <span v-text="updateConfig.createDate"></span>
            </p>
            <p>
              <span>更新时间：</span>
              <span v-text="updateConfig.updateDate"></span>
            </p>
      </Card>
      <!-- <Table border :columns='configColumns' :data='configList' ref='table' size="small"></Table>
        <div style='display: inline-block;float: right; margin-top:10px;'>
        <Page style='margin-right:10px;' :total='params.total' :pageSize='params.pageSize' ref='page' :show-total='true'   @on-change='selectPage' show-elevator ></Page>
      </div> -->
    </div>
</template>
<script>
export default {
  name: 'Config',
  data () {
    return {
        params:{
            startNum:1,//初始化个数
            currentPage:1,//当前页
            pageNum:1,//获取的第几个开始
            pageSize:10,//每页的个数
            total:0//总数
        },
			//增加参数
			addConfigModel:false,
			addLoading:false,
			addConfigRules: {
                customerServicePhone: [
                    {required: true, message: '客服电话为必填项', trigger: 'blur'}
                    ]
                },
			addConfig:{
			},
			//修改参数
			updateConfigModel:false,
			updateLoading:false,
			updateConfigRules: {
                customerServicePhone: [
                    {required: true, message: '客服电话为必填项', trigger: 'blur'}
                    ]
                },
			updateConfig:{ },
      //删除参数
      deleteConfig:{},
	    configList: [{}]
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
     this.axiosbusiness.getList(this,{
       countUrl:'/config/count',
       listUrl:'/config/list',
       data:'configList',
       success:()=>{
         this.updateConfig=this.configList[0];
       }
     },this.params)
    },
  //增加
	 add (params) {
      this.addConfigModel = true
    },
		//增加取消
		 addCancel () {
      if (!this.addLoading) {
        this.addConfigModel = false
        this.$refs.addConfig.resetFields()
      }
    },
		//增加确定
    addSure () {
       /**
     * 增加
     * $this  vue组件
     * p.ref 验证
     * p.url 增加url
     * p.requestObject 请求参数对象
     * p.loading loading
     * p.showModel 界面模型显示隐藏
     */
    this.axiosbusiness.add(this,{
      ref:'addConfig',
      url:'/config/add',
      requestObject:'addConfig',
      loading:'addLoading',
      showModel:'addConfigModel'
    })
    },
	 update (params) {
      this.updateConfigModel = true
     //获取修改实体
     if(params.configId){
       this.axiosbusiness.get(this,{
         url:'/config/load?configId='+params.configId,
         data:'updateConfig'
         })
     }
    },
		//修改取消
		 updateCancel () {
      if (!this.updateLoading) {
        this.updateConfigModel = false
        this.$refs.updateConfig.resetFields()
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
      ref:'updateConfig',
      url:'/config/update',
      requestObject:'updateConfig',
      loading:'updateLoading',
      showModel:'updateConfigModel'
    })
 
    },
    //删除
    delete(params){
    /**
     * 删除
     * $this  vue组件
     * p.url 修改url
     * p.requestObject 请求参数对象
     */
    this.deleteConfig={
      "configId":params.configId
    };
    this.axiosbusiness.delete(this,{
      url:'/config/delete',
      requestObject:'deleteConfig'
    })
    }
  },
  created () {
    this.getList();
    console.log(1111)
  },
  mounted () {

  }
}
</script>
