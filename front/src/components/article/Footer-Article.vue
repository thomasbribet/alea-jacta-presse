<template>
  <div id="footer">
    <a
      :href="url"
      target="_blank"
      class="source btn"
      alt="afficher la source de la lecture en cours"
    >
      SOURCE
    </a>
    <div class="shuffle btn" @click="clickBtn">
      <span class="material-icons md-36">auto_stories</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
    },
    clickBtn: {
      type: Function,
    },
  },
};
</script>

<style scoped>
.material-icons.md-36 { font-size: 36px; }
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
.source,
.source div {
  height: 100%;
  width: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--text-color);
  font-size: 1.7em;
  color: var(--background-color);
}
.shuffle {
  width: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid var(--text-color);
  border-left: 0;
  font-size: 2em;
}

@media screen and (max-width: 850px) {
  .source {
    width: 50%;
    font-size: 1.3em;
  }
  .shuffle {
    width: 50%;
    border-right: 0;
    border-bottom: 0;
  }
}

@media screen and (max-height: 500px) {
  #footer {
    height: 7vw;
    background-color: transparent;
    position: fixed;
    bottom: 0;
    font-family: Helvetica, sans-serif;
    font-size: 100%;
    display: flex;
    justify-content: space-between;
  }
  .source {
    width: 40vh;
    transform: rotate(-90deg) translate(34%, -85%);
  }
  .shuffle {
    width: 7vw;
    padding-right: 5vw;
    padding-bottom: 3vw;
    border: none;
  }
}
</style>