import { useLabelMap } from "lib/hooks/useDetectFlow";
import { useVoiceScript } from "lib/hooks/useVoiceScript";




export const Oracle = (label: string, phase: number) =>{
    const labelMap = useLabelMap()

//function for reverse values in labelMap to use in switch case
    const reverseLabelMap = (labelmap: any) => {
        const arajak = (Object.entries(labelMap)).find(([,value])=>labelmap==value) 
        if(arajak) return arajak[0]
    }

    const voiceScript = useVoiceScript()

    reverseLabelMap(labelMap.bialy_o)
    reverseLabelMap(labelMap.brunatny_o)
    reverseLabelMap(labelMap.cielisty_o)
    reverseLabelMap(labelMap.ciemny)
    reverseLabelMap(labelMap.czarny_o)
    reverseLabelMap(labelMap.czarny_o_2)
    reverseLabelMap(labelMap.niebieski_o)
    reverseLabelMap(labelMap.pomarancz)
    reverseLabelMap(labelMap.rozowo_nieb_o)
    reverseLabelMap(labelMap.rozowy)
    reverseLabelMap(labelMap.zolty)
    reverseLabelMap(labelMap.zolty_o)


    switch(label && phase){
        case reverseLabelMap(labelMap.zolty_o) && 1:
            return voiceScript.INFORM.after_phase_1.info

        case reverseLabelMap(labelMap.czarny_o):
            return voiceScript.INFORM.after_phase_1.info

        case reverseLabelMap(labelMap.zolty):
            return voiceScript.INFORM.after_phase_1.info

            
        case reverseLabelMap(labelMap.zolty_o):
            return voiceScript.INFORM.after_phase_1.info

        case reverseLabelMap(labelMap.czarny_o_2):
            return voiceScript.INFORM.after_phase_1.info

        case reverseLabelMap(labelMap.cielisty_o):
            return voiceScript.INFORM.after_phase_1.info

         
    }


}