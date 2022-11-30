const SETTING = {
  base_url: 'https://andriandev.my.id',
  favicon_url: '/favicon.ico',
  title: 'AndrianDev',
  separator: '-',
  sub_title: 'Web Developer',
  description:
    'AndrianDev merupakan website portofolio pribadi yang berisi kumpulan projek yang pernah dibuat.',
  index: 'index', // index or noindex
};

const site_base_url = SETTING.base_url;
const site_favicon_url = SETTING.favicon_url;
const site_title = SETTING.title;
const site_separator = SETTING.separator;
const site_sub_title = SETTING.sub_title;
const site_description = SETTING.description;
const site_index = SETTING.index;

export function siteBaseUrl(base_url = site_base_url) {
  return process.env.NEXT_PUBLIC_BASE_URL || base_url;
}

export function siteFaviconUrl(favicon_url = site_favicon_url) {
  return process.env.NEXT_PUBLIC_FAVICON_URL || favicon_url;
}

export function siteTitle(title = site_title) {
  return process.env.NEXT_PUBLIC_TITLE || title;
}

export function siteSeparator(separator = site_separator) {
  return process.env.NEXT_PUBLIC_SEPARATOR || separator;
}

export function siteSubTitle(sub_title = site_sub_title) {
  return process.env.NEXT_PUBLIC_SUB_TITLE || sub_title;
}

export function siteDescription(description = site_description) {
  return process.env.NEXT_PUBLIC_DESCRIPTION || description;
}

export function siteIndex(index = site_index) {
  return process.env.NEXT_PUBLIC_INDEX || index;
}
