import React from 'react';

import CtMobile from '@ctmobile/react';

const { Link, Back, usePageEffect } = CtMobile;

function About(props) {
  usePageEffect(props.wrapRef, {
    /**
     //    * 页面创建调用
     //    * @callback
     //    * @override
     //    * @param {Object} e
     //    */
    pageCreate(e) {
      console.log('about', 'pageCreate');
    },

    /***
     * 页面显示之前
     * @callback
     * @override
     * @param {Object} e
     */
    pageBeforeShow(e) {
      console.log('about', 'pageBeforeShow');
    },

    /***
     * 页面显示
     * @callback
     * @override
     * @param {Object} e
     */
    pageShow(e) {
      console.log('about', 'pageShow');
    },

    /***
     *  页面显示之后
     * @callback
     * @override
     * @param {Object} e
     */
    pageAfterShow(e) {
      console.log('about', 'pageAfterShow');
    },

    /***
     * 页面暂停之前
     * @callback
     * @override
     * @param {Object} e
     */
    pageBeforePause(e) {
      console.log('about', 'pageBeforePause');
    },

    /***
     * 页面暂停之后
     * @callback
     * @override
     * @param {Object} e
     */
    pageAfterPause(e) {
      console.log('about', 'pageAfterPause');
    },

    /***
     * 页面恢复之前
     * @callback
     * @override
     * @param {Object} e
     */
    pageBeforeRestore(e) {
      console.log('about', 'pageBeforeRestore');
    },

    /***
     * 页面恢复
     * @callback
     * @override
     * @param {Object} e
     */
    pageRestore(e) {
      console.log('about', 'pageRestore');
    },

    /***
     * 页面恢复之后
     * @callback
     * @override
     * @param {Object} e
     */
    pageAfterRestore(e) {
      console.log('about', 'pageAfterRestore');
    },

    /***
     * 页面DOM销毁之前
     * @callback
     * @override
     * @param {Object} e
     */
    pageBeforeDestroy(e) {
      console.log('about', 'pageBeforeDestroy');
    },
  });

  return (
    <>
      <header>
        <Back className="ct-back-icon" />
        <p className="ct-header-title">about</p>
      </header>
      <div className="ct-content" style={{ top: '3rem', bottom: 0 }}>
        <ul>
          <li>
            <Link className="link" pageId="info">
              info
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default About;

// export default (props) => {
//   constructor(props) {
//     super(props);
//   }
//
//   /**
//    * 页面创建调用
//    * @callback
//    * @override
//    * @param {Object} e
//    */
//   pageCreate(e) {
//     console.log('about', 'pageCreate');
//   }
//
//   /***
//    * 页面显示之前
//    * @callback
//    * @override
//    * @param {Object} e
//    */
//   pageBeforeShow(e) {
//     console.log('about', 'pageBeforeShow');
//   }
//
//   /***
//    * 页面显示
//    * @callback
//    * @override
//    * @param {Object} e
//    */
//   pageShow(e) {
//     console.log('about', 'pageShow');
//   }
//
//   /***
//    *  页面显示之后
//    * @callback
//    * @override
//    * @param {Object} e
//    */
//   pageAfterShow(e) {
//     console.log('about', 'pageAfterShow');
//   }
//
//   /***
//    * 页面暂停之前
//    * @callback
//    * @override
//    * @param {Object} e
//    */
//   pageBeforePause(e) {
//     console.log('about', 'pageBeforePause');
//   }
//
//   /***
//    * 页面暂停之后
//    * @callback
//    * @override
//    * @param {Object} e
//    */
//   pageAfterPause(e) {
//     console.log('about', 'pageAfterPause');
//   }
//
//   /***
//    * 页面恢复之前
//    * @callback
//    * @override
//    * @param {Object} e
//    */
//   pageBeforeRestore(e) {
//     console.log('about', 'pageBeforeRestore');
//   }
//
//   /***
//    * 页面恢复
//    * @callback
//    * @override
//    * @param {Object} e
//    */
//   pageRestore(e) {
//     console.log('about', 'pageRestore');
//   }
//
//   /***
//    * 页面恢复之后
//    * @callback
//    * @override
//    * @param {Object} e
//    */
//   pageAfterRestore(e) {
//     console.log('about', 'pageAfterRestore');
//   }
//
//   /***
//    * 页面DOM销毁之前
//    * @callback
//    * @override
//    * @param {Object} e
//    */
//   pageBeforeDestroy(e) {
//     console.log('about', 'pageBeforeDestroy');
//   }
//
//
//     return (
//       <>
//         <header>
//           <Back className="ct-back-icon" />
//           <p className="ct-header-title">about</p>
//         </header>
//         <div className="ct-content" style={{ top: '3rem', bottom: 0 }}>
//           <ul>
//             {/*<li><a onClick={() => {*/}
//             {/*props.parent.setResult('about', {a: 1, b: 2});*/}
//             {/*props.parent.over();*/}
//             {/*}}>关闭</a></li>*/}
//             <li>
//               <Link className="link" pageId="info">
//                 info
//               </Link>
//             </li>
//           </ul>
//         </div>
//       </>
//     );
//   }
// }
