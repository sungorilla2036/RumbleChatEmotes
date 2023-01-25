// ==UserScript==
// @name         Rumble Chat Emojis
// @namespace    http://tampermonkey.net/
// @version      0.40
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
    const emotes = {
        ':LETSGOOO:': 'https://cdn.betterttv.net/emote/5f7cd139ce8bc74a94247828/2x',
        ':PepeSpit:': 'https://cdn.betterttv.net/emote/5e3f1caed736527d5cd29c13/2x',
        ':pepeSpit:': 'https://cdn.betterttv.net/emote/5e3f1caed736527d5cd29c13/2x',
        ':PepeSpitR:': 'https://media.tenor.com/images/a5fe95d1daaa9864a7c79a660539b697/tenor.gif',
        ':catJAM:': 'https://cdn.betterttv.net/emote/5f1b0186cf6d2144653d2970/2x',
        ':monkaS:': 'https://cdn.betterttv.net/emote/56e9f494fff3cc5c35e5287e/2x',
        ':monkaW:': 'https://cdn.betterttv.net/emote/59ca6551b27c823d5b1fd872/2x',
        ':monkaGIGA:': 'https://cdn.betterttv.net/emote/58c36ac73c3bbd3e016b6e60/2x',
        ':pepeLaugh:': 'https://cdn.betterttv.net/emote/5c548025009a2e73916b3a37/2x',
        ':PepeLaugh:': 'https://cdn.betterttv.net/emote/5c548025009a2e73916b3a37/2x',
        ':Clap:': 'https://cdn.betterttv.net/emote/55b6f480e66682f576dd94f5/2x',
        ':clap:': 'https://cdn.betterttv.net/emote/55b6f480e66682f576dd94f5/2x',
        ':pepeJAM:': 'https://cdn.betterttv.net/emote/5b77ac3af7bddc567b1d5fb2/2x',
        ':Gigachad:': 'https://cdn.betterttv.net/emote/60a3f13c67644f1d67e888b0/2x',
        ':CHAD:': 'https://cdn.betterttv.net/emote/60a3f13c67644f1d67e888b0/2x',
        ':halalChad:': 'https://cdn.betterttv.net/emote/605857e49acbbd671d688f58/2x',
        ':HalalChad:': 'https://cdn.betterttv.net/emote/605857e49acbbd671d688f58/2x',
        ':modCheck:': 'https://cdn.betterttv.net/emote/5d7eefb7c0652668c9e4d394/2x',
        ':PepeHands:': 'https://cdn.betterttv.net/emote/60a9e39067644f1d67e8b4a5/2x',
        ':OMEGAKEKW:': 'https://cdn.betterttv.net/emote/5d75d8eabd340415e9f32b8d/2x',
        ':FeelsStrongMan:': 'https://cdn.betterttv.net/emote/6247ca7f3c6f14b688442dda/2x',
        ':Copege:': 'https://cdn.betterttv.net/emote/6041012b306b602acc596ddc/2x',
        ':Copega:': 'https://cdn.betterttv.net/emote/6041012b306b602acc596ddc/2x',
        ':pepePoint:': 'https://cdn.betterttv.net/emote/5fedefa19d7d952e4059e68c/2x',
        ':PepePoint:': 'https://cdn.betterttv.net/emote/5fedefa19d7d952e4059e68c/2x',
        ':TrollDespair:': 'https://cdn.betterttv.net/emote/6024574d2eae5518bece2ddd/2x',
        ':SunGorilla:': 'https://cdn.betterttv.net/emote/61ff26f006fd6a9f5be389b6/2x',
        ':SUNGORILLA:': 'https://cdn.betterttv.net/emote/61ff26f006fd6a9f5be389b6/2x',
        ':sungorilla:': 'https://cdn.betterttv.net/emote/61ff26f006fd6a9f5be389b6/2x',
        ':Soyturn:': 'https://cdn.betterttv.net/emote/63c5ceb5999b53d39ed72d07/2x',
        ':Infrared:': 'https://cdn.betterttv.net/emote/6208316306fd6a9f5be453d5/2x',
        ':COGGERS:': 'https://cdn.betterttv.net/emote/61ad7b43002cdeedc21e66eb/2x',
        ':DuginRocket:': 'https://cdn.betterttv.net/emote/620852ec06fd6a9f5be4569b/2x',
        ':HazDance:': 'https://cdn.betterttv.net/emote/612c08a1af28e956864adb86/2x',
        ':YOTT:': 'https://cdn.betterttv.net/emote/61ff269b06fd6a9f5be389af/2x',
        ':Soying:': 'https://cdn.betterttv.net/emote/61adc7fc002cdeedc21e6bc9/2x',
        ':BatChesting:': 'https://cdn.betterttv.net/emote/613ec028686f1c747a85e679/2x',
        ':Nerdge:': 'https://cdn.betterttv.net/emote/615b1406b63cc97ee6d4c76c/2x',
        ':AYOOO:': 'https://cdn.betterttv.net/emote/61b199c1002cdeedc21ecbd9/2x',
        ':NOOO:': 'https://cdn.betterttv.net/emote/61354c7baf28e956864c1e70/2x',
        ':ICANT:': 'https://cdn.betterttv.net/emote/61e74edc06fd6a9f5be13c30/2x',
        ':NOTED:': 'https://cdn.betterttv.net/emote/61268edcaf28e956864a13ec/2x',
        ':UHMMM:': 'https://cdn.betterttv.net/emote/605fd4a97493072efdeb5ce3/2x',
        ':Hmm:': 'https://cdn.frankerfacez.com/emoticon/565612/2',
        ':MeatPotato:': 'https://cdn.betterttv.net/emote/61adf862002cdeedc21e6ed5/2x',
        ':BASEDCIGAR:': 'https://cdn.betterttv.net/emote/5fbe79480d141d6f06d83d24/2x',
        ':basedcigar:': 'https://cdn.betterttv.net/emote/5fbe79480d141d6f06d83d24/2x',
        ':SmokeTime:': 'https://cdn.betterttv.net/emote/5c86b32aa787200418a68742/2x',
        ':PopcornTime:': 'https://cdn.betterttv.net/emote/5ddad7a4e9fc805efbdbda61/2x',
        ':GuitarTime:': 'https://cdn.betterttv.net/emote/576befd71f520d6039622f7e/2x',
        ':TeaTime:': 'https://cdn.betterttv.net/emote/56f6eb647ee3e8fc6e4fe48e/2x',
        ':NODDERS:': 'https://cdn.betterttv.net/emote/5eadf40074046462f7687d0f/2x',
        ':NOPERS:': 'https://cdn.betterttv.net/emote/5ec39a9db289582eef76f733/2x',
        ':tankJAM:': 'https://cdn.betterttv.net/emote/5e7e2c338c0f5c3723aa1217/2x',
        ':cowJAM:': 'https://cdn.betterttv.net/emote/5f6ab4d59068f170aaed6b07/2x',
        ':Rave:': 'https://cdn.betterttv.net/emote/60bd9cc9f8b3f62601c39ed0/2x',
        ':xar2EDM:': 'https://cdn.betterttv.net/emote/5b7e01fbe429f82909e0013a/2x',
        ':alphaFemale:': 'https://cdn.betterttv.net/emote/6138f505af28e956864c9dd3/2x',
        ':Amused:': 'https://cdn.betterttv.net/emote/61e6e02e06fd6a9f5be12ffd/2x',
        ':TRUEING:': 'https://cdn.betterttv.net/emote/5f34967cb2efd65d77e7c9bc/2x',
        ':Trueing:': 'https://cdn.betterttv.net/emote/5f34967cb2efd65d77e7c9bc/2x',
        ':3Heading:': 'https://cdn.betterttv.net/emote/5f5cbe0268d9d86c020e615c/2x',
        ':YAPPP:': 'https://cdn.betterttv.net/emote/616f2655054a252a431fc5d6/2x',
        ':grimesG:': 'https://cdn.betterttv.net/emote/6159b6b4b63cc97ee6d49bcf/2x',
        ':Hazillionaire:': 'https://cdn.betterttv.net/emote/609aeea867644f1d67e84542/2x',
        ':hazMad:': 'https://cdn.betterttv.net/emote/61553432b63cc97ee6d40534/2x',
        ':hazYes:': 'https://cdn.betterttv.net/emote/603937f27c74605395f34c99/2x',
        ':WideHaz:': 'https://cdn.betterttv.net/emote/609af4e767644f1d67e84589/2x',
        ':jStalin:': 'https://cdn.betterttv.net/emote/616f2655054a252a431fc5d6/2x',
        ':vLenin:': 'https://cdn.betterttv.net/emote/60393d717c74605395f34cda/2x',
        ':XiJinping:': 'https://cdn.betterttv.net/emote/619a5240be3521e96a7f2610/2x',
        ':putinWalk:': 'https://cdn.betterttv.net/emote/5edd1989924aa35e32a73a25/2x',
        ':trumpPls:': 'https://cdn.betterttv.net/emote/5f9963a71b017902db151d16/2x',
        ':Hegelian:': 'https://cdn.betterttv.net/emote/613fc8ef686f1c747a860bf5/2x',
        ':PogTasty:': 'https://cdn.betterttv.net/emote/60e8c8b28ed8b373e4220299/2x',
        ':PepoG:': 'https://cdn.betterttv.net/emote/60590dc47493072efdeb29eb/2x',
        ':Cwalk:': 'https://cdn.betterttv.net/emote/5c8e64111c49205b7d7d6e1c/2x',
        ':Happening:': 'https://cdn.betterttv.net/emote/5f289d866f3782446602201d/2x',
        ':JoeBiden:': 'https://cdn.betterttv.net/emote/60528ea8306b602acc59ef12/2x',
        ':mizkifMarch:': 'https://cdn.betterttv.net/emote/5e1a2503bca2995f13fb3f76/2x',
        ':YallMind:': 'https://cdn.betterttv.net/emote/5a867a6d50e8f52680c6e7ae/2x',
        ':KEKL:': 'https://cdn.betterttv.net/emote/5e6a0d0a8c0f5c3723a904ef/2x',
        ':Glowie:': 'https://cdn.betterttv.net/emote/61dde99106fd6a9f5be04c9c/2x',
        ':glowTime:': 'https://cdn.frankerfacez.com/emoticon/478418/2',
        ':Aware:': 'https://cdn.betterttv.net/emote/6151c623b63cc97ee6d39040/2x',
        ':Trolled:': 'https://cdn.betterttv.net/emote/62542c0d3c6f14b68844f62a/2x',
        ':TROLLPSYCHO:': 'https://cdn.betterttv.net/emote/601291a86c75a765d463f115/2x',
        ':TROLLED:': 'https://cdn.betterttv.net/emote/601291a86c75a765d463f115/2x',
        ':TriBoom:': 'https://cdn.betterttv.net/emote/5e30ef3861ff6b51e65239b8/2x',
        ':AngelThump:': 'https://cdn.betterttv.net/emote/566ca1a365dbbdab32ec055b/2x',
        ':MONKE:': 'https://cdn.betterttv.net/emote/603be3937c74605395f35fd6/2x',
        ':peepoBlanket:': 'https://cdn.betterttv.net/emote/60e0d6d48ed8b373e421d34b/2x',
        ':KKomrade:': 'https://cdn.betterttv.net/emote/56be9fd6d9ec6bf74424760d/2x',
        ':BBoomer:': 'https://cdn.betterttv.net/emote/5c447084f13c030e98f74f58/2x',
        ':PagMan:': 'https://cdn.betterttv.net/emote/5e87b595acae25096140ca84/2x',
        ':peepoGlad:': 'https://cdn.betterttv.net/emote/5e1a0e188af14b5f1b4384c7/2x',
        ':WAYTOODANK:': 'https://cdn.betterttv.net/emote/619528c654f3344f88060652/2x',
        ':SoyPog:': 'https://cdn.betterttv.net/emote/6050a436306b602acc59df11/2x',
        ':SoyU:': 'https://cdn.frankerfacez.com/emoticon/450566/2',
        ':SoyRage:': 'https://cdn.betterttv.net/emote/60cbcaa0f8b3f62601c3f72a/2x',
        ':BANNED:': 'https://cdn.betterttv.net/emote/5e16e5a8b974112104805f23/2x',
        ':Smoge:': 'https://cdn.betterttv.net/emote/5e8c3a008fb1ca5cde58723f/2x',
        ':peepoFinger:': 'https://cdn.betterttv.net/emote/6015f50f6c75a765d4642b18/2x',
        ':ABDULpls:': 'https://cdn.betterttv.net/emote/59a4ea2865231102cde26e9c/2x',
        ':HUHH:': 'https://cdn.betterttv.net/emote/62a63cbd6ef7a5f0b7defb1f/2x',
        ':Prayge:': 'https://cdn.betterttv.net/emote/61145aca76ea4e2b9f76b228/2x',
        ':peepoPooPoo:': 'https://cdn.betterttv.net/emote/5c3427a55752683d16e409d1/2x',
        ':SALUTE:': 'https://cdn.betterttv.net/emote/5fa688932d853564472cc7f2/2x',
        ':ReallyMad:': 'https://cdn.betterttv.net/emote/637db77cb9076d0aaebccd94/2x',
        ':trollMarx:': 'https://cdn.betterttv.net/emote/61f9a20506fd6a9f5be30239/2x',
        ':100:': 'https://cdn.betterttv.net/emote/5596370e67667a2b24eb745d/2x',
        ':thistbh:': 'https://cdn.betterttv.net/emote/61faf5df06fd6a9f5be31fc9/2x',
        ':AlienPls:': 'https://cdn.betterttv.net/emote/5805580c3d506fea7ee357d6/2x',
        ':MMao:': 'https://cdn.betterttv.net/emote/6124ecd4af28e9568649d789/2x',
        ':monkaX:': 'https://cdn.betterttv.net/emote/58e5abdaf3ef4c75c9c6f0f9/2x',
        ':hyperMarx:': 'https://cdn.frankerfacez.com/emoticon/558080/2',
        ':npc:': 'https://cdn.betterttv.net/emote/5bca90e10218ea750b6fa507/2x',
        ':EZ:': 'https://cdn.betterttv.net/emote/5bca90e10218ea750b6fa507/2x',
        ':zherkaW:': 'https://cdn.betterttv.net/emote/5c6dbef0bf34b0741944f87c/2x',
        ':DonoWall:': 'https://cdn.betterttv.net/emote/5efcd82551e3910deed68751/2x',
        ':Zyzz:': 'https://cdn.betterttv.net/emote/5fa13a5f40eb9502e223aeff/2x',
        ':lebronJAM': 'https://cdn.betterttv.net/emote/60a819e767644f1d67e8a825/2x',
        ':ZZoomer:': 'https://cdn.betterttv.net/emote/5d8b41c8d2458468c1f48d6e/2',
        ':WeSmart:': 'https://cdn.betterttv.net/emote/5a311dd16405a95e4b0d4967/2x',
        ':monkaHmm:': 'https://cdn.betterttv.net/emote/5aa16eb65d4a424654d7e3e5/2x',
        ':monkaThink:': 'https://cdn.betterttv.net/emote/5e15014d0550d42106b8f550/2x',
        ':pepeDJ:': 'https://cdn.betterttv.net/emote/610250882d1eba5400d2347c/2x',
        ':peepoLove:': 'https://cdn.betterttv.net/emote/61e357b406fd6a9f5be0db9f/2',
        ':DPRKEK:': 'https://cdn.betterttv.net/emote/605a004e7493072efdeb305e/2x',
        ':peepoIran:': 'https://cdn.betterttv.net/emote/6050ef72306b602acc59e1b3/2x',
        ':peepoChina:': 'https://cdn.betterttv.net/emote/63681b619013520589f59cb9/2x',
        ':peepoRussia:': 'https://cdn.betterttv.net/emote/5f67501129c50203e013a093/2x',
        ':SicklePls:': 'https://cdn.betterttv.net/emote/56db0ea0d5d429963e27460f/2x',
        ':SadgeRain:': 'https://cdn.betterttv.net/emote/60a072de67644f1d67e86ee1/2x',
        ':WeeHypers:': 'https://cdn.betterttv.net/emote/5c443919f13c030e98f74d13/2x',
        ':fez:': 'https://cdn.betterttv.net/emote/58c30c9d2d1f490a92c85bf1/2x',
        ':fez2:': 'https://cdn.betterttv.net/emote/55d20c6e42106105434fec4b/2x',
        ':BoneZone:': 'https://cdn.betterttv.net/emote/5b6c5efadd8fb0185163bd4f/2x',
        ':VISION:': 'https://yt3.ggpht.com/FUCoZvCR6Kt03oPOpY_1NOQMOEswS5hWKDKSmoQvJal1aAhYq7LvhFDoCmSdQhiSKGsweGqD3A=w48-h48-c-k-nd',
        ':wokeGorilla:': 'https://yt3.ggpht.com/FUCoZvCR6Kt03oPOpY_1NOQMOEswS5hWKDKSmoQvJal1aAhYq7LvhFDoCmSdQhiSKGsweGqD3A=w48-h48-c-k-nd',
        ':SOLAR:': 'https://yt3.ggpht.com/eJmsmD9_wmmltD-ETwSpqcBJdm6856VhK1jL0eMVzblDr6K0HLz6tVRDLMVa40TBCA2mMx3ESg=w48-h48-c-k-nd',
        ':HazWut:': 'https://yt3.ggpht.com/xxUTdiUmawMq5gKK1SPvfRYzul5LJXYLh2Vm9Zx0BAfXS4HZEdRxPCnZtyZb55XwXQFOlYtjyQ=w48-h48-c-k-nd',
        ':GORILLASUN:': 'https://yt3.ggpht.com/XBXToDY1yY8wleHYs7B0F1YpffkG7Tp-fsVt9HMw52DmqhRzqYPqcFDtiR9X4BRJjxAbAwHZyQ=w48-h48-c-k-nd',
        ':SAMIREBEL:': 'https://yt3.ggpht.com/kCJXsN8Jb7xv9JGMl7q2CCTkAT0jUEdQHSgm9xJXAOG-0c0rAQ6JXBGug219LPYggQlwR7kT=w48-h48-c-k-nd',
        ':UNRUHE:': 'https://yt3.ggpht.com/kCJXsN8Jb7xv9JGMl7q2CCTkAT0jUEdQHSgm9xJXAOG-0c0rAQ6JXBGug219LPYggQlwR7kT=w48-h48-c-k-nd',
        ':5Head:': 'https://yt3.ggpht.com/NQMRhrsKBk5NJS8dq4izJSAB6vHcxbFE25r5mgCLPD7zHfqX92mCMZifqxWGqQ3mdxEYzaBE=w48-h48-c-k-nd',
        ':CRUEL:': 'https://yt3.ggpht.com/9ziio1cqsfmlRlOEYenquFoZD9V3LdnIZdlISawv-QXp2-hHojuOxJLu1SUFQCPLbJOSsd8ipA=w48-h48-c-k-nd',
        ':KRABS:': 'https://yt3.ggpht.com/cMJMmRlO_i48Nwjj8ch2vndV1JFnSeUy6Lh1Oz3Fe_bY-l6FZierVu61VOISP70UIPYtglmHGg=w48-h48-c-k-nd',
        ':TANKIE:': 'https://yt3.ggpht.com/Y6W4-udZiWeDnxof2c-u5PA81UEkZ2jJrh9lP1rzpIy5BHwUMx7uhog5ymkKbWRbteWPHg83DA=w48-h48-c-k-nd',
        ':MECHATANKE:': 'https://yt3.ggpht.com/gcrXpfUUpJpMzysol81-gzigC9GPrmg-UtL3QI0UK14NdmULNRUufi1I1Ed9y9A7FDO52OKk=w48-h48-c-k-nd',
        ':BASED:': 'https://yt3.ggpht.com/r31zlBfTICIsN3nc98PFTdaKBRDJEmEisMtaFkHMeGzGLnqlEx6BZJIo62wKky6ma2CVwLOIMg=w48-h48-c-k-nd',
        ':Based:': 'https://yt3.ggpht.com/r31zlBfTICIsN3nc98PFTdaKBRDJEmEisMtaFkHMeGzGLnqlEx6BZJIo62wKky6ma2CVwLOIMg=w48-h48-c-k-nd',
        ':based:': 'https://yt3.ggpht.com/r31zlBfTICIsN3nc98PFTdaKBRDJEmEisMtaFkHMeGzGLnqlEx6BZJIo62wKky6ma2CVwLOIMg=w48-h48-c-k-nd',
        ':KEKW:': 'https://yt3.ggpht.com/0FLRqpIWPYql08oDl3pYSE_JytvVdSnB8MI4saumn1JeaUa6Boz_9Bvx70QIP3009caHGfHBJA=w48-h48-c-k-nd',
        ':Pog:': 'https://yt3.ggpht.com/gKBwdnyylvKn1dD9o0lRhQXjx1pYAPftzCQPnPyTluDjwdhmr1LEk1VHTj-dTWOwqko2i-ntWw=w48-h48-c-k-nd',
        ':pog:': 'https://yt3.ggpht.com/gKBwdnyylvKn1dD9o0lRhQXjx1pYAPftzCQPnPyTluDjwdhmr1LEk1VHTj-dTWOwqko2i-ntWw=w48-h48-c-k-nd',
        ':CPUSA2036:': 'https://yt3.ggpht.com/NCNJ0AOXxUeIOZ3PZnzjdeaGkWMSnWUadrD-8rQUco3IaCA9DLpBeKBPYMCTu6ALk7U7HTHSNQ=w48-h48-c-k-nd',
        ':KEKWait:': 'https://yt3.ggpht.com/jypN1BGMUnlGKAFLSpcsiMIRvw3Mb3JnQ-ca8erL8abx0FMAlUKd6F5_eQPGBvwdmoUKuvmPccw=w48-h48-c-k-nd',
        ':ANGLOBOX:': 'https://yt3.ggpht.com/RGrzWPEzJCyz94yBb_wTb1U3NKKolGDc3R57YzMwAYvTmQBJTQpnzyWkbZadxHoBPElKqIMRsQ=w48-h48-c-k-nd',
        ':angloBox:': 'https://yt3.ggpht.com/RGrzWPEzJCyz94yBb_wTb1U3NKKolGDc3R57YzMwAYvTmQBJTQpnzyWkbZadxHoBPElKqIMRsQ=w48-h48-c-k-nd',
        ':GLOW:': 'https://yt3.ggpht.com/WGbCBHgmRfmUn7MQikZf_6f2r-WQbKmZ4ZL7bbWAiHjp4AILq5S3C9KKc9D-i18xLqKcs8eHbQ=w48-h48-c-k-nd',
        ':BAN:': 'https://yt3.ggpht.com/yyafi5vqtBuozyI7pU0dHAtb23PnBo8yPb9USgsR_sxr4Yz1E8txzo7JainhONSuA_9pz59DbA=w48-h48-c-k-nd',
        ':INFRATROOP:': 'https://yt3.ggpht.com/8o-EThpx1NHmV4tgLFb-cOOaEXWLBd_BYe7FY0Idr4SxB-a0SPzsVbNl3k9O7LrewmaR5fhy5Ns=w48-h48-c-k-nd',
        ':Soynerd:': 'https://yt3.ggpht.com/u3JGpmizwBSvnZf3GSEfDXsPE-WQAsRUSNBtfc9ht-ynFiiDZHU52g_mRgxhbWE6LfGFZ6WG=w48-h48-c-k-nd',
        ':ANTINATO:': 'https://yt3.ggpht.com/Dq5CQ4wyp3WUy_W4m5WotVG_Grrkrh3xvPoBu5_BQT-Q5X9j9-wsqcoHJbL-g6IZxbwCrMyfRQ=w48-h48-c-k-nd',
        ':RedPeter:': 'https://yt3.ggpht.com/I_f_vv2X5V6S13mexYEd0mozVhpogkKT44b5xu7aLJ5bCxW1UfU6zmTDJiSbYEb-WIh1xvIZKw=w48-h48-c-k-nd',
        ':MECHAape:': 'https://yt3.ggpht.com/XRzvRxysTzoqgp87rw9xQDB1l30NGFFe-XEP_AxZvgUSayisYf3FY-tHkYS9Bw4JjuDpyFAcrfw=w48-h48-c-k-nd',
        ':SOLARMECHA:': 'https://yt3.ggpht.com/XZ53hqpl48RUgQpIjBLpgfUwfgZV0NmwxmMZL2InfU99ihKBRp5Z3-7xOJDIGUhxK_7R2F8sNNI=w48-h48-c-k-nd',
        ':SKYNET2036:': 'https://yt3.ggpht.com/jBKL9Ht3S3yq_E7IjYMcywhT8IOhFRIr7xkqzM2-BK4_Lv7MQUtNoiOFVPAd4EWKdpy_SkxrfA=w48-h48-c-k-nd',
        ':WOKEFUTURE:': 'https://yt3.ggpht.com/jYYvRycThqoXlD9mcopUtHQh8TkUP4ZavdkM0MtPb9J065DwTAh9SeJVLo_XO8ItMF9Cni9W=w48-h48-c-k-nd',
        ':Sadge:': 'https://yt3.ggpht.com/jTUFpfVfjnfTMvCteNf4v2e1_V730fD14fGtgz4c5rU4Yw-VeDRQOw6vIULWMNxalvGXj1NKdA=w48-h48-c-k-nd',
        ':DuginBASED:': 'https://yt3.ggpht.com/CT_QFIvY2WfvOIJvLqYoVTDx4tpchXWo5-KiLhPlPqn7HoFknoPBY86NNxq8i44MH2JPvw5m4JQ=w48-h48-c-k-nd',
        ':DUGINBASED:': 'https://yt3.ggpht.com/CT_QFIvY2WfvOIJvLqYoVTDx4tpchXWo5-KiLhPlPqn7HoFknoPBY86NNxq8i44MH2JPvw5m4JQ=w48-h48-c-k-nd',
        ':baste:': 'https://yt3.ggpht.com/CT_QFIvY2WfvOIJvLqYoVTDx4tpchXWo5-KiLhPlPqn7HoFknoPBY86NNxq8i44MH2JPvw5m4JQ=w48-h48-c-k-nd',
        ':Trumptroll:': 'https://yt3.ggpht.com/_i4fCE7YFcGtqol_g8-BMnSNs88zBItMtlTtc7w71raYIhKTM3pojR5I28PMpxdEHqHbx3e7=w48-h48-c-k-nd',
        ':REDMAGA:': 'https://yt3.ggpht.com/E1mnDKYecgFOe6YRuMOfPotVBTERr8TyoakfvxGV1bSlIMy6uAW3COb9skLTghDsPF_WUFFejZw=w48-h48-c-k-nd',
        ':Hypers:': 'https://yt3.ggpht.com/pgKgFAqVDCvcTT2Ct7h8mhuOg85YoE7ow3SoUbUdfKmcAjyh7twJ4szyIcueAN77utYAsGcmPkE=w48-h48-c-k-nd',
        ':Copium:': 'https://yt3.ggpht.com/ouy329oZaKHOX3I_LVs4BNDuRDiaQzptnQO7oqrgPcAtkUu9pIza8PfIFXfmcpCw06GLhLHDuw=w48-h48-c-k-nd',
        ':COPIUM:': 'https://yt3.ggpht.com/ouy329oZaKHOX3I_LVs4BNDuRDiaQzptnQO7oqrgPcAtkUu9pIza8PfIFXfmcpCw06GLhLHDuw=w48-h48-c-k-nd',
        ':infrar8Haz:': 'https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_81b49fb844bd4138920b88eb16f72873/static/light/2.0',
        ':HazInfra:': 'https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_81b49fb844bd4138920b88eb16f72873/static/light/2.0',
        ':infrar8Hazmad:': 'https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_eaec8890b177451cb3f88312c3671746/static/light/2.0',
        ':infrar8Hazwut:': 'https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_6dd7699f2033443d896b043bdfabbb9e/static/light/2.0',
        ':infrar8Ready:': 'https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_7d21d757470b499ca647480acd236d14/static/light/2.0',
        ':HazReady:': 'https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_7d21d757470b499ca647480acd236d14/static/light/2.0',
        ':infrar8SUNGORILLA:': 'https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_da62ed97f24b4dfea2fd4b69117b3000/static/light/2.0',
        ':infrar8TANKIE:': 'https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_c83e1f09869e4152b86100b4ded2345c/static/light/2.0'
    };

    const specialEmotes = {
        '😆': 'https://yt3.ggpht.com/0FLRqpIWPYql08oDl3pYSE_JytvVdSnB8MI4saumn1JeaUa6Boz_9Bvx70QIP3009caHGfHBJA=w48-h48-c-k-nd',
        '⚾️': 'https://yt3.ggpht.com/CT_QFIvY2WfvOIJvLqYoVTDx4tpchXWo5-KiLhPlPqn7HoFknoPBY86NNxq8i44MH2JPvw5m4JQ=w48-h48-c-k-nd',
        '😔': 'https://yt3.ggpht.com/jTUFpfVfjnfTMvCteNf4v2e1_V730fD14fGtgz4c5rU4Yw-VeDRQOw6vIULWMNxalvGXj1NKdA=w48-h48-c-k-nd',
        KEKW: 'https://yt3.ggpht.com/0FLRqpIWPYql08oDl3pYSE_JytvVdSnB8MI4saumn1JeaUa6Boz_9Bvx70QIP3009caHGfHBJA=w48-h48-c-k-nd'
    };

    // Preload images
    for (const url of Object.values(emotes)) new Image().src = url;
    for (const url of Object.values(specialEmotes)) new Image().src = url;

    const observer = new MutationObserver(mutationList => {
        for (const mutation of mutationList) {
            for (const node of mutation.addedNodes) {
                let messageElem = node.querySelector('.chat-history--message');

                messageElem ||= node.querySelector('.chat-history--rant-text');

                if (!messageElem) continue;

                messageElem.innerHTML = messageElem.innerHTML.replaceAll(/:\w+:/g, key => {
                    if (key in emotes) {
                        return `<img src="${emotes[key]}" style="width: 24px; height: 24px;"  title="${key}">`;
                    } else {
                        return key;
                    }
                });
            }
        }
    });

    observer.observe(document.querySelector('#chat-history-list'), { childList: true });
})();
