// ==UserScript==
// @name Critter Bash
// @description  Useless Kernel
// @author       Tumble
// @version      0.0.1.1
// @run-at       document-start
// @require      https://github.com/SArpnt/joinFunction/raw/master/script.js
// @require      https://github.com/SArpnt/EventHandler/raw/master/script.js
// @require      https://github.com/SArpnt/cardboard/raw/master/script.user.js
// @require      file:///E:/dev/boxcritters/mods/critter-bash/webapi.js
// @require      file:///E:/dev/boxcritters/mods/critter-bash/message.js
// @require      file:///E:/dev/boxcritters/mods/critter-bash/bash.js
// @require      file:///E:/dev/boxcritters/mods/critter-bash/commands.js
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
	document.getElementById("message").maxLength = 1000
	console.log(Gniddos);
})