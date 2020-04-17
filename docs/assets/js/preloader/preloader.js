let preloaderCount = 0;

/**
 * A fullscreen loading animation utility
 */
class Preloader {

    constructor() {

        // Add a preloader element to the page
        document.body.innerHTML += `<div id="preloader${preloaderCount}" class="preloader hidden"><div class="spinner-border text-danger" role="status"></div></div>`;
        preloaderCount += 1;

        // Get the element context for controlling
        this.element = document.getElementById(`preloader${preloaderCount - 1}`);

        console.log(`[Preloader] Created preloader ${preloaderCount - 1}`);

    }

    /**
     * Show the preloader
     * 
     * @param {Boolean} now Show without a fade-in
     */
    show(now) {

        // Wipe the modifier classes
        this.element.classList.remove("hidden");
        this.element.classList.remove("appear");
        this.element.classList.remove("disappear");

        // If we don't need the loader right now, give it a fadein property
        if (!now) {
            this.element.classList.add("appear");
        }

        console.log("[Preloader] Showing preloader");
    }

    /**
     * Hide the preloader
     * 
     * @param {Boolean} now Hide without a fade-out
     */
    hide(now) {

        // Wipe the modifier classes
        this.element.classList.remove("appear");

        // Make the animation fade out
        this.element.classList.add("disappear");

        // If we are hiding now, just hide, otherwise time the hide
        if (now) {
            this.element.classList.add("hidden");
        } else {
            setTimeout(() => {
                this.element.classList.add("hidden");
            }, 1000);
        }

        console.log("[Preloader] Hiding preloader");
    }
}