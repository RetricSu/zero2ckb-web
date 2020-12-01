import React from "react";

export type CodeProp = {
    code: string
}
export default function CodePeice (prop: CodeProp){

    return (
        <div>
            <pre>
                {prop.code}
            </pre>
        </div>
    )
}