<template>
  <div id="app2">
    <a v-on:click="OnChangeSymbol('300045.sz')">华力创通</a>
    <a v-on:click="OnChangeSymbol('600276.sh')">恒瑞医药</a>
    <a v-on:click="OnChangeSymbol('000001.sh')">上证指数</a>
    <div class="divstockfull">
      <StockFull
        ref="stockfull"
        DefaultPeriod="日线"
        :DefaultSymbol="this.Symbol"
        :KLineOption="this.KLineOption"
        :MinuteOption="this.MinuteOption"
      />
    </div>
  </div>
</template>

<script>
import StockFull from "../../jscommon/umychart.vue.components/stockfull.vue";
import HQChart from "../../jscommon/umychart.vue/umychart.vue";

//定制K线设置
const CUSTOM_KLINE_OPTION = {
  //窗口指标
  Windows: [{ Index: "MA" }, { Index: "MACD" }],

  //TradeIndex: {Index:'交易系统-BIAS'},    //交易系统
  //ColorIndex:{ Index:'五彩K线-十字星'},     //五彩K线

  KLine: {
    //Info:["公告","互动易","调研"],              //信息地雷
    Right: 0 //复权 0 不复权 1 前复权 2 后复权
  }
};

const CUSTOM_MINUTE_OPTION = {
  //窗口指标
  Windows: [{ Index: "RSI" }]
};

export default {
  data() {
    return {
      KLineOption: CUSTOM_KLINE_OPTION,
      MinuteOption: CUSTOM_MINUTE_OPTION,
      Symbol: "000001.sz"
    };
  },

  components: { StockFull },

  created: function() {
    var symbol = this.GetURLParams("symbol");
    if (symbol != null) this.Symbol = symbol;
    var isLog = this.GetURLParams("log");
    if (isLog == "false") {
      HQChart.JSConsole.Chart.Log = () => {};
      HQChart.JSConsole.Complier.Log = () => {};
    }
  },

  mounted: function() {
    var stockfull = this.$refs.stockfull;

    var self = this;
    window.onresize = function() {
      self.OnSize();
    };

    this.OnSize();
  },

  methods: {
    OnChangeSymbol: function(symbol) {
      this.$refs.stockfull.SetSymbol(symbol);
    },

    OnSize: function() {
      var height = $(window).height();
      var width = $(window).width();

      //   $(".divstockfull").height(height - 70);

      this.$refs.stockfull.OnSize();
    },

    GetURLParams: function(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return decodeURI(r[2]);
      return null;
    }
  }
};
</script>

<style>
* {
  font: 14px / normal "Microsoft Yahei";
  color: #666;
  padding: 0;
  margin: 0;
}

.divstockfull {
  height: 600px;
  margin: 5px;
  border: 4px solid #ffa500;
}
</style>
