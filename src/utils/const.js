/**
 * Contentfulの最大取得件数
 * Contentfulの仕様上のMAX 1001だと BadRequestError を返す
 * https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/search-parameters/limit
 */
export const CTF_RESULTS_LIMIT_NUM = 1000;

/**
 * ダミー画像
 */
export const DUMMY_IMAGE = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQI12NgYAAAAAMAASDVlMcAAAAASUVORK5CYII=';

export const BREAK_POINT = 768;
