import { CSSProperties } from '@material-ui/core/styles/withStyles';
import React from 'react';
import './neon_text.css';

export type NeonTextProps = {
    text: string
    custom_style?: {
        brand_style?: CSSProperties
        text_style?: CSSProperties
    }
}

export default function NeonText(props: NeonTextProps){
    const { text, custom_style } = props;

    if(text.length < 4) throw new Error("text.length should > 4");

    const brand_style = custom_style?.brand_style ? custom_style.brand_style : {};
    const text_style = custom_style?.text_style ? custom_style.text_style : {};

    return(
        <div className="neon-brand" style={brand_style}>
          <div className="neon-text" style={text_style}>
              {text.slice(0,1)}<span id="offset">{text.slice(1,2)}</span>{text.slice(2)}
          </div>
        </div>
    )
}