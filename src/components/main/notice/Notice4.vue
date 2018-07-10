<!--商品申请自营管理 -->
<template>
    <div class="body-wrap">
      <Table border :columns='noticeColumns' :data='noticeList' ref='table' size="small"></Table>
        <div style='display:inline-block;float: right; margin-top:10px;'>
        <Page style='margin-right:10px;' :total='params.total' :pageSize='params.pageSize' ref='page' :show-total='true'  @on-change='selectPage' show-elevator ></Page>
      </div>
    </div>
</template>
<script>
export default {
  name: 'Notice2',
  data () {
    return {
        params:{
            region:2,//个人
            startNum:1,//初始化个数
            currentPage:1,//当前页
            pageNum:1,//获取的第几个开始
            pageSize:10,//每页的个数
            total:0//总数
        },
        //状态，0正常，1审核中，2申请成功，3申请失败
        statusList:[
            {id:0,value:'正常'},
            {id:1,value:'审核中'},
            {id:2,value:'申请成功'},
            {id:3,value:'申请失败'}
        ],
        commonNotice:{},
      //列表
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
          title: '商品申请自营id',
          key: 'noticeId',
          align:'center'
        },
        {
          title: '业务id（商品id）',
          key: 'businessId',
          align:'center'
        },
        {
          title: '账户id（商户id）',
          key: 'accountId',
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
        	title:'内容',
          key:'content',
          //width:200,
          align:'center',
          render: (h, params) => {
              var content =JSON.parse(params.row.content);
            return h('div',
            [
                h("div","商品名称："+content.merName),
                h("div","商品种类："+content.merCateName),
                h("div","商品价格："+content.merPrice+"元"),
                h("div","平台技术服务费："+content.merPlatformProportion+"%"),
            ]);
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
              
           let statusvalue="";
            let resulth;
            this.statusList.forEach(element => {
              if(element.id==params.row.status){
                statusvalue=element.value;
              }
            });
            let shtg=h('Button', {
                        props: {
                        type: 'success',
                        size: 'small'
                        },
                        style: {
                        margin: '10px'
                        },
                        on: {
                        click: () => {
                            this.changeToStatus2(params.row)
                        }
                        }
                     }, '审核通过');
            let jjtg= h('Button', {
                        props: {
                        type: 'error',
                        size: 'small'
                        },
                        style: {
                        margin: '10px'
                        },
                        on: {
                        click: () => {
                            this.changeToStatus3(params.row)
                        }
                        }
                     }, '拒绝通过');
                  if(statusvalue!='审核中'){
                      shtg="",
                      jjtg=""
                  }   
                resulth=h('div', [
                    h("div",statusvalue),
                   shtg,
                   jjtg
                ]);   
             return  resulth;
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
    this.params.type=4;//类型，1系统消息，2商品申请自营，3新增商品类型，4商品申请自营，5提现申请，6问题单反馈，7订单商品动态
     this.axiosbusiness.getList(this,{
       countUrl:'/notice/count',
       listUrl:'/notice/list',
       data:'noticeList'
     },this.params)
    },
    //审核通过
    changeToStatus2(params){
    /**
     * 通用
     * $this  vue组件
     * p.url 修改url
     * p.title 标题
     * p.content 内容
     * p.requestObject 请求参数对象
     * p.success 成功回调
     */
    this.commonNotice={
      noticeId:params.noticeId,
      type:params.type,
      status:2
    };
    this.axiosbusiness.common(this,{
      title:'审核通过',
      content:'确定审核通过吗？',
      url:'/notice/update',
      requestObject:'commonNotice'
    })
    },
    //拒绝通过
    changeToStatus3(params){
    /**
     * 通用
     * $this  vue组件
     * p.url 修改url
     * p.title 标题
     * p.content 内容
     * p.requestObject 请求参数对象
     * p.success 成功回调
     */
    this.commonNotice={
      noticeId:params.noticeId,
      type:params.type,
      status:3
    };
    this.axiosbusiness.common(this,{
      title:'拒绝通过',
      content:'确定拒绝通过吗？',
      url:'/notice/update',
      requestObject:'commonNotice'
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
