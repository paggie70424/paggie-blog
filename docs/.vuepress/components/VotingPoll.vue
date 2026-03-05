<template>
  <div class="voting-page">
    <!-- Poll sections — anchors match sidebar links -->
    <div
      v-for="(poll, idx) in polls"
      :key="idx"
      class="poll-section"
      :id="'poll-' + idx"
      :ref="'poll-' + idx"
    >
      <!-- section badge -->
      <div class="section-divider">
        <span class="divider-badge">{{ poll.emoji }} {{ poll.title }}</span>
      </div>

      <div class="poll-card">
        <div class="poll-header">
          <h2 class="poll-question">{{ poll.question }}</h2>
          <p class="poll-subtitle">{{ poll.subtitle }}</p>
          <div class="poll-meta">
            <span class="vote-count-badge">🗳️ {{ totalVotes(idx) }} votes</span>
            <button v-if="hasVoted(idx)" class="reset-btn" @click="resetVote(idx)">
              🔄 Change vote
            </button>
          </div>
        </div>

        <!-- grouped options (table tennis) -->
        <template v-if="poll.groups">
          <div v-for="(group, gIdx) in poll.groups" :key="gIdx" class="option-group">
            <div class="group-label">{{ group.label }}</div>
            <div class="options-grid" :class="'cols-' + (poll.gridCols || 3)">
              <button
                v-for="(option, oIdx) in group.options"
                :key="'g' + gIdx + '-o' + oIdx"
                :class="[
                  'option-card',
                  { selected: userVote(idx) === gok(gIdx, oIdx), 'has-voted': hasVoted(idx) }
                ]"
                @click="castVote(idx, gok(gIdx, oIdx))"
                :disabled="hasVoted(idx) && userVote(idx) !== gok(gIdx, oIdx)"
              >
                <span class="option-icon">{{ option.icon }}</span>
                <span class="option-name">{{ option.name }}</span>
                <span v-if="option.sub" class="option-sub">{{ option.sub }}</span>
                <span v-if="option.rank" class="rank-badge">#{{ option.rank }}</span>

                <!-- always-visible cumulative bar -->
                <div class="result-bar-wrap">
                  <div
                    class="result-bar"
                    :style="{ width: getPercent(idx, gok(gIdx, oIdx)) + '%' }"
                    :class="{
                      'bar-active': hasVoted(idx),
                      'bar-winner': hasVoted(idx) && isWinner(idx, gok(gIdx, oIdx))
                    }"
                  ></div>
                  <span class="result-pct" :class="{ 'pct-active': hasVoted(idx) }">
                    {{ getPercent(idx, gok(gIdx, oIdx)) }}%
                  </span>
                </div>

                <span v-if="hasVoted(idx) && userVote(idx) === gok(gIdx, oIdx)" class="my-vote-tag">✅ Your pick</span>
                <span v-if="hasVoted(idx) && isWinner(idx, gok(gIdx, oIdx))" class="winner-tag">🏆 Leading</span>
              </button>
            </div>
          </div>
        </template>

        <!-- flat options (cities) -->
        <template v-else>
          <div class="options-grid" :class="'cols-' + (poll.gridCols || 3)">
            <button
              v-for="(option, oIdx) in poll.options"
              :key="oIdx"
              :class="[
                'option-card',
                { selected: userVote(idx) === oIdx, 'has-voted': hasVoted(idx) }
              ]"
              @click="castVote(idx, oIdx)"
              :disabled="hasVoted(idx) && userVote(idx) !== oIdx"
            >
              <span class="option-icon">{{ option.icon }}</span>
              <span class="option-name">{{ option.name }}</span>
              <span v-if="option.sub" class="option-sub">{{ option.sub }}</span>

              <!-- always-visible cumulative bar -->
              <div class="result-bar-wrap">
                <div
                  class="result-bar"
                  :style="{ width: getPercent(idx, oIdx) + '%' }"
                  :class="{
                    'bar-active': hasVoted(idx),
                    'bar-winner': hasVoted(idx) && isWinner(idx, oIdx)
                  }"
                ></div>
                <span class="result-pct" :class="{ 'pct-active': hasVoted(idx) }">
                  {{ getPercent(idx, oIdx) }}%
                </span>
              </div>

              <span v-if="hasVoted(idx) && userVote(idx) === oIdx" class="my-vote-tag">✅ Your pick</span>
              <span v-if="hasVoted(idx) && isWinner(idx, oIdx)" class="winner-tag">🏆 Leading</span>
            </button>
          </div>
        </template>

        <p v-if="!hasVoted(idx)" class="vote-hint">👆 Tap your favourite to vote! (Live % updates after you vote)</p>
      </div>

      <a
        v-if="idx < polls.length - 1"
        class="next-poll-btn"
        :href="'#poll-' + (idx + 1)"
        @click.prevent="jumpTo(idx + 1)"
      >↓ Next: {{ polls[idx + 1].emoji }} {{ polls[idx + 1].title }}</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VotingPoll',
  data() {
    return {
      votesData: {},  // { pollIdx: { optionKey: count } }
      choiceData: {}, // { pollIdx: optionKey }

      polls: [
        // ── 1. Best Australian City ───────────────────────────────
        {
          emoji: '🏙️',
          title: 'Best Aussie City',
          question: 'Which is the best city in Australia? 🇦🇺',
          subtitle: 'All major Australian cities — pick your favourite!',
          gridCols: 4,
          options: [
            { icon: '🌉', name: 'Sydney',       sub: 'NSW' },
            { icon: '☕', name: 'Melbourne',    sub: 'VIC' },
            { icon: '🌞', name: 'Brisbane',     sub: 'QLD' },
            { icon: '🏖️', name: 'Gold Coast',   sub: 'QLD' },
            { icon: '🦘', name: 'Perth',        sub: 'WA' },
            { icon: '🍷', name: 'Adelaide',     sub: 'SA' },
            { icon: '🌿', name: 'Canberra',     sub: 'ACT' },
            { icon: '🌊', name: 'Hobart',       sub: 'TAS' },
            { icon: '🐊', name: 'Darwin',       sub: 'NT' },
            { icon: '🏄', name: 'Cairns',       sub: 'QLD' },
            { icon: '🌺', name: 'Wollongong',   sub: 'NSW' },
            { icon: '🎡', name: 'Newcastle',    sub: 'NSW' },
          ],
        },

        // ── 2. Men's WTT Top 10 ──────────────────────────────────
        {
          emoji: '🏓👨',
          title: "Men's TT Top 10",
          question: "Your fav Men's Table Tennis player? 🏓",
          subtitle: 'WTT World Rankings — Men\'s Singles (Mar 2026)',
          gridCols: 3,
          groups: [
            {
              label: '🏅 WTT Men\'s World Rankings',
              options: [
                { rank: 1,  icon: '🇨🇳', name: '王楚钦',           sub: 'WANG Chuqin · China' },
                { rank: 2,  icon: '🇸🇪', name: 'Truls Möregård',   sub: 'Sweden' },
                { rank: 3,  icon: '🇨🇳', name: '林诗栋',             sub: 'LIN Shidong · China' },
                { rank: 4,  icon: '🇧🇷', name: 'Hugo Calderano',   sub: 'Brazil' },
                { rank: 5,  icon: '🇯🇵', name: '張本智和',           sub: 'T. Harimoto · Japan' },
                { rank: 6,  icon: '🇫🇷', name: 'Félix Lebrun',     sub: 'France' },
                { rank: 7,  icon: '🇹🇼', name: '林昀儒',             sub: 'LIN Yun-Ju · Chinese Taipei' },
                { rank: 8,  icon: '🇯🇵', name: '松島輝空',           sub: 'S. Matsushima · Japan' },
                { rank: 9,  icon: '🇨🇳', name: '向鹏',               sub: 'XIANG Peng · China' },
                { rank: 10, icon: '🇰🇷', name: '장우진',             sub: 'JANG Woojin · Korea' },
              ],
            },
          ],
        },

        // ── 3. Women's WTT Top 10 ────────────────────────────────
        {
          emoji: '🏓👩',
          title: "Women's TT Top 10",
          question: "Your fav Women's Table Tennis player? 🏓",
          subtitle: 'WTT World Rankings — Women\'s Singles (Mar 2026)',
          gridCols: 3,
          groups: [
            {
              label: '🏅 WTT Women\'s World Rankings',
              options: [
                { rank: 1,  icon: '🇨🇳', name: '孙颖莎',      sub: 'SUN Yingsha · China' },
                { rank: 2,  icon: '🇨🇳', name: '王曼昱',      sub: 'WANG Manyu · China' },
                { rank: 3,  icon: '🇨🇳', name: '陈幸同',      sub: 'CHEN Xingtong · China' },
                { rank: 4,  icon: '🇲🇴', name: '朱雨玲',      sub: 'ZHU Yuling · Macau' },
                { rank: 5,  icon: '🇨🇳', name: '蒯曼',        sub: 'KUAI Man · China' },
                { rank: 6,  icon: '🇨🇳', name: '王艺迪',      sub: 'WANG Yidi · China' },
                { rank: 7,  icon: '🇨🇳', name: '陈艺',        sub: 'CHEN Yi · China' },
                { rank: 8,  icon: '🇯🇵', name: '早田美和',     sub: 'Harimoto Miwa · Japan' },
                { rank: 9,  icon: '🇯🇵', name: '早田ひな',     sub: 'Hayata Hina · Japan' },
                { rank: 10, icon: '🇯🇵', name: '伊藤美誠',     sub: 'ITO Mima · Japan' },
              ],
            },
          ],
        },
      ],
    }
  },

  methods: {
    // grouped option key: unique integer per option
    gok(gIdx, oIdx) { return gIdx * 100 + oIdx },

    votes(pIdx)      { return this.votesData[pIdx] || {} },
    totalVotes(pIdx) { return Object.values(this.votes(pIdx)).reduce((a, b) => a + b, 0) },
    userVote(pIdx)   { const v = this.choiceData[pIdx]; return v !== undefined ? v : -1 },
    hasVoted(pIdx)   { return this.userVote(pIdx) >= 0 },

    getPercent(pIdx, key) {
      const total = this.totalVotes(pIdx)
      if (!total) return 0
      return Math.round(((this.votes(pIdx)[key] || 0) / total) * 100)
    },
    isWinner(pIdx, key) {
      const v = this.votes(pIdx)
      if (!Object.keys(v).length) return false
      const max = Math.max(...Object.values(v))
      return (v[key] || 0) === max && max > 0
    },

    castVote(pIdx, key) {
      if (this.hasVoted(pIdx)) return
      const pv = { ...(this.votesData[pIdx] || {}) }
      pv[key] = (pv[key] || 0) + 1
      this.votesData  = { ...this.votesData, [pIdx]: pv }
      this.choiceData = { ...this.choiceData, [pIdx]: key }
      this.persist()
    },
    resetVote(pIdx) {
      const old = this.userVote(pIdx)
      const pv  = { ...(this.votesData[pIdx] || {}) }
      if (pv[old]) pv[old] = Math.max(0, pv[old] - 1)
      this.votesData = { ...this.votesData, [pIdx]: pv }
      const c = { ...this.choiceData }
      delete c[pIdx]
      this.choiceData = c
      this.persist()
    },

    jumpTo(idx) {
      const el = this.$refs['poll-' + idx]
      const t  = Array.isArray(el) ? el[0] : el
      if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' })
    },

    persist() {
      try {
        localStorage.setItem('paggie-votes3', JSON.stringify(this.votesData))
        localStorage.setItem('paggie-choices3', JSON.stringify(this.choiceData))
      } catch (_) {}
    },
    load() {
      try {
        const v = localStorage.getItem('paggie-votes3')
        const c = localStorage.getItem('paggie-choices3')
        if (v) this.votesData  = JSON.parse(v)
        if (c) this.choiceData = JSON.parse(c)
      } catch (_) {}
    },
  },

  mounted() { this.load() },
}
</script>

