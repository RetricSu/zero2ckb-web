import React from "react";

export type CodeProp = {
    code: string,
    isContentEditable?: boolean
}
export default function CodePeice (prop: CodeProp){

    return (
        <div>
            <pre contentEditable={prop.isContentEditable?'true':'false'}>
                {prop.code}
            </pre>
        </div>
    )
}