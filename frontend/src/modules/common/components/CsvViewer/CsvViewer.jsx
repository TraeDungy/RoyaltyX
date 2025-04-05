import { useState } from 'react';

const CsvViewer = ({ data }) => {
    const [selectedCell, setSelectedCell] = useState({ row: null, col: null });

    if (!data || data.length === 0) return <p>No data available.</p>;

    const columnKeys = Object.keys(data[0]);

    const getColumnLetter = (colIndex) => {
        let result = '';
        let index = colIndex;
        while (index >= 0) {
            result = String.fromCharCode((index % 26) + 65) + result;
            index = Math.floor(index / 26) - 1;
        }
        return result;
    };

    return (
        <div>
            <table className="table table-bordered table-sm text-center m-0 table-sheet">
                <thead>
                    <tr>
                        <th></th>
                        {columnKeys.map((_, index) => (
                            <th key={index} className="text-center">
                                {getColumnLetter(index)}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            <th className="text-center">{rowIndex + 1}</th>
                            {columnKeys.map((key, colIndex) => (
                                <td
                                    key={colIndex}
                                    onClick={() =>
                                        setSelectedCell({ row: rowIndex, col: colIndex })
                                    }
                                    className={
                                        selectedCell.row === rowIndex &&
                                        selectedCell.col === colIndex
                                            ? 'selected-cell'
                                            : ''
                                    }
                                >
                                    {row[key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CsvViewer;
