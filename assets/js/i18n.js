// Simple site internationalization (English default / Portuguese).
// Text marked with data-i18n is swapped in the browser.

const I18N_DEFAULT = "en";
const I18N_SUPPORTED = ["en", "pt"];

const I18N_DICT = {
  en: {
    "lang.toggle.title": "Switch language to Portuguese",
    "lang.code": "EN",

    "site.title": "Counting and Measuring in Roraima",

    "nav.home": "Home",
    "nav.publications": "Publications",
    "nav.presentations": "Presentations",
    "nav.contact": "Contact",
    "nav.projects": "Projects",
    "nav.blog": "Blog",
    "nav.cv": "CV",
    "nav.teaching": "Teaching",
    "nav.repositories": "Repositories",
    "nav.books": "Books",
    "nav.news": "News",

    "home.subtitle": "",
    "home.office": "555 your office number",
    "home.address": "123 your address street",
    "home.city": "Your City, State 12345",
    "home.selected_publications": "selected publications",
    "home.news": "News",
    "home.latest_posts": "latest posts",

    "publications.description": "This is an example description. You can have this here if you please. All of the below publications have been generated as a placeholder.",
    "publication.abstract_button": "Abstract",
    "publication.search_placeholder": "Type to filter",

    "page.not_found.title": "Page not found",
    "page.not_found.body": "Looks like there has been a mistake. Nothing exists here.",
    "page.not_found.redirect": "You will be redirected to the main page within 3 seconds. If not redirected, please go back to the",
    "page.not_found.home_link": "home page",

    "footer.impressum": "Impressum",
    "footer.last_updated": "Last updated",
  },
  pt: {
    "lang.toggle.title": "Mudar idioma para ingles",
    "lang.code": "PT",

    "site.title": "Contagem e Medida em Roraima",

    "nav.home": "Inicio",
    "nav.publications": "Publicacoes",
    "nav.presentations": "Apresentacoes",
    "nav.contact": "Contato",
    "nav.projects": "Projetos",
    "nav.blog": "Blog",
    "nav.cv": "CV",
    "nav.teaching": "Ensino",
    "nav.repositories": "Repositorios",
    "nav.books": "Livros",
    "nav.news": "Noticias",

    "home.subtitle": "",
    "home.office": "555 seu numero de escritorio",
    "home.address": "123 sua rua",
    "home.city": "Sua cidade, estado 12345",
    "home.selected_publications": "publicacoes selecionadas",
    "home.news": "Noticias",
    "home.latest_posts": "posts recentes",

    "publications.description": "Esta é uma descrição de exemplo. Você pode incluí-la aqui, se desejar. Todas as publicações abaixo foram geradas como espaço reservado.",
    "publication.abstract_button": "Resumo",
    "publication.search_placeholder": "Digite para filtrar",

    "page.not_found.title": "Pagina nao encontrada",
    "page.not_found.body": "Parece que houve um engano. Nao ha nada aqui.",
    "page.not_found.redirect": "Voce sera redirecionado para a pagina inicial em 3 segundos. Se nao for redirecionado, volte para a",
    "page.not_found.home_link": "pagina inicial",

    "footer.impressum": "Aviso legal",
    "footer.last_updated": "Ultima atualizacao",
  },
};

function getLang() {
  let lang = null;
  try {
    lang = localStorage.getItem("lang");
  } catch (e) {
    // Ignore storage failures and use the default language.
  }
  return I18N_SUPPORTED.includes(lang) ? lang : I18N_DEFAULT;
}

function translate(key, lang) {
  const dict = I18N_DICT[lang || getLang()] || I18N_DICT[I18N_DEFAULT];
  return Object.prototype.hasOwnProperty.call(dict, key) ? dict[key] : null;
}

function applyI18n() {
  const lang = getLang();

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const value = translate(el.getAttribute("data-i18n"), lang);
    if (value !== null) {
      el.textContent = value;
    }
  });

  document.querySelectorAll("[data-i18n-title]").forEach((el) => {
    const value = translate(el.getAttribute("data-i18n-title"), lang);
    if (value !== null) {
      el.setAttribute("title", value);
      el.setAttribute("aria-label", value);
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const value = translate(el.getAttribute("data-i18n-placeholder"), lang);
    if (value !== null) {
      el.setAttribute("placeholder", value);
    }
  });
}

function setLang(lang) {
  const nextLang = I18N_SUPPORTED.includes(lang) ? lang : I18N_DEFAULT;
  try {
    localStorage.setItem("lang", nextLang);
  } catch (e) {
    // Ignore storage failures.
  }
  document.documentElement.setAttribute("data-lang", nextLang);
  document.documentElement.setAttribute("lang", nextLang === "pt" ? "pt-BR" : "en");
  applyI18n();
}

function toggleLang() {
  setLang(getLang() === "en" ? "pt" : "en");
}

function initLang() {
  const lang = getLang();
  document.documentElement.setAttribute("data-lang", lang);
  document.documentElement.setAttribute("lang", lang === "pt" ? "pt-BR" : "en");

  document.addEventListener("DOMContentLoaded", function () {
    applyI18n();
    const toggle = document.getElementById("lang-toggle");
    if (toggle) {
      toggle.addEventListener("click", toggleLang);
    }
  });
}
