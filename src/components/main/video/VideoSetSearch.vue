<!--视频集搜索管理 -->
<template>
    <div class="body-wrap">
    <div class="body-btn-wrap">
      <Button type='primary'  @click='add'>增加视频集搜索</Button>
    </div>
		 <!--新增 -->
     <Modal v-model="addVideoSetSearchModel"
           title="新增视频集搜索管理"
           :closable="false"
           :mask-closable="false"
    >
      <Form ref="addVideoSetSearch" :model="addVideoSetSearch" :label-width="100" label-position="right"  :rules="addVideoSetSearchRules">
        <FormItem prop="name" label="名称:">
          <Input type="text" v-model="addVideoSetSearch.name" placeholder="名称">
          </Input>
        </FormItem>
        <FormItem prop="number" label="次数:">
         <InputNumber :max="100000000" :min="1" :step="1" :precision='0' v-model="addVideoSetSearch.number"></InputNumber>
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
     <Modal v-model="updateVideoSetSearchModel"
           title="修改视频集搜索管理"
           :closable="false"
           :mask-closable="false"
    >
      <Form ref="updateVideoSetSearch" :model="updateVideoSetSearch" :label-width="100" label-position="right"  :rules="updateVideoSetSearchRules">
        <FormItem prop="name" label="名称:">
          <Input type="text" v-model="updateVideoSetSearch.name" placeholder="名称">
          </Input>
        </FormItem>
        <FormItem prop="number" label="次数:">
         <InputNumber :max="100000000" :min="1" :step="1" :precision='0' v-model="updateVideoSetSearch.number"></InputNumber>
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
      <Table border :columns='videoSetSearchColumns' :data='videoSetSearchList' ref='table' size="small"></Table>
        <div style='display: inline-block;float: right; margin-top:10px;'>
        <Page style='margin-right:10px;' :total='params.total' :pageSize='params.pageSize' ref='page' :show-total='true'   @on-change='selectPage' show-elevator ></Page>
      </div>
    </div>
    
</template>
<script>
export default {
  name: 'VideoSetSearch',
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
			addVideoSetSearchModel:false,
			addLoading:false,
			addVideoSetSearchRules: {
                name: [
                    {required: true, message: '名称为必填项', trigger: 'blur'}
                    ],
                number: [
                    {type:'number',required: true, message: '次数为必填项', trigger: 'blur'}
                    ]
                },
			addVideoSetSearch:{
    		   name:"",
    		   number:1
			},
			//修改参数
			updateVideoSetSearchModel:false,
			updateLoading:false,
			updateVideoSetSearchRules: {
                name: [
                    {required: true, message: '名称为必填项', trigger: 'blur'}
                    ],
                number: [
                    {type:'number',required: true, message: '次数为必填项', trigger: 'blur'}
                    ]
                },
			updateVideoSetSearch:{
    		 videoSetSearchId:1,
    		 name:"",
    		 number:1
      },
      //删除参数
      deleteVideoSetSearch:{},
	    videoSetSearchList: [],
	    videoSetSearchColumns: [
        {
          title: '序号',
          align:'center',
          render: (h, params) => {
            return h('span', params.index
            +(this.params.currentPage-1)*this.params.pageSize+this.params.startNum);
          }
        },
        {
          title: '视频集搜索id',
          key: 'videoSetSearchId',
          align:'center'
        },
        {
        	title:'视频集搜索名称',
        	key:'name',
            align:'center'
        },
        {
        	title:'视频集搜索次数',
        	key:'number',
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
       countUrl:'/videoSetSearch/count',
       listUrl:'/videoSetSearch/list',
       list:'videoSetSearchList'
     },this.params)
    },
  //增加
	 add (params) {
      this.addVideoSetSearchModel = true
      this.addVideoSetSearch.name = params.name
      //this.addVideoSetSearch.number = params.number
    },
		//增加取消
		 addCancel () {
      if (!this.addLoading) {
        this.addVideoSetSearchModel = false
        this.$refs.addVideoSetSearch.resetFields()
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
      ref:'addVideoSetSearch',
      url:'/videoSetSearch/add',
      requestObject:'addVideoSetSearch',
      loading:'addLoading',
      showModel:'addVideoSetSearchModel'
    })
    },
	 update (params) {
      this.updateVideoSetSearchModel = true
      this.updateVideoSetSearch.name = params.name
      this.updateVideoSetSearch.number = params.number
      this.updateVideoSetSearch.videoSetSearchId = params.videoSetSearchId
    },
		//修改取消
		 updateCancel () {
      if (!this.updateLoading) {
        this.updateVideoSetSearchModel = false
        this.$refs.updateVideoSetSearch.resetFields()
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
      ref:'updateVideoSetSearch',
      url:'/videoSetSearch/update',
      requestObject:'updateVideoSetSearch',
      loading:'updateLoading',
      showModel:'updateVideoSetSearchModel'
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
    this.deleteVideoSetSearch={
      "videoSetSearchId":params.videoSetSearchId
    };
    this.axiosbusiness.delete(this,{
      url:'/videoSetSearch/delete',
      requestObject:'deleteVideoSetSearch'
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
