// ==UserScript==
// @name Gniddos
// @description  Useless Kernel
// @author       Tumble
// @version      0.0.1.1
// @run-at       document-start
// @require      https://github.com/SArpnt/joinFunction/raw/master/script.js
// @require      https://github.com/SArpnt/EventHandler/raw/master/script.js
// @require      https://github.com/SArpnt/cardboard/raw/master/script.user.js
// @require      file:///E:/dev/boxcritters/mods/gniddos/message.js
// @require      file:///E:/dev/boxcritters/mods/gniddos/init.js
// @require      file:///E:/dev/boxcritters/mods/gniddos/bash.js
// @require      file:///E:/dev/boxcritters/mods/gniddos/commands.js
// @match        https://boxcritters.com/play/
// @match        https://boxcritters.com/play/?*
// @match        https://boxcritters.com/play/#*
// @match        https://boxcritters.com/play/index.html
// @match        https://boxcritters.com/play/index.html?*
// @match        https://boxcritters.com/play/index.html#*
// ==/UserScript==
cardboard.register("GNIDDOS");
console.log(EventHandler);
console.log(cardboard)

cardboard.on("worldCreated",(world)=>{

	Gniddos.mnt.world = world;
	console.log(Gniddos);
})



/*
processers
filesystem
commuinications
*/