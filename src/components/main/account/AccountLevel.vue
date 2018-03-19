<!--账户等级管理 -->
<template>
    <div class="body-wrap">
    <div class="body-btn-wrap">
      <!-- <Button type='primary'  @click='add'>增加账户等级</Button> -->
    </div>
		 <!--新增 -->
     <Modal v-model="addAccountLevelModel"
           title="新增账户等级管理"
           :closable="false"
           :mask-closable="false"
    >
      <Form ref="addAccountLevel" :model="addAccountLevel" :label-width="100" label-position="right"  :rules="addAccountLevelRules">
        <FormItem prop="name" label="名称:">
          <Input type="text" v-model="addAccountLevel.name" placeholder="名称">
          </Input>
        </FormItem>
        <FormItem prop="level" label="等级:">
          <InputNumber :max="10" :min="0" :step="1" :precision='0' v-model="addAccountLevel.level"></InputNumber>
        </FormItem>
        <FormItem prop="imgAddress" label="图标(上传或者填写):" id="addImgAddressBox">
          <Button type="primary" @click="addImgAddressClick('addImgAddress')" >上传</Button>
          <input type="file" style="width:0px;height:0px;" id="addImgAddress" ref="addImgAddress">
          <div>
            <Input type="text" v-model="addAccountLevel.imgAddress" placeholder="封面">
          </Input>
             <img :src="addAccountLevel.imgAddress "  style='width:30px;'alt="">
          </div>
        </FormItem>
         <FormItem prop="teamPurchasePrice" label="团购金额:">
          <InputNumber :max="100000000" :min="0"  :precision='2' v-model="addAccountLevel.teamPurchasePrice"></InputNumber>
        </FormItem>
         <FormItem prop="recommendCommission" label="推荐佣金,默认是0表示不是推荐，无佣金:">
          <InputNumber :max="100000000" :min="0"  :precision='2' v-model="addAccountLevel.recommendCommission"></InputNumber>
        </FormItem>
         <FormItem prop="splitReward" label="拆分奖励:">
          <InputNumber :max="100000000" :min="0" :precision='2' v-model="addAccountLevel.splitReward"></InputNumber>
        </FormItem>
         <FormItem prop="splitParentReward" label="拆分上级奖励:">
          <InputNumber :max="100000000" :min="0" :precision='2' v-model="addAccountLevel.splitParentReward"></InputNumber>
        </FormItem>
         <FormItem prop="splitPlatformReward" label="拆分平台奖励:">
          <InputNumber :max="100000000" :min="0"  :precision='2' v-model="addAccountLevel.splitPlatformReward"></InputNumber>
        </FormItem>
         <FormItem prop="number" label="VIP名额，默认为0表示普通vip:">
          <InputNumber :max="100000000" :min="0"  :precision='0' v-model="addAccountLevel.number"></InputNumber>
        </FormItem>
         <FormItem prop="discountPrice" label="优惠价格:">
          <InputNumber :max="100000000" :min="0" :precision='2' v-model="addAccountLevel.discountPrice"></InputNumber>
        </FormItem>
         <FormItem prop="totalPrice" label="总价值:">
          <InputNumber :max="100000000" :min="0"  :precision='2' v-model="addAccountLevel.totalPrice"></InputNumber>
        </FormItem>
         <FormItem prop="mark" label="备注（权益）">
            <Input v-model="addAccountLevel.mark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="备注（权益）"></Input>
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
     <Modal v-model="updateAccountLevelModel"
           title="修改账户等级管理"
           :closable="false"
           :mask-closable="false"
    >
      <Form ref="updateAccountLevel" :model="updateAccountLevel" :label-width="100" label-position="right"  :rules="updateAccountLevelRules">
        <FormItem prop="name" label="名称:">
          <Input type="text" v-model="updateAccountLevel.name" placeholder="名称">
          </Input>
        </FormItem>
        <FormItem prop="level" label="等级:">
          <InputNumber :max="10" :min="0" :disabled="true" :precision='0' v-model="updateAccountLevel.level"></InputNumber>
        </FormItem>
        <FormItem prop="imgAddress" label="图标(上传或者填写):" id="updateImgAddressBox">
          <Button type="primary" @click="updateImgAddressClick('updateImgAddress')" >上传</Button>
          <input type="file" style="width:0px;height:0px;" id="updateImgAddress" ref="updateImgAddress">
          <div>
            <Input type="text" v-model="updateAccountLevel.imgAddress" placeholder="封面">
          </Input>
             <img :src="updateAccountLevel.imgAddress"  style='width:30px;'alt="">
          </div>
        </FormItem>
         <FormItem prop="teamPurchasePrice" label="团购金额:">
          <InputNumber :max="100000000" :min="0" :precision='2' v-model="updateAccountLevel.teamPurchasePrice"></InputNumber>
        </FormItem>
         <FormItem prop="recommendCommission" label="推荐佣金,默认是0表示不是推荐，无佣金:">
          <InputNumber :max="100000000" :min="0"  :precision='2' v-model="updateAccountLevel.recommendCommission"></InputNumber>
        </FormItem>
         <FormItem prop="splitReward" label="拆分奖励:">
          <InputNumber :max="100000000" :min="0"  :precision='2' v-model="updateAccountLevel.splitReward"></InputNumber>
        </FormItem>
         <FormItem prop="splitParentReward" label="拆分上级奖励:">
          <InputNumber :max="100000000" :min="0"  :precision='2' v-model="updateAccountLevel.splitParentReward"></InputNumber>
        </FormItem>
         <FormItem prop="splitPlatformReward" label="拆分平台奖励:">
          <InputNumber :max="100000000" :min="0"  :precision='2' v-model="updateAccountLevel.splitPlatformReward"></InputNumber>
        </FormItem>
         <FormItem prop="number" label="VIP名额，默认为0表示普通vip:">
          <InputNumber :max="100000000" :min="0"  :precision='0' v-model="updateAccountLevel.number"></InputNumber>
        </FormItem>
         <FormItem prop="discountPrice" label="优惠价格:">
          <InputNumber :max="100000000" :min="0"  :precision='2' v-model="updateAccountLevel.discountPrice"></InputNumber>
        </FormItem>
         <FormItem prop="totalPrice" label="总价值:">
          <InputNumber :max="100000000" :min="0"  :precision='2' v-model="updateAccountLevel.totalPrice"></InputNumber>
        </FormItem>
         <FormItem prop="mark" label="备注（权益）">
            <Input v-model="updateAccountLevel.mark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="备注（权益）"></Input>
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
      <Table border  :columns='accountLevelColumns' :data='accountLevelList' ref='table' size="small"></Table>
        <div style='display: inline-block;float: right; margin-top:10px;'>
        <Page style='margin-right:10px;' :total='params.total' :pageSize='params.pageSize' ref='page' :show-total='true'   @on-change='selectPage' show-elevator ></Page>
      </div>
    </div>
    
