<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="item in cartInfoList" :key="item.id">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="item.isChecked === 1"
              @change="setGoodsChecked(item.skuId, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="item.imgUrl" />
            <div class="item-msg">
              {{ item.skuName }}
            </div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ item.skuPrice || 0 }}</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="handlerCount(item, item.skuNum > 1 ? '-1' : '0')"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="item.skuNum"
              minnum="1"
              class="itxt"
              @change="handlerCount(item, $event.target.value, 'change')"
            />
            <a href="javascript:void(0)" class="plus" @click="handlerCount(item, '1')">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ item.skuPrice * item.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteGoodById(item.skuId)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllCheck" @change="checkAllGoods" />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none" @click="deleteCheckedGood">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下架商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） :</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="###" target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCartList, setGoodsChecked, addToCart, deleteGood } from '@/api'
import throttle from '@/utils/throttle.js'
export default {
  name: 'ShopCart',
  created() {
    // 获取购物车列表
    this.getCartList()
  },
  data() {
    return {
      cartInfoList: []
    }
  },
  computed: {
    // 总价格
    totalPrice() {
      let sum = 0
      this.cartInfoList.forEach((item) => {
        if (item.isChecked === 1) {
          sum += item.skuPrice * item.skuNum
        }
      })
      return sum
    },
    // 是否全选
    isAllCheck() {
      return this.cartInfoList.every((item) => {
        return item.isChecked === 1
      })
    }
  },
  methods: {
    // 获取购物车列表
    async getCartList() {
      const res = await getCartList()
      if (res.code === 200) {
        this.cartInfoList = res.data[0].cartInfoList
      } else {
        alert(res.code)
      }
    },
    // 对已有物品数量进行改动
    handlerCount: throttle(async function (item, value, type) {
      if (type === 'change') {
        // 输入框传过来的值是输入的值，让它与原来的值相减，看需要更改多少
        value = parseInt(value) - item.skuNum
        // 如果输入的值不是数字
        if (isNaN(value)) value = '0'
        // 如果与原来的值相减后，得到负数，则归原位
        if (value <= -item.skuNum) value = '0'
      }
      const res = await addToCart(item.skuId, value)
      if (res.code === 200) {
        this.getCartList()
      } else {
        alert('修改失败')
      }
    }, 500),
    // 切换商品选中状态
    async setGoodsChecked(skuId, e) {
      const id = skuId + ''
      const check = e.target.checked ? '1' : '0'
      const res = await setGoodsChecked(id, check)
      if (res.code === 200) {
        this.getCartList()
      } else {
        alert('修改失败！')
      }
    },
    // 删除购物车中的某个商品
    async deleteGoodById(skuId) {
      const res = await deleteGood(skuId)
      if (res.code === 200) {
        this.getCartList()
      } else {
        alert('删除失败！')
      }
    },
    // 删除选中状态的商品
    deleteCheckedGood() {
      const checkArr = []
      this.cartInfoList.forEach(async (item) => {
        if (item.isChecked === 1) {
          checkArr.push(item.skuId)
        }
      })
      for (let i = 0, len = checkArr.length; i < len; i++) {
        this.deleteGoodById(checkArr[i])
      }
      this.getCartList()
    },
    // 选中全部商品
    checkAllGoods(e) {
      this.cartInfoList.forEach((item) => {
        if (e.target.checked) {
          if (item.isChecked !== 1) {
            this.setGoodsChecked(item.skuId, e)
          }
        } else {
          if (item.isChecked !== 0) {
            this.setGoodsChecked(item.skuId, e)
          }
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;
          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;
    margin-bottom: 10px;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: 'Microsoft YaHei';
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
