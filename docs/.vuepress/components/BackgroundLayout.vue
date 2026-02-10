<template>
  <div class="background-page">
    <div class="content-wrapper">
      <!-- Left Column: Content -->
      <div class="left-column">
        <h1>Background</h1>

        <h3>💼 Experience</h3>

        <div class="section-item">
          <p><strong>Software Engineering Research Assistant</strong><br>
          <em>University of Adelaide, Adelaide, Australia</em><br>
          <em>2024 – Present</em></p>
          <ul>
            <li>Led full-stack development projects</li>
            <li>Frontend development using Vue.js</li>
            <li>Backend development mainly in Python</li>
            <li>Worked with cloud platforms including AWS and Azure</li>
            <li>Experience with databases, data visualization, and data analysis</li>
          </ul>
        </div>

        <div class="section-item">
          <p><strong>IT Intern</strong><br>
          <em>Deloitte, Taiwan</em><br>
          <em>2023 – 2024</em></p>
          <ul>
            <li>Provided IT support for internal employees</li>
            <li>Managed hardware inventory and software installation</li>
            <li>Handled internal IT inquiries and maintained support records</li>
          </ul>
        </div>

        <h3>🎓 Education</h3>
        
        <div class="section-item">
          <p><strong>Master of Data Science</strong><br>
          <em>University of South Australia, Adelaide, Australia</em><br>
          <em>2022 – 2024</em></p>
        </div>

        <div class="section-item">
          <p><strong>Bachelor of Commerce (Marketing)</strong><br>
          <em>The University of Adelaide, Adelaide, Australia</em><br>
          <em>2019 – 2022</em></p>
        </div>

        <div class="section-item">
          <p><strong>Bachelor of Medical Informatics</strong><br>
          <em>Chung Shan Medical University, Taichung, Taiwan</em><br>
          <em>2015 – 2017</em></p>
        </div>

        <h3>🛠 Other Experience</h3>

        <div class="section-item">
          <p><strong>Building Coordinator</strong><br>
          <em>Unity Housing Company, Adelaide, Australia</em><br>
          <em>2025 – Present</em></p>
          <ul>
            <li>Responsible for on-site inspections</li>
            <li>Managed emergency calls and after-hours reception duties</li>
            <li>Coordinated building operations and tenant support</li>
          </ul>
        </div>

      </div>

      <!-- Right Column: Profile & Contact -->
      <div class="right-column">
        <div class="hero-image-container">
          <img src="/images/cover.png" alt="Paggie" class="hero-image" />
          <div class="hover-tooltip">Hi! I am Paggie</div>
        </div>

        <div class="contact-info">
          <p>📩 Contact me: <a href="mailto:paggie70424@gmail.com">paggie70424@gmail.com</a></p>
          <p>🔗 LinkedIn: <a href="https://www.linkedin.com/in/paggie-liu-224475211/" target="_blank">Paggie Liu</a></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BackgroundLayout'
}
</script>

<style scoped>
.background-page {
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

.section-item {
  margin-bottom: 2rem;
}

ul {
  margin-top: 0.5rem;
  padding-left: 1.2rem;
}

/* Right Column */
.right-column {
  flex: 0 0 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: sticky;
  top: 100px; /* Sticky sidebar */
}

.hero-image-container {
  position: relative;
  display: inline-block;
  margin-bottom: 2rem;
}

.hero-image {
  width: 250px;
  height: 250px;
  object-fit: cover;
  border-radius: 50%;
  border: 4px solid var(--c-brand-light);
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.contact-info {
  padding: 1.5rem;
  background: var(--c-bg);
  border: 1px solid var(--c-border);
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  width: 100%;
}

.contact-info p {
  margin: 0.8rem 0;
  font-weight: 500;
  font-size: 0.95rem;
}

.contact-info a {
  color: var(--c-brand);
  font-weight: 600;
  text-decoration: none;
}

.contact-info a:hover {
  text-decoration: underline;
}

/* Responsive */
@media (max-width: 850px) {
  .content-wrapper {
    flex-direction: column-reverse;
  }
  
  .right-column {
    width: 100%;
    position: static;
    margin-bottom: 3rem;
  }
}
</style>
