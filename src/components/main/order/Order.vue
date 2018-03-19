<!--订单管理 -->
<template>
    <div class="body-wrap">
        <div style="color:green;">
            备注：下单人id即为账户id
            业务id分两种，业务类型为付费课程，则业务id为视频集id;否则为账户等级id
        </div>
      <div class="body-btn-wrap">
        <div class="search-wrap">
          <Select v-model="params.type" transfer class="search-wrap-input"  placeholder="业务类型，全部">
              <Option v-for="item in typeParamsList" :value="item.id" :key="item.id">{{ item.value }}</Option>
          </Select>
          <Select v-model="params.payType" transfer class="search-wrap-input"  placeholder="支付类型，全部">
              <Option v-for="item in payTypeParamsList" :value="item.id" :key="item.id">{{ item.value }}</Option>
          </Select>
          <Input v-model="params.accountId" class="search-wrap-input" placeholder="下单人id"></Input>
          <Select v-model="params.status" transfer class="search-wrap-input"  placeholder="状态，全部">
              <Option v-for="item in statusParamsList" :value="item.id" :key="item.id">{{ item.value }}</Option>
          </Select>
          <Button @click="search" type="info"  >查询</Button>
        </div>
      </div>
      <Table border  :columns='orderColumns' :data='orderList' ref='table' size="small"></Table>
        <div style='display: inline-block;float: right; margin-top:10px;'>
        <Page style='margin-right:10px;' :total='params.total' :pageSize='params.pageSize' ref='page' :show-total='true'   @on-change='selectPage' show-elevator ></Page>
      </div>
    </div>
    
</template>
<script>
export default {
  name: 'Order',
  data () {
    return {
        params:{
            status:2,//默认已完成
            startNum:1,//初始化个数
            currentPage:1,//当前页
            pageNum:1,//获取的第几个开始
            pageSize:10,//每页的个数
            total:0//总数
        },
      //类型，1VIP购买，2团购卡团购，3付费课程
      typeList:[
        {id:1,value:'VIP购买'},
        {id:2,value:'团购卡团购'},
        {id:3,value:'付费课程'}
      ],
      //支付类型，1支付宝，2微信,3余额支付,4ios内购
      payTypeList:[
        {id:1,value:'支付宝'},
        {id:2,value:'微信'},
        {id:3,value:'余额支付'},
        {id:4,value:'ios内购'}
      ],
      //订单状态，-1待处理删除，0已完成删除,1待处理，2已完成
      statusList:[
        {id:-1,value:'待处理删除'},
        {id:0,value:'已完成删除'},
        {id:1,value:'待处理'},
        {id:2,value:'已完成'}
      ],
      //查询类型，1VIP购买，2团购卡团购，3付费课程
      typeParamsList:[
        {id:'',value:'全部'},
        {id:1,value:'VIP购买'},
        {id:2,value:'团购卡团购'},
        {id:3,value:'付费课程'}
      ],
      //查询支付类型，1支付宝，2微信,3余额支付,4ios内购
      payTypeParamsList:[
        {id:'',value:'全部'},
        {id:1,value:'支付宝'},
        {id:2,value:'微信'},
        {id:3,value:'余额支付'},
        {id:4,value:'ios内购'}
      ],
      //查询状态
      statusParamsList:[
        {id:-1,value:'待处理删除'},
        {id:0,value:'已完成删除'},
        {id:1,value:'待处理'},
        {id:2,value:'已完成'}
      ],
	    orderList: [],
	    orderColumns: [
        {
          title: '序号',
          align:'center',
          render: (h, params) => {
            return h('span', params.index
            +(this.params.currentPage-1)*this.params.pageSize+this.params.startNum);
          }
        },
        {
          title: '订单id',
          key: 'orderId',
          align:'center'
        },
        {
          title: '订单号',
          key: 'orderNumber',
          align:'center'
        },
        {
          title: '下单人id',
          key: 'accountId',
          align:'center'
        },
        {
        	title:'业务类型',
            key:'type',
            align:'center',
          render: (h, params) => {
            let typevalue="";
            let resulth;
            this.typeList.forEach(element => {
              if(element.id==params.row.type){
                typevalue=element.value;
              }
            });
                resulth=h('span', typevalue);   
             return  resulth;
          }
        },
        {
        	title:'支付类型',
            key:'payType',
            align:'center',
          render: (h, params) => {
            let payTypevalue="";
            let resulth;
            this.payTypeList.forEach(element => {
              if(element.id==params.row.payType){
                payTypevalue=element.value;
              }
            });
                resulth=h('span', payTypevalue);   
             return  resulth;
          }
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
                resulth=h('span', statusvalue);
             return  resulth;
          }
        },
        {
          title:'订单名称',
          align:'center',
          render: (h, params) => {
            let resulth;
             resulth=h('span', params.row.orderDetailList[0].name);
             return  resulth;
          }
        },
        {
          title:'订单封面',
          align:'center',
          render: (h, params) => {
             return h('img', {
              attrs: {
                src: params.row.orderDetailList[0].imgAddress
              },
              style: {
                width: '45px'
              }
            })
          }
        },
        {
          title:'数量',
          align:'center',
          render: (h, params) => {
            let resulth;
             resulth=h('span', params.row.orderDetailList[0].number);
             return  resulth;
          }
        },
        {
            title:'总价',
          align:'center',
          render: (h, params) => {
              let resulth;
             resulth=h('span', params.row.orderDetailList[0].totalPrice);
             return  resulth;
          }
        },
        {
            title:'业务id',
            align:'center',
            render: (h, params) => {
            let resulth;
                resulth=h('span', params.row.orderDetailList[0].businessId);
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
       countUrl:'/order/count',
       listUrl:'/order/list',
       list:'orderList'
     },this.params)
    }
  },
  created () {
    this.getList();
  },
  mounted () {

  }
}
</script>
