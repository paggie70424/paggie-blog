<template>
  <div class="profile-card">
    <div class="profile-image-container">
      <img :src="imageSrc" alt="Profile Picture" class="profile-image" />
    </div>
    <div class="profile-info">
      <h3>{{ name }}</h3>
      <p>{{ bio }}</p>
      <div v-if="socials" class="social-links">
        <a v-for="(link, platform) in socials" :key="platform" :href="link" target="_blank" rel="noopener noreferrer">
          {{ platform }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileCard',
  props: {
    imageSrc: {
      type: String,
      default: '/images/profile.jpg'
    },
    name: {
      type: String,
      default: 'Paggie'
    },
    bio: {
      type: String,
      default: 'I love coding and sharing knowledge.'
    },
    socials: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style scoped>
.profile-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  background-color: var(--c-bg-light);
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  transition: transform 0.3s ease;
}

.profile-card:hover {
  transform: translateY(-5px);
}

.profile-image-container {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid var(--c-brand);
  margin-bottom: 1rem;
}

.profile-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-info {
  text-align: center;
}

.profile-info h3 {
  margin: 0.5rem 0;
  color: var(--c-text);
  font-weight: 600;
}

.profile-info p {
  color: var(--c-text-light);
  font-size: 0.9rem;
  line-height: 1.4;
}

.social-links {
  margin-top: 1rem;
  display: flex;
  gap: 10px;
  justify-content: center;
}

.social-links a {
  font-size: 0.8rem;
  color: var(--c-brand);
  text-decoration: none;
  font-weight: 500;
}

.social-links a:hover {
  text-decoration: underline;
}
</style>
