import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    articles: [],
    initialNbArticles: 0,
    articlesTrash: [],
  },
  getters: {
    getArticles(state) {
      return state.articles;
    },
    getNbArticles(state) {
      return state.articles.length;
    },
    getArticlesTrash(state) {
      return state.articlesTrash;
    },
    getNbTrash(state) {
      return state.articlesTrash.length;
    },
  },
  mutations: {
    ADD_ARTICLES(state, response) {
      return (state.articles = response);
    },
  },
  actions: {
    getArticles({ commit, state, getters }) {
      return axios
        .get("https://alea-jacta-presse.herokuapp.com/article")
        .then((res) => {
          let articlesTab = res.data.articles;
          for (let i = 0; i < articlesTab.length; i++) {
            let art = articlesTab[i];
            switch (art.name) {
              case "Figaro":
                if (art.preview.includes("FIGAROVOX")) {
                  art.preview = art.preview.substring(
                    art.preview.indexOf("-") + 2,
                    art.preview.length
                  );
                }
                break;
              case "La Tribune":
                if (art.preview.includes("Écoutez cet articlePoweredbyETX")) {
                  art.preview = art.preview.substring(
                    0,
                    art.preview.indexOf("Écoutez cet articlePoweredbyETX")
                  );
                }
                break;
              case "Nouvel Obs":
                if (art.preview.includes("Serge Raffy")) {
                  art.preview = art.preview.substring(
                    art.preview.indexOf("-") + 2,
                    art.preview.length
                  );
                }
                break;
              case "Est Républicain":
                if (art.title.includes("Édito")) {
                  art.title = art.title
                    .substring(art.title.indexOf("Édito") + 5, art.title.length)
                    .trim();
                }
                break;
              case "Echos":
                if (art.title.includes("|")) {
                  art.title = art.title
                    .substring(art.title.indexOf("|") + 1, art.title.length)
                    .trim();
                }
                for (let i = 0; i < art.content.length; i++) {
                  if (art.content[i].includes("|")) {
                    art.content.splice(i, 1);
                  }
                }
                break;
              case "Opinion":
                if (art.title.includes("a chronique d")) {
                  art.title = art.title
                    .substring(0, art.title.indexOf("a chronique d") - 3)
                    .trim();
                }
                break;
              case "La Croix":
                for (let i = 0; i < art.content.length; i++) {
                  if (art.content[i].includes("→")) {
                    art.content.splice(i, 1);
                  }
                }
                break;
              case "Arret sur images":
                for (let i = 0; i < art.content.length; i++) {
                  if (art.content[i] === "Lire aussi") {
                    art.content.splice(i, 1);
                  }
                }
                break;
              case "Challenges":
                art.preview = art.preview.substring(art.preview.indexOf("-") + 1, art.preview.length)
                break;
              case "Contrepoints":
                art.content.splice(0,1);
                break;
            }
          }
          return articlesTab;
        })
        .then((res) => commit("ADD_ARTICLES", res))
        .then(() => {
          state.initialNbArticles = getters.getNbArticles;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  modules: {},
});
