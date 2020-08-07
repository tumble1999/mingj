// ==UserScript==
// @name MinGJ
// @description  Useless Kernel
// @author       Tumble
// @version      0.0.1.1
// @run-at       document-start
// @match      *://*/*
// ==/UserScript==
var MinGJ={bin:{},home:{},mnt:{},etc:{},dev:{}};function GDGetObj(n,o){n=n.split("/").filter(n=>""!=n);var t=[],e=o||MinGJ;for(var i of n)"."!=i&&(".."!=i?(t.push(e),e=e[i]):i=t.pop());return e}function GDgetPrompt(){return`${MinGJ.etc.username}@${location.hostname}:${MinGJ.etc.cd}$`}function GDWhereis(n){var o=[];for(const t of MinGJ.etc.path){GDGetObj(t)[n]&&o.push(t+"/"+n)}return o}function GDjoinPath(n=".",o="."){var t="/"==n[0]||"/"==o[0]?"/":"",e=[],i=n.split("/").filter(n=>""!=n),c=o.split("/").filter(n=>""!=n);function r(n){".."==n&&e.pop(),".."!=n&&"."!=n&&e.push(n)}if("/"!=o[0])for(const n of i)r(n);for(const n of c)r(n);return t+e.join("/")}function GDcreateLogContext(n,o){var t=console.log;console.log=function(...o){t(n+":",...o)},o(),console.log=t}function GDgetAbsolutePath(n){return"/"!=!n[0]&&(n=GDjoinPath(MinGJ.etc.cd,n)),n}function GDPathExist(n){n=n.split("/").filter(n=>""!=n);var o=MinGJ;for(const t of n){if(void 0===o[t])return!1;o=o[t]}return!0}function Bash(n){console.log(GDgetPrompt(),n);var o=n.split(" "),t=GDWhereis(o[0]);t.length>0?GDcreateLogContext(o[0],(function(){GDGetObj(t[0])(o)})):console.log("bash: "+o[0]+": command not found")}function MGJLogin(n){MinGJ.etc.username=n,MinGJ.home[n]={},console.log(`\n${location.hostname} login: ${n}`)}MinGJ.etc.path=["/bin"],MinGJ.etc.cd="/",MinGJ.etc.username="js",window.Bash=Bash,MinGJ.bin.whereis=function(n){var o=GDWhereis(n[1]).map(o=>n[1]+":"+o);console.log(o.join("\n"))},MinGJ.bin.bash=function(n){n.length>1&&console.log("JS Bash alpha 1.0")};
MinGJ.bin.echo=function(n){n.shift(),console.log(n.join(" "))},MinGJ.bin.dir=function(n){var t=n.length>1?n[n.length-1]:".";t=GDgetAbsolutePath(t),GDPathExist(t)||console.log(t,"does not exist");var i=GDGetObj(t);console.log(Object.keys(i).join(" "))},MinGJ.bin.cd=function(n){var t=n.length>1?n[n.length-1]:".";t=GDgetAbsolutePath(t),MinGJ.etc.cd=t},MinGJ.bin.help=function(n){MinGJ.etc.path.forEach(n=>MinGJ.bin.dir(["dir",n]))},MinGJ.bin.mount=function(n){if(n.length<3)console.log("Usage: mount DEVICE PLACE");else{var t=GDgetAbsolutePath(n[1]),i=GDgetAbsolutePath(n[2]),e=GDjoinPath(i,".."),o=i.split("/").pop();GDGetObj(e)[o]=GDGetObj(t)}},MinGJ.bin.debug=function(){console.info(MinGJ)},MinGJ.bin.exit=function(){cheerio()},MinGJ.bin.wget=function(n){var t=n[1],i=GDGetObj(GDgetAbsolutePath(".")),e=t.split("/");i[e[e.length-1]]=WEBAPIhttpGet(t)};
function WEBAPIhttpGet(e){var t=new XMLHttpRequest;return t.open("GET",e,!1),t.send(null),t.responseText}
//# sourceMappingURL=min-gj.min.js.map

// UserScript Exports
var globals = {Bash}
for (const g in globals) {
	exportFunction(globals[g],unsafeWindow,{
		defineAs: g
	  });
}