</template>
<script>
export default {
  name: 'AccountLevel',
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
			addAccountLevelModel:false,
			addLoading:false,
			addAccountLevelRules: {
                name: [
                    {required: true, message: '分类名称为必填项', trigger: 'blur'}
                    ]
                },
			addAccountLevel:{
			},
			//修改参数
			updateAccountLevelModel:false,
			updateLoading:false,
			updateAccountLevelRules: {
                name: [
                    {required: true, message: '分类名称为必填项', trigger: 'blur'}
                    ]
                },
			updateAccountLevel:{},
      //删除参数
      deleteAccountLevel:{},
	    accountLevelList: [],
	    accountLevelColumns: [
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
          title: '账户等级id',
          key: 'accountLevelId',
          width:100,
          align:'center'
        },
        {
        	title:'账户等级名称',
            key:'name',
             width:100,
            align:'center'
        },
        {
        	title:'等级',
            key:'level',
             width:100,
            align:'center'
        },
        {
        	title:'图片',
            key:'imgAddress',
             width:100,
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
        	title:'团购金额',
            key:'teamPurchasePrice',
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
        	title:'拆分平台奖励',
            key:'splitPlatformReward',
            width:100,
            align:'center'
        },
        {
        	title:'VIP名额',
            key:'number',
            width:100,
            align:'center'
        },
        {
        	title:'优惠价格',
            key:'discountPrice',
            width:100,
            align:'center'
        },
        {
        	title:'总价值',
            key:'totalPrice',
            width:100,
            align:'center'
        },
        {
        	title:'备注',
            key:'mark',
            width:200,
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
                  
                    console.log( params.row)
                    this.update(params.row)
                  }
                }
              }, '编辑');
            var varhh2=  h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                style: {
                  marginLeft: '10px'
                },
                on: {
                  click: () => {
                    this.delete(params.row)
                  }
                }
              }, '删除');
            	var s=h("div","");
			s=h("div",[
              varhh1
              //,varhh2
            ]);
            return s;
          }
        }
      ],
    }
  },
  methods: {
     //增加上传图片
     addImgAddressClick(p){
         this.$refs[p].click();
       },
    //更新上传图片
     updateImgAddressClick(p){
         this.$refs[p].click();
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
     this.axiosbusiness.getList(this,{
       countUrl:'/accountLevel/count',
       listUrl:'/accountLevel/list',
       list:'accountLevelList'
     },this.params)
    },
  //增加
	 add (params) {
      this.addAccountLevelModel = true
    },
		//增加取消
		 addCancel () {
      if (!this.addLoading) {
        this.addAccountLevelModel = false
        this.$refs.addAccountLevel.resetFields()
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
      ref:'addAccountLevel',
      url:'/accountLevel/add',
      requestObject:'addAccountLevel',
      loading:'addLoading',
      showModel:'addAccountLevelModel'
    })
    },
	 update (params) {
      this.updateAccountLevelModel = true
     // this.updateAccountLevel = params
      //this.updateAccountLevel.icon = params.icon
     // this.updateAccountLevel.AccountLevelId = params.AccountLevelId
//console.log(this.updateAccountLevel) update (params) {
     //获取修改实体
      this.axiosbusiness.get(this,{
         url:'/accountLevel/'+params.accountLevelId,
         list:'updateAccountLevel',
       })
    },
		//修改取消
		 updateCancel () {
      if (!this.updateLoading) {
        this.updateAccountLevelModel = false
        this.$refs.updateAccountLevel.resetFields()
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
      ref:'updateAccountLevel',
      url:'/accountLevel/update',
      requestObject:'updateAccountLevel',
      loading:'updateLoading',
      showModel:'updateAccountLevelModel'
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
    this.deleteAccountLevel={
      "accountLevelId":params.accountLevelId
    };
    this.axiosbusiness.delete(this,{
      url:'/accountLevel/delete',
      requestObject:'deleteAccountLevel'
    })
    }
  },
  created () {
    this.getList();
    //增加上传图片预加载
    this.utils.getQiniuSimpleUploader(this,{
      browseButton:'addImgAddress',
      dropElement:'addImgAddressBox',
      resource:'addAccountLevel.imgAddress'
    });
    //修改上传图片预加载
    this.utils.getQiniuSimpleUploader(this,{
      browseButton:'updateImgAddress',
      dropElement:'updateImgAddressBox',
      resource:'updateAccountLevel.imgAddress'
    });

  },
  mounted () {

  }
}
</script>
