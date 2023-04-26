"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = common_vendor.defineComponent({
  setup() {
    console.log(11);
    const menuButtonInfo = common_vendor.reactive(common_vendor.index.getMenuButtonBoundingClientRect());
    common_vendor.onReady(() => {
      console.log("ready", menuButtonInfo);
    });
    common_vendor.onInit(() => {
      console.log("init2");
    });
    return {
      menuButtonInfo
    };
  },
  mounted() {
    console.log("mounted");
  },
  onLoad() {
    console.log("load");
  },
  onInit() {
    console.log("init");
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: _ctx.menuButtonInfo.top + "px"
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/codes/study-english-uniapp/pages/tabBar/home/Home.vue"]]);
wx.createPage(MiniProgramPage);
