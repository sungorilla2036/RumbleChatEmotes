// ==UserScript==
// @name         Rumble Chat Emojis
// @namespace    http://tampermonkey.net/
// @version      0.46
// @description  Replace keywords with emojis
// @author       Infrared Labs
// @match        https://rumble.com/*
// @icon         https://rumble.com/i/favicon-v4.png
// @license MIT
// ==/UserScript==

(function () {
  'use strict';

  GM_addStyle(`
    .BetterRumble-emoteMenu {
      background: #fff;
      border-radius: 0.6rem;
      margin-bottom: 1rem;
      padding: 0.75rem;
      user-select: none;
    }

    .BetterRumble-emoteMenu div {
      height: 200px;
      overflow: scroll;
      overscroll-behavior: contain;
    }

    .BetterRumble-emoteMenu summary { cursor: pointer; }
    .BetterRumble-emoteMenu img { cursor: pointer; padding: 4px; }
    .BetterRumble-emoteMenu img:hover { background: #d6e0ea; }
  `);

  let emotes = {};

  const emoteImage = (key) =>
    `<img src="${emotes[key]}" style="height: 24px; width: 24px;" title="${key}">`;

  //
  // Load emote data
  //

  fetch('https://raw.githubusercontent.com/sungorilla2036/RumbleChatEmotes/master/emotes.json')
    .then((res) => res.json())
    .then((json) => {
      emotes = json;

      // Add emote menu
      document.querySelector('#chat-rant-form').insertAdjacentHTML(
        'afterend',
        `
         <details class="BetterRumble-emoteMenu">
           <summary>Emotes</summary>
           <div>${Object.keys(emotes).map(emoteImage).join('')}</div>
         </details>
         `
      );

      document.querySelector('.BetterRumble-emoteMenu').addEventListener('click', (ev) => {
        if (!ev.target.matches('img')) return;
        document.querySelector('.chat--input').value += ev.target.title;
      });
    });

  //
  // Handle new messages
  //

  new MutationObserver((mutationList) => {
    for (const mutation of mutationList) {
      for (const node of mutation.addedNodes) {
        let messageElem = node.querySelector('.chat-history--message');
        messageElem ||= node.querySelector('.chat-history--rant-text');

        let userElem = node.querySelector('.chat-history--username a');
        userElem ||= node.querySelector('.chat-history--rant-username');

        if (!messageElem) continue;

        // Set data attribute so message can be filtered using CSS
        messageElem.dataset.betterRumbleUsername = userElem.textContent;

        // Replace :emote: strings with images
        messageElem.innerHTML = messageElem.innerHTML.replaceAll(/:\w+:/g, (key) => {
          const keyLowerCased = key.toLowerCase();

          if (keyLowerCased in emotes) {
            return emoteImage(keyLowerCased);
          } else {
            return key;
          }
        });
      }
    }
  }).observe(document.querySelector('#chat-history-list'), { childList: true });
})();
