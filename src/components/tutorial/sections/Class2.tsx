import React from 'react';
import { I18nComponentsProps } from '../../../types/i18n';
import styles from '../../widget/common_style';

export default function(props: I18nComponentsProps){
    const {t} = props;
    return(
        <div id="how-to-send-a-mutisig-tx">
            <div style={styles.content}>
                <h3 style={styles.main_color}>{t("tutorial.class2.title")}</h3>
                <p>{t("tutorial.context.toBeContinue")}</p>
            </div>
        </div>
    )
}

                /** 
                 <ul>
                    <li>0、学习多签脚本</li>
                    <li>1、拼接交易的内容</li>
                    <li>2、对交易进行签名</li>
                    <li>3、把交易签名放回到交易中</li>
                    <li>4、把交易发送到链上</li>
                </ul>
                */