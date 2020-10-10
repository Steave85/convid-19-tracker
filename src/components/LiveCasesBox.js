import React from 'react';
import { Card, CardContent } from '@material-ui/core';
import { useStateValue } from '../context/InfoProvider';
import Table from './Table';
import LineGraph from './LineGraph';
import '../styles/LiveCasesBox.css';

function LiveCasesBox() {
    const [{tableCountries, case_type, countryCode}] = useStateValue();
    return (
        <div className="liveCaseBox">
            <Card>
                <CardContent>
                    <h3>Live Cases by Country</h3>
                    <Table countries={tableCountries}/>
                     {
                        <h3 className="liveCaseBox__title">{case_type}</h3>
                     }
                    <LineGraph caseType={case_type} countryCode= {countryCode}/>
                </CardContent>
            </Card>
        </div>
    )
}

export default LiveCasesBox
