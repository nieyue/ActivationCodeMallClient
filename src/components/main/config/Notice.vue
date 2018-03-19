<!--通知管理 -->
<template>
    <div class="body-wrap">
    <div class="body-btn-wrap">
      <Button type='error'  @click='add'>增加系统通知</Button>
      <div class="search-wrap">
        <Select v-model="params.title" transfer class="search-wrap-input"  placeholder="标题，全部">
            <Option v-for="item in titleParamsList" :value="item.value" :key="item.id">{{ item.value }}</Option>
        </Select>
        <Input v-model="params.accountId" class="search-wrap-input" placeholder="账户Id"></Input>
        <Select v-model="params.status" transfer class="search-wrap-input"  placeholder="状态，全部">
            <Option v-for="item in statusParamsList" :value="item.id" :key="item.id">{{ item.value }}</Option>
        </Select>
        <Button @click="search" type="info"  >查询</Button>
      </div>
    </div>
	<!--新增 -->
     <Modal v-model="addNoticeModel"
           title="新增通知管理"
           :closable="false"
           :mask-closable="false"
    >
      <Form ref="addNotice" :model="addNotice" :label-width="100"  label-position="right"  :rules="addNoticeRules">
        <!-- <FormItem prop="title" label="标题:">
          <Input type="text" v-model="addNotice.title" placeholder="标题">
          </Input>
        </FormItem> -->
        <FormItem prop="imgAddress" label="封面(上传或者填写):" id="addImgAddressBox">
          <Button type="primary" @click="addImgAddressClick('addImgAddress')" >上传</Button>
          <input type="file" style="width:0px;height:0px;" id="addImgAddress" ref="addImgAddress">
          <div>
            <Input type="text" v-model="addNotice.imgAddress" placeholder="封面">
          </Input>
             <img :src="addNotice.imgAddress"  style='height:200px;width:200px;'alt="">
          </div>
        </FormItem>
        <FormItem prop="content" label="内容:">
         <Input type="textarea" v-model="addNotice.content" :autosize="{minRows: 2,maxRows: 5}"  placeholder="内容">
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
     <Modal v-model="updateNoticeModel"
           title="修改通知管理"
           :closable="false"
           :mask-closable="false"
    >
      <Form ref="updateNotice" :model="updateNotice" :label-width="100" label-position="right"  :rules="updateNoticeRules">
        <!-- <FormItem prop="title" label="标题:">
          <Input type="text" v-model="updateNotice.title" placeholder="标题">
          </Input>
        </FormItem> -->
        <FormItem prop="imgAddress" label="封面(上传或者填写):" id="updateImgAddressBox">
          <Button type="primary" @click="updateImgAddressClick('updateImgAddress')" >上传</Button>
          <input type="file" style="width:0px;height:0px;" id="updateImgAddress" ref="updateImgAddress">
          <div>
            <Input type="text" v-model="updateNotice.imgAddress" placeholder="封面">
          </Input>
          <img :src="updateNotice.imgAddress"  style='height:200px;width:200px;'alt="">
          </div>
        </FormItem>

        <FormItem prop="content" label="内容:">
         <Input type="textarea" v-model="updateNotice.content" :autosize="{minRows: 2,maxRows: 5}"  placeholder="内容">
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
      <Table border :columns='noticeColumns' :data='noticeList' ref='table' size="small"></Table>
        <div style='display: inline-block;float: right; margin-top:10px;'>
        <Page style='margin-right:10px;' :total='params.total' :pageSize='params.pageSize' ref='page' :show-total='true'  @on-change='selectPage' show-elevator ></Page>
      </div>
    </div>
