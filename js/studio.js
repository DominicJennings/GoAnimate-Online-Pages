const previewer = $("#previewer");
const studio = $("#obj");
const body = $("body");

/*
studio functions
*/
var tutorialReload = new URLSearchParams(window.location.search).get("tutorial");
interactiveTutorial = {
  neverDisplay: function neverDisplay() {
    return tutorialReload ? false : true;
	}
};
function studioLoaded(arg) {
  console.log(arg);
}
function quitStudio() {
  window.location.href = "/";
}
window.onload = function() {
    window.addEventListener("beforeunload", function (e) {
        if (!amIDirty) {
            return undefined;
        }
        
        var confirmationMessage = 'It looks like you have been editing something. '
                                + 'If you leave before saving, your changes will be lost.';

        (e || window.event).returnValue = confirmationMessage;
        return confirmationMessage;
    });
};

/*
show and hide widgets
 */
let importerVisible = false;
function showImporter() {
	switch(importerVisible) {
		case true: {
			hideImporter();
			break;
		}
		case false:
		default: {
			importerVisible = true;
			importer.show();
			if (!importer.data("importer"))
				importer.data("importer", new AssetImporter(importer));
		}
	}
	return true;
}
function hideImporter() {
	importerVisible = false;
	importer.hide();
}
function initPreviewPlayer(dataXmlStr, startFrame, containsChapter, themeList) {
	movieDataXmlStr = dataXmlStr;
	filmXmlStr = dataXmlStr.split("<filmxml>")[1].split("</filmxml>")[0];
	hideImporter(); // hide importer before previewing
	// update flashvars
	const flashvars = new URLSearchParams({
		apiserver: "/",
		isEmbed: 1,
		tlang: "en_US",
		isInitFromExternal: 1,
		startFrame: startFrame,
		autostart: 1,
		isPreview: 1,
		storePath: STORE_URL + "/<store>",
		clientThemePath: CLIENT_URL + "/<client_theme>",
	}).toString();
	previewer.find("object param[name='flashvars']").attr("value", flashvars);
	previewer.css("display", "block");
	studio.css("height", "1px");
	body.css("background-color", "#262d3f");
}
function retrievePreviewPlayerData() { return movieDataXmlStr }
function hidePreviewer() {
	previewer.css("display", "none");
	studio.css("height", "");
	body.css("background-color", "");
}
