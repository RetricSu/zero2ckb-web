import React, { useRef, useState, useEffect } from 'react';
import { QueryOption } from '../../../types/blockchain';
import { I18nComponentsProps } from '../../../types/i18n';
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

export interface QueryCellProps extends I18nComponentsProps {
    code_hash?: string
    hash_type?: 'type' | 'data'
}

export default function QueryCell(props: QueryCellProps){
    const {t, code_hash, hash_type} = props;

    const ref = useRef<HTMLInputElement>(null);
    const [query, setQuery] = useState<QueryOption>();

    const startQuery = () => {
        setQuery({
            lock: {
                code_hash: code_hash || '0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8',
                args: ref.current?.value || '',
                hash_type: hash_type || 'type',
            }
        })
    }

    return(
        <div>
            <div>
                <div className="form" style={styles.search_bar}>
                    <input style={styles.input} ref={ref} type="text" placeholder={t("tutorial.widget.toolBox.queryCell.inputPlaceHolder")} />
                    <button onClick={startQuery}> 🔍 </button>
                </div>
            </div>
            <hr/>
            <div>
                { query && 
                    <Cells t={t} query={query} render_dep={query} text={{title: t("tutorial.widget.toolBox.queryCell.searchResultTile"), btn_text: t("tutorial.widget.toolBox.queryCell.retryBtnText")}} custom_style={{layout_style:{border: '0'}}}  />
                }
            </div>
        </div>
    )
} 