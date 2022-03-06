import React from 'react';
import { I18nComponentsProps } from '../../../types/i18n';
import styles from '../../widget/common_style';

export default function(props: I18nComponentsProps){
    const {t} = props;
    return(
        <div id="how-to-deploy-upgradable-contract">
            <div style={styles.content}>
                <h3 style={styles.main_color}>{t("tutorial.class4.title")}</h3>
                <p>{t("tutorial.context.toBeContinue")}</p>
            </div>
        </div>
    )
}
