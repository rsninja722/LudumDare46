var constants = {
    testOrganizer: {
        EXAMPLE_DELETE_ME_LATER : 1277336
    },
    ui: {
        // These are the variables that control injection/cssinjector.js
        // To add a new theme var, you must also add it to the injector
        theme: {

            // Theme variables specific to the webpage container
            webpage: {
                bg_color: "#242424",
                text_color: "#ffffff",
                canvas_border: "rgb(63, 63, 63)",
                loading_animation_color: "#ff4136"
            },

            // Theme variables specific to the game
            game: {
                
            }
        },
            
        // Heart rate monitor UI constants
        heartRate: {
                history_length: 100,

                //300 squares/min
                scroll_speed: 0.8,
                square_size: 0.08,
                pr_width: 4,
                qrs_width: 2,
                qt_width: 5,
                complex_width: 18
        }
    },
    legs:{
        size:{
            maximumMovement: 30
        }
    }

};