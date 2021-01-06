import React, { useRef, useState } from 'react';
import { notify } from './notify';

export type Props = {
    text: string | object
    suffix?: string
    icon?: boolean
}

const styles = {
    pointer: {
        cursor: 'pointer'
    }
}

export default function CopyText(props: Props){
    
    const clip_button = useRef(null);

    const [placeholder, setPlaceholder] = useState(props.suffix);
    const icon_element = <img width="20px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAwCAYAAABnjuimAAAAAXNSR0IArs4c6QAAA6VJREFUWAntWb9LHFEQnjvuIicXLEWEYKVCIJVX2FoEUtgd1haxCEnlH5IqYnEWV2t5RUDE1kKrQBCtjoConcJxYpQz7zv3DbPP3X2ze7tHCh9c9v2Y+ebbebOfuy9Ery3fDJRGhWu32+8fHh4+l0qlj09PT+8MXj0lZs/4/jG++9VqdWd9ff13lH9moru7u29ub2+/G9Av5leOAs8wNzA+21NTU5tra2t/pX8mogHJnwZoRYLl2D80ZD9JspkyEWSyKJK435UgBt976owGNfnLIPBNTk5O0tLSEk1PT1OtVmNwTefu7o6ur6/p5OSE+v2+dBmYmv1ga5aDSYukPh4cs85+ILm6ukpzc3OpSSIObgy+wACWaOUg1nCKAwqDxC6ebmmATE5MTMipTH1gAEs2GSs10UCCGA/bnVdzsWSsSlwQrT7u7e3FQQznK5UK1et1mpmZofn5eTJPc6x9RH2zJr8gavXR1MdQH81dxQJrFh4fH+nm5mb4Oz09pYWFBWo0GlQup9vMkLXQx6+GRGhNQ0pjc3Z2RgcHBzQYQNv1LURmDPo4ZHZ1dUXHx8d6lsaStz6oSWw3t1H00YLE6SQyu7i4mFizFgNXzmje+miDJOgknZ+fWzPvlYlKzYJXXvpoGUTp5OXlpV32Xpmo1Cx4uZrmRVIYuJi9Xk/h9WzCNWqGrFlYcjXt4uKCjo6O3L/HzyjmX9Tz8vIyzc7O8pzbcTEhXdrGGfU5JJGEL14oYFNUUxMtioAWV00U2+q83YRi2K0PTeY4kDWaCIvaazabiTZFLqozWiQJDfYrUU2W0tioa9Sno25Q+3Al6arrkzRWb71PR90geeuqmqhLZNxjNVGfjrrE7da781nH6hodh47i3dVp/NaizqgDUMgQBxGy4fDMjv8bovf398PTEksMV/PquW/H6q23Dnlf4z5VTBwc6ezYeGqiPh21D09a3Uw4F9i2504gq956n47mrJs4dty02UxFVDoV2MfH/pZ7Nop46q2HjiZl1W59hptQHY1LotAs/m5CkctvnDx0NEonNzY23mpujmtUahYcXU3TgPlsXEw3ZpI/E5WaBQecAEPb8mo+nfTFYaKBZvHJFZ7iTqdD3W6XIrbMh8vr8AUGsIApWkgnxXxkN3SG32q1fhgrnOSNo22Z+vymDcQZhUOgXYda5xHsXuikDytEFP+vAw0zTlvmx2XgA0mxHquTPozQ1ktj7dG49Inpq3Qyxvd1urAM/ANuPYvIUu3nHQAAAABJRU5ErkJggg==" alt="copy"></img>

    const copyText = () => {
        const el = document.createElement('input');
        el.setAttribute('type', 'text');
        el.setAttribute('style', 'position:absolute;left:-9999px;');
        el.setAttribute('value', typeof props.text === 'string' ? props.text : JSON.stringify(props.text, null, 2));
        document.body.appendChild(el);
        el.select();
        const boolean = document.execCommand('copy');
        document.body.removeChild(el);
        const message = boolean ? '复制成功 √' : '复制失败 x';
        notify(message, 'success');
    }

    return(
        <span ref={clip_button} onClick={copyText} style={styles.pointer}>
            {placeholder} {props.icon && icon_element}
        </span>
    )
}