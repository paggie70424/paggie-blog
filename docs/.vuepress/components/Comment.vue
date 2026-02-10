<template>
  <div class="comment-container">
    <h2 class="comment-title">Comment to me...</h2>
    <div id="giscus-container"></div>
  </div>
</template>

<script>
export default {
  name: 'Comment',
  mounted() {
    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', 'paggie70424/paggie-blog');
    script.setAttribute('data-repo-id', 'R_kgDORLuoGw');
    script.setAttribute('data-category', 'General');
    script.setAttribute('data-category-id', 'DIC_kwDORLuoG84C2HhM');
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'bottom');
    script.setAttribute('data-theme', 'preferred_color_scheme');
    script.setAttribute('data-lang', 'en');
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;

    const container = document.getElementById('giscus-container');
    if (container) {
      container.appendChild(script);
    }
  },
}
</script>

<style scoped>
.comment-container {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--c-border);
}

.comment-title {
  margin-bottom: 2rem;
  font-weight: 600;
  border-bottom: none;
}
</style>
