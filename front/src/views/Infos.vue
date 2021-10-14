<template>
  <div id="infos">
    <div class="guide">
      <p>
        En cliquant sur "<span class="keyWord">COMMENCER</span>", un éditorial
        s'affiche de manière aléatoire. Pour en lire un autre, cliquez sur
        <span class="material-icons md-36 icon">auto_stories</span> .
      </p>
      <br />
      <p>
        Ces éditoriaux proviennent de différents media. Afin de ne pas
        influencer votre lecture, leurs noms sont remplacés par " *** ".
        <br />
        Pour voir l'édito dans son contexte original, cliquez sur "<span
          class="keyWord"
          >SOURCE</span
        >".
      </p>
      <br />
      <p>
        <router-link to="/media"> Liste des media</router-link>
      </p>
    </div>
    <FooterHome />
  </div>
</template>

<script>
import FooterHome from "../components/Footer-Home.vue";
export default {
  components: {
    FooterHome,
  },
  mounted() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  },
};
</script>

<style scoped>
#infos {
  display: flex;
  justify-content: center;
}
.guide {
  font-family: "Times New Roman", Times, serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  width: 35vw;
  font-size: 1.6rem;
}
.guide > p:nth-child(3) {
  margin: 5vh 0;
}
.guide p:last-child {
  text-align: end;
  margin-top: 5vh;
}
.keyWord {
  font-family: Verdana, sans-serif;
}

@media screen and (max-width: 850px) {
  .guide {
    margin: 10vh 0;
    width: 80vw;
  }
  .guide p:last-child {
    margin-top: 0;
    text-align: center;
  }
}

@media screen and (max-width: 350px) {
  .guide {
    margin: 45vh 0;
  }
}

@media screen and (max-height: 500px) {
  .guide {
    width: 75vw;
    margin: 50vh 0;
  }
  .guide p:last-child {
    text-align: end;
  }
}
</style>