<!--vip购买次数管理 -->
<template>
    <div class="body-wrap">
      <div class="body-btn-wrap">
        <div class="search-wrap">
          <Input v-model="params.number" class="search-wrap-input" placeholder="次数"></Input>
          <Input v-model="params.accountId" class="search-wrap-input" placeholder="购买人id"></Input>
          <Input v-model="params.realMasterId" class="search-wrap-input" placeholder="真实上级id"></Input>
          <Select v-model="params.status" transfer class="search-wrap-input"  placeholder="状态，全部">
              <Option v-for="item in statusParamsList" :value="item.id" :key="item.id">{{ item.value }}</Option>
          </Select>
          <Button @click="search" type="info"  >查询</Button>
        </div>
      </div>
    
 <!--修改 -->
     <Modal v-model="updateVipNumberModel"
           title="修改"
           :closable="false"
           :mask-closable="false"
    >
      <Form ref="updateVipNumber" :model="updateVipNumber" :label-width="100" label-position="right"  :rules="updateVipNumberRules">
        <FormItem prop="status" label="状态:">
          <Select v-model="updateVipNumber.status" transfer class="search-wrap-input">
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

      <Table border  :columns='vipNumberColumns' :data='vipNumberList' ref='table' size="small"></Table>
        <div style='display: inline-block;float: right; margin-top:10px;'>
        <Page style='margin-right:10px;' :total='params.total' :pageSize='params.pageSize' ref='page' :show-total='true'   @on-change='selectPage' show-elevator ></Page>
      </div>
    </div>
    
</template>
<script>
export default {
  name: 'VipNumber',
  data () {
    return {
        params:{
            startNum:1,//初始化个数
            currentPage:1,//当前页
            pageNum:1,//获取的第几个开始
            pageSize:10,//每页的个数
            total:0//总数
        },
      //状态1待处理，2已处理，3已超次
      statusList:[
        {id:1,value:'待处理'},
        {id:2,value:'已处理'},
        {id:3,value:'已超次'}
      ],
      //查询状态
      statusParamsList:[
        {id:'',value:'全部'},
        {id:1,value:'待处理'},
        {id:2,value:'已处理'},
        {id:3,value:'已超次'}
      ],
      	//修改参数
        updateVipNumberModel:false,
        updateLoading:false,
        updateVipNumber:{},
        updateVipNumberRules:{},
	    vipNumberList: [],
	    vipNumberColumns: [
        {
          title: '序号',
          align:'center',
          render: (h, params) => {
            return h('span', params.index
            +(this.params.currentPage-1)*this.params.pageSize+this.params.startNum);
          }
        },
        {
          title: 'vip购买次数id',
          key: 'vipNumberId',
          align:'center'
        },
        {
          title: '次数',
          key: 'number',
          align:'center'
        },
        {
          title: '购买人id',
          key: 'accountId',
          align:'center'
        },
        {
          title: '真实上级id',
          key: 'realMasterId',
          align:'center'
        },
       {
        	title:'状态',
            key:'status',
            align:'center',
          render: (h, params) => {
            let statusvalue="";
            let resulth;
            this.statusList.forEach(element => {
              if(element.id==params.row.status){
                statusvalue=element.value;
              }
            });
            resulth=h('span',
             [
                 statusvalue,
                h('Button', {
                    props: {
                    type: 'primary',
                    size: 'small'
                },
                style: {
                    margin: '15px'
                },
                on: {
                    click: () => {
                        this.update(params.row)
                  }
                }
              }, '编辑')
             ]
             );
            if(statusvalue=='已处理'){
                resulth=h('span', statusvalue);
                
            }
             return  resulth;
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
        }
      ],
    }
  },
  methods: {
    //查询
    search(){
      if(!this.params.transactionNumber){
      delete this.params.transactionNumber
      }
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
       countUrl:'/vipNumber/count',
       listUrl:'/vipNumber/list',
       list:'vipNumberList'
     },this.params)
    },
    update (params) {
      this.updateVipNumberModel = true
     //获取修改实体
      this.axiosbusiness.get(this,{
         url:'/vipNumber/'+params.vipNumberId,
         list:'updateVipNumber',
       })
    },
		//修改取消
		 updateCancel () {
      if (!this.updateLoading) {
        this.updateVipNumberModel = false
        this.$refs.updateVipNumber.resetFields()
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
      ref:'updateVipNumber',
      url:'/vipNumber/update',
      requestObject:'updateVipNumber',
      loading:'updateLoading',
      showModel:'updateVipNumberModel'
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
