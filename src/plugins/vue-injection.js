/**
 * vueファイル内のtemplate/scriptで共通で使える関数
 * asyncData内でも使える
 */
import {
  nl2br,
  escapeSpecialChars,
  shapeDateText,
  filterActiveList,
  isRelativePath
} from '~/utils/';

export default ({ app }, inject) => {
  inject('nl2br', nl2br);
  inject('escapeSpecialChars', escapeSpecialChars);
  inject('shapeDateText', shapeDateText);
  inject('filterActiveList', filterActiveList);
  inject('isRelativePath', isRelativePath);
  inject('scrollToTarget', (target) => {
    const headerRect = document.querySelector('.header').getBoundingClientRect();
    app.$scrollTo(target, { offset: (headerRect.top + headerRect.height + 20) * -1 });
  });
};
