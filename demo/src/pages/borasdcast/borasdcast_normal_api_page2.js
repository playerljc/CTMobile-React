import React from 'react';

import CtMobile from '@ctmobile/react';

const { Link, Back, usePageEffect } = CtMobile;

export default (props) => {
  function onRegisterReceiver(intent) {
    alert(JSON.stringify(intent));
  }

  usePageEffect(props.wrapRef, {
    /**
     * 页面创建调用
     * @callback
     * @override
     * @param {Object} e
     */
    pageCreate(e) {
      // 注册borasdcast
      props.ctMobile.registerReceiver(
        {
          el: props.parent.getPageDOM(),
          action: 'borasdcast_normal_api',
          priority: 1,
          categorys: [],
        },
        onRegisterReceiver,
      );
    },

    /***
     * 页面显示之前
     * @callback
     * @override
     * @param {Object} e
     */
    pageBeforeShow(e) {
      console.log(props.id, 'pageBeforeShow');
    },

    /***
     * 页面显示
     * @callback
     * @override
     * @param {Object} e
     */
    pageShow(e) {
      console.log(props.id, 'pageShow');
    },

    /***
     *  页面显示之后
     * @callback
     * @override
     * @param {Object} e
     */
    pageAfterShow(e) {
      console.log(props.id, 'pageAfterShow');
    },

    /***
     * 页面暂停之前
     * @callback
     * @override
     * @param {Object} e
     */
    pageBeforePause(e) {
      console.log(props.id, 'pageBeforePause');
    },

    /***
     * 页面暂停之后
     * @callback
     * @override
     * @param {Object} e
     */
    pageAfterPause(e) {
      console.log(props.id, 'pageAfterPause');
    },

    /***
     * 页面恢复之前
     * @callback
     * @override
     * @param {Object} e
     */
    pageBeforeRestore(e) {
      console.log(props.id, 'pageBeforeRestore');
    },

    /***
     * 页面恢复
     * @callback
     * @override
     * @param {Object} e
     */
    pageRestore(e) {
      console.log(props.id, 'pageRestore');
    },

    /***
     * 页面恢复之后
     * @callback
     * @override
     * @param {Object} e
     */
    pageAfterRestore(e) {
      console.log(props.id, 'pageAfterRestore');
    },

    /***
     * 页面DOM销毁之前
     * @callback
     * @override
     * @param {Object} e
     */
    pageBeforeDestroy(e) {
      console.log(props.id, 'pageBeforeDestroy');
    },
  });

  return (
    <>
      <header>
        <Back className="ct-back-icon" />
        <p className="ct-header-title">borasdcast_normal_api_page2</p>
      </header>
      <div className="ct-content" style={{ top: '3rem', bottom: 0 }}>
        <ul>
          <li>
            <Link className="link" pageId="borasdcast_normal_api_page1">
              borasdcast_normal_api_page1
            </Link>
          </li>
          <li>
            <a
              className="link"
              onClick={() => {
                props.ctMobile.sendBroadcast({
                  action: 'borasdcast_normal_api',
                  categorys: [],
                  bundle: {
                    a: 3,
                    b: 4,
                  },
                });
              }}
            >
              通知
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};
