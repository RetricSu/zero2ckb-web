import React, {useState, useEffect, useRef} from "react";
import CodePiece, { CodePieceType } from './code';
import FreshButton from './fresh_button';

const styles = {
    form_box: {
        border: '1px solid gray',
        padding: '20px',
        overflow: 'scroll'
    },
    input_area: {
        border: '0px',
        background: 'white',
        color: 'black',
        padding: '10px'
    }
}

export type Props = {
    form_template: string
    btn_text?: string
    title_text?: string
    onSubmit?: (form_content: string) => void
}

export default function Form(props: Props){
    const [isLoading, setIsLoading] = useState(false);
    const ref = useRef<CodePieceType>(null);
    
    const handleSubmit = function(){
        setIsLoading(true);
        if(ref.current){
            const data = ref.current.getContent();
            if(props.onSubmit){
                props.onSubmit(data);
            }
        }
        setIsLoading(false);
    }

    return(
      <div>
        <h4 style={{textAlign:'center'}}> {props.title_text} </h4>
        <div style={styles.form_box}>
            <CodePiece code={props.form_template} isContentEditable={true} ref={ref} custom_style={styles.input_area}></CodePiece>
            <FreshButton isLoading={isLoading} text={props.btn_text || '提交'} onClick={handleSubmit} />
        </div>
      </div>
    )
}