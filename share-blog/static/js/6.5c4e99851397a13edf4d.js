webpackJsonp([6],{"5FJh":function(t,e){},epW7:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("ZYmg"),s={data:function(){return{blogs:[],total:0,page:1}},created:function(){var t=this;this.page=parseInt(this.$route.query.page)||1,n.a.getIndexBlogs({page:this.page}).then(function(e){t.blogs=e.data,t.total=e.total,t.page=e.page})},methods:{onPageChange:function(t){var e=this;n.a.getIndexBlogs({page:t}).then(function(a){e.blogs=a.data,e.total=a.total,e.page=a.page,e.$router.push({path:"/",query:{page:t}})})}}},r={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"index",attrs:{id:"index"}},[a("section",{staticClass:"blog-posts"},t._l(t.blogs,function(e){return a("router-link",{key:e.id,staticClass:"item",attrs:{to:"/detail/"+e.id}},[a("figure",{staticClass:"avatar"},[a("img",{attrs:{src:e.user.avatar,alt:e.user.username}}),t._v(" "),a("figcaption",[t._v(t._s(e.user.username))])]),t._v(" "),a("h3",[t._v(t._s(e.title)),a("span",[t._v(t._s(t.friendlyDate(e.createdAt)))])]),t._v(" "),a("p",[t._v(t._s(e.description))])])})),t._v(" "),a("section",{staticClass:"page"},[a("el-pagination",{attrs:{"current-page":t.page,layout:"prev, pager, next",total:t.total},on:{"update:currentPage":function(e){t.page=e},"current-change":t.onPageChange}})],1)])},staticRenderFns:[]};var i=a("C7Lr")(s,r,!1,function(t){a("5FJh")},"data-v-7a9408d4",null);e.default=i.exports}});
//# sourceMappingURL=6.5c4e99851397a13edf4d.js.map