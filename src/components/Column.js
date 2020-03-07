import React from 'react';
import Task from './Task';

const ColumnList = ({title}) => {
    return (
        <div style={styles.container}>
            <h4>{title}</h4>
            <Task />
        </div>
    )
};

const styles = {
    container: {
        backgroundColor: "#ccc",
        borderRadius: 3,
        width: 300,
        padding: 8
    }
}

export default ColumnList;