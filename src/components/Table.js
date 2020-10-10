import React, { useEffect, useState } from 'react';
import numeral from "numeral";
import '../styles/Table.css'

function Table({ countries }) {

    const [data, setData] = useState([]);

    useEffect(() => {
        (countries.length !== 0) && setData([...countries].sort((a, b) => {
            if (a.cases > b.cases)
                return -1
            else
                return 1;
        }));
    }, [countries, setData])

    return (
        <div className="table">
            <table>
                <tbody>
                    {
                        data.map(({ country, cases }, index) => (
                            <tr key={index}>
                                <td>{country}</td>
                                <td><strong>{numeral(cases).format("0,0")}</strong></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Table
