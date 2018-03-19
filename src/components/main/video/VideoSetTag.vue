<!--视频集标签管理 -->
<template>
    <div class="body-wrap">
    <div class="body-btn-wrap">
      <Button type='primary'  @click='add'>增加视频集标签</Button>
    </div>
		 <!--新增 -->
     <Modal v-model="addVideoSetTagModel"
           title="新增视频集标签管理"
           :closable="false"
           :mask-closable="false"
    >
      <Form ref="addVideoSetTag" :model="addVideoSetTag" :label-width="100" label-position="right"  :rules="addVideoSetTagRules">
        <FormItem prop="name" label="名称:">
          <Input type="text" v-model="addVideoSetTag.name" placeholder="名称">
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
     <Modal v-model="updateVideoSetTagModel"
           title="修改视频集标签管理"
           :closable="false"
           :mask-closable="false"
    >
      <Form ref="updateVideoSetTag" :model="updateVideoSetTag" :label-width="100" label-position="right"  :rules="updateVideoSetTagRules">
        <FormItem prop="name" label="名称:">
          <Input type="text" v-model="updateVideoSetTag.name" placeholder="名称">
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
      <Table border :columns='videoSetTagColumns' :data='videoSetTagList' ref='table' size="small"></Table>
        <div style='display: inline-block;float: right; margin-top:10px;'>
        <Page style='margin-right:10px;' :total='params.total' :pageSize='params.pageSize' ref='page' :show-total='true'   @on-change='selectPage' show-elevator ></Page>
      </div>
    </div>
    
</template>
<script>
export default {
  name: 'VideoSetTag',
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
			addVideoSetTagModel:false,
			addLoading:false,
			addVideoSetTagRules: {
                name: [
                    {required: true, message: '名称为必填项', trigger: 'blur'}
                    ]
                },
			addVideoSetTag:{
    		   name:""
			},
			//修改参数
			updateVideoSetTagModel:false,
			updateLoading:false,
			updateVideoSetTagRules: {
                name: [
                    {required: true, message: '名称为必填项', trigger: 'blur'}
                    ]
                },
			updateVideoSetTag:{
    		 videoSetTagId:1,
    		 name:""
      },
        //删除参数
        deleteVideoSetTag:{},
	    videoSetTagList: [],
	    videoSetTagColumns: [
        {
          title: '序号',
          align:'center',
          render: (h, params) => {
            return h('span', params.index
            +(this.params.currentPage-1)*this.params.pageSize+this.params.startNum);
          }
        },
        {
          title: '视频集标签id',
          key: 'videoSetTagId',
          align:'center'
        },
        {
        	title:'视频集标签名称',
        	key:'name',
            align:'center'
        },
        {
          title:'修改时间',
          key:'updateDate',
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
                  margin: '10px'
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
                  margin: '10px'
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
  this.params.videoSetId=this.$route.params.videoSetId
     this.axiosbusiness.getList(this,{
       countUrl:'/videoSetTag/count',
       listUrl:'/videoSetTag/list',
       list:'videoSetTagList'
     },this.params)
    },
  //增加
	 add (params) {
      this.addVideoSetTagModel = true
      this.addVideoSetTag.name = params.name
      this.addVideoSetTag.videoSetId = this.$route.params.videoSetId
    },
    //增加取消
        addCancel () {
        if (!this.addLoading) {
            this.addVideoSetTagModel = false
            this.$refs.addVideoSetTag.resetFields()
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
      ref:'addVideoSetTag',
      url:'/videoSetTag/add',
      requestObject:'addVideoSetTag',
      loading:'addLoading',
      showModel:'addVideoSetTagModel'
    })
    },
	 update (params) {
      this.updateVideoSetTagModel = true
      this.updateVideoSetTag.name = params.name
      this.updateVideoSetTag.videoSetTagId = params.videoSetTagId
    },
		//修改取消
		 updateCancel () {
      if (!this.updateLoading) {
        this.updateVideoSetTagModel = false
        this.$refs.updateVideoSetTag.resetFields()
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
      ref:'updateVideoSetTag',
      url:'/videoSetTag/update',
      requestObject:'updateVideoSetTag',
      loading:'updateLoading',
      showModel:'updateVideoSetTagModel'
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
    this.deleteVideoSetTag={
      "videoSetTagId":params.videoSetTagId
    };
    this.axiosbusiness.delete(this,{
      url:'/videoSetTag/delete',
      requestObject:'deleteVideoSetTag'
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
