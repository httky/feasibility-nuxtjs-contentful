<template>
  <div class="content">
    <p>{{ post.fields.title }}</p>
    <p>{{ $shapeDateText(post.fields.date) }}</p>
    <span>
      <span>タグ：</span>
      <br />
      <span>
        <span
          v-for="tag in post.fields.tags"
          :key="tag.fields.slug"
          :data-id="tag.fields.slug"
        >{{ tag.fields.name }}</span>
      </span>
    </span>
    <br />
    <div>
      <p>関連記事：</p>
      <div
        v-for="article in post.fields.relates"
        :key="article.fields.slug"
      >
        <nuxt-link :to="'/article/' + article.fields.slug + '/'">
          <span>{{ article.fields.title }}</span>
          <br />
          <span>
            <span>タグ：</span>
            <span>
              <span
                v-for="tag in article.fields.tags"
                :key="tagMap[tag.sys.id].slug"
                :data-id="tagMap[tag.sys.id].slug"
              >{{ tagMap[tag.sys.id].name }}</span>
            </span>
          </span>
        </nuxt-link>
      </div>
    </div>
    <br />
    <nuxt-link to="/article/">
      一覧に戻る
    </nuxt-link>
  </div>
</template>

<script>
import client from '~/plugins/contentful.js';
import { createTagMap } from '~/utils/';

export default {
  async asyncData(context) {
    const [tagResponse] = await Promise.all([
      client.getEntries({ content_type: 'tag' })
    ]);
    const tagMap = createTagMap(tagResponse.items);
    // const categoryMap = createTagMap(categoryResponse.items);

    const categoryMap = {};

    // TODO: payload が failするケースがあるので利用するのを止める
    // if (context.payload === 'hihi') {
    //   // SSG用
    //   return {
    //     post: context.payload,
    //     tagMap,
    //     categoryMap
    //   };
    // } else {
    //   const queryOption = {
    //     content_type: 'readingPost',
    //     'fields.slug': context.params.id // 特定記事の絞り込み
    //   };
    //   return client.getEntries(queryOption)
    //     .then((entries) => {
    //       // console.log(entries.items[0]);
    //       if (entries.items.length === 0) {
    //         throw new Error('該当記事なし');
    //       } else {
    //         return {
    //           post: entries.items[0],
    //           tagMap,
    //           categoryMap
    //         };
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       return {
    //         post: {},
    //         tagMap,
    //         categoryMap
    //       };
    //     });
    // }

    const queryOption = {
      content_type: 'readingPost',
      'fields.slug': context.params.id // 特定記事の絞り込み
    };
    return client.getEntries(queryOption)
      .then((entries) => {
        // console.log(entries.items[0]);
        if (entries.items.length === 0) {
          throw new Error('該当記事なし');
        } else {
          return {
            post: entries.items[0],
            tagMap,
            categoryMap
          };
        }
      })
      .catch((err) => {
        console.log(err);
        return {
          post: {},
          tagMap,
          categoryMap
        };
      });
  },
  head() {
    const title = `${this.post.fields.title}`;

    // let ogImage;
    //
    // if (this.post.fields.ytId != null) {
    //   ogImage = `http://img.youtube.com/vi/${this.post.fields.ytId}/maxresdefault.jpg`;
    // } else if (this.post.fields.mainvisual != null && /^video/.test(this.post.fields.mainvisual.fields.file.contentType) === false) {
    //   ogImage = `${this.post.fields.mainvisual.fields.file.url}`;
    // } else {
    //   ogImage = `${this.$config.baseUrl}/ogp.png`;
    // }

    return {
      title,
      meta: [
        { hid: 'og:title', name: 'og:title', content: title },
        { hid: 'og:url', name: 'og:url', content: `${this.$config.baseUrl}/article/${this.post.fields.slug}/` },
        // { hid: 'og:image', name: 'og:image', content: ogImage }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.content {
  @include mq-pc {}
  @include mq-sp {}
}
</style>
