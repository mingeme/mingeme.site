import type { Metadata, Site } from '@/types';

export const SITE: Site = {
  NAME: 'Mingeme',
  EMAIL: '',
  NUM_POSTS_ON_HOMEPAGE: 6,
  NUM_WORKS_ON_HOMEPAGE: 0,
  NUM_PROJECTS_ON_HOMEPAGE: 0,
};

export const HOME: Metadata = {
  TITLE: '首页',
  DESCRIPTION: '记录是延长思考的方式',
};

export const BLOG: Metadata = {
  TITLE: '归档',
  DESCRIPTION: '在纷繁的讯息里，我尝试放慢脚步，记录代码与生活的细节。',
};

export const TAGS: Metadata = {
  TITLE: '标签',
  DESCRIPTION: '按标签分类的文章',
};

export const MISC: Metadata = {
  TITLE: '杂记',
  DESCRIPTION: '随笔与杂想',
};
