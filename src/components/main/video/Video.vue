<!--视频管理 -->
<template>
    <div class="body-wrap">
    <div class="body-btn-wrap">
      <Button type='primary'  @click='add'>增加视频</Button>
    </div>
	<!--新增 -->
     <Modal v-model="addVideoModel"
           title="新增视频管理"
           :closable="false"
           :mask-closable="false"
           width="1000px"
    >
      <Form ref="addVideo" :model="addVideo" :label-width="100"  label-position="right"  :rules="addVideoRules">
        <FormItem prop="name" label="视频名称:">
          <Input type="text" v-model="addVideo.name" placeholder="视频名称">
          </Input>
        </FormItem>
        <FormItem prop="imgAddress" label="封面(上传或者填写):" id="addImgAddressBox">
          <Button type="primary" @click="addImgAddressClick('addImgAddress')" >上传</Button>
          <input type="file" style="width:0px;height:0px;" id="addImgAddress" ref="addImgAddress">
          <div>
            <Input type="text" v-model="addVideo.imgAddress" placeholder="封面">
            </Input>
             <img :src="addVideo.imgAddress"  style='height:200px;width:300px;'alt="">
          </div>
        </FormItem>
        <FormItem prop="duration" label="时长(自填，格式:00:00:12):">
          <Input type="text" v-model="addVideo.duration" placeholder="时长">
          </Input>
        </FormItem>
        <FormItem prop="url" label="视频链接(上传或者填写):" id="addUrlBox">
          <Button type="primary" @click="addUrlClick('addUrl')" >上传</Button>
          <input type="file" style="width:0px;height:0px;" id="addUrl" ref="addUrl">
          <div>
             <Input type="text" v-model="addVideo.url" placeholder="视频链接">
             </Input>
            <a :href="addVideo.url">
                {{addVideo.url}}
            </a>
          </div>
        </FormItem>
        <FormItem prop="size" label="容量，单位MB（上传自动计算，也可自调）:">
          <Input type="text" v-model="addVideo.size" placeholder="时长">
          </Input>
        </FormItem>
        <FormItem prop="status" label="状态:">
          <Select v-model="addVideo.status" transfer size="large" style="width:100px">
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
     <Modal v-model="updateVideoModel"
           title="修改视频管理"
           :closable="false"
           :mask-closable="false"
          
    >
      <Form ref="updateVideo" :model="updateVideo" :label-width="100" label-position="right"  :rules="updateVideoRules">
             <FormItem prop="name" label="视频名称:">
          <Input type="text" v-model="updateVideo.name" placeholder="视频名称">
          </Input>
        </FormItem>
        <FormItem prop="imgAddress" label="封面(上传或者填写):" id="updateImgAddressBox">
          <Button type="primary" @click="updateImgAddressClick('updateImgAddress')" >上传</Button>
          <input type="file" style="width:0px;height:0px;" id="updateImgAddress" ref="updateImgAddress">
          <div>
            <Input type="text" v-model="updateVideo.imgAddress" placeholder="封面">
          </Input>
             <img :src="updateVideo.imgAddress"  style='height:200px;width:300px;'alt="">
          </div>
        </FormItem>
        <FormItem prop="duration" label="时长(自填，格式:00:00:12):">
          <Input type="text" v-model="updateVideo.duration" placeholder="时长">
          </Input>
        </FormItem>
        <FormItem prop="url" label="视频链接(上传或者填写):" id="updateUrlBox">
          <Button type="primary" @click="updateUrlClick('updateUrl')" >上传</Button>
          <input type="file" style="width:0px;height:0px;" id="updateUrl" ref="updateUrl">
          <div>
            <Input type="text" v-model="updateVideo.url" placeholder="视频链接">
          </Input>
            <a :href="updateVideo.url">
                {{updateVideo.url}}
            </a>
          </div>
        </FormItem>
        <FormItem prop="size" label="容量，单位MB（上传自动计算，也可自调）:">
          <Input type="text" v-model="updateVideo.size" placeholder="时长">
          </Input>
        </FormItem>
        <FormItem prop="status" label="状态:">
          <Select v-model="updateVideo.status" transfer size="large" style="width:100px">
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
      <Table border :columns='videoColumns' :data='videoList' ref='table' size="small"></Table>
        <div style='display: inline-block;float: right; margin-top:10px;'>
        <Page style='margin-right:10px;' :total='params.total' :pageSize='params.pageSize' ref='page' :show-total='true'  @on-change='selectPage' show-elevator ></Page>
      </div>
    </div>
