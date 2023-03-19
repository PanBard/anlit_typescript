import { Voice } from "lib/features/voiceRecognition";
import { useLabel, useLabelMap, useLabelMapNumb } from "lib/hooks/useDetectFlow";
import { useVoiceScript } from "lib/hooks/useVoiceScript";




export const VoiceStage_1 = (label: number, info: string) =>{
    const labelMap = useLabelMapNumb()

   
    const Voice1 = (text:string) =>{Voice(text)}

    const voiceScript = useVoiceScript()

     
    console.log('label ',label )
    console.log('info ',info )
    console.log('jestesmy w fazie!!!! ' )
    console.log('faza1:',labelMap[label])

    // switch( info ){
    //     case  'gr1':
    //         if(label == 0){
    //             console.log('gada w gr 1')
    //             Voice(`Pokazana próbówka zawiera ${labelMap[label]} osad! `)
    //             console.log('gada w gr 1 po label')
    //             Voice('Prawdopodobnie oznacza to, że nie przeprowadzono prawidłowo poprzedniej instrukcji!')
    //             return '404'
    //         }
    //         else{
    //             console.log('nie powinoo tego byc 1')
    //             // Voice(voiceScript.INFORM.after_phase_1.prepare)
    //             Voice(voiceScript.ORDER[1].order3)
    //             return 'gr1_11'
    //         }
        
    //     case  'gr1_1':
    //         if(label == 0){
    //             console.log('nie powinoo tego byc 2')
    //             Voice(`Pokazana próbówka zawiera ${labelMap[label]} osad! `)
    //             Voice('Prawdopodobnie oznacza to, że nie przeprowadzono prawidłowo poprzedniej instrukcji!')
    //             return '404'
    //         }
    //         else{
    //             console.log('nie powinoo tego byc 3')
    //             // Voice(voiceScript.INFORM.after_phase_1.info)
    //             // Voice(voiceScript.INFORM.after_phase_1.prepare)
    //             Voice('ok doszedles do gr_1')
    //             return 'gr_2 '
    //         }
        
    // }


    if(info=='gr1'){
        if(label == 0){
            console.log('gada w gr 1')
            Voice1(`Pokazana próbówka zawiera ${labelMap[label]} osad! `)
            console.log('gada w gr 1 po label')
            Voice1('Prawdopodobnie oznacza to, że nie przeprowadzono prawidłowo poprzedniej instrukcji!')
            return '404'
        }
        else{
            console.log('nie powinoo tego byc 1')
            // Voice(voiceScript.INFORM.after_phase_1.prepare)
            Voice1(voiceScript.ORDER[1].order3)
            return 'gol'
        }
    }

    if(info=='gr1_1'){
        if(label == 0){
            console.log('nie powinoo tego byc 2')
            Voice1(`Pokazana próbówka zawiera ${labelMap[label]} osad! `)
            Voice1('Prawdopodobnie oznacza to, że nie przeprowadzono prawidłowo poprzedniej instrukcji!')
            return '404'
        }
        else{
            console.log('nie powinoo tego byc 3')
            // Voice(voiceScript.INFORM.after_phase_1.info)
            // Voice(voiceScript.INFORM.after_phase_1.prepare)
            Voice1('ok doszedles do gr_1')
            return 'gr_2 '
        }
    }




}



// case reverseLabelMap(labelMap.czarny_o):
        //     return voiceScript.INFORM.after_phase_1.info

        // case reverseLabelMap(labelMap.zolty):
        //     return voiceScript.INFORM.after_phase_1.info

            
        // case reverseLabelMap(labelMap.zolty_o):
        //     return voiceScript.INFORM.after_phase_1.info

        // case reverseLabelMap(labelMap.czarny_o_2):
        //     return voiceScript.INFORM.after_phase_1.info

        // case reverseLabelMap(labelMap.cielisty_o):
        //     return voiceScript.INFORM.after_phase_1.info



// switch( label ){
                
            //     case(0):
            //     Voice(`Pokazana próbówka zawiera ${labelMap[label]} osad`)
            //     return voiceScript.INFORM.after_phase_1.info
            //     case(1):
            //     Voice('No nareszcie 1')
            //     return voiceScript.INFORM.after_phase_1.info
            //     case(2):
            //     Voice('No nareszcie 2')
            //     return voiceScript.INFORM.after_phase_1.info
            //     case(3):
            //     Voice('No nareszcie 3')
            //     return voiceScript.INFORM.after_phase_1.info
            //     case(4):
            //     Voice('No nareszcie 4')
            //     return voiceScript.INFORM.after_phase_1.info 
            //     case(5):
            //     Voice('No nareszcie 5')
            //     return voiceScript.INFORM.after_phase_1.info
            //     case(6):
            //     Voice('No nareszcie 6')
            //     return voiceScript.INFORM.after_phase_1.info
            //     case(7):
            //     Voice('No nareszcie 7')
            //     return voiceScript.INFORM.after_phase_1.info
            //     case(8):
            //     Voice('No nareszcie 8 ')
            //     return voiceScript.INFORM.after_phase_1.info
            //     case(9):
            //     Voice('No nareszcie 9')
            //     return voiceScript.INFORM.after_phase_1.info
            //     case(10):
            //     Voice('No nareszcie 10')
            //     return voiceScript.INFORM.after_phase_1.info
            //     case(11):
            //     Voice('No nareszcie 11')
            //     return voiceScript.INFORM.after_phase_1.info
            // }