import React  from "react";

export type CodeProp = {
    code: string | object,
    isContentEditable?: boolean
}
export default function CodePeice (prop: CodeProp){
    return (
        <div>
            <pre contentEditable={prop.isContentEditable?'true':'false'}>
                { typeof prop.code === 'string' &&
                    prop.code
                }
                { typeof prop.code === 'object' &&
                    JSON.stringify(prop.code, null, 2)
                }

            </pre>
        </div>
    )
}