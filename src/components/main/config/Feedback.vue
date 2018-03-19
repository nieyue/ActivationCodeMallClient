<!--意见反馈管理 -->
<template>
    <div class="body-wrap">
    <div class="body-btn-wrap">
      <Button type='primary'  @click='add'>增加意见反馈</Button>
    </div>
		 <!--新增 -->
     <Modal v-model="addFeedbackModel"
           title="新增意见反馈管理"
           :closable="false"
           :mask-closable="false"
    >
      <Form ref="addFeedback" :model="addFeedback" :label-width="100" label-position="right"  :rules="addFeedbackRules">
        <FormItem prop="content" label="内容:">
          <Input type="textarea" v-model="addFeedback.content" :autosize="{minRows: 2,maxRows: 5}"  placeholder="内容">
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
     <Modal v-model="updateFeedbackModel"
           title="修改意见反馈管理"
           :closable="false"
           :mask-closable="false"
    >
      <Form ref="updateFeedback" :model="updateFeedback" :label-width="100" label-position="right"  :rules="updateFeedbackRules">
        <FormItem prop="content" label="内容:">
          <Input type="textarea" v-model="updateFeedback.content" :autosize="{minRows: 2,maxRows: 5}"  placeholder="内容">
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
      <Table border :columns='feedbackColumns' :data='feedbackList' ref='table' size="small"></Table>
        <div style='display: inline-block;float: right; margin-top:10px;'>
        <Page style='margin-right:10px;' :total='params.total' :pageSize='params.pageSize' ref='page' :show-total='true'   @on-change='selectPage' show-elevator ></Page>
      </div>
    </div>
</template>
<script>
export default {
  name: 'Feedback',
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
			addFeedbackModel:false,
			addLoading:false,
			addFeedbackRules: {
                content: [
                    {required: true, message: '内容为必填项', trigger: 'blur'}
                    ]
                },
			addFeedback:{
			},
			//修改参数
			updateFeedbackModel:false,
			updateLoading:false,
			updateFeedbackRules: {
                content: [
                    {required: true, message: '内容为必填项', trigger: 'blur'}
                    ]
                },
			updateFeedback:{
      },
      //删除参数
      deleteFeedback:{},
	    feedbackList: [],
	    feedbackColumns: [
        {
          title: '序号',
          align:'center',
          render: (h, params) => {
            return h('span', params.index
            +(this.params.currentPage-1)*this.params.pageSize+this.params.startNum);
          }
        },
        {
          title: '意见反馈id',
          key: 'feedbackId',
          align:'center'
        },
        {
        	title:'内容',
        	key:'content',
          align:'center'
        },
        {
        	title:'创建时间',
          key:'createDate',
          sortable: true,
          align:'center'
        },
				{
          title: '操作',
          key: 'action',
          align:'center',
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
              varhh1,
              varhh2
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
     this.axiosbusiness.getList(this,{
       countUrl:'/feedback/count',
       listUrl:'/feedback/list',
       list:'feedbackList'
     },this.params)
    },
  //增加
	 add (params) {
      this.addFeedbackModel = true
      this.addFeedback.content = params.content
      this.addFeedback.accountId = JSON.parse(sessionStorage.getItem("account")).accountId
      this.addFeedback.phone = JSON.parse(sessionStorage.getItem("account")).phone
    },
		//增加取消
		 addCancel () {
      if (!this.addLoading) {
        this.addFeedbackModel = false
        this.$refs.addFeedback.resetFields()
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
      ref:'addFeedback',
      url:'/feedback/add',
      requestObject:'addFeedback',
      loading:'addLoading',
      showModel:'addFeedbackModel'
    })
    },
	 update (params) {
      this.updateFeedbackModel = true
      //获取修改实体
      this.axiosbusiness.get(this,{
         url:'/feedback/'+params.feedbackId,
         list:'updateFeedback'
         })
    },
		//修改取消
		 updateCancel () {
      if (!this.updateLoading) {
        this.updateFeedbackModel = false
        this.$refs.updateFeedback.resetFields()
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
      ref:'updateFeedback',
      url:'/feedback/update',
      requestObject:'updateFeedback',
      loading:'updateLoading',
      showModel:'updateFeedbackModel'
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
    this.deleteFeedback={
      "feedbackId":params.feedbackId
    };
    this.axiosbusiness.delete(this,{
      url:'/feedback/delete',
      requestObject:'deleteFeedback'
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
