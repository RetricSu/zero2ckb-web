import React, {Ref, useImperativeHandle, useRef, forwardRef, useState}  from "react";

const styles = {
    no_outline:{
        outline: '0px solid transparent'
    }
}

export type CodeProp = {
    code: string | object,
    isContentEditable?: boolean
}

export type CodePieceType = {
    getContent: () => string
}

const CodePeice = forwardRef((prop: CodeProp, ref: Ref<CodePieceType>) => {
    const preRef = useRef<HTMLPreElement>(null);
    
    const getContent = () => {
        return preRef.current?.innerText || '';
    }

    useImperativeHandle(ref, () => ({ getContent }));

    return (
        <div>
            <pre ref={preRef} contentEditable={prop.isContentEditable?'true':'false'} onInput={getContent} style={styles.no_outline} >
                { typeof prop.code === 'string' &&
                    prop.code
                }
                { typeof prop.code === 'object' &&
                    JSON.stringify(prop.code, null, 2)
                }
            </pre>
        </div>
    )
})

export default CodePeice;