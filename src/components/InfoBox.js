import React from 'react';
import numeral from 'numeral';
import { Card, CardContent, Typography } from '@material-ui/core';
import { useStateValue } from '../context/InfoProvider';
import { actionTypes } from '../context/Reducer';
import '../styles/InfoBox.css'

function InfoBox({title, active, caseType, active_style, cases, total}) {
    const [state, dispatch] = useStateValue();
    const prettyPrintStat = (stat) => stat ? `+${numeral(stat).format("0.0a")}` : "+0";
    function onClickHandler(caseType){
        
        dispatch({
            ...state,
            type: actionTypes.SET_CASE_TYPE,
            case_type: caseType
        })
    }
    return (
        <Card className={`infoBox ${active && active_style}`} onClick={(e)=>{
            e.stopPropagation();
            onClickHandler(caseType)
            }}>
            <CardContent>
                <Typography className="infoBox__title" color="textSecondary">
                    {title}
                </Typography>
                <h2 className="infoBox__cases">{prettyPrintStat(cases)}</h2>
                <Typography color="textSecondary">{prettyPrintStat(total)}</Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox
