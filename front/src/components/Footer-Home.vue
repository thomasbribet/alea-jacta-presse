<template>
  <div id="footer">
    <router-link to="/article" class="commencer btn">
      <div alt="afficher la source de la lecture en cours">COMMENCER</div>
    </router-link>
    <router-link to="/infos" class="infos btn" v-if="isHome">
      <div alt="informations">
        <span class="material-icons">help_outline</span>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isHome: false,
    };
  },
  created() {
    this.isThisHome();
  },
  methods: {
    isThisHome() {
      if (this.$route.name === "Home") {
        return (this.isHome = true);
      }
    },
  },
};
</script>

<style scoped>
#footer {
  width: 100vw;
  height: 7vh;
  position: fixed;
  bottom: 0;
  font-family: Helvetica, sans-serif;
  display: flex;
  justify-content: center;
}
.btn {
  cursor: pointer;
  text-decoration: none;
}
.commencer,
.commencer div {
  height: 100%;
  width: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--text-color);
  font-size: 1.3em;
  color: var(--background-color);
}
.infos {
  width: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid var(--text-color);
  border-left: 0;
  font-size: 36px;
}

@media screen and (max-width: 850px) {
  .commencer {
    width: 50%;
    font-size: 1em;
  }
  .infos {
    width: 50%;
    border-right: 0;
    border-bottom: 0;
    font-size: 1.5em;
  }
}

@media screen and (max-height: 500px) {
  #footer {
    height: 7vw;
    background-color: transparent;
    justify-content: center;
  }
}
</style>