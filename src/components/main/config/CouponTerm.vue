<!--优惠劵项管理 -->
<template>
    <div class="body-wrap">
    <div class="body-btn-wrap">
      <Button type='primary'  @click='add'>增加优惠劵项</Button>
    </div>
		 <!--新增 -->
     <Modal v-model="addCouponTermModel"
           title="新增优惠劵项管理"
           :closable="false"
           :mask-closable="false"
    >
      <Form ref="addCouponTerm" :model="addCouponTerm" :label-width="100" label-position="right"  :rules="addCouponTermRules">
         <FormItem prop="merCateId" label="商品类型(可选，选择代表只能该类型的商品才能使用):">
          <Select v-model="addCouponTerm.merCateId"  transfer size="large" style="width:100px">
              <Option v-for="item in merCateList" :value="item.merCateId" :key="item.merCateId">{{ item.name }}</Option>
          </Select>
        </FormItem>
         <FormItem prop="name" label="名称:">
          <Input type="text" v-model="addCouponTerm.name" placeholder="名称">
          </Input>
        </FormItem>
        <FormItem prop="imgAddress" label="优惠劵项(上传或者填写):" id="addImgAddressBox">
          <Button type="primary" @click="addImgAddressClick('addImgAddress')" >上传</Button>
          <input type="file" style="width:0px;height:0px;" id="addImgAddress" ref="addImgAddress">
          <div>
            <Input type="text" v-model="addCouponTerm.imgAddress" placeholder="优惠劵项">
          </Input>
             <img :src="addCouponTerm.imgAddress"  style='width:200px;'alt="">
          </div>
        </FormItem>
        <FormItem prop="discount" label="折扣:">
          <InputNumber :max="1" :min="0"  :precision='2' v-model="addCouponTerm.discount"></InputNumber>
        </FormItem>
        <FormItem prop="content" label="内容:">
          <Input type="textarea" v-model="addCouponTerm.content" :autosize="{minRows: 2,maxRows: 5}"  placeholder="内容,0-200">
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
     <Modal v-model="updateCouponTermModel"
           title="修改优惠劵项管理"
           :closable="false"
           :mask-closable="false"
    >
      <Form ref="updateCouponTerm" :model="updateCouponTerm" :label-width="100" label-position="right"  :rules="updateCouponTermRules">
       <FormItem prop="merCateId" label="商品类型(可选，选择代表只能该类型的商品才能使用):">
          <Select v-model="updateCouponTerm.merCateId"  transfer size="large" style="width:100px">
              <Option v-for="item in merCateList" :value="item.merCateId" :key="item.merCateId">{{ item.name }}</Option>
          </Select>
        </FormItem>
         <FormItem prop="name" label="名称:">
          <Input type="text" v-model="updateCouponTerm.name" placeholder="名称">
          </Input>
        </FormItem>
        <FormItem prop="imgAddress" label="优惠劵项(上传或者填写):" id="updateImgAddressBox">
          <Button type="primary" @click="updateImgAddressClick('updateImgAddress')" >上传</Button>
          <input type="file" style="width:0px;height:0px;" id="updateImgAddress" ref="updateImgAddress">
          <div>
            <Input type="text" v-model="updateCouponTerm.imgAddress" placeholder="优惠劵项">
          </Input>
             <img :src="updateCouponTerm.imgAddress"  style='width:200px;'alt="">
          </div>
        </FormItem>
        <FormItem prop="discount" label="折扣:">
          <InputNumber :max="1" :min="0"  :precision='2' v-model="updateCouponTerm.discount"></InputNumber>
        </FormItem>
        <FormItem prop="content" label="内容:">
          <Input type="textarea" v-model="updateCouponTerm.content" :autosize="{minRows: 2,maxRows: 5}"  placeholder="内容,0-200">
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
      <Table border  :columns='couponTermColumns' :data='couponTermList' ref='table' size="small"></Table>
        <div style='display: inline-block;float: right; margin-top:10px;'>
        <Page style='margin-right:10px;' :total='params.total' :pageSize='params.pageSize' ref='page' :show-total='true'   @on-change='selectPage' show-elevator ></Page>
      </div>
    </div>
    
