// src/utils/siteChecker.js

const PROXY_LIST = [
  (url) => `https://corsproxy.io/?${encodeURIComponent(url)}`,
  (url) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
  (url) => `https://cors.lol/${url}`,
  (url) => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`,
];

export const checkSiteStatus = async (url) => {
  if (!url || url.trim() === '') {
    return 'offline';
  }

  for (let i = 0; i < PROXY_LIST.length; i++) {
    try {
      const proxyUrl = PROXY_LIST[i](url);
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);

      const response = await fetch(proxyUrl, {
        method: 'GET',
        signal: controller.signal,
        cache: 'no-cache',
        headers: {
          Accept: 'text/html,application/xhtml+xml,application/xml',
        },
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        return 'online';
      }

      if (response.status === 403 || response.status === 451) {
        return 'unknown';
      }
    } catch (error) {
      continue;
    }
  }

  return 'offline';
};

// 🆕 배치 처리 버전
export const checkMultipleSites = async (links) => {
  const validLinks = links.filter(
    (link) => link.url && link.url.trim() !== '',
  );

  const BATCH_SIZE = 10;
  const BATCH_DELAY = 500;
  const statusMap = {};

  for (let i = 0; i < validLinks.length; i += BATCH_SIZE) {
    const batch = validLinks.slice(i, i + BATCH_SIZE);
    
    const promises = batch.map(async (link) => {
      const status = await checkSiteStatus(link.url);
      return { id: link.id, status };
    });

    const results = await Promise.all(promises);
    
    results.forEach((result) => {
      statusMap[result.id] = result.status;
    });

    if (i + BATCH_SIZE < validLinks.length) {
      await new Promise(resolve => setTimeout(resolve, BATCH_DELAY));
    }
  }

  return statusMap;
};

export const checkAllCategorySites = async (categories) => {
  const allLinks = categories.flatMap((category) =>
    category.links.map((link) => ({
      id: `${category.id}-${link.id}`,
      url: link.url,
    })),
  );

  return await checkMultipleSites(allLinks);
};
