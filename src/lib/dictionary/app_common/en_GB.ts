export const en_US = {
    common: {
        autoTranslate: 'Auto ',
        companyName: "Hog Ademy",
        close: "Close",
        back: "Back",
        end: "End",
        begin: "Begin",
        save: "save",
    },
    components: {
        app: {
            error: 'Something went wrong',
            empty: 'No supported language',
            loading: 'Fetching supported languages...'
        },
        header: {
            title: "ChatChad",
            diskord: "Discord",
            github: "Github"
        },
        footer: {
            flaticons: "FlatIcons",
            libretranslate: "LibreTranslate",
            github: "GitHub",
            models: "Models"
        },
        message:{
            tryAgain: 'Try again',   
        },
        confidence: {
            error: 'Something went wrong while auto detecting the language'
        }

    },
    screens: {
        translator: {
            sourceInputPlaceholder: 'Type text here...'
        }
    },
    start_page: {
        button_about: "About project",
        button_sign_in: "Sign in",
        button_sign_up: "Sign up",
        welcome_text_1: "Hi there!",
        welcome_text_2: "Our AI-powered platform drives  innovation with tools that boost developer velocity.",
        welcome_text_3: "GitHub Codespaces offers a complete dev environment in seconds, so you can code, build, test, and open pull requests from any repo anywhere."
    },

    login_form: {
        succes_login: "Welcome!",
        header: "Sign in",
        username: "Username",
        password: "Password",
        button_sign_in: "Log in",
        button_scan: "Log in with Face ID",
        warn_wrong_username: "Wrong username",
        warn_wrong_pass: "Wrong password"
    },
    registration_form: {
        succes_register_1: "User ",
        succes_register_2: " successfully registered!",
        header: "Sign up",
        username: "Username",
        password: "Password",
        confirm_password: "Confirm Password",
        button_register: "Register",
        warn_pass_not_match: "Password does not match",
        warn_username_taken: "Username is already taken",
        warn_pass_empty: "Enter password",
        warn_username_empty: "Enter username",

    },
    dashboard_header: {
        analysis: "Ion analysis",
        database: "Databsae",
        ph: "pH analysis",
        face_recognition: "Face recognition",
        others:"Other",
        user_id: "Username ",
        dropdown_profile: "Your profile",
        dropdown_faceid: "Your Face ID",
        dropdown_ion: "Your ion analysis",
        dropdown_ph: "Your pH analysis",
        dropdown_help: "Help",
        dropdown_Settings: "Settings",
        dropdown_signout: "Sign out",
    },
    analysis: {
        new_analysis: "New analysis",
        continue_analysis: "Continue previous",
        cation_analysis: "Cation analysis",
        anion_analysis: "Anion analysis",
        enter_analysis_name: "Custom analysis name",
        analysis_begin: "Begin",
        propability: "Probability:        ",
        webcam_detection: "Webcam detection",
        anion_identification: "Anion identification",
        cation_identification: "Cation identification",
        analysis_name: "Analysis name: ",
        analysis_progress: "Analysis progress:",
        
        fake_analysis: "Fake analysis",
        choose_img: "Choose img: ",
        test_image: "TEST IMAGES",
        
        end_analysis: "Analysis completed",
        wrong_result: "Such a result should not appear at this stage of the analysis.",
        ion_found: "The ion was found!",
       
        chat_name: "Chat",
        default_message:"No messages"


    },
    database_buttons: {
        ion_analysis:"Ion analysis",
        dataflow:"Dataflow",
        anion: "Anions -",
        cation: "Cations +",
        voicescript: "VoiceScript",
        images: "Images",
        img_1:"Test images",
        img_2:"Images storage",
        img_3:"Face images",
        chat: "Chat messages",
        users: "Users",
        ph: "pH analysis",
    },

    databse: {
        clear_all_bt: "Clear all",
        remove_bt:"Remove",
        mod_bt:"Mod",
        entry_modification:"modification of entry number ", //Modyfikacja wersetu nr:
        anion_analisys: "Anion analysis",
        cation_analysis: "Cation analysis",
        anion_scriptflow: "Anion scriptflow",
        cation_scriptflow: "Cation scriptflow",
        anion_voicescript: "Anion voicescript",
        cation_voicescript: "Cation voicescript",
        update_data: "Update data",
        add_new: "Add new",
        submit_bt:"Submit data to database",
        all_data_del_confirm: "Are you sure you want to delete all history?",//"Na pewno chcesz usunąć całą historię?"
    },

    ph:{
        new_calibrations: "New calibration",
        prevoius_calibrations: "Previous calibrations",
        saved_cal: "Saved pH calibrations",
        cal_name: "Calibration name:",
        cal_begin: "Begin",
        take_screenshot: "Get frame sample",
        preview: "Preview: ",
        result: "Result: ",
        ph_table: "pH value table:",
        p_value: "Enter ph value",
        file_from_device:"Get file from device"
    },

    face_recognition: {
        start_scan: "Start scan",
        open_webcam:"Open Webcam",
        close_webcam: "Close Webcam",
        age:"Age: ",
        gender:"Gender: ",
        expression: "Expression: "
    }



}