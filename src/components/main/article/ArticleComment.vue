<!--文章评论管理 -->
<template>
    <div class="body-wrap">
    <div class="body-btn-wrap">
      <Button type='primary'  @click='add'>增加文章评论</Button>
    </div>
		 <!--新增 -->
     <Modal v-model="addArticleCommentModel"
           title="新增文章评论管理"
           :closable="false"
           :mask-closable="false"
    >
      <Form ref="addArticleComment" :model="addArticleComment" :label-width="100" label-position="right"  :rules="addArticleCommentRules">
        <FormItem label="内容:" prop="content">
            <Input v-model="addArticleComment.content" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="输入评论。。"></Input>
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
     <Modal v-model="updateArticleCommentModel"
           title="修改文章评论管理"
           :closable="false"
           :mask-closable="false"
    >
      <Form ref="updateArticleComment" :model="updateArticleComment" :label-width="100" label-position="right"  :rules="updateArticleCommentRules">
        <FormItem label="内容:" prop="content">
            <Input v-model="updateArticleComment.content" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="输入评论。。"></Input>
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
      <Table border :columns='articleCommentColumns' :data='articleCommentList' ref='table' size="small"></Table>
        <div style='display: inline-block;float: right; margin-top:10px;'>
        <Page style='margin-right:10px;' :total='params.total' :pageSize='params.pageSize' ref='page' :show-total='true'   @on-change='selectPage' show-elevator ></Page>
      </div>
    </div>
</template>
<script>
export default {
  name: 'ArticleComment',
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
			addArticleCommentModel:false,
			addLoading:false,
			addArticleCommentRules: {
                content: [
                    {required: true, message: '内容为必填项', trigger: 'blur'}
                    ]
                },
			addArticleComment:{
    		   "nickname":'',
    		   "icon":'',
    		   "accountId":'',
    		   "articleId":'',
    		   "content":""
			},
			//修改参数
			updateArticleCommentModel:false,
			updateLoading:false,
			updateArticleCommentRules: {
                content: [
                    {required: true, message: '内容为必填项', trigger: 'blur'}
                    ]
                },
			updateArticleComment:{
    		 "articleCommentId":1,
    		 "content":""
      },
      //删除参数
      deleteArticleComment:{},
	    articleCommentList: [],
	    articleCommentColumns: [
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
          title: '文章评论id',
          key: 'articleCommentId',
          align:'center'
        },
        {
        	title:'昵称',
        	key:'nickname',
          align:'center'
        },
        {
        	title:'图像',
        	key:'icon',
          align:'center',
          render: (h, params) => {
            return h('img', {
              attrs: {
                src: params.row.icon
              },
              style: {
                width: '45px'
              }
            })
          }
        },
        {
        	title:'点赞数',
        	key:'pointNumber',
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
        //根据文章id获取数据
      this.params.articleId=this.$route.params.articleId
     this.axiosbusiness.getList(this,{
       countUrl:'/articleComment/count',
       listUrl:'/articleComment/list',
       list:'articleCommentList'
     },this.params)
    },
  //增加
	 add (params) {
      this.addArticleCommentModel = true
      this.addArticleComment.content = params.content
      this.addArticleComment={
    		   "nickname":JSON.parse(sessionStorage.getItem("account")).nickname,
    		   "icon":JSON.parse(sessionStorage.getItem("account")).icon,
    		   "accountId":JSON.parse(sessionStorage.getItem("account")).accountId,
    		   "articleId":this.$route.params.articleId,
    		   "content":params.content
			}
    },
		//增加取消
		 addCancel () {
      if (!this.addLoading) {
        this.addArticleCommentModel = false
        this.$refs.addArticleComment.resetFields()
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
      ref:'addArticleComment',
      url:'/articleComment/add',
      requestObject:'addArticleComment',
      loading:'addLoading',
      showModel:'addArticleCommentModel'
    })
    },
	 update (params) {
      this.updateArticleCommentModel = true
      this.updateArticleComment.content = params.content
      this.updateArticleComment.articleCommentId = params.articleCommentId
    },
		//修改取消
		 updateCancel () {
      if (!this.updateLoading) {
        this.updateArticleCommentModel = false
        this.$refs.updateArticleComment.resetFields()
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
      ref:'updateArticleComment',
      url:'/articleComment/update',
      requestObject:'updateArticleComment',
      loading:'updateLoading',
      showModel:'updateArticleCommentModel'
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
    this.deleteArticleComment={
      "articleCommentId":params.articleCommentId
    };
    this.axiosbusiness.delete(this,{
      url:'/articleComment/delete',
      requestObject:'deleteArticleComment'
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
