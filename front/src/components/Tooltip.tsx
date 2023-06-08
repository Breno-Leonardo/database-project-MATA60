import {Task} from "gantt-task-react"

import React from "react";

export const StandardTooltipContent: React.FC<{
    task: Task;
    fontSize: string;
    fontFamily: string;
}> = ({task, fontSize, fontFamily}) => {
    const style = {
        fontSize,
        fontFamily,
    };
    return (
        <></>
    );
};