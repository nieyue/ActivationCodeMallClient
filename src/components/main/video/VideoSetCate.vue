<!--视频集类型管理 -->
<template>
    <div class="body-wrap">
    <div class="body-btn-wrap">
      <Button type='primary'  @click='add'>增加视频集类型</Button>
    </div>
		 <!--新增 -->
     <Modal v-model="addVideoSetCateModel"
           title="新增视频集类型管理"
           :closable="false"
           :mask-closable="false"
    >
      <Form ref="addVideoSetCate" :model="addVideoSetCate" :label-width="100" label-position="right"  :rules="addVideoSetCateRules">
        <FormItem prop="name" label="分类名称:">
          <Input type="text" v-model="addVideoSetCate.name" placeholder="分类名称">
          </Input>
        </FormItem>
         <FormItem prop="summary" label="简介:">
          <Input type="textarea" v-model="addVideoSetCate.summary" :autosize="{minRows: 2,maxRows: 5}"  placeholder="简介">
          </Input>
        </FormItem>
        <FormItem prop="icon" label="图标(上传或者填写):" id="addIconBox">
          <Button type="primary" @click="addIconClick('addIcon')" >上传</Button>
          <input type="file" style="width:0px;height:0px;" id="addIcon" ref="addIcon">
          <div>
            <Input type="text" v-model="addVideoSetCate.icon" placeholder="封面">
          </Input>
             <img :src="addVideoSetCate.icon "  style='width:300px;'alt="">
          </div>
        </FormItem>
         <FormItem prop="imgAddress" label="封面(上传或者填写):" id="addImgAddressBox">
          <Button type="primary" @click="addImgAddressClick('addImgAddress')" >上传</Button>
          <input type="file" style="width:0px;height:0px;" id="addImgAddress" ref="addImgAddress">
          <div>
            <Input type="text" v-model="addVideoSetCate.imgAddress" placeholder="封面">
          </Input>
             <img :src="addVideoSetCate.imgAddress"  style='width:300px;'alt="">
          </div>
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
     <Modal v-model="updateVideoSetCateModel"
           title="修改视频集类型管理"
           :closable="false"
           :mask-closable="false"
    >
      <Form ref="updateVideoSetCate" :model="updateVideoSetCate" :label-width="100" label-position="right"  :rules="updateVideoSetCateRules">
        <FormItem prop="name" label="分类名称:">
          <Input type="text" v-model="updateVideoSetCate.name" placeholder="分类名称">
          </Input>
        </FormItem>
         <FormItem prop="summary" label="简介:">
          <Input type="textarea" v-model="updateVideoSetCate.summary" :autosize="{minRows: 2,maxRows: 5}"  placeholder="简介">
          </Input>
        </FormItem>
        <FormItem prop="icon" label="图标(上传或者填写):" id="updateIconBox">
          <Button type="primary" @click="updateIconClick('updateImgAddress')" >上传</Button>
          <input type="file" style="width:0px;height:0px;" id="updateIcon" ref="updateIcon">
          <div>
            <Input type="text" v-model="updateVideoSetCate.icon" placeholder="图标">
          </Input>
             <img :src="updateVideoSetCate.icon"  style='width:300px;'alt="">
          </div>
        </FormItem>
        <FormItem prop="imgAddress" label="封面(上传或者填写):" id="updateImgAddressBox">
          <Button type="primary" @click="updateImgAddressClick('updateImgAddress')" >上传</Button>
          <input type="file" style="width:0px;height:0px;" id="updateImgAddress" ref="updateImgAddress">
          <div>
            <Input type="text" v-model="updateVideoSetCate.imgAddress" placeholder="封面">
          </Input>
             <img :src="updateVideoSetCate.imgAddress"  style='width:300px;'alt="">
          </div>
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
      <Table border :columns='videoSetCateColumns' :data='videoSetCateList' ref='table' size="small"></Table>
        <div style='display: inline-block;float: right; margin-top:10px;'>
        <Page style='margin-right:10px;' :total='params.total' :pageSize='params.pageSize' ref='page' :show-total='true'   @on-change='selectPage' show-elevator ></Page>
      </div>
    </div>
    
