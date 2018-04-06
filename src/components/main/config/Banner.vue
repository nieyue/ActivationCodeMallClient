
<!--banner管理 -->
<template>
    <div class="body-wrap">
    <div class="body-btn-wrap">
      <Button type='primary'  @click='add'>增加banner</Button>
    <div class="search-wrap">
        <Select v-model="params.type" transfer class="search-wrap-input"  placeholder="类型，全部">
            <Option v-for="item in typeParamsList" :value="item.id" :key="item.id">{{ item.value }}</Option>
        </Select>
        <Select v-model="params.status" transfer class="search-wrap-input"  placeholder="状态，全部">
            <Option v-for="item in statusParamsList" :value="item.id" :key="item.id">{{ item.value }}</Option>
        </Select>
        <Button @click="search" type="info"  >查询</Button>
      </div>
    </div>
		 <!--新增 -->
     <Modal v-model="addBannerModel"
           title="新增banner管理"
           :closable="false"
           :mask-closable="false"
    >
      <Form ref="addBanner" :model="addBanner" :label-width="100" label-position="right"  :rules="addBannerRules">
        <FormItem prop="name" label="名称:">
          <Input type="text" v-model="addBanner.name" placeholder="名称">
          </Input>
        </FormItem>
        <FormItem prop="type1" label="类型:">
          <Select v-model="addBanner.type" transfer size="large" style="width:100px">
              <Option v-for="item in typeList" :value="item.id" :key="item.id">{{ item.value }}</Option>
          </Select>
        </FormItem>
        <FormItem prop="imgAddress" label="图片(上传或者填写):" id="addImgAddressBox">
          <Button type="primary" @click="addImgAddressClick('addImgAddress')" >上传</Button>
          <input type="file" style="width:0px;height:0px;" id="addImgAddress" ref="addImgAddress">
          <div>
            <Input type="text" v-model="addBanner.imgAddress" placeholder="图片">
          </Input>
            <img :src="addBanner.imgAddress"  style='height:100px;width:200px;'alt="">
          </div>
        </FormItem>
        <FormItem prop="content" label="内容:">
          <Input type="textarea" v-model="addBanner.content" :autosize="{minRows: 2,maxRows: 5}" placeholder="内容">
          </Input>
        </FormItem>
        <FormItem prop="link" label="链接:" >
          <Input type="text" v-model="addBanner.link" placeholder="链接">
          </Input>
        </FormItem>
           <FormItem prop="status" label="app状态:">
          <Select v-model="addBanner.status" transfer size="large" style="width:100px">
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
     <Modal v-model="updateBannerModel"
           title="修改banner管理"
           :closable="false"
           :mask-closable="false"
    >
      <Form ref="updateBanner" :model="updateBanner" :label-width="100" label-position="right"  :rules="updateBannerRules">
        <FormItem prop="name" label="名称:">
          <Input type="text" v-model="updateBanner.name" placeholder="名称">
          </Input>
        </FormItem>
        <FormItem prop="type" label="类型:">
          <Select v-model="updateBanner.type" transfer size="large" style="width:100px">
              <Option v-for="item in typeList" :value="item.id" :key="item.id">{{ item.value }}</Option>
          </Select>
        </FormItem>
        <FormItem prop="imgAddress" label="图片(上传或者填写):" id="updateImgAddressBox">
          <Button type="primary" @click="updateImgAddressClick('updateImgAddress')" >上传</Button>
          <input type="file" style="width:0px;height:0px;" id="updateImgAddress" ref="updateImgAddress">
          <div>
            <Input type="text" v-model="updateBanner.imgAddress" placeholder="图片">
          </Input>
          <img :src="updateBanner.imgAddress"  style='height:100px;width:200px;'alt="">
          </div>
        </FormItem>
        <FormItem prop="content" label="内容:">
          <Input type="textarea" v-model="updateBanner.content" :autosize="{minRows: 2,maxRows: 5}" placeholder="内容">
          </Input>
        </FormItem>
        <FormItem prop="link" label="链接(上传或者填写):" >
            <Input type="text" v-model="updateBanner.link" placeholder="链接">
          </Input>
        </FormItem>
           <FormItem prop="status" label="app状态:">
          <Select v-model="updateBanner.status" transfer size="large" style="width:100px">
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
      <Table border :columns='bannerColumns' :data='bannerList' ref='table' size="small"></Table>
        <div style='display: inline-block;float: right; margin-top:10px;'>
        <Page style='margin-right:10px;' :total='params.total' :pageSize='params.pageSize' ref='page' :show-total='true'   @on-change='selectPage' show-elevator ></Page>
      </div>
    </div>
    
