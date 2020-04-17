

/**
 * Inject all KVPs from a dictionary into the document 
 * as CSS variables with a defined prefix
 * 
 * @param {string} prefix 
 * @param {*} source_dict 
 */
function injectMultiCSS(prefix, source_dict) {

}

/* Mappings from constants file to CSS */
// If you are adding theme variables to constants.js, 
// make sure to also define them here
injectMultiCSS("theme-webpage", constants.ui.theme.webpage);
injectMultiCSS("theme-game", constants.ui.theme.game);