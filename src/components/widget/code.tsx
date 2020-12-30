import React, {Ref, useImperativeHandle, useRef, forwardRef, useState, CSSProperties}  from "react";

export type CodeProp = {
    code: string | object
    isContentEditable?: boolean
    custom_style?: CSSProperties
}

export type CodePieceType = {
    getContent: () => string
}

const CodePeice = forwardRef((prop: CodeProp, ref: Ref<CodePieceType>) => { 
    const mystyle = prop.custom_style === "undefined" ? {} : prop.custom_style; 
    const styles = {
        code_box:{...{
            outline: '0px solid transparent',
            overflow: 'scroll',
            border: '1px solid white'
        }, ...mystyle} 
    };

    const preRef = useRef<HTMLPreElement>(null);
    
    const getContent = () => {
        return preRef.current?.innerText || '';
    }

    useImperativeHandle(ref, () => ({ getContent }));

    const onPasteClean = (e: React.ClipboardEvent<HTMLPreElement>) => {
        e.preventDefault(); // cancel paste
        const text = e.clipboardData?.getData('text/plain');
        console.log(text);
        document.execCommand("insertHTML", false, text); // paste manually
    }

    return (
        <div>
            <pre ref={preRef} contentEditable={prop.isContentEditable?'true':'false'} 
                onInput={getContent} style={styles.code_box} onPaste={(e) => onPasteClean(e)}>
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