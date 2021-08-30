import NuxtLogo from './NuxtLogo.vue';

export default {
  component: NuxtLogo,
  title: 'Components/NuxtLogo',
  argTypes: {}
};

const Template = (args, { argTypes }) => ({
  components: { NuxtLogo },
  props: Object.keys(argTypes),
  template: '<NuxtLogo v-bind="$props" v-on="$props" />',
});

export const template = Template.bind({});

template.storyName = 'NuxtLogo';
// template.args = {
//   title: 'タイトル',
//   slug: 'sample1',
//   thumbnail: {
//     fields: {
//       file: {
//         url: 'https://placehold.jp/1200x630.png?text=16x9'
//       }
//     }
//   },
//   category: [
//     {
//       fields: {
//         name: 'カテゴリ名'
//       }
//     }
//   ],
//   tags: [
//     {
//       fields: {
//         name: 'タグ名',
//         slug: 'tag1'
//       }
//     },
//     {
//       fields: {
//         name: 'タグ名',
//         slug: 'tag1'
//       }
//     }
//   ],
// };
