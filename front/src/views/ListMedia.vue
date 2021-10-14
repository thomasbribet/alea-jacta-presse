<template>
  <div id="listMedia">
    <p>Le site est alimenté par les 3 derniers éditoriaux des media suivants :</p>
    <div v-for="(name, index) in uniqueNames.sort()" :key="index">
      <a :href="name.url" target="_blank" class="names"> {{ name.realName }} </a>
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
  data() {
    return {
      articles: [],
      uniqueNames: [],
      newsPapers: [],
    };
  },
  async mounted() {
    // Go top
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    
    if (this.$store.state.articles.length === 0) {
      await this.$store.dispatch("getArticles");
    }
    this.articles = await this.$store.state.articles;
    for (let i = 0; i < this.articles.length; i++) {
      let newsPapersInfos = {
        realName: this.articles[i].realName,
        url: this.articles[i].realUrl,
      };
      this.newsPapers.push(newsPapersInfos);
    }
    this.uniqueNames = this.removeDuplicate(this.newsPapers, "realName");
  },
  methods: {
    removeDuplicate(array, key) {
      let checkDuplicate = new Set();
      return array.filter(item => !checkDuplicate.has(item[key]) && checkDuplicate.add(item[key]))
    },
  },
};
</script>

<style scoped>
#listMedia {
  height: 100vh;
  margin: 10vh 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
#listMedia > p:first-child {
  font-size: 1.3rem;
  margin-bottom: 5vh;
  width: 15vw;
}
.names {
  font-size: 1.3rem;
}

@media screen and (max-width: 1080px) {
  #listMedia > p:first-child {
    width: 30vw;
  }
}

@media screen and (max-width: 768px) {
  #listMedia > p:first-child {
    width: 65vw;
  }
}

@media screen and (max-width: 350px) {
  #listMedia {
    margin: 25vh 0;
  }
}

@media screen and (max-height: 500px) {
  #listMedia {
    margin: 25vw 0;
  }
}
</style>