</template>
<script>
export default {
  name: 'CouponTerm',
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
			addCouponTermModel:false,
			addLoading:false,
			addCouponTermRules: {
                },
			addCouponTerm:{
                discount:1,
                imgAddress:''
			},
			//修改参数
			updateCouponTermModel:false,
			updateLoading:false,
			updateCouponTermRules: {
                },
			updateCouponTerm:{},
      //删除参数
      deleteCouponTerm:{},
	    merCateList: [],
	    couponTermList: [],
	    couponTermColumns: [
        {
          title: '序号',
          align:'center',
          render: (h, params) => {
            return h('span', params.index
            +(this.params.currentPage-1)*this.params.pageSize+this.params.startNum);
          }
        },
        {
          title: '优惠劵项id',
          key: 'couponTermId',
          align:'center'
        },
         {
        	title:'商品类型',
            //key:'merCateId',
            width:100,
          align:'center',
          render: (h, params) => {
            let merCatevalue="";
            this.merCateList.forEach(element => {
              if(element.merCateId==params.row.merCateId){
                merCatevalue=element.name;
              }
            });
             return  h('span',merCatevalue);
          }
        },
        {
          title: '名称',
          key: 'name',
          align:'center'
        },
          {
        	title:'图片',
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
          title:'折扣',
          key:'discount',
          sortable: true,
          align:'center'
        },
        {
          title:'更新时间',
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
    //增加中的上传图片
     addImgAddressClick(p){
         this.$refs[p].click();
       },
    //更新中的上传图片
     updateImgAddressClick(p){
         this.$refs[p].click();
       },
       //获取列表
   getMerCateList () {
     /**
     * 获取列表
     * $this  vue组件
     * p.countUrl 数量url
     * p.listUrl 列表url
     * p.data 返回列表
     */
    this.params.pageSize=1000000;
     this.axiosbusiness.getList(this,{
       countUrl:'/merCate/count',
       listUrl:'/merCate/list',
       data:'merCateList',
       success:()=>{
           //初始化
       // this.addCouponTerm.merCateId=this.merCateList[0].merCateId 
        
         this.params.pageSize=10;
        this.getList();
       }
     },
    this.params)
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
       countUrl:'/couponTerm/count',
       listUrl:'/couponTerm/list',
       data:'couponTermList'
     },this.params)
    },
  //增加
	 add (params) {
      this.addCouponTermModel = true
    },
		//增加取消
		 addCancel () {
      if (!this.addLoading) {
        this.addCouponTermModel = false
        this.$refs.addCouponTerm.resetFields()
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
    this.addCouponTerm.merId=this.$route.params.merId
    this.axiosbusiness.add(this,{
      ref:'addCouponTerm',
      url:'/couponTerm/add',
      requestObject:'addCouponTerm',
      loading:'addLoading',
      showModel:'addCouponTermModel'
    })
    },
	 update (params) {
      this.updateCouponTermModel = true
     //获取修改实体
      this.axiosbusiness.get(this,{
         url:'/couponTerm/load?couponTermId='+params.couponTermId,
         data:'updateCouponTerm',
       })
    },
		//修改取消
		 updateCancel () {
      if (!this.updateLoading) {
        this.updateCouponTermModel = false
        this.$refs.updateCouponTerm.resetFields()
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
     delete this.updateCouponTerm.merCate
    this.axiosbusiness.update(this,{
      ref:'updateCouponTerm',
      url:'/couponTerm/update',
      requestObject:'updateCouponTerm',
      loading:'updateLoading',
      showModel:'updateCouponTermModel'
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
    this.deleteCouponTerm={
      "couponTermId":params.CouponTermId
    };
    this.axiosbusiness.delete(this,{
      url:'/couponTerm/delete',
      requestObject:'deleteCouponTerm'
    })
    }
  },
  created () {
    this.getMerCateList();
    //增加中的上传图片预加载
    this.utils.getQiniuSimpleUploader(this,{
      browseButton:'addImgAddress',
      dropElement:'addImgAddressBox',
      resource:'addCouponTerm.imgAddress'
    });
    //修改中的上传图片预加载
    this.utils.getQiniuSimpleUploader(this,{
      browseButton:'updateImgAddress',
      dropElement:'updateImgAddressBox',
      resource:'updateCouponTerm.imgAddress'
    });
  },
  mounted () {

  }
}
</script>
