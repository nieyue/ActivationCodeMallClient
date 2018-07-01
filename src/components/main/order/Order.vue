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
      //类型，1购买商品，2账户提现，3退款，4诚信押金
      typeList:[
        {id:1,value:'购买商品'},
        {id:2,value:'账户提现'},
        {id:3,value:'退款'},
        {id:4,value:'诚信押金'}
      ],
      //方式，1支付宝，2微信,3百度钱包,4Paypal,5网银
      payTypeList:[
        {id:1,value:'支付宝'},
        {id:2,value:'微信'},
        {id:3,value:'百度钱包'},
        {id:4,value:'Paypal'},
        {id:5,value:'网银'}
      ],
      //订单状态，2待支付，3已支付,4预购商品，5问题单，6已取消，7已删除
      //子状态，2（1待支付），3（1冻结单，2已完成），4（1等待发货），
      //5（1待解决（买家提问后），2解决中（卖家回复后），3申请退款，4已退款，5已解决），6（1正常取消,2订单商品库存不够），7（1已删除）
      statusList:[
        {
          id:2,
          value:'待支付',
          substatusList:[
           {id:1,value:'待支付'},
          ]
        },
        {
          id:3,
          value:'已支付',
          substatusList:[
           {id:1,value:'冻结单'},
           {id:2,value:'已完成'},
          ]
        },
        {
          id:4,
          value:'预购商品',
          substatusList:[
           {id:1,value:'等待发货'},
          ]
          },
        {
          id:5,
          value:'问题单',
          substatusList:[
           {id:1,value:'待解决'},
           {id:2,value:'解决中'},
           {id:3,value:'申请退款'},
           {id:4,value:'已退款'},
           {id:5,value:'已解决'},
          ]
          },
        {
          id:6,
          value:'已取消',
          substatusList:[
           {id:1,value:'正常取消'},
           {id:2,value:'订单商品库存不够'},
          ]
          },
        {
          id:7,
          value:'已删除',
          substatusList:[
            {id:1,value:'已删除'}
          ]
          },
      ],
     
      //类型，1购买商品，2账户提现，3退款，4诚信押金
      typeParamsList:[
        {id:1,value:'购买商品'},
        {id:2,value:'账户提现'},
        {id:3,value:'退款'},
        {id:4,value:'诚信押金'}
      ],
      //方式，1支付宝，2微信,3百度钱包,4Paypal,5网银
      payTypeParamsList:[
        {id:1,value:'支付宝'},
        {id:2,value:'微信'},
        {id:3,value:'百度钱包'},
        {id:4,value:'Paypal'},
        {id:5,value:'网银'}
      ],
      //查询状态
      //订单状态，2待支付，3已支付,4预购商品，5问题单，6已取消，7已删除
      //子状态，2（1待支付），3（1冻结单，2已完成），4（1等待发货），
      //5（1待解决（买家提问后），2解决中（卖家回复后），3申请退款，4已退款，5已解决），6（1正常取消,2订单商品库存不够），7（1已删除）
      statusParamsList:[
        {
          id:2,
          value:'待支付',
          substatusList:[
           {id:1,value:'待支付'},
          ]
        },
        {
          id:3,
          value:'已支付',
          substatusList:[
           {id:1,value:'冻结单'},
           {id:2,value:'已完成'},
          ]
        },
        {
          id:4,
          value:'预购商品',
          substatusList:[
           {id:1,value:'等待发货'},
          ]
          },
        {
          id:5,
          value:'问题单',
          substatusList:[
           {id:1,value:'待解决'},
           {id:2,value:'解决中'},
           {id:3,value:'申请退款'},
           {id:4,value:'已退款'},
           {id:5,value:'已解决'},
          ]
          },
        {
          id:6,
          value:'已取消',
          substatusList:[
           {id:1,value:'正常取消'},
           {id:2,value:'订单商品库存不够'},
          ]
          },
        {
          id:7,
          value:'已删除',
          substatusList:[
            {id:1,value:'已删除'}
          ]
          },
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
        	title:'状态/子状态',
           // key:'status',
            align:'center',
          render: (h, params) => {
            let statusvalue="";
            let substatusvalue="";
            let resulth;
            this.statusList.forEach(element => {
              if(element.id==params.row.status){
                statusvalue=element.value;
                  element.substatusList.forEach(substatus => {
                    if(substatus.id==params.row.substatus){
                      substatusvalue=substatus.value;
                    }
                  });
              }
            });
                resulth=h('span', statusvalue+"/"+substatusvalue);
             return  resulth;
          }
        },
        {
          title:'订单商品类型',
          align:'center',
          render: (h, params) => {
            let resulth;
             resulth=h('span', params.row.orderDetailList[0].merCateName);
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
          title:'单价',
          align:'center',
          render: (h, params) => {
            let resulth;
             resulth=h('span', params.row.orderDetailList[0].unitPrice);
             return  resulth;
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
            title:'优惠券',
            align:'center',
            render: (h, params) => {
            let resulth;
            let value="未使用";
            if(params.row.orderDetailList[0].coupon){
              value=params.row.orderDetailList[0].coupon.code
            }
                resulth=h('span', value);
                return  resulth;
            }
        },
        {
          title:'下单时间',
          key:'createDate',
          sortable: true,
          align:'center'
        },
        {
          title:'支付时间',
          key:'paymentDate',
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
       data:'orderList',
       success:()=>{
        // console.log(this.orderList)
       }
     },this.params)
    }
  },
  created () {
    console.log(22222)
    this.getList();
  },
  mounted () {

  }
}
</script>
