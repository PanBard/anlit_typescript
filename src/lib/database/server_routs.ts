export const SERVER_ROUTS = {
    script_flow : {
         "script_flow" : "http://localhost:4001/api/get/script_flow",
    "insert_script_flow" : "http://localhost:4001/api/insert_script_flow",
    "update_script_flow" : "http://localhost:4001/api/update_script_flow",
    "delete_script_flow" : "http://localhost:4001/api/delete_script_flow",
    },

    analysis: {
         "analysis" : "http://localhost:4001/api/get/analysis",
    "update_analysis" : "http://localhost:4001/api/update_analysis",
    "insert_analysis" : "http://localhost:4001/api/insert_analysis",
    "delete_analysis" : "http://localhost:4001/api/delete_analysis",
    },

    image_test: {
         "image" : "http://localhost:4001/api/get/detected_imades",
    "insert_image" : "http://localhost:4001/api/insert_detected_imades",
    },
    
   tables : {
     "create_new_table" : "http://localhost:4001/api/testy",
    "viev_all_tables" : "http://localhost:4001/api/get/all_tables"
   },

   images : {
     "get" : "http://localhost:4001/api/get/images",
     "post" : "http://localhost:4001/api/post/images",
     "put" : "http://localhost:4001/api/put/images",
     "delete" : "http://localhost:4001/api/delete/image"
   },

   ultimate_analysis : {
     "get" : "http://localhost:4001/api/get/ultimate_analysis",
     "post" : "http://localhost:4001/api/post/ultimate_analysis",
     "put" : "http://localhost:4001/api/put/ultimate_analysis",
     "delete" : "http://localhost:4001/api/delete/ultimate_analysis",
     "set_end" : "http://localhost:4001/api/put/ultimate_analysis/set_end"
     },

     shuffle_match : {
          "get" : "http://localhost:4001/api/get/shuffle"
          },

     voice_script : {
          "get" : "http://localhost:4001/api/get/voice_script",
          "post" : "http://localhost:4001/api/post/voice_script",
          "put" : "http://localhost:4001/api/put/voice_script",
          "delete" : "http://localhost:4001/api/delete/voice_script",
          "get_required_script" : "http://localhost:4001/api/get/required_voice_script"
          }
   


   




   
   


}