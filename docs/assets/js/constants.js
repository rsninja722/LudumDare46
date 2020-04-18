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
                scroll_speed: 0.13333,
                pr_width: 0.16,
                qrs_width: 0.1,
                qt_width: 0.39,
                complex_width: 0.65
        }
    },
    player:{
        leg_speed: 0.1,
        movement_divider: 50,
        max_movement_speed: 3,
        width: 30,
        height: 50,
        select_range: 10,
        hip: {
            offset_x: 15,
            offset_y: 25
        }
    }

};