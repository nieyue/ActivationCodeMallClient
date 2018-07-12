<!--商品订单问题管理 -->
<template>
    <div class="body-wrap">
   <!--  <div class="body-btn-wrap">
      <Button type='primary'  @click='add'>增加商品订单问题</Button>
    </div> -->
		 <!--新增 -->
     <!--  <Modal v-model="addOrderProblemModel"
           title="新增商品订单问题管理"
           :closable="false"
           :mask-closable="false"
    >
      <Form ref="addOrderProblem" :model="addOrderProblem" :label-width="100" label-position="right"  :rules="addOrderProblemRules">
        <FormItem prop="reason" label="原因:">
            <RadioGroup v-model="addOrderProblem.reason">
                <Radio :label="item.id" v-for="item of reasonList">{{item.value}}</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem prop="content" label="内容:">
            <Input v-model="addOrderProblem.content" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="内容..."></Input>
        </FormItem>
      </Form>
      <div slot='footer'>
        <Button type='ghost' @click='addCancel'>取消</Button>
        <Button type='primary' :loading='addLoading'>
          <span v-if="!addLoading" @click='addSure'>确定</span>
          <span v-else>Loading...</span>
        </Button>
      </div>
    </Modal>  -->
    <!--新增end -->
		 <!--修改 -->
     <Modal v-model="updateOrderProblemModel"
           title="修改商品订单问题管理"
           :closable="false"
           :mask-closable="false"
    >
      <Form ref="updateOrderProblem" :model="updateOrderProblem" :label-width="100" label-position="right"  :rules="updateOrderProblemRules">
        <FormItem prop="reason" label="原因:">
            <RadioGroup v-model="updateOrderProblem.reason">
                <Radio :label="item.id" v-for="item of reasonList">{{item.value}}</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem prop="content" label="内容:">
            <Input v-model="updateOrderProblem.content" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="内容..."></Input>
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
      <Table border  :columns='orderProblemColumns' :data='orderProblemList' ref='table' size="small"></Table>
        <div style='display: inline-block;float: right; margin-top:10px;'>
        <Page style='margin-right:10px;' :total='params.total' :pageSize='params.pageSize' ref='page' :show-total='true'   @on-change='selectPage' show-elevator ></Page>
      </div>
    </div>
    
</template>
<script>
export default {
  name: 'OrderProblem',
  data () {
    return {
        params:{
            startNum:1,//初始化个数
            currentPage:1,//当前页
            pageNum:1,//获取的第几个开始
            pageSize:10,//每页的个数
            total:0//总数
        },
        //原因，0其他，1不能充值，2卡密无效，3提示卡密错误
        reasonList:[
            {id:0,value:'其他'},
            {id:1,value:'不能充值'},
            {id:2,value:'卡密无效'},
            {id:3,value:'提示卡密错误'}
        ],
			//增加参数
			addOrderProblemModel:false,
			addLoading:false,
			addOrderProblemRules: {
                },
			addOrderProblem:{
                imgAddress:''
			},
			//修改参数
			updateOrderProblemModel:false,
			updateLoading:false,
			updateOrderProblemRules: {
                },
			updateOrderProblem:{},
      //删除参数
      deleteOrderProblem:{},
      mer:{},
	    orderProblemList: [],
	    orderProblemColumns: [
        {
          title: '序号',
          align:'center',
          render: (h, params) => {
            return h('span', params.index
            +(this.params.currentPage-1)*this.params.pageSize+this.params.startNum);
          }
        },
        {
          title: '商品订单问题id',
          key: 'orderProblemId',
          align:'center'
        },
          {
        	title:'商品订单详情',
          align:'center',
          render: (h, params) => {
             let mer=params.row.mer;
             return  h('div',[
                 h("div","商品名称:"+mer.name),
                 h("div","商品种类:"+mer.merCate.name),
                 h("div",[
                     "商品图片:",
                     h("img", {
                        attrs: {
                            src: mer.imgAddress
                        },
                        style: {
                            width: '80px',
                            height:'80px'
                        }
                        })]
                ),
             ]);
          }
        },
          {
        	title:'原因',
          align:'center',
          render: (h, params) => {
              var reasonvalue="其他";
            this.reasonList.forEach(element => {
              if(element.id==params.row.reason){
                reasonvalue=element.value;
              }
            });
             return  h('span',reasonvalue);
          }
        },
          {
            title:'顺序',
            key:'number',
          align:'center',
        },
          {
            title:'内容',
            key:'content',
          align:'center',
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
            var varhh3=  h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                style: {
                  margin: '10px'
                },
                on: {
                  click: () => {
                     this.$router.push('/main/orderProblemAnswer/'+params.row.orderProblemId);
                  }
                }
              }, '订单问题回复');
            	var s=h("div","");
            
            s=h("div",[
              varhh1
              ,varhh2
              ,varhh3
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
    this.params.orderId=this.$route.params.orderId
     this.axiosbusiness.getList(this,{
       countUrl:'/orderProblem/count',
       listUrl:'/orderProblem/list',
       data:'orderProblemList',
       success:()=>{
       }
     },this.params)
    },
  //增加
	 add (params) {
      this.addOrderProblemModel = true
    },
		//增加取消
		 addCancel () {
      if (!this.addLoading) {
        this.addOrderProblemModel = false
        this.$refs.addOrderProblem.resetFields()
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
    this.addOrderProblem.orderId=this.$route.params.orderId
    this.axiosbusiness.add(this,{
      ref:'addOrderProblem',
      url:'/orderProblem/add',
      requestObject:'addOrderProblem',
      loading:'addLoading',
      showModel:'addOrderProblemModel'
    })
    },
	 update (params) {
      this.updateOrderProblemModel = true
     //获取修改实体
      this.axiosbusiness.get(this,{
         url:'/orderProblem/load?orderProblemId='+params.orderProblemId,
         data:'updateOrderProblem',
       })
    },
	//修改取消
	updateCancel () {
      if (!this.updateLoading) {
        this.updateOrderProblemModel = false
        this.$refs.updateOrderProblem.resetFields()
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
      ref:'updateOrderProblem',
      url:'/orderProblem/update',
      requestObject:'updateOrderProblem',
      loading:'updateLoading',
      showModel:'updateOrderProblemModel'
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
    this.deleteOrderProblem={
      "orderProblemId":params.orderProblemId
    };
    this.axiosbusiness.delete(this,{
      url:'/orderProblem/delete',
      requestObject:'deleteOrderProblem'
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
