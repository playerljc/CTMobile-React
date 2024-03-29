import Media from '../util/media';
import CtMobile from '@ctmobile/react';
import Router from '../util/Router';
import DB from '../util/DB';

/**
 * 创建note表
 * @returns {*}
 */
function createNoteTable() {
  return new Promise((resolve, reject) => {
    DB.executeUpdate(
      'create table note (id varchar(50),createTime varchar(50),info text,title varchar(50))',
      () => {
        resolve();
      },
    );
  });
}

/**
 * 创建attach表
 * @returns {*}
 */
function createAttachTable() {
  return new Promise((resolve, reject) => {
    //id,noteId,createTime,base64,type,duration,fullPath
    DB.executeUpdate(
      'create table attach (id varchar(50),noteId varchar(50),createTime varchar(50),base64 text,fullPath varchar(100),duration INTERGER,type varchar(50) )',
      () => {
        resolve();
      },
    );
  });
}

class App {
  initial() {
    Media.init();
    this.initTable().then(() => {
      this.initCtMobile();
    });
  }

  initTable() {
    return new Promise((resolve, reject) => {
      const createable = localStorage.getItem('createtable');
      if (createable) {
        resolve();
      } else {
        Promise.all([createNoteTable(), createAttachTable()])
          .then(() => {
            localStorage.setItem('createtable', 'createtable');
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      }
    });
  }

  initCtMobile() {
    this.ctmobile = CtMobile.CtMobileFactory.create({
      supportCordova: false,
      linkCaptureReload: false,
      router: Router,
    });
  }

  getCtMobile() {
    return this.ctmobile;
  }
}

const ins = new App();

export default ins;
