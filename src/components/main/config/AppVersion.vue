<!--app版本管理 -->
<template>
    <div class="body-wrap">
    <div class="body-btn-wrap">
      <Button type='primary'  @click='add'>增加app版本</Button>
    </div>
		 <!--新增 -->
     <Modal v-model="addAppVersionModel"
           title="新增app版本管理"
           :closable="false"
           :mask-closable="false"
    >
      <Form ref="addAppVersion" :model="addAppVersion" :label-width="100" label-position="right"  :rules="addAppVersionRules">
        <FormItem prop="platform" label="平台:">
          <Select v-model="addAppVersion.platform" transfer size="large" style="width:100px">
              <Option v-for="item in platformList" :value="item.id" :key="item.id">{{ item.value }}</Option>
          </Select>
        </FormItem>
        <FormItem prop="name" label="名称:">
          <Input type="text" v-model="addAppVersion.name" placeholder="名称">
          </Input>
        </FormItem>
        <FormItem prop="type1" label="app类型:">
          <Select v-model="addAppVersion.type" transfer size="large" style="width:100px">
              <Option v-for="item in typeList" :value="item.id" :key="item.id">{{ item.value }}</Option>
          </Select>
        </FormItem>
        <FormItem prop="content" label="内容:">
          <Input type="textarea" v-model="addAppVersion.content" :autosize="{minRows: 2,maxRows: 5}" placeholder="内容">
          </Input>
        </FormItem>
        <FormItem prop="link" label="app链接(上传或者填写):" id="addImgAddressBox">
          <Button type="primary" @click="addImgAddressClick('addImgAddress')" >上传</Button>
          <input type="file" style="width:0px;height:0px;" id="addImgAddress" ref="addImgAddress">
          <div>
            <Input type="text" v-model="addAppVersion.link" placeholder="app链接">
          </Input>
          </div>
        </FormItem>
           <FormItem prop="status" label="app状态:">
          <Select v-model="addAppVersion.status" transfer size="large" style="width:100px">
              <Option v-for="item in statusList" :value="item.id" :key="item.id">{{ item.value }}</Option>
          </Select>
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
     <Modal v-model="updateAppVersionModel"
           title="修改app版本管理"
           :closable="false"
           :mask-closable="false"
    >
      <Form ref="updateAppVersion" :model="updateAppVersion" :label-width="100" label-position="right"  :rules="updateAppVersionRules">
        <FormItem prop="platform" label="平台:">
          <Select v-model="updateAppVersion.platform" transfer size="large" style="width:100px">
              <Option v-for="item in platformList" :value="item.id" :key="item.id">{{ item.value }}</Option>
          </Select>
        </FormItem>
        <FormItem prop="name" label="名称:">
          <Input type="text" v-model="updateAppVersion.name" placeholder="名称">
          </Input>
        </FormItem>
        <FormItem prop="type" label="app类型:">
          <Select v-model="updateAppVersion.type" transfer size="large" style="width:100px">
              <Option v-for="item in typeList" :value="item.id" :key="item.id">{{ item.value }}</Option>
          </Select>
        </FormItem>
        <FormItem prop="content" label="内容:">
          <Input type="textarea" v-model="updateAppVersion.content" :autosize="{minRows: 2,maxRows: 5}" placeholder="内容">
          </Input>
        </FormItem>
        <FormItem prop="link" label="app链接(上传或者填写):" id="updateImgAddressBox">
          <Button type="primary" @click="updateImgAddressClick('updateImgAddress')" >上传</Button>
          <input type="file" style="width:0px;height:0px;" id="updateImgAddress" ref="updateImgAddress">
          <div>
            <Input type="text" v-model="updateAppVersion.link" placeholder="app链接">
          </Input>
          </div>
        </FormItem>
           <FormItem prop="status" label="app状态:">
          <Select v-model="updateAppVersion.status" transfer size="large" style="width:100px">
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
      <Table border :columns='appVersionColumns' :data='appVersionList' ref='table' size="small"></Table>
        <div style='display: inline-block;float: right; margin-top:10px;'>
        <Page style='margin-right:10px;' :total='params.total' :pageSize='params.pageSize' ref='page' :show-total='true'   @on-change='selectPage' show-elevator ></Page>
      </div>
    </div>
    
