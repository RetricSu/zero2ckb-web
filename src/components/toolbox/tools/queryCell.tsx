import React, { useRef, useState } from 'react';
import { QueryOption } from '../../../types/blockchain';
import Cells from '../../tutorial/sections/common/Cells';
import commonStyle from '../../widget/common_style';


const styles = {...commonStyle, ...{
    search_bar: {
        width: '80%',
        padding: '5px',
        margin: '0 auto',
    },
    input: {
        fontSize: '18px',
        outline: 'none',
        width: '100%',
    }
}};

export default function QueryCell(){
    const ref = useRef<HTMLInputElement>(null);
    const [query, setQuery] = useState<QueryOption>();

    const startQuery = () => {
        setQuery({
            lock: {
                code_hash: '0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8',
                args: ref.current?.value || '',
                hash_type: 'type',
            }
        })
    }

    return(
        <div>
            <div>
                <div className="form" style={styles.search_bar}>
                    <input style={styles.input} ref={ref} type="text" placeholder="query cell" />
                    <button onClick={startQuery}> 🔍 </button>
                </div>
            </div>
            <hr/>
            <div>
                { query && 
                    <Cells query={query} render_dep={query} text={{title:'搜索结果：', btn_text: '重试'}} custom_style={{layout_style:{border: '0'}}}  />
                }
            </div>
        </div>
    )
} 