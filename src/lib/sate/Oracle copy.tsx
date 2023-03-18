import { useLabelMap } from "lib/hooks/useDetectFlow";
import { State_1 } from "./State_1";

type OracleProps ={
    label: any
}

export const Oracle: React.FunctionComponent<OracleProps> = ({
    label
}) =>{
    const labelMap = useLabelMap()

//function for reverse values in labelMap to use in switch case
    const reverseLabelMap = (labelmap: any) => {
        const arajak = (Object.entries(labelMap)).find(([,value])=>labelmap==value) 
        if(arajak) return arajak[0]
    }





    switch(label){
        case reverseLabelMap(labelMap.bialy_o):
            return (<State_1/>)

        case reverseLabelMap(labelMap.czarny_o):
            return (<State_1/>)

        case reverseLabelMap(labelMap.zolty):
            return (<State_1/>)

            
        case reverseLabelMap(labelMap.zolty_o):
            return (<State_1/>)

        case reverseLabelMap(labelMap.czarny_o_2):
            return (<State_1/>)

        default: return <div>'elo'</div> 
    }


}