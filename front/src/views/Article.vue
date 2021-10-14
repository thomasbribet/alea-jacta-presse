<template>
  <article id="article">
    <div class="progressContainer" v-if="!isNoArticles">
      <div class="progressBar" id="myBar"></div>
    </div>
    <div class="toutLu" v-if="isNoArticles" @click="reloadArticles">
      <AllRead />
    </div>
    <div id="content" v-else>
      <div class="time">
        <span class="material-icons"> query_builder </span>
        <p>{{ minutesToRead }} minutes</p>
      </div>
      <h2 class="title">{{ article.title }}</h2>
      <p class="preview">{{ article.preview }}</p>
      <div
        v-for="(paragraph, index) in article.content"
        :key="index"
        class="paragraphs"
      >
        <p>{{ paragraph }}</p>
      </div>
    </div>
    <FooterArticle
      v-if="!isNoArticles"
      :url="article.url"
      :clickBtn="getRandomArticle"
    />
  </article>
</template>

<script>
import FooterArticle from "../components/article/Footer-Article.vue";
import AllRead from "../components/article/All-Read.vue";

export default {
  name: "Article",
  components: { FooterArticle, AllRead },
  data() {
    return {
      article: {
        name: "",
        url: "",
        title: "",
        preview: "",
        content: [],
      },
      randomNumber: 0,
      isNoArticles: false,
      minutesToRead: 0,
    };
  },
  created() {
    window.addEventListener("scroll", this.scrollProgress);
  },
  unmounted() {
    window.removeEventListener("scroll", this.scrollProgress);
  },
  async mounted() {
    if (
      this.$store.state.initialNbArticles === this.$store.getters.getNbTrash
    ) {
      await this.$store.dispatch("getArticles");
    }
    this.getRandomArticle();
  },
  methods: {
    pickRandomNumber() {
      return (this.randomNumber = Math.floor(
        Math.random() * this.$store.state.articles.length
      ));
    },
    async getRandomArticle() {
      await this.pickRandomNumber();
      this.article = await {
        ...this.$store.state.articles[this.randomNumber],
      };
      // Move to "trash"
      this.$store.getters.getArticlesTrash.push(this.article);
      // Remove from original array
      this.$store.state.articles.splice(this.randomNumber, 1);

      this.checkIfEmpty();
      this.goTop();
      this.numberOfWords();
    },
    checkIfEmpty() {
      if (
        this.$store.getters.getNbTrash - 1 ===
        this.$store.state.initialNbArticles
      ) {
        return (this.isNoArticles = true);
      } else {
        return (this.isNoArticles = false);
      }
    },
    goTop() {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    },
    reloadArticles() {
      this.isNoArticles = false;
      this.$store.state.articles = this.$store.getters.getArticlesTrash.slice(
        0,
        this.$store.getters.getNbTrash - 1
      );
      this.$store.getters.getArticlesTrash.splice(
        0,
        this.$store.getters.getArticlesTrash.length
      );
      this.getRandomArticle();
    },
    numberOfWords() {
      this.minutesToRead = 0;
      let all_wordsCount = 0;
      if (!this.isNoArticles) {
        let arrayOf_p = this.article.content;
        for (let i = 0; i < arrayOf_p.length; i++) {
          let p_wordsCount = arrayOf_p[i].split(/\b\w+\b/).length;
          all_wordsCount += p_wordsCount;
        }
        this.minutesToRead += Math.round(all_wordsCount / 300); // average reading speed = 300 words/min
      }
    },
    scrollProgress() {
      var winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;
      var height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      var scrolled = (winScroll / height) * 100;
      let myBar = document.getElementById("myBar");
      if (myBar) {
        myBar.style.width = scrolled + "%";
      }
    },
  },
};
</script>

<style scoped>
.progressContainer {
  position: fixed;
  top: 7vh;
  height: 1vh;
  width: 100vw;
  z-index: 99;
  background-color: transparent;
}
.progressBar {
  background-color: var(--text-color);
  height: 100%;
  width: 0%;
}
#content {
  padding: 25vh 25vw;
}
.time {
  display: flex;
  align-items: center;
  height: 30px;
  margin-bottom: 3vh;
}
.time p {
  margin-left: 1vh;
}
.title {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 3rem;
}
.preview {
  font-family: "Times New Roman", Times, serif;
  font-size: 2.5rem;
  font-style: italic;
  text-align: end;
  margin: 5vh 0 10vh 0;
}
.paragraphs p {
  margin: 2.75vh 10% 0 10%;
  font-family: Helvetica, sans-serif;
  font-size: 1.5rem;
  line-height: 1.9rem;
  text-align: justify;
}
.toutLu {
  height: 93vh;
  margin-top: 7vh;
  padding-top: 43vh;
  cursor: pointer;
}

@media screen and (max-width: 1080px) {
  #content {
    padding: 20vh 10vh;
  }
  .paragraphs p {
    margin: 2.75vh 10vw 0 10vw;
  }
}

@media screen and (max-width: 768px) {
  #content {
    padding: 20vh 4vh;
  }
  .time img {
    width: 20px;
  }
  .title {
    font-size: 2.2rem;
    font-weight: bold;
  }
  .preview {
    text-align: end;
    margin-left: 0;
    font-size: 1.8rem;
  }
  .paragraphs p {
    font-size: 1.4rem;
    line-height: 1.85rem;
    margin: 2.75vh 0 0 0;
    text-align: left;
  }
}

@media screen and (max-height: 500px) {
  .progressContainer {
    top: 7vw;
    height: 1vw;
  }
  #content {
    margin: 20vh 15vw 0 15vw;
  }
}
</style>
