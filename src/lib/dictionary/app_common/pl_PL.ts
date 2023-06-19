export const pl_PL = {
    common: {
        autoTranslate: 'Auto ',
        companyName: "Hog Ademy",
        close: "Zamknij",
        back: "Cofnij",
        end: "Zakończ",
        begin: "Rozpocznij",
        save: "Zapisz",
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
        button_about: "O projekcie",
        button_sign_in: "Zaloguj",
        button_sign_up: "Utwórz nowe konto",
        welcome_text_1: "Witaj!",
        welcome_text_2: "Nasza platforma oparta na sztucznej inteligencji napędza innowacje dzięki narzędziom, które przyspieszają pracę programistów.",
        welcome_text_3: "GitHub Codespaces oferuje kompletne środowisko deweloperskie w ciągu kilku sekund, dzięki czemu możesz kodować, budować, testować i otwierać żądania ściągania z dowolnego repozytorium w dowolnym miejscu."
    },

    login_form: {
        header: "Zaloguj się",
        username: "Nazwa użytkownika",
        password: "Hasło",
        button_sign_in: "Zaloguj",
        button_scan: "Zaloguj się za pomocą rozpoznawania twarzy",
        warn_wrong_username: "Zła nazwa użytkownika",
        warn_wrong_pass: "Złe hasło"
    },
    registration_form: {
        header: "Zarejestruj się",
        username: "Nazwa użytkownika",
        password: "Hasło",
        confirm_password: "Potwierdź hasło",
        button_register: "Zarejestruj się",
        warn_pass_not_match: "Hasła się nie zgadzają",
        warn_username_taken: "Użytkownik o takiej nazwie już istnieje",
        warn_pass_empty: "Wpisz nazwę użytkownika",
        warn_username_empty: "Wpisz hasło",
    },
    dashboard_header: {
        analysis: "Analiza jonów",
        database: "Baza danych",
        ph: "Analiza pH",
        face_recognition: "Rozpoznawanie twarzy",
        others:"Inne",
        user_id: "Użytkownik ",
        dropdown_profile: "Twój profil",
        dropdown_faceid: "Logowanie twarzą",
        dropdown_ion: "Analizy jonów",
        dropdown_ph: "Analizy pH",
        dropdown_help: "Pomoc",
        dropdown_Settings: "Ustawienia",
        dropdown_signout: "Wyloguj się",
    },
    analysis: {
        new_analysis: "Nowa analiza",
        continue_analysis: "Kontynyuj poprzednie",
        cation_analysis: "Analiza kationów",
        anion_analysis: "Analiza anionów",
        enter_analysis_name: "Nazwa nowej analizy",
        analysis_begin: "Rozpocznij analizę",
        propability: "Prawdopodobieństwo: ",
        webcam_detection: "Wykryj automatycznie",
        anion_identification: "Identyfikacja kationu",
        cation_identification: "Identyfikacja kationu",
        analysis_name: "Nazwa analizy: ",
        analysis_progress: "Postęp analizy:",

        fake_analysis: "Test",
        choose_img: "Wybierz zdjęcie: ",
        test_image: "TESTOWE ZDJĘCIA",
        
        end_analysis: "Analiza została zakończona",
        wrong_result: "Taki wynik nie powinien się pojawić na tym etapie analizy.",
        ion_found: "Znaleziono jon!",
       
        chat_name: "Chat",
        default_message:"Brak wiadomości"
 
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

    ph:{
        new_calibrations: "Nowa kalibracja",
        prevoius_calibrations: "Wcześniejsze kalibracje",
        saved_cal: "Zapisane kalibracje: ",
        cal_name: "Nazwa nowej kalibracji pH: ",        
        take_screenshot: "Pobierz próbkę zdjęcia",
        preview: "Podgląd: ",
        result: "Wynik: ",
        ph_table: "Tabela wartości pH:",
        p_value: "Wprowadź wartość pH",
        file_from_device:"Udostępnij z urządzenia"
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