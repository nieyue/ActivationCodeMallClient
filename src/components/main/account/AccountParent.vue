<!--账户上级管理 -->
<template>
    <div class="body-wrap">
    <div class="body-btn-wrap">
      <!-- <Button type='primary'  @click='add'>增加账户上级</Button> -->
    </div>
		 <!--新增 -->
     <Modal v-model="addAccountParentModel"
           title="新增账户上级管理"
           :closable="false"
           :mask-closable="false"
    >
      <Form ref="addAccountParent" :model="addAccountParent" :label-width="100" label-position="right"  :rules="addAccountParentRules">
        <!-- <FormItem prop="accountId" label="账户id:">
         <InputNumber  :min="1"  :precision='0' v-model="addAccountParent.accountId"></InputNumber>
        </FormItem>
        <FormItem prop="name" label="真实姓名:">
          <Input type="text" v-model="addAccountParent.realname" placeholder="真实姓名">
          </Input>
        </FormItem>
        <FormItem prop="phone" label="手机号:">
          <Input type="text" v-model="addAccountParent.phone" placeholder="手机号">
          </Input>
        </FormItem>
        <FormItem prop="subordinateNumber" label="学员数:">
          <Input type="text" v-model="addAccountParent.subordinateNumber" placeholder="学员数">
          </Input>
        </FormItem>
        <FormItem prop="masterId" label="直接上级id:">
          <InputNumber  :min="1"  :precision='0' v-model="addAccountParent.masterId"></InputNumber>
        </FormItem> -->
        <FormItem prop="realMasterId" label="真实上级id:">
          <InputNumber  :min="1"  :precision='0' v-model="addAccountParent.realMasterId"></InputNumber>
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
     <Modal v-model="updateAccountParentModel"
           title="修改账户上级管理"
           :closable="false"
           :mask-closable="false"
    >
      <Form ref="updateAccountParent" :model="updateAccountParent" :label-width="100" label-position="right"  :rules="updateAccountParentRules">
           <!-- <FormItem prop="accountId" label="账户id:">
         <InputNumber  :min="1"  :precision='0' v-model="updateAccountParent.accountId"></InputNumber>
        </FormItem>
        <FormItem prop="name" label="真实姓名:">
          <Input type="text" v-model="updateAccountParent.realname" placeholder="真实姓名">
          </Input>
        </FormItem>
        <FormItem prop="phone" label="手机号:">
          <Input type="text" v-model="updateAccountParent.phone" placeholder="手机号">
          </Input>
        </FormItem>
        <FormItem prop="subordinateNumber" label="学员数:">
          <Input type="text" v-model="updateAccountParent.subordinateNumber" placeholder="学员数">
          </Input>
        </FormItem>
        <FormItem prop="masterId" label="直接上级id:">
          <InputNumber  :min="1"  :precision='0' v-model="updateAccountParent.masterId"></InputNumber>
        </FormItem> -->
        <FormItem prop="realMasterId" label="真实上级id:">
          <InputNumber  :min="1"  :precision='0' v-model="updateAccountParent.realMasterId"></InputNumber>
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
      <Table border :columns='accountParentColumns' :data='accountParentList' ref='table' size="small"></Table>
        <div style='display: inline-block;float: right; margin-top:10px;'>
        <Page style='margin-right:10px;' :total='params.total' :pageSize='params.pageSize' ref='page' :show-total='true'   @on-change='selectPage' show-elevator ></Page>
      </div>
    </div>
</template>
<script>
export default {
  name: 'AccountParent',
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
			addAccountParentModel:false,
			addLoading:false,
			addAccountParentRules: {
                phone: [
                    {required: true, message: '手机号为必填项', trigger: 'blur'}
                    ]
                },
			addAccountParent:{},
			//修改参数
			updateAccountParentModel:false,
			updateLoading:false,
			updateAccountParentRules: {
                phone: [
                    {required: true, message: '手机号为必填项', trigger: 'blur'}
                    ]
                },
			updateAccountParent:{},
      //删除参数
      deleteAccountParent:{},
	    accountLevelList: [],
	    accountParentList: [],
	    accountParentColumns: [
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
          title: 'id',
          width:100,
          key: 'accountParentId',
          align:'center'
        },
        {
            title:'账户id',
            width:100,
        	key:'accountId',
          align:'center'
        },
        {
            title:'真实姓名',
            width:100,
        	key:'realname',
          align:'center'
        },
        {
            title:'手机号',
            width:100,
        	key:'phone',
          align:'center'
        },
        {
            title:'学员数',
            width:100,
        	key:'subordinateNumber',
          align:'center'
        },
        {
            title:'直接上级id',
            width:100,
        	key:'masterId',
          align:'center'
        },
        {
            title:'真实上级id',
            width:100,
        	key:'realMasterId',
          align:'center'
        },
        {
            title:'账户等级id',
            width:100,
        	key:'accountLevelId',
          align:'center'
        },
        {
            title:'等级名',
            width:100,
        	key:'name',
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
          fixed:'right',
          align:'center',
          render: (h, params) => {
            var varhh1=  h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                
                on: {
                  click: () => {
                    this.update(params.row)
                  }
                }
              }, '修改真实上级');
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
              //, varhh2
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
   getAccountLevelList () {
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
       countUrl:'/accountParent/count',
       listUrl:'/accountParent/list',
       list:'accountParentList'
     },this.params)
    },
  //增加
	 add (params) {
      this.addAccountParentModel = true
    },
		//增加取消
		 addCancel () {
      if (!this.addLoading) {
        this.addAccountParentModel = false
        this.$refs.addAccountParent.resetFields()
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
      ref:'addAccountParent',
      url:'/accountParent/add',
      requestObject:'addAccountParent',
      loading:'addLoading',
      showModel:'addAccountParentModel'
    })
    },
	 update (params) {
      this.updateAccountParentModel = true
      //获取修改实体
      this.axiosbusiness.get(this,{
         url:'/accountParent/'+params.accountParentId,
         list:'updateAccountParent',
         success:()=>{
         }
       })
    },
		//修改取消
		 updateCancel () {
      if (!this.updateLoading) {
        this.updateAccountParentModel = false
        this.$refs.updateAccountParent.resetFields()
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
      ref:'updateAccountParent',
      url:'/accountParent/update',
      requestObject:'updateAccountParent',
      loading:'updateLoading',
      showModel:'updateAccountParentModel'
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
    this.deleteAccountParent={
      "accountParentId":params.accountParentId
    };
    this.axiosbusiness.delete(this,{
      url:'/accountParent/delete',
      requestObject:'deleteAccountParent'
    })
    }
  },
  created () {
    this.getAccountLevelList();
    this.getList();
  },
  mounted () {

  }
}
</script>