</template>
<script>
export default {
  name: 'Notice',
  data () {
    return {
        params:{
            startNum:1,//初始化个数
            currentPage:1,//当前页
            pageNum:1,//获取的第几个开始
            pageSize:10,//每页的个数
            total:0//总数
        },
         //查询标题
          titleParamsList:[
          {id:'',value:'全部通知'},
          {id:0,value:'系统通知'},
          {id:1,value:'团购通知'},
          {id:2,value:'提现到帐通知'},
          {id:3,value:'团购卡余额不足'},
          {id:4,value:'团购申请'}
          ],
        //查询状态
        statusParamsList:[
          {id:'',value:'全部'},
          {id:0,value:'未读'},
          {id:1,value:'已读'}
        ],
      //状态
      statusList:[
        {id:0,value:'未读'},
        {id:1,value:'已读'}
        ],
			//增加参数
			addNoticeModel:false,
			addLoading:false,
			addNoticeRules: {
                title: [
                    {required: true, message: '标题为必填项', trigger: 'blur'}
                    ],
                content: [
                    {required: true, message: '内容为必填项', trigger: 'blur'}
                    ],
                imgAddress: [
                    {required: true, message: '封面为必填项', trigger: 'blur'}
                    ]
                },
			addNotice:{
                title:'系统通知',
                imgAddress:'http://p2bhwwngu.bkt.clouddn.com/o_1c5gaqqst68db2j16nno61q3cp.jpg',//默认系统通知图片
                status:0//默认未读
			},
			//修改参数
			updateNoticeModel:false,
			updateLoading:false,
			updateNoticeRules: {
                title: [
                    {required: true, message: '标题为必填项', trigger: 'blur'}
                    ],
                content: [
                    {required: true, message: '内容为必填项', trigger: 'blur'}
                    ],
                imgAddress: [
                    {required: true, message: '封面为必填项', trigger: 'blur'}
                    ]
                },
			updateNotice:{
      },
      //删除参数
      deleteNotice:{},
      //列表
	    noticeCateList: [],
        noticeList: [],
	    noticeColumns: [
        {
          title: '序号',
          align:'center',
          render: (h, params) => {
            return h('span', params.index
            +(this.params.currentPage-1)*this.params.pageSize+this.params.startNum);
          }
        },
        {
          title: '通知id',
          key: 'noticeId',
          align:'center'
        },
        {
        	title:'标题',
        	key:'title',
          align:'center'
        },
        {
        	title:'封面',
        	key:'imgAddress',
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
        	title:'状态',
        	key:'status',
          align:'center',
          render: (h, params) => {
            let statusvalue="";
            this.statusList.forEach(element => {
              if(element.id==params.row.status){
                statusvalue=element.value;
              }
            });
             return  h('span',statusvalue);
          }
        },
        {
        	title:'内容',
          key:'content',
          width:200,
          align:'center'
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
    //查询
    search(){
      if(this.params.title=='全部通知'||!this.params.title){
        delete this.params.title
      }
      this.getList()
    },
    //增加上传图片
     addImgAddressClick(p){
         this.$refs[p].click();
       },
    //更新上传图片
     updateImgAddressClick(p){
         this.$refs[p].click();
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
       countUrl:'/notice/count',
       listUrl:'/notice/list',
       list:'noticeList'
     },this.params)
    },
  //增加
	 add (params) {
      this.addNoticeModel = true
      //this.addNoticeModel.title='系统通知';//默认系统通知
      //this.addNoticeModel.status=0;//默认未读
      
    },
		//增加取消
		 addCancel () {
      if (!this.addLoading) {
        this.addNoticeModel = false
        this.$refs.addNotice.resetFields()
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
      ref:'addNotice',
      url:'/notice/add',
      requestObject:'addNotice',
      loading:'addLoading',
      showModel:'addNoticeModel'
    })
    },
	 update (params) {
      this.updateNoticeModel = true
        //获取修改实体
      this.axiosbusiness.get(this,{
         url:'/notice/'+params.noticeId,
         list:'updateNotice'
         })
    },
		//修改取消
		 updateCancel () {
      if (!this.updateLoading) {
        this.updateNoticeModel = false
        this.$refs.updateNotice.resetFields()
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
      ref:'updateNotice',
      url:'/notice/update',
      requestObject:'updateNotice',
      loading:'updateLoading',
      showModel:'updateNoticeModel'
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
    this.deleteNotice={
      "noticeId":params.noticeId
    };
    this.axiosbusiness.delete(this,{
      url:'/notice/delete',
      requestObject:'deleteNotice'
    })
    }
  },
  created () {
    this.getList();
    //增加上传图片预加载
    this.utils.getQiniuSimpleUploader(this,{
      browseButton:'addImgAddress',
      dropElement:'addImgAddressBox',
      resource:'addNotice.imgAddress'
    });
    //修改上传图片预加载
    this.utils.getQiniuSimpleUploader(this,{
      browseButton:'updateImgAddress',
      dropElement:'updateImgAddressBox',
      resource:'updateNotice.imgAddress'
    });
  },
  mounted () {

  }
}
</script>
