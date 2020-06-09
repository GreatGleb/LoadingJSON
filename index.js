let langSrc = {
	"eng": "English.json",
	"rus": "Russian.json",
	"ukr": "Ukrainian.json"
}

let lang = {
}

function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(script);

  document.head.append(script);
}

function appendAndGetJSON(key) {
	let srcAtribute = "[src=\""+langSrc[key]+"\"]";
	
	if (document.querySelector(srcAtribute) == null) {
		let url = langSrc[key];
		loadScript(url, function() {
			let indexDot = langSrc[key].indexOf('.');
			lang[key] = eval(langSrc[key].slice(0, indexDot)+"_JSON");
			if (JSON.parse(lang[key])!= undefined) {
				console.log(lang[key])
				return JSON.parse(lang[key]);					
			}
		});
	}
}

class I18n {

  get(key) {
	let langJSON;
	let srcAtribute = "[src=\""+langSrc[key]+"\"]";

	if (document.querySelector(srcAtribute) == null) {
		langJSON = appendAndGetJSON(key);
		console.log(lang);
		console.log(eval(lang.key));
		var counter = 0;

		for (var key in lang) {
		  counter++;
		}
		console.log(counter)
	} else {
		if(lang[key]==undefined) {
			let indexDot = langSrc[key].indexOf('.');
			lang[key] = eval(langSrc[key].slice(0, indexDot)+"_JSON");
		}
		langJSON = JSON.parse(lang[key]);
	}
	
	return langJSON;
  }
}

let i18nElement = new I18n();
let i18nElementGetter = i18nElement.get("ukr");
console.log(i18nElementGetter);
console.log(i18nElement.get("rus"));