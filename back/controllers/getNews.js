const puppeteer = require("puppeteer");
const axios = require("axios");

const getArticlesFrom = async function (src) {
  const browser = await puppeteer
    .launch({
      headless: true,
      defaultViewport: null,
      args: [
        "--incognito",
        "--no-sandbox",
        "--single-process",
        "--no-zygote",
        "--disable-setuid-sandbox",
      ],
    })
    .catch((error) => console.error(error));
  const page = await browser.newPage().catch((error) => console.error(error));

  try {
    switch (src.name) {
      case "Arret sur images":
        await page
          .goto(src.url, { waitUntil: "networkidle0", timeout: 0 })
          .catch((error) => console.error(error));
        break;
      default:
        await page
          .goto(src.url, { waitUntil: "domcontentloaded", timeout: 0 })
          .catch((error) => console.error(error));
    }

    const articles = await page.evaluate((src) => {
      let articlesPath = src.articlesPath;
      let titleCss = src.titleCss;
      let urlArticleCss = src.urlArticleCss;

      let articlesArray = [];
      let threads = Array.from(document.querySelectorAll(articlesPath));
      threads.splice(15, threads.length);

      for (let i = 0; i < threads.length; i++) {
        let url = threads[i].querySelector(urlArticleCss);
        let title = threads[i].querySelector(titleCss);
        let premium;

        let threadInfo = {
          realName: src.realName,
          realUrl: src.url,
          name: src.name,
          url: url.href,
          title: title.textContent.trim(),
          previewCss: src.previewCss,
          preview: "",
          contentCss: src.paragraphsCss,
          content: [],
        };

        switch (threadInfo.name) {
          case "Blast":
            if (!threadInfo.title.includes("- TRIBUNE")) {
              articlesArray.push(threadInfo);
            }
            break;
          case "Libération":
            if (!threadInfo.title.includes("Coco croque")) {
              articlesArray.push(threadInfo);
            }
            break;
          case "Nouvel Obs":
            premium = threads[i]
              .querySelector(src.premiumCss)
              .textContent.toLowerCase();
            if (premium.includes("chroniques") || premium.includes("edito")) {
              articlesArray.push(threadInfo);
            }
            break;
          case "Marianne":
          case "Figaro":
          case "Echos":
          case "La Tribune":
            premium = threads[i].querySelector(src.premiumCss);
            if (!premium) {
              articlesArray.push(threadInfo);
            }
            break;
          default:
            articlesArray.push(threadInfo);
        }
      }
      return articlesArray;
    }, src);
    return articles.splice(0, 3);
  } catch (error) {
    console.error(error);
  } finally {
    await browser.close().catch((error) => console.error(error));
  }
};

// ================================================================================================
// ================================================================================================
// ================================================================================================

exports.getContentFrom = async function (articles) {
  let editos = await getArticlesFrom(articles).catch((error) =>
    console.error(error)
  );

  for (let i = 0; i < editos.length; i++) {
    const browser = await puppeteer
      .launch({
        headless: true,
        defaultViewport: null,
        args: [
          "--incognito",
          "--no-sandbox",
          "--single-process",
          "--no-zygote",
          "--disable-setuid-sandbox",
        ],
      })
      .catch((error) => console.error(error));
    const page = await browser.newPage().catch((error) => console.error(error));
    let edito = editos[i];

    try {
      switch (edito.name) {
        case "Arret sur images":
          await page
            .goto(edito.url, { waitUntil: "networkidle0", timeout: 0 })
            .catch((error) => console.error(error));
          break;
        default:
          await page
            .goto(edito.url, { waitUntil: "domcontentloaded", timeout: 0 })
            .catch((error) => console.error(error));
      }

      // ARTICLE INTRO ===========================================================================
      if (edito.previewCss !== "") {
        let preview = await page
          .evaluate((edito) => {
            let intro = document.querySelector(edito.previewCss);
            if (intro) {
              intro = intro.textContent.replace(`${edito.name}`, "***").trim();
            }
            return intro;
          }, edito)
          .catch((error) => console.error(error));
        edito.preview = preview;
      }

      // ARTICLE BODY ===========================================================================
      let content = await page
        .evaluate((edito) => {
          let arrayOf_p = [];
          let paragraphs = Array.from(
            document.querySelectorAll(edito.contentCss)
          );

          for (let i = 0; i < paragraphs.length; i++) {
            let p = paragraphs[i].textContent;
            if (p !== "") {
              if (p.includes(`${edito.name.toUpperCase()}`)) {
                arrayOf_p.push(
                  p.replace(`${edito.name.toUpperCase()}`, "***").trim()
                );
              } else {
                arrayOf_p.push(p.replace(`${edito.name}`, "***").trim());
              }
            }
          }
          if (arrayOf_p.length <= 1) {
            let warning =
              'Pour lire la suite de cet article, cliquez sur "SOURCE" et laissez-vous guider.';
            arrayOf_p.push(warning);
          }
          return arrayOf_p;
        }, edito)
        .catch((error) => console.error(error));
      edito.content = content;
    } catch (error) {
      console.error(error);
    } finally {
      await axios
        .post("https://alea-jacta-presse.herokuapp.com/article", { ...edito })
        .then()
        .catch((error) => console.error(error));
      await browser.close().catch((error) => console.error(error))
    }
  }
};
