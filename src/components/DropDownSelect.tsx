import React from "react";
import type { DataSource } from "../api/dataSource";

type DropDownSelectProps = {
    key: React.Key;
    defaultName: string;
    data: DataSource[] | null;
    disabled: boolean;
    onChange: (id: string) => void;
}

export const DropDownSelect = ({...props}: DropDownSelectProps): JSX.Element => {
    
    return (
        <select
            disabled={props.disabled || !props.data}
            key={props.key}
            onChange={(evt) => props.onChange(evt.currentTarget.value)}
        >
            <option value=''>{props.defaultName}</option>
            {props.data && props.data.map((ds, i) => {
                return (
                    <option key={props.key + '_' + i} value={ds.id}>{ds.name}</option>
                )
            })}
        </select>
    );
}