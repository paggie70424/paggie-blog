<template>
  <div class="custom-hero">
    <div class="hero-image-container">
      <img src="/images/cover.png" alt="Paggie" class="hero-image" />
      <div class="hover-tooltip">Hi! I am Paggie</div>
    </div>
    
    <h1 id="main-title">Welcome to Paggie's Blog</h1>
    
    <div class="bio-section">
      <p>
        Hi, I’m <strong>Paggie</strong>, currently based in <strong>Adelaide, Australia 🇦🇺</strong>, and born in Taiwan. I’ve been in Australia since 2017. 
      </p>
      <p>
        I graduated with a degree in Data Science and currently work as a Data Analyst and Software Engineer. I’m also an outdoor and sports enthusiast.
      </p>
      <p>
        I enjoy table tennis 🏓, badminton 🏸, and pickleball 🥎, and I go to the gym regularly 🏋️‍♀️.
      </p>
      
      <div class="contact-info">
        <p>📩 Contact me: <a href="mailto:paggie70424@gmail.com">paggie70424@gmail.com</a></p>
        <p>🔗 LinkedIn: <a href="https://www.linkedin.com/in/paggie-liu-224475211/" target="_blank">Paggie Liu</a></p>
      </div>
    </div>

    <div class="actions">
      <RouterLink to="/about-me.html" class="action-button primary">Read About Me 🧋</RouterLink>
      <RouterLink to="/project.html" class="action-button secondary">Check Projects 🍰</RouterLink>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomHero'
}
</script>

<style scoped>
.custom-hero {
  text-align: center;
  margin: 3rem auto;
  max-width: 800px;
}

.hero-image-container {
  position: relative;
  display: inline-block;
  margin-bottom: 1.5rem;
}

.hero-image {
  width: 250px;
  height: 250px;
  object-fit: cover;
  border-radius: 50%;
  border: 4px solid var(--c-brand-light);
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  display: block;
}

.hero-image-container:hover .hero-image {
  transform: scale(1.05) rotate(2deg);
  border-color: var(--c-brand);
}

.hover-tooltip {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  background-color: rgba(255, 255, 255, 0.95);
  color: var(--c-brand-dark);
  padding: 10px 20px;
  border-radius: 20px;
  font-weight: 700;
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
  opacity: 0;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  pointer-events: none;
  border: 2px solid var(--c-brand);
  white-space: nowrap;
}

.hero-image-container:hover .hover-tooltip {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: var(--c-text);
  font-weight: 800;
}

.bio-section {
  max-width: 650px;
  margin: 0 auto 2.5rem;
  text-align: left;
  line-height: 1.8;
  font-size: 1.1rem;
  color: var(--c-text);
}

.bio-section strong {
  color: var(--c-brand-dark);
}

.contact-info {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 2px dashed var(--c-brand-light);
  text-align: center;
}

.contact-info p {
  margin: 0.5rem 0;
  font-weight: 600;
}

.actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.action-button {
  display: inline-block;
  padding: 0.8rem 1.6rem;
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.2s;
  text-decoration: none;
}

.action-button.primary {
  background-color: var(--c-brand);
  color: white;
}

.action-button.primary:hover {
  background-color: var(--c-brand-dark);
}

.action-button.secondary {
  background-color: transparent;
  border: 2px solid var(--c-brand);
  color: var(--c-brand);
}

.action-button.secondary:hover {
  background-color: var(--c-brand-light);
}
</style>