</template>
<script>
export default {
  name: 'Video',
  data () {
    return {
        params:{
            startNum:1,//初始化个数
            currentPage:1,//当前页
            pageNum:1,//获取的第几个开始
            pageSize:10,//每页的个数
            total:0//总数
        },
      //状态
      statusList:[
        {id:0,value:'下架'},
        {id:1,value:'上架'}
        ],
			//增加参数
			addVideoModel:false,
			addLoading:false,
			addVideoRules: {
                name: [
                    {required: true, message: '名称为必填项', trigger: 'blur'}
                    ],
                imgAddress: [
                    {required: true, message: '封面为必填项', trigger: 'blur'}
                    ],
                duration: [
                    {required: true, message: '时长为必填项', trigger: 'blur'}
                    ],
                size: [
                    {required: true, message: '容量为必填项', trigger: 'blur'}
                    ],
                url: [
                    {required: true, message: '链接为必填项', trigger: 'blur'}
                    ]
                },
			addVideo:{
    		   name:"",
    		   imgAddress:"",
    		   duration:'',
    		   size:'',
    		   url:'',
    		   status:1,
    		   videoCateId:''
			},
			//修改参数
			updateVideoModel:false,
			updateLoading:false,
			updateVideoRules: {
                 name: [
                    {required: true, message: '名称为必填项', trigger: 'blur'}
                    ],
                imgAddress: [
                    {required: true, message: '封面为必填项', trigger: 'blur'}
                    ],
                duration: [
                    {required: true, message: '时长为必填项', trigger: 'blur'}
                    ],
                size: [
                    {required: true, message: '容量为必填项', trigger: 'blur'}
                    ],
                url: [
                    {required: true, message: '链接为必填项', trigger: 'blur'}
                    ]
                },
			updateVideo:{
          name:"",
    		  imgAddress:"",
    		  duration:'',
    		  size:'',
    		  url:'',
    		  status:1,
    		  videoCateId:''
      },
      //删除参数
      deleteVideo:{},
      //列表
	    videoCateList: [],
      videoList: [],
	    videoColumns: [
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
          title: '视频id',
          key: 'videoId',
          align:'center'
        },
        {
        	title:'视频名称',
        	key:'name',
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
          title: '时长',
          key: 'duration',
          align:'center'
        },
        {
          title: '容量,MB',
          key: 'size',
          align:'center'
        },
        {
        	title:'url链接',
        	key:'url',
          align:'center',
          render: (h, params) => {
            return h('a', {
              attrs: {
                href: params.row.url
              }
            },params.row.url)
          }
        },
        {
          title: '播放次数',
          key: 'playNumber',
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
    //增加上传图片
     addImgAddressClick(p){
         this.$refs[p].click();
       },
    //增加上传视频
     addUrlClick(p){
         this.$refs[p].click();
       },
    //更新上传图片
     updateImgAddressClick(p){
         this.$refs[p].click();
       },
    //更新上传视频
     updateUrlClick(p){
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
     //根据id获取数据
      this.params.videoSetId=this.$route.params.videoSetId
     this.axiosbusiness.getList(this,{
       countUrl:'/video/count',
       listUrl:'/video/list',
       list:'videoList'
     },this.params)
    },
  //增加
	 add (params) {
      this.addVideoModel = true
      this.addVideo.videoSetId = this.$route.params.videoSetId
    },
		//增加取消
		 addCancel () {
      if (!this.addLoading) {
        this.addVideoModel = false
        this.$refs.addVideo.resetFields()
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
      ref:'addVideo',
      url:'/video/add',
      requestObject:'addVideo',
      loading:'addLoading',
      showModel:'addVideoModel'
    })
    },
	 update (params) {
      this.updateVideoModel = true
      this.updateVideo.videoId = params.videoId
     //获取修改实体
      this.axiosbusiness.get(this,{
         url:'/video/'+params.videoId,
         list:'updateVideo',
         success:()=>{
         }
       })
    },
		//修改取消
		 updateCancel () {
      if (!this.updateLoading) {
        this.updateVideoModel = false
        this.$refs.updateVideo.resetFields()
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
      ref:'updateVideo',
      url:'/video/update',
      requestObject:'updateVideo',
      loading:'updateLoading',
      showModel:'updateVideoModel'
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
    this.deleteVideo={
      "videoId":params.videoId
    };
    this.axiosbusiness.delete(this,{
      url:'/video/delete',
      requestObject:'deleteVideo'
    })
    }
  },
  created () {
    this.getList();
    //增加上传图片预加载
    this.utils.getQiniuSimpleUploader(this,{
      browseButton:'addImgAddress',
      dropElement:'addImgAddressBox',
      resource:'addVideo.imgAddress'
    });
    //增加上传视频预加载
    this.utils.getQiniuSimpleUploader(this,{
      browseButton:'addUrl',
      dropElement:'addUrlBox',
      resource:'addVideo.url',
       fileUploaded:(up, file, info)=>{
         console.log(up)
         console.log(file)
         console.log(info)
         this.addVideo.size=(file.size/1024/1024).toFixed(2);
       }
    });
    //修改上传图片预加载
    this.utils.getQiniuSimpleUploader(this,{
      browseButton:'updateImgAddress',
      dropElement:'updateImgAddressBox',
      resource:'updateVideo.imgAddress'
    });
    //修改上传视频预加载
    this.utils.getQiniuSimpleUploader(this,{
      browseButton:'updateUrl',
      dropElement:'updateUrlBox',
      resource:'updateVideo.url',
       fileUploaded:(up, file, info)=>{
         this.addVideo.size=(file.size/1024/1024).toFixed(2);
       }
    });
  },
  mounted () {

  }
}
</script>
