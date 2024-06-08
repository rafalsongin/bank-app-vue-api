<template>
  <div>
    <header>
      <h2>Bank Logo</h2>
    </header>
    <ul>
      <li v-for="panel in panels"
          :key="panel" @click="selectPanel(panel)"
          :class="{ 'current': isCurrentPanel(panel), 'disabled': isNavigationDisabled }">
        {{ panel }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    currentPanel: String,
    isNavigationDisabled: Boolean
  },
  data() {
    return {
      panels: ['Overview', 'Accounts', 'Create Transaction', 'Search Customer', 'Settings']
    };
  },
  methods: {
    selectPanel(panel) {
      if (!this.isNavigationDisabled) {
        this.$emit('selectPanel', panel);
      }
    },
    isCurrentPanel(panel) {
      return panel === this.currentPanel;
    }
  }
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  font-family: 'Fira Code', monospace;
  color: #FFFFFF;
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
}

li:hover {
  background-color: #96b8e8;
}

.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>