</template>
<script>
export default {
  name: 'Banner',
  data () {
    return {
        params:{
            startNum:1,//初始化个数
            currentPage:1,//当前页
            pageNum:1,//获取的第几个开始
            pageSize:10,//每页的个数
            total:0//总数
        },
        //类型，默认1首页轮播
        typeParamsList:[
            {id:'',value:'全部'},
            {id:1,value:'首页轮播'}
        ],
        //状态，默认0下架，1上架
        statusParamsList:[
            {id:'',value:'全部'},
            {id:0,value:'下架'},
            {id:1,value:'上架'}
        ],
        //类型，默认1首页轮播
        typeList:[
            {id:1,value:'首页轮播'}
        ],
        //状态，默认0下架，1上架
        statusList:[
            {id:0,value:'下架'},
            {id:1,value:'上架'}
        ],
			//增加参数
			addBannerModel:false,
			addLoading:false,
			addBannerRules: {
                name: [
                    {required: true, message: '名称为必填项', trigger: 'blur'}
                    ],
                },
			addBanner:{
        imgAddress:''
			},
			//修改参数
			updateBannerModel:false,
			updateLoading:false,
			updateBannerRules: {
                name: [
                    {required: true, message: '名称为必填项', trigger: 'blur'}
                    ]
                },
			updateBanner:{},
      //删除参数
      deleteBanner:{},
	    bannerList: [],
	    bannerColumns: [
        {
          title: '序号',
          align:'center',
          render: (h, params) => {
            return h('span', params.index
            +(this.params.currentPage-1)*this.params.pageSize+this.params.startNum);
          }
        },
        {
          title: 'bannerid',
          key: 'bannerId',
          align:'center'
        },
        {
        	title:'banner名称',
        	key:'name',
            align:'center'
        },
         {
        	title:'类型',
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
        	title:'内容',
            key:'content',
            width:200,
            align:'center'
        },
        {
        	title:'链接',
            key:'link',
            width:200,
            align:'center'
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
       //查询
    search(){
      this.params.currentPage=1;
      this.params.pageNum =1;
      this.getList()
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
       countUrl:'/banner/count',
       listUrl:'/banner/list',
       data:'bannerList'
     },this.params)
    },
  //增加
	 add (params) {
      this.addBannerModel = true
      this.addBanner.type   = this.typeList[0].id
      this.addBanner.status   = this.statusList[1].id
    },
		//增加取消
		 addCancel () {
      if (!this.addLoading) {
        this.addBannerModel = false
        this.$refs.addBanner.resetFields()
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
      ref:'addBanner',
      url:'/banner/add',
      requestObject:'addBanner',
      loading:'addLoading',
      showModel:'addBannerModel'
    })
    },
	 update (params) {
      this.updateBannerModel = true
       //获取修改实体
      this.axiosbusiness.get(this,{
         url:'/banner/load?bannerId='+params.bannerId,
         data:'updateBanner'
         })
    },
		//修改取消
		 updateCancel () {
      if (!this.updateLoading) {
        this.updateBannerModel = false
        this.$refs.updateBanner.resetFields()
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
      ref:'updateBanner',
      url:'/banner/update',
      requestObject:'updateBanner',
      loading:'updateLoading',
      showModel:'updateBannerModel'
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
    this.deleteBanner={
      "bannerId":params.bannerId
    };
    this.axiosbusiness.delete(this,{
      url:'/banner/delete',
      requestObject:'deleteBanner'
    })
    }
  },
  created () {
    this.getList();
    //增加上传图片预加载
    this.utils.getQiniuSimpleUploader(this,{
      browseButton:'addImgAddress',
      dropElement:'addImgAddressBox',
      resource:'addBanner.imgAddress'
    });
    //修改上传图片预加载
    this.utils.getQiniuSimpleUploader(this,{
      browseButton:'updateImgAddress',
      dropElement:'updateImgAddressBox',
      resource:'updateBanner.imgAddress'
    });
  },
  mounted () {

  }
}
</script>
