var downloadlist = document.getElementById("downloads");
var commitlist = document.getElementById("commits");
var userRepo = "tumble1999/mingj";


var createRow = (name,parent=downloadlist) => {
	var row = document.createElement("tr");
	var cell = document.createElement("td");
	cell.textContent = name;
	row.appendChild(cell);
	parent.appendChild(row);
	return (name,href)=>{
		var cell = document.createElement("td");
		if(href){
			var link = document.createElement("a");
			link.href = href;
			link.download = name;
			link.textContent = name;
			cell.appendChild(link);
		} else {
			cell.classList.add("color-grey");
		}
		row.appendChild(cell)
	};
}
var server = "api.github.com";
//var server = "githubapicache.apphb.com";

var headers = new Headers({
});


fetch("https://" + server + "/repos/" + userRepo + "/releases",{method:'GET',
headers: headers,
}).then(response => response.json())
.then(info=> {
	info.forEach(release=>{
		var assets = new Array(3);
		for (const asset of release.assets) {
			if(asset.name.includes(".min.js"))  {
				if(asset.name.includes(".min.js.map")) {
					//source map
					assets[1] = {name:asset.name,href:asset.browser_download_url}
				} else {
					// script file
					assets[0] = {name:asset.name,href:asset.browser_download_url}
				}
			}
			if(asset.name.includes(".user.js")){
				//user script
					assets[2] = {name:asset.name,href:asset.browser_download_url}
			}
		}

		var addToRow = createRow(release.name);
		assets.forEach(asset=>{
			addToRow(asset.name,asset.href);
		});
	})
})

//https://github.com/USER/REPO/archive/COMITID.zip
fetch("https://" + server + "/repos/" + userRepo + "/commits?per_page=999999999",{method:'GET',
headers: headers,
}).then(response => response.json())
.then(info=> {
	info.forEach(commit=>{
		fetch(commit.url).then(response => response.json())
		.then(commitInfo=>{
			console.log(commitInfo)
			var defaultAsset = {name:"None",href:undefined};
			var assets = [defaultAsset,defaultAsset,defaultAsset,defaultAsset]
			for (const file of commitInfo.files) {
				if(file.filename.includes(".min.js"))  {
					if(file.filename.includes(".min.js.map")) {
						//source map
						assets[1] = {name:file.filename,href:file.raw_url}
					} else {
						// script file
						assets[0] = {name:file.filename,href:file.raw_url}
					}
				}
				if(file.filename.includes(".user.js")){
					if(file.filename == "footer.user.js"||file.filename == "header.user.js")return;
					//user script
					assets[2] = {name:file.filename,href:file.raw_url}
				}
			}
			if(assets.filter(i=>i!==defaultAsset).length ==0) return;
			var commitName = commitInfo.sha.substring(0,7);
			assets[3] = {name:"MinGJ_" + commitName + ".zip",href:"https://github.com/" + userRepo + "/archive/" + commitInfo.sha + ".zip"}
		
			var addToRow = createRow(commitName,commitlist);
			assets.forEach(asset=>{
				var name = asset.name.split("/");
				name = name[name.length-1];
				addToRow(name,asset.href);
			});
		})
	})
})