<style scoped>
/* ── page ─────────────────────────────────────────────────────────── */
.voting-page {
  max-width: 900px;
  margin: 0 auto;
  font-family: 'Quicksand', 'Segoe UI', sans-serif;
}

/* ── section ──────────────────────────────────────────────────────── */
.poll-section {
  margin-bottom: 60px;
  scroll-margin-top: 72px;
}

.section-divider {
  text-align: center;
  margin-bottom: 22px;
  position: relative;
}
.section-divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, #c4b5fd, transparent);
}
.divider-badge {
  position: relative;
  background: linear-gradient(135deg, #7c3aed, #a855f7);
  color: #fff;
  padding: 8px 24px;
  border-radius: 50px;
  font-size: 0.95rem;
  font-weight: 700;
  box-shadow: 0 4px 16px rgba(124,58,237,.3);
}

/* ── poll card ────────────────────────────────────────────────────── */
.poll-card {
  background: linear-gradient(135deg, #fdfcff 0%, #f3eeff 100%);
  border: 1px solid #e4d9ff;
  border-radius: 20px;
  padding: 28px;
  box-shadow: 0 6px 32px rgba(124,58,237,.07);
}
.poll-question {
  font-size: 1.35rem;
  font-weight: 700;
  color: #3b1f7a;
  margin: 0 0 4px;
}
.poll-subtitle {
  color: #7c6fad;
  margin: 0 0 14px;
  font-size: 0.88rem;
}
.poll-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 22px;
}
.vote-count-badge {
  background: linear-gradient(135deg, #ede9fe, #ddd6fe);
  color: #5b21b6;
  padding: 4px 14px;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 700;
}
.reset-btn {
  background: none;
  border: 1px solid #c4b5fd;
  color: #7c3aed;
  padding: 4px 14px;
  border-radius: 50px;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 700;
  transition: background .2s;
}
.reset-btn:hover { background: #ede9fe; }

/* ── group label ──────────────────────────────────────────────────── */
.option-group { margin-bottom: 18px; }
.group-label {
  font-size: 0.78rem;
  font-weight: 700;
  color: #7c3aed;
  text-transform: uppercase;
  letter-spacing: .06em;
  margin-bottom: 12px;
  padding-left: 2px;
}

/* ── grid ─────────────────────────────────────────────────────────── */
.options-grid {
  display: grid;
  gap: 12px;
}
.options-grid.cols-3 { grid-template-columns: repeat(3,1fr); }
.options-grid.cols-4 { grid-template-columns: repeat(4,1fr); }

@media (max-width: 680px) {
  .options-grid.cols-3,
  .options-grid.cols-4 { grid-template-columns: repeat(2,1fr); }
}
@media (max-width: 400px) {
  .options-grid.cols-3,
  .options-grid.cols-4 { grid-template-columns: 1fr; }
}

/* ── option card ──────────────────────────────────────────────────── */
.option-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 16px 8px 14px;
  border: 2px solid #e4d9ff;
  border-radius: 14px;
  background: #fff;
  cursor: pointer;
  transition: all .22s ease;
  text-align: center;
  min-height: 120px;
  overflow: hidden;
}
.option-card:not(:disabled):hover {
  transform: translateY(-4px);
  border-color: #a78bfa;
  box-shadow: 0 8px 22px rgba(124,58,237,.18);
}
.option-card.selected {
  border-color: #7c3aed;
  background: linear-gradient(135deg, #ede9fe, #f5f3ff);
  box-shadow: 0 8px 26px rgba(124,58,237,.22);
}
.option-card.has-voted:not(.selected) {
  opacity: 0.65;
  transform: none;
  cursor: default;
}

.option-icon { font-size: 1.9rem; line-height: 1; }
.option-name {
  font-weight: 700;
  font-size: 0.84rem;
  color: #3b1f7a;
  word-break: break-word;
}
.option-sub {
  font-size: 0.67rem;
  color: #9b8fc0;
  font-weight: 500;
}
.rank-badge {
  font-size: 0.62rem;
  font-weight: 800;
  padding: 1px 7px;
  border-radius: 50px;
  background: linear-gradient(135deg, #fef3c7, #fde68a);
  color: #92400e;
}

/* ── cumulative result bar (always visible) ───────────────────────── */
.result-bar-wrap {
  width: 100%;
  margin-top: 8px;
  position: relative;
  height: 7px;
  background: #ede9fe;
  border-radius: 50px;
  overflow: visible;
}
.result-bar {
  height: 100%;
  border-radius: 50px;
  /* muted before voting */
  background: #c4b5fd;
  transition: width 0.7s cubic-bezier(0.22, 1, 0.36, 1), background 0.4s;
  min-width: 0;
}
/* bright purple once user has voted in this poll */
.result-bar.bar-active {
  background: linear-gradient(90deg, #a78bfa, #7c3aed);
}
/* golden for the leader */
.result-bar.bar-winner {
  background: linear-gradient(90deg, #f59e0b, #f97316);
}

.result-pct {
  position: absolute;
  right: 0;
  top: -17px;
  font-size: 0.67rem;
  font-weight: 800;
  color: #c4b5fd;
  transition: color .4s;
}
.result-pct.pct-active { color: #5b21b6; }

/* ── tags ─────────────────────────────────────────────────────────── */
.my-vote-tag, .winner-tag {
  font-size: 0.6rem;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 50px;
  margin-top: 4px;
}
.my-vote-tag { background: #ede9fe; color: #5b21b6; }
.winner-tag  { background: #fef3c7; color: #92400e; }

/* ── hint ─────────────────────────────────────────────────────────── */
.vote-hint {
  text-align: center;
  color: #9b8fc0;
  margin-top: 20px;
  margin-bottom: 0;
  font-size: 0.85rem;
  font-weight: 600;
  animation: bounce 1.4s infinite;
}
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-4px); }
}

/* ── next poll button ─────────────────────────────────────────────── */
.next-poll-btn {
  display: block;
  text-align: center;
  margin-top: 18px;
  font-size: 0.85rem;
  font-weight: 700;
  color: #a78bfa;
  text-decoration: none;
  transition: color .2s;
  cursor: pointer;
}
.next-poll-btn:hover { color: #7c3aed; }
</style>
