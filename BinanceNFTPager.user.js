// ==UserScript==
// @name             Binance NFT ID Pager
// @namespace        https://github.com/tonytkachenko/
// @version          1.0
// @date             2022-05-30
// @description      Adds product id switcher on the pages of the marketplace and mystery boxes.
// @description:ru   Добавляет переключение товаров на страницах маркетплейса и мистерибоксов.
// @author           Tony Tkachenko
// @match            https://www.binance.com/ru/nft/goods/blindBox/detail?*
// @match            https://www.binance.com/ru/nft/goods/detail?*
// @icon             https://www.google.com/s2/favicons?sz=64&domain=binance.com
// @updateURL        https://raw.githubusercontent.com/tonytkachenko/userscripts/main/BinanceNFTPager.meta.js
// @downloadURL      https://raw.githubusercontent.com/tonytkachenko/userscripts/main/BinanceNFTPager.user.js
// @supportURL       https://github.com/tonytkachenko/userscripts/issues
// @source           https://github.com/tonytkachenko/userscripts/main/BinanceNFTPager.user.js
// @grant            none
// ==/UserScript==


(() => {
  "use strict";

  const buttons = [
    { text: "+1 ID", value: 1 },
    { text: "+10 ID", value: 10 },
    { text: "+100 ID", value: 100 },
    { text: "+500 ID", value: 500 },
    { text: "+1000 ID", value: 1000 },
  ];

  const buttonClick = (event) => {
    event.stopPropagation();

    let url = new URL(window.location.href);
    let params = url.searchParams;

    var productId = Number(params.get("productId"));
    productId += Number(event.currentTarget.value);
    params.set("productId", productId);

    url.search = params.toString();

    location.href = url.href;
  };

  const initStyles = () => {
    const styleElement = document.createElement("style");
    styleElement.innerText = `#buttons-container {
         position:fixed;
         left:2px;
         top:1px;
         height: calc(${buttons.length}*28px);
         justify-content: space-between;
         z-index:1000;
         display: flex;
         flex-direction: column;
      }
      #buttons-container > button {
         background-image: linear-gradient(rgb(248, 209, 47) 0%, rgb(240, 185, 11) 100%);
         color: rgb(33, 40, 51);
         font-family: inherit;
         font-weight: 500;
         border-radius: 4px;
         padding: 4px 8px;
         border: none;
         margin: 0px;
         width: 100%;
         height: 25px;
         min-width: 100px;
         user-select: none;
         cursor: pointer;
      }`;

    document.getElementsByTagName("head")[0].appendChild(styleElement);
  };

  const initButtons = () => {
    const container = document.createElement("div");
    container.id = "buttons-container";

    buttons.forEach((element) => {
      let button = document.createElement("button");
      button.innerText = element.text;
      button.value = element.value;
      button.addEventListener("click", buttonClick);
      container.appendChild(button);
    });

    document.body.prepend(container);
  };

  (() => {
    initStyles();
    initButtons();
  })();
})();
