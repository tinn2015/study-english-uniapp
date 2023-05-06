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
  data() {
    return {
      background: ["color1", "color2", "color3"],
      indicatorDots: false,
      autoplay: true,
      interval: 2e3,
      duration: 500,
      courses: [
        {
          poster: "",
          title: "英语水平测试",
          tip: "零基础",
          viewNum: "1200"
        }
      ]
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
  },
  methods: {
    routerToMore() {
      common_vendor.index.navigateTo({
        url: "/pages/CourseMore/CourseMore"
      });
    },
    routerToRecord() {
      common_vendor.index.navigateTo({
        url: "/pages/StudyRecord/StudyRecord"
      });
    },
    routerToToday() {
      common_vendor.index.navigateTo({
        url: "/pages/StudyToday/StudyToday"
      });
    }
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {};
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/douqiting01/Desktop/workspace/tinn/study-english-uniapp/pages/tabBar/my/My.vue"]]);
wx.createPage(MiniProgramPage);
