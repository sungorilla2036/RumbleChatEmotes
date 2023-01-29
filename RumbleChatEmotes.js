// ==UserScript==
// @name         Rumble Chat Emojis
// @namespace    http://tampermonkey.net/
// @version      0.45
// @description  Replace keywords with emojis
// @author       Infrared Labs
// @match        https://rumble.com/*
// @icon         https://rumble.com/i/favicon-v4.png
// @license MIT
// ==/UserScript==

(function() {
    'use strict';

    /**
     * You can add or remove string-to-emote mappings here
     **/
    let emotes = {};
    fetch('https://raw.githubusercontent.com/sungorilla2036/RumbleChatEmotes/master/emotes.json').then(res => res.json()).then(json => {
        emotes = json;
        // Preload images
        for (const url of Object.values(emotes)) new Image().src = url;
    });

    const observer = new MutationObserver(mutationList => {
        for (const mutation of mutationList) {
            for (const node of mutation.addedNodes) {
                let messageElem = node.querySelector('.chat-history--message');

                messageElem ||= node.querySelector('.chat-history--rant-text');

                if (!messageElem) continue;

                messageElem.innerHTML = messageElem.innerHTML.replaceAll(/:\w+:/g, key => {
                    const keyLowerCased = key.toLowerCase();
                    if (keyLowerCased in emotes) {
                        return `<img src="${emotes[keyLowerCased]}" style="width: 24px; height: 24px;"  title="${keyLowerCased}">`;
                    } else {
                        return key;
                    }
                });
            }
        }
    });

    observer.observe(document.querySelector('#chat-history-list'), { childList: true });
})();
