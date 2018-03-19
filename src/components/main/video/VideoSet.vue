<!--视频集管理 -->
<template>
    <div class="body-wrap">
    <div class="body-btn-wrap">
      <Button type='primary'  @click='add'>增加视频集</Button>
    </div>
	<!--新增 -->
     <Modal v-model="addVideoSetModel"
           title="新增视频集管理"
           :closable="false"
           :mask-closable="false"
           width="1000px"
    >
      <Form ref="addVideoSet" :model="addVideoSet" :label-width="100"  label-position="right"  :rules="addVideoSetRules">
        <FormItem prop="videoSetCateId" label="视频集类型:">
          <Select v-model="addVideoSet.videoSetCateId" transfer size="large" style="width:100px">
              <Option v-for="item in videoSetCateList" :value="item.videoSetCateId" :key="item.videoSetCateId">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem prop="name" label="视频集名称:">
          <Input type="text" v-model="addVideoSet.name" placeholder="视频集名称">
          </Input>
        </FormItem>
        <FormItem prop="imgAddress" label="封面(上传或者填写):" id="addImgAddressBox">
          <Button type="primary" @click="addImgAddressClick('addImgAddress')" >上传</Button>
          <input type="file" style="width:0px;height:0px;" id="addImgAddress" ref="addImgAddress">
          <div>
            <Input type="text" v-model="addVideoSet.imgAddress" placeholder="封面">
          </Input>
             <img :src="addVideoSet.imgAddress"  style='width:300px;'alt="">
          </div>
        </FormItem>

        <FormItem prop="author" label="作者:">
          <Input type="text" v-model="addVideoSet.author" placeholder="作者">
          </Input>
        </FormItem>
         <FormItem label="简介:" prop="summary">
            <Input v-model="addVideoSet.summary" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="输入简介。。"></Input>
        </FormItem>
        <FormItem prop="recommend" label="推荐:">
          <Select v-model="addVideoSet.recommend" transfer size="large" style="width:100px">
              <Option v-for="item in recommendList" :value="item.id" :key="item.id">{{ item.value }}</Option>
          </Select>
        </FormItem>
        <FormItem prop="totalPrice" label="总价:">
            <Input type="text" v-model="addVideoSet.totalPrice" placeholder="总价">
            </Input>
        </FormItem>
        <FormItem prop="cost" label="是否收费:">
          <Select v-model="addVideoSet.cost" transfer size="large" style="width:100px">
              <Option v-for="item in costList" :value="item.id" :key="item.id">{{ item.value }}</Option>
          </Select>
        </FormItem>
        <FormItem prop="status" label="状态:">
          <Select v-model="addVideoSet.status" transfer size="large" style="width:100px">
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
     <Modal v-model="updateVideoSetModel"
           title="修改视频集管理"
           :closable="false"
           :mask-closable="false"
           width="1000px"
    >
      <Form ref="updateVideoSet" :model="updateVideoSet" :label-width="100" label-position="right"  :rules="updateVideoSetRules">
        <FormItem prop="videoSetCateId" label="视频集类型:">
          <Select v-model="updateVideoSet.videoSetCateId" transfer size="large" style="width:100px">
              <Option v-for="item in videoSetCateList" :value="item.videoSetCateId" :key="item.videoSetCateId">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem prop="name" label="视频集名称:">
          <Input type="text" v-model="updateVideoSet.name" placeholder="视频集名称">
          </Input>
        </FormItem>
        <FormItem prop="imgAddress" label="封面(上传或者填写):" id="updateImgAddressBox">
          <Button type="primary" @click="updateImgAddressClick('updateImgAddress')" >上传</Button>
          <input type="file" style="width:0px;height:0px;" id="updateImgAddress" ref="updateImgAddress">
          <div>
            <Input type="text" v-model="updateVideoSet.imgAddress" placeholder="封面">
          </Input>
          <img :src="updateVideoSet.imgAddress"  style='width:300px;'alt="">
          </div>
        </FormItem>

        <FormItem prop="author" label="作者:">
          <Input type="text" v-model="updateVideoSet.author" placeholder="作者">
          </Input>
        </FormItem>
         <FormItem label="简介:" prop="summary">
            <Input v-model="updateVideoSet.summary" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="输入简介。。"></Input>
        </FormItem>
        <FormItem prop="recommend" label="推荐:">
          <Select v-model="updateVideoSet.recommend" transfer size="large" style="width:100px">
              <Option v-for="item in recommendList" :value="item.id" :key="item.id">{{ item.value }}</Option>
          </Select>
        </FormItem>
        <FormItem prop="totalPrice" label="总价:">
            <Input type="text" v-model="updateVideoSet.totalPrice" placeholder="总价">
            </Input>
        </FormItem>
        <FormItem prop="cost" label="是否收费:">
          <Select v-model="updateVideoSet.cost" transfer size="large" style="width:100px">
              <Option v-for="item in costList" :value="item.id" :key="item.id">{{ item.value }}</Option>
          </Select>
        </FormItem>
        <FormItem prop="status" label="状态:">
          <Select v-model="updateVideoSet.status" transfer size="large" style="width:100px">
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
      <Table border :columns='videoSetColumns' :data='videoSetList' ref='table' size="small"></Table>
        <div style='display: inline-block;float: right; margin-top:10px;'>
        <Page style='margin-right:10px;' :total='params.total' :pageSize='params.pageSize' ref='page' :show-total='true'  @on-change='selectPage' show-elevator ></Page>
      </div>
    </div>
