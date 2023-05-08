"use strict";
const common_vendor = require("../../../common/vendor.js");
const utils_request = require("../../../utils/request.js");
const Swiper = () => "./Swiper/Swiper.js";
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
  components: {
    Swiper
  },
  onLoad() {
    console.log("load");
  },
  onInit() {
    console.log("init");
  },
  methods: {
    request1() {
      console.log("request");
      common_vendor.index.login({
        success(res) {
          console.log("login", res);
        }
      });
      utils_request.getLessons().then((res) => {
        console.log("success", res);
      }).catch((err) => {
        console.log("err", err);
      });
    },
    routeToCourse() {
      common_vendor.index.navigateTo({
        url: "/pages/Course/Course"
      });
    },
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
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: _ctx.menuButtonInfo.top + "px",
    b: common_vendor.p({
      type: "forward",
      size: "14"
    }),
    c: common_vendor.o((...args) => _ctx.routerToRecord && _ctx.routerToRecord(...args)),
    d: common_vendor.p({
      type: "forward",
      size: "14"
    }),
    e: common_vendor.o((...args) => _ctx.routerToToday && _ctx.routerToToday(...args)),
    f: _ctx.autoplay,
    g: _ctx.interval,
    h: _ctx.duration,
    i: common_vendor.o((...args) => _ctx.request1 && _ctx.request1(...args)),
    j: common_vendor.p({
      type: "forward",
      size: "12"
    }),
    k: common_vendor.o((...args) => _ctx.routerToMore && _ctx.routerToMore(...args)),
    l: common_vendor.f(_ctx.courses, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.title),
        b: common_vendor.t(item.tip),
        c: common_vendor.t(item.viewNum)
      };
    }),
    m: common_vendor.o((...args) => _ctx.routeToCourse && _ctx.routeToCourse(...args)),
    n: common_vendor.p({
      type: "plusempty"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/workspace/codes/study-english-uniapp/pages/tabBar/home/Home.vue"]]);
wx.createPage(MiniProgramPage);
