/***
 * Created by lzq on 2018/11/02
 * Router.js
 */

import $ from 'jquery';
import React from 'react';
import PropTypes from 'prop-types';
import CtMobileFactory from './CtMobile';
import Constant from './Constant';
import { Consumer } from './GlobalContext';

/**
 * 初始化
 * @access private
 */
function initial() {
  const self = this;

  onHashchange = onHashchange.bind(this);

  /***
   * 注册hashchange事件
   */
  window.addEventListener('hashchange', onHashchange, false);

  /***
   * 注册页面转场事件
   */
  $(window.document).on('pageBeforeChange', function (e, params) {
    self.setParameter(params);
  });
}

/**
 * hashchange的回调函数
 * @access private
 * @callback
 */
function onHashchange() {
  // #page1_134567890232323?id=123_456
  const hash = window.location.hash;
  hashChange.call(this, hash);
}

/**
 * hashChange的处理
 * @access private
 * @param {string} hash - 哈希值
 * @param {Object} option - {
 *  reload :[true | false]
 * }
 */
function hashChange(hash, option) {
  const self = this;
  /***
   * 转场的id(没有重复)
   * @type {string}
   */
  let id = '';

  if (hash) {
    id = hash.indexOf('?') !== -1 ? hash.substring(1, hash.indexOf('?')) : hash.substring(1);

    const index = id.lastIndexOf('_');
    /***
     * 用户自定义的锚点跳转
     */
    if (index === -1) {
      return false;
    } else {
      const pageId = id.substring(0, index);
      /***
       * 用户自定义的锚点跳转
       */
      if (!window.document.querySelector("[data-ct-data-role='page'],#" + pageId)) {
        return false;
      }
      self.ctmobile.fireEvent(window.document, 'pageBeforeChange', [
        CtMobileFactory.getUrlParam(hash),
      ]);
    }
  } else {
    /***
     * 首页
     */
    self.ctmobile.fireEvent(window.document, 'pageBeforeChange', [
      CtMobileFactory.getUrlParam(hash),
    ]);
    if (
      /*如果栈顶元素的pageId == 模板中第一页的id*/
      self.ctmobile.getFirstPage().getPageId() === self.ctmobile.getFirstPageId()
    ) {
      // 说明是从模板的第一页进入主应用的
      id = self.ctmobile.getFirstPage().getId();
    } else {
      // 不是从模板的第一页进入主应用的
      self.ctmobile.createPage(self.ctmobile.getId(self.ctmobile.getFirstPageId()), (Component) => {
        Component.start(Constant._SLIDEDURATION, () => {
          self.removeFirstPage();
        });
      });
      return;
    }
  }

  //hash ? (hash.indexOf("?") != -1
  //    ? id = hash.substring(1, hash.indexOf("?"))
  //    : id = hash.substring(1))
  //    : id = root.getFirstPage().getId();

  /***
   * 新的页面
   */
  const curPage = self.getPageById(id);
  if (!curPage) {
    self.ctmobile.createPage(id, (Component) => {
      Component.start(Constant._SLIDEDURATION, function () {
        // 如果不改变浏览器历史且历史栈长度大于1
        if (option && option.reload && self.getHistoryLength() > 1) {
          const preHistoryIndex = self.getHistoryLength() - 2;
          const preHistoryPage = self.getPageByIndex(preHistoryIndex);
          if (preHistoryPage) {
            preHistoryPage.finish(0, null, option);
          }
        }
      });
    });
  } else {
    /***
     * 回退
     */
    //  如果刷新的是栈顶的页面
    if (id === self.getLastPage().getId()) {
      return false;
    } else {
      // 依次出栈
      const index = self.ctmobile.indexOfById(id);
      for (let i = self.getHistoryLength() - 1; i > index; i--) {
        if (i === index + 1) {
          self.getPageByIndex(i).finish(Constant._SLIDEDURATION);
        } else {
          self.getPageByIndex(i).finish(0);
        }
      }
    }
  }
}