</template>
<script>
export default {
  name: 'VideoSetCate',
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
			addVideoSetCateModel:false,
			addLoading:false,
			addVideoSetCateRules: {
                name: [
                    {required: true, message: '分类名称为必填项', trigger: 'blur'}
                    ]
                },
			addVideoSetCate:{
    		   name:"",
    		   icon:""
			},
			//修改参数
			updateVideoSetCateModel:false,
			updateLoading:false,
			updateVideoSetCateRules: {
                name: [
                    {required: true, message: '分类名称为必填项', trigger: 'blur'}
                    ]
                },
			updateVideoSetCate:{
    		 videoSetCateId:1,
    		 name:"",
    		 icon:""
      },
      //删除参数
      deleteVideoSetCate:{},
	    videoSetCateList: [],
	    videoSetCateColumns: [
        {
          title: '序号',
          align:'center',
          render: (h, params) => {
            return h('span', params.index
            +(this.params.currentPage-1)*this.params.pageSize+this.params.startNum);
          }
        },
        {
          title: '视频集类型id',
          key: 'videoSetCateId',
          align:'center'
        },
        {
        	title:'视频集类型名称',
        	key:'name',
            align:'center'
        },
        {
        	title:'简介',
        	key:'summary',
          width:200,
            align:'center'
        },
        {
        	title:'总播放数',
        	key:'playNumber',
            align:'center'
        },
        {
        	title:'图标',
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
     addIconClick(p){
         this.$refs[p].click();
       },
     addImgAddressClick(p){
         this.$refs[p].click();
       },
    //更新上传图片
     updateIconClick(p){
         this.$refs[p].click();
       },
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
       countUrl:'/videoSetCate/count',
       listUrl:'/videoSetCate/list',
       list:'videoSetCateList'
     },this.params)
    },
  //增加
	 add (params) {
      this.addVideoSetCateModel = true
      this.updateVideoSetCate.playNumber = 0
    },
		//增加取消
		 addCancel () {
      if (!this.addLoading) {
        this.addVideoSetCateModel = false
        this.$refs.addVideoSetCate.resetFields()
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
      ref:'addVideoSetCate',
      url:'/videoSetCate/add',
      requestObject:'addVideoSetCate',
      loading:'addLoading',
      showModel:'addVideoSetCateModel'
    })
    },
	 update (params) {
      this.updateVideoSetCateModel = true
       //获取修改实体
      this.axiosbusiness.get(this,{
         url:'/videoSetCate/'+params.videoSetCateId,
         list:'updateVideoSetCate',
         success:()=>{
         }
       })
    },
		//修改取消
		 updateCancel () {
      if (!this.updateLoading) {
        this.updateVideoSetCateModel = false
        this.$refs.updateVideoSetCate.resetFields()
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
    console.log(3333)
    this.axiosbusiness.update(this,{
      ref:'updateVideoSetCate',
      url:'/videoSetCate/update',
      requestObject:'updateVideoSetCate',
      loading:'updateLoading',
      showModel:'updateVideoSetCateModel'
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
    this.deleteVideoSetCate={
      "videoSetCateId":params.videoSetCateId
    };
    this.axiosbusiness.delete(this,{
      url:'/videoSetCate/delete',
      requestObject:'deleteVideoSetCate'
    })
    }
  },
  created () {
    this.getList();
    //增加上传图片预加载
    this.utils.getQiniuSimpleUploader(this,{
      browseButton:'addIcon',
      dropElement:'addIconBox',
      resource:'addVideoSetCate.icon'
    });
    this.utils.getQiniuSimpleUploader(this,{
      browseButton:'addImgAddress',
      dropElement:'addImgAddressBox',
      resource:'addVideoSetCate.imgAddress'
    });
    //修改上传图片预加载
    this.utils.getQiniuSimpleUploader(this,{
      browseButton:'updateIcon',
      dropElement:'updateIconBox',
      resource:'updateVideoSetCate.icon'
    });
    this.utils.getQiniuSimpleUploader(this,{
      browseButton:'updateImgAddress',
      dropElement:'updateImgAddressBox',
      resource:'updateVideoSetCate.imgAddress'
    });
  },
  mounted () {

  }
}
</script>