</template>
<script>
export default {
  name: 'VideoSet',
  data () {
    return {
        params:{
            startNum:1,//初始化个数
            currentPage:1,//当前页
            pageNum:1,//获取的第几个开始
            pageSize:10,//每页的个数
            total:0//总数
        },
      //推荐，默认0不推，1封推，2热门推荐，3专栏
      recommendList:[
        {id:0,value:'不推'},
        {id:1,value:'封推'},
        {id:2,value:'热门推荐'},
        {id:3,value:'专栏'}
        ],
      //是否收费，0免费，1vip免费，2付费课程
      costList:[
        {id:0,value:'免费'},
        {id:1,value:'vip免费'},
        {id:2,value:'付费课程'}
        ],
      //状态
      statusList:[
        {id:0,value:'下架'},
        {id:1,value:'上架'}
        ],
			//增加参数
			addVideoSetModel:false,
			addLoading:false,
			addVideoSetRules: {
                videoSetCateId: [
                    {type:'number',required: true, message: '类型为必填项', trigger: 'change'}
                    ],
                name: [
                    {required: true, message: '名称为必填项', trigger: 'blur'}
                    ],
                imgAddress: [
                    {required: true, message: '封面为必填项', trigger: 'blur'}
                    ],
                author: [
                    {required: true, message: '作者为必填项', trigger: 'blur'}
                    ],
                summary: [
                    {required: true, message: '简介为必填项', trigger: 'blur'}
                    ]
                },
			addVideoSet:{
    		   name:"",
    		   imgAddress:"",
    		   author:'',
    		   summary:'',
    		   recommend:0,
    		   cost:0,
    		   totalPrice:0,
    		   status:1,
    		   videoSetCateId:''
			},
			//修改参数
			updateVideoSetModel:false,
			updateLoading:false,
			updateVideoSetRules: {
                videoSetCateId: [
                    {type:'number',required: true, message: '类型为必填项', trigger: 'blur'}
                    ],
                name: [
                    {required: true, message: '名称为必填项', trigger: 'blur'}
                    ],
                imgAddress: [
                    {required: true, message: '封面为必填项', trigger: 'blur'}
                    ],
                author: [
                    {required: true, message: '作者为必填项', trigger: 'blur'}
                    ],
                summary: [
                    {required: true, message: '简介为必填项', trigger: 'blur'}
                    ]
                },
			updateVideoSet:{
               name:"",
    		   imgAddress:"",
    		   author:'',
    		   summary:'',
               recommend:0,
    		   cost:0,
               totalPrice:0,
    		   status:1,
    		   videoSetCateId:''
      },
      //删除参数
      deleteVideoSet:{},
      //列表
	    videoSetCateList: [],
        videoSetList: [],
	    videoSetColumns: [
        {
          title: '序号',
          align:'center',
           width:100,
          render: (h, params) => {
            return h('span', params.index
            +(this.params.currentPage-1)*this.params.pageSize+this.params.startNum);
          }
        },
        {
          title: '视频集id',
          key: 'videoSetId',
           width:100,
          align:'center'
        },
        {
        	title:'视频集名称',
          key:'name',
           width:100,
          align:'center'
        },
        {
        	title:'封面',
          key:'imgAddress',
           width:100,
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
          title: '作者',
          key: 'author',
           width:100,
          align:'center'
        },
        {
          title: '简介',
          key: 'summary',
           width:200,
          align:'center',
          render: (h, params) => {
             return   h('span', {
                style: {
                  overflow:'hidden',
                  textOverflow:'ellipsis',
                  display:'-webkit-box', 
                  webkitBoxOrient:'vertical',
                  webkitLineClamp:2
                }
              },params.row.summary);
          }
        },
        {
          title: '推荐',
          key: 'recommend',
           width:100,
          render: (h, params) => {
          let value="";
            this.recommendList.forEach(element => {
              if(element.id==params.row.recommend){
                value=element.value;
              }
            });
             return  h('span',value);
          }
        },
        {
          title: '是否收费',
           width:100,
          key: 'cost',
          render: (h, params) => {
          let value="";
            this.costList.forEach(element => {
              if(element.id==params.row.cost){
                value=element.value;
              }
            });
             return  h('span',value);
          }
        },
        {
          title: '总价',
          key: 'totalPrice',
           width:100,
          align:'center'
        },
        {
          title: '视频集数',
          key: 'number',
           width:100,
          align:'center',
          render: (h, params) => {
              return  h('div', [
              h('span', params.row.number),
              h('Button', {
                props: {
                  type: 'info',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.$router.push('/main/video/'+params.row.videoSetId);
                  }
                }
              }, '视频')
            ])
          }
        },
        {
          title: '播放总次数',
          key: 'playNumber',
           width:100,
          align:'center'
        },
        {
        	title:'状态',
          key:'status',
           width:100,
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
           width:100,
          sortable: true,
          align:'center'
        },
        {
        	title:'修改时间',
          key:'updateDate',
           width:100,
          sortable: true,
          align:'center'
        },
				{
          title: '操作',
          key: 'action',
          width:200,
          align:'center',
          render: (h, params) => {
            var varhh0=  h('Button', {
                props: {
                  type: 'info',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.$router.push('/main/videoSetTag/'+params.row.videoSetId);
                  }
                }
              }, '标签');
            var varhh1=  h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
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
                on: {
                  click: () => {
                    this.delete(params.row)
                  }
                }
              }, '删除');
            	var s=h("div","");
			s=h("div",[
              varhh0,
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
    //更新上传图片
     updateImgAddressClick(p){
         this.$refs[p].click();
       },
  //获取列表
   getVideoSetCateList () {
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
     },
     {  
       pageNum:1,
       pageSize:1000})
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
       countUrl:'/videoSet/count',
       listUrl:'/videoSet/list',
       list:'videoSetList'
     },this.params)
    },
  //增加
	 add (params) {
      this.addVideoSetModel = true
      
    },
		//增加取消
		 addCancel () {
      if (!this.addLoading) {
        this.addVideoSetModel = false
        this.$refs.addVideoSet.resetFields()
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
      ref:'addVideoSet',
      url:'/videoSet/add',
      requestObject:'addVideoSet',
      loading:'addLoading',
      showModel:'addVideoSetModel'
    })
    },
	 update (params) {
      this.updateVideoSetModel = true
      this.updateVideoSet.videoSetId = params.videoSetId
     //获取修改实体
      this.axiosbusiness.get(this,{
         url:'/videoSet/'+params.videoSetId,
         list:'updateVideoSet',
         success:()=>{
           //删除子后缀
           this.$delete(this.updateVideoSet,'videoList');
           this.$delete(this.updateVideoSet,'videoSetTagList');
           console.log(this.updateVideoSet)
         }
       })
    },
		//修改取消
		 updateCancel () {
      if (!this.updateLoading) {
        this.updateVideoSetModel = false
        this.$refs.updateVideoSet.resetFields()
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
      ref:'updateVideoSet',
      url:'/videoSet/update',
      requestObject:'updateVideoSet',
      loading:'updateLoading',
      showModel:'updateVideoSetModel'
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
    this.deleteVideoSet={
      "videoSetId":params.videoSetId
    };
    this.axiosbusiness.delete(this,{
      url:'/videoSet/delete',
      requestObject:'deleteVideoSet'
    })
    }
  },
  created () {
    this.getVideoSetCateList();
    this.getList();
    //增加上传图片预加载
    this.utils.getQiniuSimpleUploader(this,{
      browseButton:'addImgAddress',
      dropElement:'addImgAddressBox',
      resource:'addVideoSet.imgAddress'
    });
    //修改上传图片预加载
    this.utils.getQiniuSimpleUploader(this,{
      browseButton:'updateImgAddress',
      dropElement:'updateImgAddressBox',
      resource:'updateVideoSet.imgAddress'
    });
  },
  mounted () {

  }
}
</script>
