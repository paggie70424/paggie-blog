<template>
  <div class="certificate-viewer">
    <div v-if="!isUnlocked" class="lock-screen">
      <div class="lock-content">
        <div class="lock-icon">🔒</div>
        <h4>Password Protected</h4>
        <p>Please enter the password to view this document.</p>
        <div class="input-group">
          <input 
            type="password" 
            v-model="inputPassword" 
            placeholder="Enter Password"
            @keyup.enter="unlock"
          />
          <button @click="unlock">Unlock</button>
        </div>
        <p v-if="error" class="error-msg">Incorrect password. Please try again.</p>
      </div>
    </div>
    
    <div v-else class="pdf-container">
      <iframe :src="resolvedSrc" width="100%" height="600px" style="border: none;"></iframe>
    </div>
  </div>
</template>

<script>
import { withBase } from '@vuepress/client'

export default {
  name: 'CertificateViewer',
  props: {
    src: {
      type: String,
      required: true
    },
    password: {
      type: String,
      default: 'GithubMyCertificates' // Default password as per previous config
    }
  },
  data() {
    return {
      isUnlocked: false,
      inputPassword: '',
      error: false
    }
  },
  computed: {
    resolvedSrc() {
      // Use withBase to correctly resolve the path relative to base URL
      return withBase(this.src)
    }
  },
  methods: {
    unlock() {
      if (this.inputPassword === this.password) {
        this.isUnlocked = true
        this.error = false
      } else {
        this.error = true
        this.inputPassword = ''
      }
    }
  }
}
</script>

<style scoped>
.certificate-viewer {
  margin: 1.5rem 0;
  border: 1px solid var(--c-border);
  border-radius: 8px;
  overflow: hidden;
  background: var(--c-bg-light);
}

.lock-screen {
  padding: 3rem 1rem;
  text-align: center;
  background: var(--c-bg-lighter);
}

.lock-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.input-group {
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}

input {
  padding: 0.5rem 1rem;
  border: 1px solid var(--c-border);
  border-radius: 4px;
  outline: none;
}

input:focus {
  border-color: var(--c-brand);
}

button {
  padding: 0.5rem 1rem;
  background-color: var(--c-brand);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}

button:hover {
  background-color: var(--c-brand-dark);
}

.error-msg {
  color: #ff4d4f;
  margin-top: 1rem;
  font-size: 0.9rem;
}

.pdf-container {
  background: #f0f0f0;
}
</style>
