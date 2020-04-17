
// Document root theme
let _rootCSS = document.body.style;

/**
 * Inject all KVPs from a dictionary into the document 
 * as CSS variables with a defined prefix
 * 
 * @param {string} prefix 
 * @param {*} source_dict 
 */
function injectMultiCSS(prefix, source_dict) {

    console.log(`[CSSInjector] Injecting css for: ${prefix}`);

    // Iter through every variable, and add it to the site CSS
    Object.keys(source_dict).forEach((k) => {

        let varname = `--${prefix}-${k}`;
        
        _rootCSS += `${varname}:${source_dict[k]};`
        
    });

}

/* Mappings from constants file to CSS */
// If you are adding theme variables to constants.js, 
// make sure to also define them here
injectMultiCSS("theme-webpage", constants.ui.theme.webpage);
injectMultiCSS("theme-game", constants.ui.theme.game);