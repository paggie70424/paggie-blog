<template>
  <div class="about-me-page">
    <div class="content-wrapper">
      <!-- Left Column: Main Content -->
      <div class="left-column">
        <h1>About Me</h1>
        
        <p>
          I’m Paggie, a Master of Data Science graduate with a background in programming and commerce. I currently work as a software engineer at the University of Adelaide. I’m outgoing and love the outdoors.
        </p>
        <p>
          This platform is a space to share who I’ve been in the past and what I want to achieve in the future—all for leisure and fun. I’m happy to meet you all!
        </p>

        <h3>My Journey 🇦🇺</h3>
        <ClientOnly>
          <MapComponent />
        </ClientOnly>

        <h3>My Path 🛤️</h3>
        <Timeline />

        <!-- My Interests Section -->
        <div class="interests-section">
          <h3>My Interests 🏓</h3>
          
          <div class="interest-item">
            <h4>🏓 Table Tennis (桌球)</h4>
            <p>Big fan of <strong>Lin Yun-ju (林昀儒)</strong>!</p>
            <p>I play every Mon/Wed/Fri at <strong>Pridham Hall</strong> (Adelaide Uni).</p>
            <p>Let's play together!</p>
          </div>

          <div class="interest-item">
            <h4>🏸 Badminton (羽球)</h4>
            <p>Inspired by <strong>Wang Chi-lin (王齊麟)</strong> & <strong>Lee Yang (李洋)</strong> winning back-to-back Olympic Gold! 🥇</p>
            <p>燃起我打羽毛球的熱情 (Ignited my passion for badminton).</p>
          </div>

          <div class="interest-item">
            <h4>🎬 Movies (電影)</h4>
            <p>Love <strong>Thrillers</strong> & Open Endings.</p>
            <p>Fan of <strong>Christopher Nolan (克里斯多福·諾蘭)</strong>.</p>
            <ul class="movie-list">
              <li>Inception (全面啟動)</li>
              <li>Tenet (天能)</li>
              <li>Shutter Island (隔離島) - Watched 6+ times!</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Right Column: Profile & Contact -->
      <div class="right-column">
        <!-- Profile & Contact -->
        <div class="profile-section">
          <div class="hero-image-container">
            <img src="/images/cover.png" alt="Paggie" class="hero-image" />
            <div class="hover-tooltip">Hi! I am Paggie</div>
          </div>

          <div class="contact-info">
            <p>📩 <a href="mailto:paggie70424@gmail.com">paggie70424@gmail.com</a></p>
            <p>🔗 <a href="https://www.linkedin.com/in/paggie-liu-224475211/" target="_blank">Paggie Liu</a></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutMeLayout'
}
</script>

<style scoped>
.about-me-page {
  margin: 2rem auto;
  max-width: 1200px;
}

.content-wrapper {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 3rem;
}

/* Left Column */
.left-column {
  flex: 1;
  text-align: left;
}

h1 {
  margin-bottom: 1.5rem;
}

p {
  line-height: 1.8;
  margin-bottom: 1rem;
}

/* Right Column */
.right-column {
  flex: 0 0 320px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  text-align: center;
  position: sticky;
  top: 100px;
}

.profile-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hero-image-container {
  position: relative;
  display: inline-block;
  margin-bottom: 1.5rem;
}

.hero-image {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 50%;
  border: 4px solid var(--c-brand-light);
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
}

.contact-info {
  padding: 1rem;
  background: var(--c-bg);
  border: 1px solid var(--c-border);
  border-radius: 15px;
  width: 100%;
}

/* Interests Section */
.interests-section {
  text-align: left;
  margin-top: 3rem;
  padding-top: 1rem;
  border-top: 1px solid var(--c-border);
}

.interests-section h3 {
  margin-top: 0;
  margin-bottom: 1.5rem;
  text-align: left;
}

.interest-item {
  margin-bottom: 1.5rem;
}

.interest-item h4 {
  margin: 0 0 0.5rem 0;
  color: var(--c-brand);
  font-size: 1.1rem;
}

.interest-item p {
  margin: 0.3rem 0;
  font-size: 0.9rem;
  line-height: 1.5;
}

.movie-list {
  padding-left: 1.2rem;
  margin: 0.5rem 0;
  font-size: 0.9rem;
}

.movie-list li {
  margin-bottom: 0.3rem;
}

/* Responsive */
@media (max-width: 900px) {
  .content-wrapper {
    flex-direction: column;
  }
  
  .right-column {
    width: 100%;
    position: static;
    margin-top: 2rem;
  }

  .interests-section {
    text-align: left;
  }
}
</style>
