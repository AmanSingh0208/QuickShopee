import React from "react";
import { useStyles } from "../divider/CustomDividerCss";

export default function CustomDivider(){
    const classes = useStyles()
    return(<div>
        <div className={classes.divider}>
            <div className={classes.divider_div}/>
        </div>
    </div>)
}