<!--积分排行榜管理 -->
<template>
    <div class="body-wrap">
    <Alert style="width:50%;display:inline-block" v-for="item in typeList" :value="item.id" :key="item.id" >
        <div>
            <div>{{item.value}}</div>
            <span v-for="sitem in timeTypeList":value="sitem.id" :key="sitem.id" v-if="(item.id==2 && sitem.id==3)||item.id!=2" >
                <Button type="info" @click="changeType(item,sitem)" :disabled="item==currentType&&sitem==currentTimeType">{{sitem.value}}</Button>
            </span>
        </div>
    </Alert> 
        <Alert type="success" style="text-align:center;">{{currentType.value}}{{currentTimeType.value}}排行榜</Alert>
      <Table border  :columns='integralBoardColumns' :data='integralBoardList' ref='table' size="small"></Table>
        <div style='display: inline-block;float: right; margin-top:10px;'>
        <Page style='margin-right:10px;' :total='params.total' :pageSize='params.pageSize' ref='page' :show-total='true'   @on-change='selectPage' show-elevator ></Page>
      </div>
    </div>
    
</template>
<script>
export default {
  name: 'IntegralBoard',
  data () {
    return {
        params:{
            startNum:1,//初始化个数
            currentPage:1,//当前页
            pageNum:1,//获取的第几个开始
            pageSize:10,//每页的个数
            total:0//总数
        },
      /**
       *类型
       */
      typeList:[
        {id:1,value:'个人'},
        {id:2,value:'团队'}
      ],
      /**
       * 时间类型
       */
      timeTypeList:[
        {id:1,value:'周'},
        {id:2,value:'月'},
        {id:3,value:'总'}
      ],
      currentType:null,
      currentTimeType:null,
	    integralBoardList: [],
	    integralBoardColumns: [
        {
          title: '序号/排名',
          align:'center',
          render: (h, params) => {
            return h('span', params.index
            +(this.params.currentPage-1)*this.params.pageSize+this.params.startNum);
          }
        },
        {
          title: '积分排行榜id',
          key: 'integralBoardId',
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
        	title:'时间类型',
            key:'timeType',
            align:'center',
          render: (h, params) => {
            let timeTypevalue="";
            this.timeTypeList.forEach(element => {
              if(element.id==params.row.timeType){
                timeTypevalue=element.value;
              }
            });
             return  h('span',timeTypevalue);
          }
        },
        {
        	title:'真实姓名',
            key:'realname',
            align:'center'
        },
        {
        	title:'图像',
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
        	title:'积分',
            key:'integral',
            align:'center'
        },
        {
            title:'账户id',
            key:'accountId',
            align:'center'
        },
        {
          title:'记录时间',
          key:'recordTime',
          sortable: true,
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
     * p.list 返回列表
     */
    this.params.accountId=this.$route.params.accountId||1000
    this.params.type=this.currentType.id
    this.params.timeType=this.currentTimeType.id
     this.axiosbusiness.getList(this,{
       countUrl:'/integralBoard/count',
       listUrl:'/integralBoard/ranking',
       list:'integralBoardList',
       success:(l)=>{
           this.integralBoardList=l[0].integralBoardList;
       }
     },this.params)
    },
    /**
     * 切换
     */
    changeType(item,sitem){
        this.currentType=item
        this. currentTimeType=sitem
        this.getList();
    }
  },
  created () {
     this.currentType=this.typeList[0]
     this. currentTimeType=this.timeTypeList[0]
    this.getList();
  },
  mounted () {

  }
}
</script>
