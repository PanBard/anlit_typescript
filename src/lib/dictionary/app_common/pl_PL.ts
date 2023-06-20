import { Dictionary } from "lib/types/dictionary";

export const pl_PL: Dictionary = {

    common: {
        autoTranslate: 'Auto ',
        companyName: "Hog Ademy",
        close: "Zamknij",
        back: "Cofnij",
        end: "Zakończ",
        begin: "Rozpocznij",
        save: "Zapisz",
    },

    supported_languages:{
        en:'EN',
        pl:'PL'
    },
    components: {
        app: {
            error: 'Something went wrong',
            empty: 'No supported language',
            loading: 'Fetching supported languages...'
        },
        header: {
            title: "AnalysisAI",
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
        button_sign_up: "Rejestracja",
        welcome_text_1: "Witaj!",
        welcome_text_2: "Nasza platforma oparta na sztucznej inteligencji napędza innowacje dzięki narzędziom, które przyspieszają pracę programistów.",
        welcome_text_3: "GitHub Codespaces oferuje kompletne środowisko deweloperskie w ciągu kilku sekund, dzięki czemu możesz kodować, budować, testować i otwierać żądania ściągania z dowolnego repozytorium w dowolnym miejscu."
    },

    login_form: {
        succes_login: "Witaj!",
        header: "Zaloguj się",
        username: "Nazwa użytkownika",
        password: "Hasło",
        button_sign_in: "Zaloguj",
        button_scan: "Zaloguj się za pomocą rozpoznawania twarzy",
        warn_wrong_username: "Zła nazwa użytkownika",
        warn_wrong_pass: "Złe hasło"
    },
    registration_form: {
        succes_register_1: "Użytkownik ",
        succes_register_2: " zalogowany poprawnie!",
        header: "Zarejestruj się",
        username: "Nazwa użytkownika",
        password: "Hasło",
        confirm_password: "Potwierdź hasło",
        button_register: "Utwórz nowe konto",
        warn_pass_not_match: "Hasła się nie zgadzają",
        warn_username_taken: "Użytkownik o takiej nazwie już istnieje",
        warn_pass_empty: "Wpisz hasło",
        warn_username_empty: "Wpisz nazwę użytkownika",
    },
    dashboard_header: {
        analysis: "Analiza jonów",
        database: "Baza danych",
        ph: "Analiza pH",
        face_recognition: "Rozpoznawanie twarzy",
        others:"Inne",
        user_id: "Użytkownik: ",
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
        propability: "Mogą wystąpić: ",
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
        ion_analysis:"Analizy jonów",
        dataflow:"Baza wiedzy",
        anion: "Aniony -",
        cation: "Kationy +",
        voicescript: "Skrypty głosowe",
        images: "Zdjęcia",
        img_1:"Testowe",
        img_2:"Bank zdjęć",
        img_3:"Rozpoznawanie twarzy",
        chat: "Wiadomości czatu",
        users: "Użytkownicy",
        ph: "Analizy pH",
    },

    databse: {
        clear_all_bt: "Usuń wszystkie",
        remove_bt:"Usuń",
        mod_bt:"Mod",
        entry_modification:"Modyfikacja wersetu nr: ", 
        anion_analisys: "Analizy anionów",
        cation_analysis: "Analizy kationów",
        anion_scriptflow: "Baza wiedzy anionów",
        cation_scriptflow: "Baza wiedzy kationów",
        anion_voicescript: "Skrypt głosowy Anionów",
        cation_voicescript: "Skrypt głosowy Kationów",
        update_data: "Zmień",
        add_new: "Dodaj nowy",
        submit_bt:"Prześlij dane",
        all_data_del_confirm: "Na pewno chcesz usunąć całą historię?",
    },

    ph:{
        new_calibrations: "Nowa kalibracja",
        prevoius_calibrations: "Wcześniejsze kalibracje",
        saved_cal: "Zapisane kalibracje: ",
        cal_name: "Nazwa nowej kalibracji pH: ", 
        cal_begin: "Rozpocznij",       
        take_screenshot: "Pobierz próbkę zdjęcia",
        preview: "Podgląd: ",
        result: "Wynik: ",
        ph_table: "Tabela wartości pH:",
        p_value: "Wprowadź wartość pH",
        file_from_device:"Udostępnij z urządzenia"
    },
    
    face_recognition: {
        start_scan: "Wykonaj skan twarzy",
        open_webcam:"Otwórz kamerę",
        close_webcam: "Zamknij kamerę",
        age:"Wiek: ",
        gender:"Płeć: ",
        expression: "Nastrój: "
    }


}