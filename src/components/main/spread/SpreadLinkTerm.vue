<!--推广链接项管理 -->
<template>
    <div class="body-wrap">
    <div class="body-btn-wrap">
      <Button type='primary'  @click='add'>增加推广链接项</Button>
    </div>
		 <!--新增 -->
     <Modal v-model="addSpreadLinkTermModel"
           title="新增推广链接项管理"
           :closable="false"
           :mask-closable="false"
    >
      <Form ref="addSpreadLinkTerm" :model="addSpreadLinkTerm" :label-width="100" label-position="right"  :rules="addSpreadLinkTermRules">
        <FormItem prop="link" label="链接:">
          <Input type="text" v-model="addSpreadLinkTerm.link" placeholder="链接,http或https开头">
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
     <Modal v-model="updateSpreadLinkTermModel"
           title="修改推广链接项管理"
           :closable="false"
           :mask-closable="false"
    >
      <Form ref="updateSpreadLinkTerm" :model="updateSpreadLinkTerm" :label-width="100" label-position="right"  :rules="updateSpreadLinkTermRules">
         <FormItem prop="link" label="链接:">
          <Input type="text" v-model="updateSpreadLinkTerm.link" placeholder="链接,http或https开头">
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
      <Table border  :columns='spreadLinkTermColumns' :data='spreadLinkTermList' ref='table' size="small"></Table>
        <div style='display: inline-block;float: right; margin-top:10px;'>
        <Page style='margin-right:10px;' :total='params.total' :pageSize='params.pageSize' ref='page' :show-total='true'   @on-change='selectPage' show-elevator ></Page>
      </div>
    </div>
    
</template>
<script>
export default {
  name: 'SpreadLinkTerm',
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
			addSpreadLinkTermModel:false,
			addLoading:false,
			addSpreadLinkTermRules: {
                link: [
                    {required: true, message: '链接为必填项', trigger: 'blur'}
                    ]
                },
			addSpreadLinkTerm:{
			},
			//修改参数
			updateSpreadLinkTermModel:false,
			updateLoading:false,
			updateSpreadLinkTermRules: {
                link: [
                    {required: true, message: '链接为必填项', trigger: 'blur'}
                    ]
                },
			updateSpreadLinkTerm:{},
      //删除参数
      deleteSpreadLinkTerm:{},
	    spreadLinkTermList: [],
      a:[],
	    spreadLinkTermColumns: [
        {
          title: '序号',
          align:'center',
          render: (h, params) => {
            return h('span', params.index
            +(this.params.currentPage-1)*this.params.pageSize+this.params.startNum);
          }
        },
        {
          title: '推广链接项id',
          key: 'spreadLinkTermId',
          align:'center'
        },
        {
        	title:'链接',
            key:'link',
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
              attrs:{
                id:"spreadLinkTerm"+params.index
              },
              props: {
                type: 'primary',
                size: 'small'
                },
                style: {
                  marginLeft: '10px'
                },
                on: {
                  click: () => {
                   //let d=document.getElementById("spreadLinkTerm"+params.index);
                  //d.disabled=true;
                 // console.log(d.disabled)
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
              ,varhh2
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
     * p.data 返回列表
     */
     this.axiosbusiness.getList(this,{
       countUrl:'/spreadLinkTerm/count',
       listUrl:'/spreadLinkTerm/list',
       data:'spreadLinkTermList'
     },this.params)
    },
  //增加
	 add (params) {
      this.addSpreadLinkTermModel = true
    },
		//增加取消
		 addCancel () {
      if (!this.addLoading) {
        this.addSpreadLinkTermModel = false
        this.$refs.addSpreadLinkTerm.resetFields()
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
      ref:'addSpreadLinkTerm',
      url:'/spreadLinkTerm/add',
      requestObject:'addSpreadLinkTerm',
      loading:'addLoading',
      showModel:'addSpreadLinkTermModel'
    })
    },
	 update (params) {
      this.updateSpreadLinkTermModel = true
     //获取修改实体
      this.axiosbusiness.get(this,{
         url:'/spreadLinkTerm/load?spreadLinkTermId='+params.spreadLinkTermId,
         data:'updateSpreadLinkTerm',
       })
    },
		//修改取消
		 updateCancel () {
      if (!this.updateLoading) {
        this.updateSpreadLinkTermModel = false
        this.$refs.updateSpreadLinkTerm.resetFields()
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
     delete this.updateSpreadLinkTerm.merCate
    this.axiosbusiness.update(this,{
      ref:'updateSpreadLinkTerm',
      url:'/spreadLinkTerm/update',
      requestObject:'updateSpreadLinkTerm',
      loading:'updateLoading',
      showModel:'updateSpreadLinkTermModel'
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
    this.deleteSpreadLinkTerm={
      "spreadLinkTermId":params.spreadLinkTermId
    };
    this.axiosbusiness.delete(this,{
      url:'/spreadLinkTerm/delete',
      requestObject:'deleteSpreadLinkTerm'
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
