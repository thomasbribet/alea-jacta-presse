<template>
  <div id="home">
    <p>L'avis des autres.</p>
    <p>Au hasard.</p>
    <FooterHome />
  </div>
</template>

<script>
import FooterHome from "../components/Footer-Home";

export default {
  name: "Home",
  components: {
    FooterHome,
  },
  async created() {
    if (
      this.$store.state.initialNbArticles === this.$store.getters.getNbTrash ||
      this.$store.state.initialNbArticles === this.$store.getters.getNbTrash - 1
    ) {
      await this.$store.getters.getArticlesTrash.splice(
        0,
        this.$store.getters.getArticlesTrash.length
      );
      this.$store.dispatch("getArticles");
    }
  },
};
</script>

<style scoped>
#home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
p {
  font-family: Verdana, sans-serif;
  width: 70%;
  text-align: center;
}
p:first-of-type {
  font-size: 3rem;
  font-weight:100;
}
p:last-of-type {
  font-size: 2rem;
  font-weight: bold;
  font-style: italic;
}

@media screen and (max-width: 850px) {
  p {
    font-size: 2rem;
    width: 85%;
  }
  p:first-of-type {
    text-align: start;
  }
  p:last-of-type {
    text-align: end;
  }
}

@media screen and (max-height: 500px) {
  .guide {
    margin: 10vh 15vw 0 15vw;
  }
}
</style>
