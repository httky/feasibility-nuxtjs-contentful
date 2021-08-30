/**
 * vueに依存しないutility関数の定義
 * storeを直接操作しないでください
 */
import {
  CTF_RESULTS_LIMIT_NUM,
  DUMMY_IMAGE,
  BREAK_POINT
} from './const';

export {
  CTF_RESULTS_LIMIT_NUM,
  DUMMY_IMAGE,
  BREAK_POINT
};

/**
 * share用のウィンドウを開く
 */
export function openShareWindow(url, width, height) {
  const w = width;
  const h = height;
  const l = window.screen.width / 2 - w / 2;
  const t = window.screen.height / 2 - h / 2;
  window.open(url, 'sharewindow', `scrollbars=yes, width=${w}, height=${h}, left=${l}, top=${t}`);
}

/**
 * 改行コードをbrタグに変換して返す
 * @param {String} text
 * @return {String}
 */
export function nl2br(text) {
  return (text.replace(/\r\n/g, '<br>')).replace(/(\n|\r)/g, '<br>');
}

/**
 * エスケープ処理
 * @param {String} str
 * @return {String}
 */
export function escapeSpecialChars(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * yyyy-mm-ddな日付フォーマットをyyyy年mm月dd日に変換して返す
 * @param {String} text
 * @return {String}
 */
export function shapeDateText(text) {
  const a = text.split('-');
  return `${a[0]}年${a[1]}月${a[2]}日`;
}

/**
 * Contentfulで関連づけられたlistから公開状態のものだけ返す
 * @param {Array} list
 * @return {Array}
 */
export function filterActiveList(list) {
  const a = list.filter(item => item.fields != null);
  return a;
}

/**
 * Contentfulのタグをsys.idからname/slugを参照できるマップデータの生成
 * @param {Array} items
 * @return {Object} - { 'sys.id': { name: 'タグ1', slug: 'tag1' } } のようなデータを返す
 */
export function createTagMap(items) {
  const tagMap = {};

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    tagMap[item.sys.id] = item.fields;
  }
  return tagMap;
}

/**
 * isMatches
 */
export function isMatches(elm, selector) {
  // for IE11
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector;
  }
  return elm.matches(selector);
}

/**
 * urlが相対パスかどうか
 * @param {String} url
 * @return {Boolean}
 */
export function isRelativePath(url) {
  return url.slice(0, 1) === '/';
}

/**
 * 指定秒後にPromise.resolveを返す
 * @param {Number} second
 * @return {Promise}
 */
export function wait(second) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, second * 1000);
  });
}
