<template>
  <div id="header">
    <router-link to="/" id="goHomeBtn" alt="retour à l'accueil">
      <p>Alea Jacta <span class="presse">Presse</span></p>
    </router-link>
    <div class="themeMode" @click="toggleTheme">
      <span
        v-if="theme == ''"
        class="material-icons md-36"
        aria-roledescription="activer le mode sombre"
        >dark_mode</span
      >
      <span
        v-else
        class="material-icons md-36"
        aria-roledescription="activer le mode lumineux"
        >light_mode</span
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      theme: "",
    };
  },
  methods: {
    toggleTheme() {
      this.theme = this.theme == "darkMode" ? "" : "darkMode";
      document.documentElement.setAttribute("data-theme", this.theme);
      localStorage.setItem("theme", this.theme);
    },
  },
};
</script>

<style scoped>
.material-icons.md-36 {
  font-size: 36px;
}
#header {
  position: fixed;
  top: 0;
  width: 100vw;
  height: 7vh;
  border-bottom: 2px solid var(--text-color);

  display: grid;
  grid-template-columns: 20vw 1fr 20vw;
}
#goHomeBtn {
  background-color: var(--background-color);
  text-decoration: none;
  color: var(--text-color);
  font-family: Helvetica, sans-serif;
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0 15vw;

  grid-column-start: 2;
  display: flex;
  justify-content: center;
  align-items: center;
}
.presse {
  text-decoration: underline;
}
.themeMode {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

@media screen and (max-width: 900px) {
  #goHomeBtn {
    margin: 0;
  }
}

@media screen and (max-width: 768px) {
  #header {
    position: fixed;
    top: 0;
    width: 100vw;
    height: 7vh;
    display: flex;
    justify-content: space-between;
  }
  #goHomeBtn {
    margin-left: 1.5vh;
  }
  .themeMode {
    margin-right: 1.5vh;
  }
}

@media screen and (max-width: 400px) {
  #goHomeBtn {
    font-size: 1.5rem;
  }
}

@media screen and (max-height: 500px) {
  #header {
    height: 7vw;
  }
}
</style>