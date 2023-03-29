export const SERVER_ROUTS = {
     cation_script_flow : {
          "get" : "http://localhost:4001/api/get/cation_script_flow",
          "post" : "http://localhost:4001/api/post/cation_script_flow",
          "put" : "http://localhost:4001/api/put/cation_script_flow",
          "delete" : "http://localhost:4001/api/delete/cation_script_flow",
     },

     anion_script_flow : {
          "get" : "http://localhost:4001/api/get/anion_script_flow",
          "post" : "http://localhost:4001/api/post/anion_script_flow",
          "put" : "http://localhost:4001/api/put/anion_script_flow",
          "delete" : "http://localhost:4001/api/delete/anion_script_flow",
  },

     cation_voice_script : {
          "get" : "http://localhost:4001/api/get/cation_voice_script",
          "post" : "http://localhost:4001/api/post/cation_voice_script",
          "put" : "http://localhost:4001/api/put/cation_voice_script",
          "delete" : "http://localhost:4001/api/delete/cation_voice_script",
          "get_required_script" : "http://localhost:4001/api/get/required_cation_voice_script"
          },

     anion_voice_script : {
          "get" : "http://localhost:4001/api/get/anion_voice_script",
          "post" : "http://localhost:4001/api/post/anion_voice_script",
          "put" : "http://localhost:4001/api/put/anion_voice_script",
          "delete" : "http://localhost:4001/api/delete/anion_voice_script",
          "get_required_script" : "http://localhost:4001/api/get/required_anion_voice_script"
       },

     cation_analysis : {
          "get" : "http://localhost:4001/api/get/cation_analysis",
          "post" : "http://localhost:4001/api/post/cation_analysis",
          "put" : "http://localhost:4001/api/put/cation_analysis",
          "delete" : "http://localhost:4001/api/delete/cation_analysis",
          "set_end" : "http://localhost:4001/api/put/cation_analysis/set_end",
          "set_result" : "http://localhost:4001/api/put/cation_analysis/set_result"
     },

     anion_analysis : {
          "get" : "http://localhost:4001/api/get/anion_analysis",
          "post" : "http://localhost:4001/api/post/anion_analysis",
          "put" : "http://localhost:4001/api/put/anion_analysis",
          "delete" : "http://localhost:4001/api/delete/anion_analysis",
          "set_end" : "http://localhost:4001/api/put/anion_analysis/set_end",
          "set_result" : "http://localhost:4001/api/put/anion_analysis/set_result"
          
      },

     shuffle_match : {
          "get" : "http://localhost:4001/api/get/shuffle"
          },

    

     custom_query : {
          "get" : "http://localhost:4001/api/get/custom_query"
          },

     test_images : {
          "get" : "http://localhost:4001/api/get/test_images",
          "post" : "http://localhost:4001/api/post/test_images",
          "put" : "http://localhost:4001/api/put/test_images",
          "delete" : "http://localhost:4001/api/delete/test_images",
       },



   




   
   


}