/**
 * history中是否有pageId开头的page对象
 * @access private
 * @param {string} pageId
 * @return {number}
 */
function indexOfHistoryByPageId(pageId) {
  if (pageId.indexOf('?') !== -1) {
    pageId = pageId.substring(0, pageId.indexOf('?'));
  }

  let index = -1;
  for (let i = 0, len = this.getHistoryLength(); i < len; i++) {
    if (this.getPageByIndex(i).getPageId() === pageId) {
      index = i;
      break;
    }
  }
  return index;
}

/**
 * Link
 * @class Link
 * @classdesc 用来管理跳转的链接
 */
class Link extends React.Component {
  render() {
    const { className = '', style = {} } = this.props;
    return (
      <Consumer>
        {(ctmobile) => {
          return (
            <a
              className={className}
              style={style}
              onClick={() => {
                const {
                  pageId = '',
                  parameter = '',
                  reload = ctmobile.config.linkCaptureReload,
                } = this.props;

                const href = `${'#' + pageId}?pageId=${pageId}${parameter}`;

                ctmobile.router.startPage(href, {
                  reload,
                });
              }}
            >
              {this.props.children}
            </a>
          );
        }}
      </Consumer>
    );
  }
}

/**
 * CheckLinkComponentProps
 * @param {string} className - className
 * @param {Object} style - style
 * @param {string} pageId - pageId
 * @param {string} parameter - 页面参数
 * @param {boolean} reload - 是否替换历史
 */
Link.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  pageId: PropTypes.string,
  parameter: PropTypes.string,
  reload: PropTypes.bool,
};

/**
 * Back
 * @class Back
 * @classdesc 用来管理返回的操作
 */
class Back extends React.Component {
  render() {
    const { className = '', style = {} } = this.props;
    return (
      <Consumer>
        {(ctmobile) => {
          return (
            <a
              className={className}
              style={style}
              onClick={() => {
                ctmobile.router.go(-1);
              }}
            >
              {this.props.children}
            </a>
          );
        }}
      </Consumer>
    );
  }
}

/**
 * CheckBackComponentProps
 * @param {string} className - className
 * @param {Object} style - style
 */
Back.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
};

export { Link, Back };

/**
 *  Router
 *  @class Router
 *  @classdesc 管理所有路由相关操作
 */
class Router {
  /**
   * @constructor
   * @param {CtMobile} ctmobile
   */
  constructor(ctmobile) {
    Object.assign(this, {
      ctmobile,
      parameter: null,
      history: [],
    });

    initial.call(this);
  }

