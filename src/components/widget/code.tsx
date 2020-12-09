import React, {Ref, useImperativeHandle, useRef, forwardRef, useState}  from "react";

const styles = {
    code_box:{
        outline: '0px solid transparent',
        overflow: 'scroll',
        border: '1px solid white'
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
            <pre ref={preRef} contentEditable={prop.isContentEditable?'true':'false'} onInput={getContent} style={styles.code_box} >
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