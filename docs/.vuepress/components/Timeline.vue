<template>
  <div class="timeline-container">
    <div class="timeline">
      <div 
        v-for="(item, index) in timelineData" 
        :key="index" 
        class="timeline-item"
        :class="{ 'left': index % 2 === 0, 'right': index % 2 !== 0 }"
      >
        <div class="content">
          <span class="date-badge">{{ item.period }}</span>
          <h3>{{ item.title }}</h3>
          <p>{{ item.content }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Timeline',
  data() {
    return {
      timelineData: [
        { 
          period: '2017', 
          title: 'Arrival & Exploration ✈️', 
          content: 'Landed in Australia! Explored the beautiful wilderness of Tasmania and the coffee culture of Melbourne.' 
        },
        { 
          period: '2018', 
          title: 'Moving to Adelaide 🚚', 
          content: 'Relocated to South Australia to start my studies and settle into a new life.' 
        },
        { 
          period: '2020', 
          title: 'Graduated! 🎓', 
          content: 'Completed my Master of Data Science. A huge milestone achieved!' 
        },
        { 
          period: '2022', 
          title: 'Career Start 💼', 
          content: 'Started working as a Software Engineer at the University of Adelaide.' 
        },
        { 
          period: 'Present', 
          title: 'Living Life 🏸', 
          content: 'Enjoying sports (Ping Pong, Pickleball), gym, and tech projects in Adelaide.' 
        }
      ]
    }
  }
}
</script>

<style scoped>
.timeline-container {
  position: relative;
  max-width: 800px;
  margin: 3rem auto;
  padding: 10px;
}

.timeline::after {
  content: '';
  position: absolute;
  width: 6px;
  background-color: var(--c-brand-light);
  top: 0;
  bottom: 0;
  left: 50%;
  margin-left: -3px;
  border-radius: 3px;
}

.timeline-item {
  padding: 10px 40px;
  position: relative;
  background-color: inherit;
  width: 50%;
  box-sizing: border-box;
}

.timeline-item::after {
  content: '♥'; /* Cute heart icon for dots */
  position: absolute;
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  right: -15px;
  background-color: white;
  border: 4px solid var(--c-brand);
  color: var(--c-brand);
  top: 20px;
  border-radius: 50%;
  z-index: 1;
  font-size: 14px;
  box-shadow: 0 0 0 4px var(--c-brand-light); /* Halo effect */
}

.left {
  left: 0;
}

.right {
  left: 50%;
}

.left::after {
  right: -15px; 
}

.right::after {
  left: -15px;
}

.content {
  padding: 20px;
  background-color: white;
  position: relative;
  border-radius: 20px;
  border: 2px solid var(--c-brand-light);
  box-shadow: 0 6px 15px rgba(0,0,0,0.05);
  transition: transform 0.3s ease;
}

.content:hover {
  transform: translateY(-5px);
  border-color: var(--c-brand);
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
}

.date-badge {
  display: inline-block;
  background-color: var(--c-brand-light);
  color: var(--c-brand-dark);
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 700;
  margin-bottom: 8px;
}

.content h3 {
  margin: 5px 0 10px 0;
  color: var(--c-text);
  font-weight: 700;
  font-size: 1.1rem;
}

.content p {
  margin-bottom: 0;
  font-size: 0.95rem;
  color: var(--c-text-light);
  line-height: 1.5;
}

/* Responsive adjustments */
@media screen and (max-width: 600px) {
  .timeline::after {
    left: 31px;
  }
  
  .timeline-item {
    width: 100%;
    padding-left: 70px;
    padding-right: 25px;
  }
  
  .timeline-item::after {
    left: 16px; 
  }
  
  .right {
    left: 0%;
  }
}
</style>
