<template>
  <div class="content">
    <p>記事一覧</p>
    <ul>
      <li
        v-for="(item, index) in all"
        :key="index"
      >
        <nuxt-link :to="'/article/' + item.fields.slug + '/'">
          <p>{{ item.fields.slug }}</p>
          <p>{{ item.fields.title }}</p>
          <p>{{ $shapeDateText(item.fields.date) }}</p>
          <span>
            <span>タグ：</span>
            <span>
              <span
                v-for="tag in item.fields.tags"
                :key="tag.fields.slug"
                :data-id="tag.fields.slug"
              >{{ tag.fields.name }}</span>
            </span>
          </span>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
import client from '~/plugins/contentful.js';
import {
  CTF_RESULTS_LIMIT_NUM,
  createTagMap
} from '~/utils/';

export default {
  async asyncData(context) {
    const [tagResponse] = await Promise.all([
      client.getEntries({ content_type: 'tag' })
    ]);
    const tagMap = createTagMap(tagResponse.items);
    // const categoryMap = createTagMap(categoryResponse.items);
    const obj = {
      tagMap,
      // categoryMap
    };
    const queryOption = {
      content_type: 'readingPost',
      limit: CTF_RESULTS_LIMIT_NUM,
      order: '-fields.date' // 日付順
    };

    // 記事取得
    try {
      obj.all = await client.getEntries(queryOption)
        .then((entries) => {
          return entries.items;
        })
        .catch((err) => {
          console.log(err);
          return [];
        });
    } catch (err) {
      console.error('from readingPost: ', err);
      obj.all = [];
    }

    console.log(obj);

    return obj;
  },
  head() {
    const title = '記事一覧';
    return {
      title
    };
  },
  mounted() {
    console.log(this.tagMap);
    console.log(this.all);
  }
};
</script>

<style lang="scss" scoped>
.content {
  text-align: center;
  @include mq-pc {}
  @include mq-sp {}
  li {
    text-align: left;
    border: 1px solid #ccc;
    display: block;
    width: 300px;
    margin: 10px auto 0;
  }
}
</style>
