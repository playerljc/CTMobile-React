import React from 'react';

import CtMobile from '@ctmobile/react';

const { Link, Back, usePageEffect } = CtMobile;

export default (props) => {
  usePageEffect(props.wrapRef, {
    /**
     * 页面创建调用
     * @callback
     * @override
     * @param {Object} e
     */
    pageCreate(e) {
      console.log(props.id, 'pageCreate');
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

    /**
     * pageReceiver
     * @override
     * @param intent
     * @param nextOpt
     */
    pageReceiver(intent, nextOpt) {
      alert(JSON.stringify(intent));
      nextOpt.putExtras({
        ext2: 'ext2',
      });
      nextOpt.next();
    },
  });

  return (
    <>
      <header>
        <Back className="ct-back-icon" />
        <p className="ct-header-title">borasdcast_order_config_page2</p>
      </header>
      <div className="ct-content" style={{ top: '3rem', bottom: 0 }}>
        <ul>
          <li>
            <Link className="link" pageId="borasdcast_order_config_page3">
              borasdcast_order_config_page3
            </Link>
          </li>
          <li>
            <a
              className="link"
              onClick={() => {
                props.ctMobile.sendOrderedBroadcast({
                  action: 'borasdcast_order_config',
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