  /**
   * 页面跳转
   * @param {string} href (pageId = pageId + params) 如: page1?a=1&b=2;
   * @param {object} option {
   *    reload : [true | false]
   * }
   */
  startPage(href, option) {
    const self = this;

    let pageId = '',
      paramsQuery = '';

    // Ajax加载
    if (href.indexOf('#') !== 0) {
      let params = CtMobileFactory.getUrlParam(href);
      pageId = params.pageId;

      delete params.pageId;
      let paramsQueryArr = [];
      for (let p in params) {
        if (params.hasOwnProperty(p)) {
          paramsQueryArr.push(p + '=' + params[p]);
        }
      }
      paramsQuery = paramsQueryArr.join('&') ? '?' + paramsQueryArr.join('&') : '';

      dispatcher();
    }
    // 本地锚点加载
    else {
      href = href.substring(1);
      if (href.indexOf('?') !== -1) {
        paramsQuery = href.substring(href.indexOf('?'));
        pageId = href.substring(0, href.indexOf('?'));
      } else {
        pageId = href;
      }
      dispatcher();
    }

    /***
     * 分派
     */
    function dispatcher() {
      /***
       * 获取page的模式
       */
      const mode = self.ctmobile.getPageConfigAttribute(pageId, 'mode');
      let hash;
      //if(/*单例*/mode === "single" || /*完全单例*/mode === "singleInstance" || /*带返回值的完全单例*/mode === "singleInstanceResult") {
      if (mode.toLowerCase().indexOf('single') !== -1) {
        const index = indexOfHistoryByPageId.call(self, pageId);
        if (/*_history中没有以pageId开头的page*/ index === -1) {
          //1.用pageId生成真实的id转换锚点
          //if("singleInstance" === mode || "singleInstanceResult" === mode) {
          if (
            mode /*.toLowerCase()*/
              .indexOf('singleInstance') !== -1
          ) {
            if (self.ctmobile.getSingleInstance(pageId)) {
              hash = self.ctmobile.getSingleInstance(pageId).getId();
            } else {
              hash = self.ctmobile.getId(pageId + paramsQuery);
            }
          } else {
            hash = self.ctmobile.getId(pageId + paramsQuery);
          }

          if (option && option.reload) {
            window.history.replaceState(null, '', '#' + hash);
            hashChange.call(self, '#' + hash, option);
          } else {
            window.location.hash = '#' + hash;
          }
        } else {
          if (
            /*如果page不是栈顶,依次出栈,调用finish*/
            self.ctmobile.getPageByIndex(index) !== self.getLastPage()
          ) {
            // 假如现在_history中的顺序是1,2,3,4,5,6，3是单例，现在要跳转到3,那么6,5,4所代表的page依次调用finish方法
            // history.go(找到3相对于当前页的阈值)
            self.go(-(self.getHistoryLength() - 1 - index));
          } else {
            self.ctmobile.fireEvent(self.getLastPage().getPageDOM(), 'pageShow');
          }
        }
      } else if (/*多例*/ mode === 'standard' || mode === 'result') {
        //1.用pageId生成真实的id转换锚点
        hash = self.ctmobile.getId(pageId + paramsQuery);
        if (option && option.reload) {
          window.history.replaceState(null, '', '#' + hash);
          hashChange.call(self, '#' + hash, option);
        } else {
          window.location.hash = '#' + hash;
        }
      }
    }
  }

  /**
   * 跳转到指定的历史
   * @param {number} index - 历史位置
   * 注释：当前的位置为0 index负值为回退，index正数为前进 都以1开始
   * 例如 -1 为当前页之前的页面,1为当前页之后的页面，0为刷新当前页面
   */
  go(index) {
    window.history.go(index);
  }

  /**
   * 返回
   */
  back() {
    this.go(-1);
  }

  /**
   * 设置转场参数
   * @param {Object} parameter
   */
  setParameter(parameter) {
    this.parameter = parameter;
  }

  /**
   * 获取转场的参数
   * @return {Object}
   */
  getParameter() {
    let parameter = Object.assign({}, this.parameter);
    if (parameter.pageId) {
      delete parameter.pageId;
    }
    return parameter;
  }

  /**
   * 根据ID获取page对象
   * @param {string} id
   * @return {*}
   */
  getPageById(id) {
    return this.history[this.ctmobile.indexOfById(id)];
  }

  /**
   * 根据索引获取page对象
   * @param {number} index
   * @returns {*}
   */
  getPageByIndex(index) {
    return this.history[index];
  }

  /**
   * 获取历史记录中的栈顶的元素
   * @returns {*}
   */
  getLastPage() {
    return this.history[this.history.length - 1];
  }

  /**
   * 获取历史栈长度
   * @return {number}
   */
  getHistoryLength() {
    return this.history.length;
  }

  /**
   * 添加页面的历史栈
   * @param {Page} page
   */
  addPage(page) {
    this.history.push(page);
  }

  /**
   * 删除历史栈中的第一个page
   */
  removeFirstPage() {
    this.history.shift();
  }

  /**
   * 删除历史栈中的最后一个页面
   */
  removeLastPage() {
    this.history.pop();
  }

  /**
   * 删除历史栈中指定的页面
   * @param {number} index
   */
  removePageByIndex(index) {
    this.history.splice(index, 1);
  }
}

export default Router;
