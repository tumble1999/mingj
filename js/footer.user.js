// UserScript Exports
var globals = {Bash}
for (const g in globals) {
	exportFunction(globals[g],unsafeWindow,{
		defineAs: g
	  });
}