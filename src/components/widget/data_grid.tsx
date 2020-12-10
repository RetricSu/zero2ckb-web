import React from 'react';
import { CSSProperties } from '@material-ui/core/styles/withStyles';

export type ColDef = {
    id: string
    label: string
    width?: string
    type?: any
}

export type SingleRow = {
    id: string
    value: string
    type?: any
}

export type RowModel = {
    data: SingleRow[]
}

export type SimpleDataGridProp = {
    columns: ColDef[]
    rows: RowModel[]
    custom_style?: CSSProperties
}

const default_style = {
    width: '100%',
    height: '400px'
}

export function DataGrid (props: SimpleDataGridProp){
    const styles = {
        header: {
            textAlign: 'center' as const,
            border: '1px solid'
        }
    }
    const {columns, rows} = props;
    const headers = columns.map( (col: ColDef) => (
        <span style={ {...styles.header, ...{width: col.width??''}} }> {col.label}  </span>
    ) );
    const row_item = (row: RowModel) => {
        row.data.map((singlerow: SingleRow) => (
            //singlerow.id
            <div>todo.....</div>
        ))
    }
    
    const rows_content = rows.map((row: RowModel) => (
        row_item(row)
    ));
    return(
        <div>
            <div> {headers} </div>
            <div>  </div>
        </div>
    )
}

export default function SimpleDataGrid(props: SimpleDataGridProp) {
  const {columns, rows, custom_style} = props;
  const style = {...default_style, ...custom_style};
  return (
    <div style={style}>
      <DataGrid rows={rows} columns={columns}/>
    </div>
  );
}