</template>
<script>
export default {
  name: 'AppVersion',
  data () {
    return {
        params:{
            startNum:1,//初始化个数
            currentPage:1,//当前页
            pageNum:1,//获取的第几个开始
            pageSize:10,//每页的个数
            total:0//总数
        },
        //app平台
        platformList:[
            {id:0,value:'安卓'},
            {id:1,value:'IOS'}
        ],
        //app类型
        typeList:[
            {id:0,value:'普通'},
            {id:1,value:'强制'}
        ],
        //app状态
        statusList:[
            {id:0,value:'上线'},
            {id:1,value:'未上线'}
        ],
			//增加参数
			addAppVersionModel:false,
			addLoading:false,
			addAppVersionRules: {
                name: [
                    {required: true, message: '名称为必填项', trigger: 'blur'}
                    ],
                },
			addAppVersion:{
			},
			//修改参数
			updateAppVersionModel:false,
			updateLoading:false,
			updateAppVersionRules: {
                name: [
                    {required: true, message: '名称为必填项', trigger: 'blur'}
                    ]
                },
			updateAppVersion:{},
      //删除参数
      deleteAppVersion:{},
	    appVersionList: [],
	    appVersionColumns: [
        {
          title: '序号',
          align:'center',
          render: (h, params) => {
            return h('span', params.index
            +(this.params.currentPage-1)*this.params.pageSize+this.params.startNum);
          }
        },
        {
          title: 'app版本id',
          key: 'appVersionId',
          align:'center'
        },
        {
        	title:'app版本名称',
        	key:'name',
            align:'center'
        },
         {
        	title:'app平台',
        	key:'platform',
          align:'center',
          render: (h, params) => {
            let platformvalue="";
            this.platformList.forEach(element => {
              if(element.id==params.row.platform){
                platformvalue=element.value;
              }
            });
             return  h('span',platformvalue);
          }
        },
         {
        	title:'app类型',
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
        	title:'app内容',
            key:'content',
            width:200,
            align:'center'
        },
        {
        	title:'app链接',
            key:'link',
            width:200,
            align:'center'
        },
           {
        	title:'app状态',
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
       countUrl:'/appVersion/count',
       listUrl:'/appVersion/list',
       list:'appVersionList'
     },this.params)
    },
  //增加
	 add (params) {
      this.addAppVersionModel = true
      this.addAppVersion.platform   = this.platformList[0].id
      this.addAppVersion.type   = this.typeList[0].id
      this.addAppVersion.status   = this.statusList[0].id
    },
		//增加取消
		 addCancel () {
      if (!this.addLoading) {
        this.addAppVersionModel = false
        this.$refs.addAppVersion.resetFields()
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
      ref:'addAppVersion',
      url:'/appVersion/add',
      requestObject:'addAppVersion',
      loading:'addLoading',
      showModel:'addAppVersionModel'
    })
    },
	 update (params) {
      this.updateAppVersionModel = true
       //获取修改实体
      this.axiosbusiness.get(this,{
         url:'/appVersion/'+params.appVersionId,
         list:'updateAppVersion'
         })
    },
		//修改取消
		 updateCancel () {
      if (!this.updateLoading) {
        this.updateAppVersionModel = false
        this.$refs.updateAppVersion.resetFields()
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
      ref:'updateAppVersion',
      url:'/appVersion/update',
      requestObject:'updateAppVersion',
      loading:'updateLoading',
      showModel:'updateAppVersionModel'
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
    this.deleteAppVersion={
      "appVersionId":params.appVersionId
    };
    this.axiosbusiness.delete(this,{
      url:'/appVersion/delete',
      requestObject:'deleteAppVersion'
    })
    }
  },
  created () {
    this.getList();
    //增加上传图片预加载
    this.utils.getQiniuSimpleUploader(this,{
      browseButton:'addImgAddress',
      dropElement:'addImgAddressBox',
      resource:'addAppVersion.link'
    });
    //修改上传图片预加载
    this.utils.getQiniuSimpleUploader(this,{
      browseButton:'updateImgAddress',
      dropElement:'updateImgAddressBox',
      resource:'updateAppVersion.link'
    });
  },
  mounted () {

  }
}
</script>
