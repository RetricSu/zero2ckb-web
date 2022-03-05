import React from 'react';
import { I18nComponentsProps } from '../../../types/i18n';
import styles from '../../widget/common_style';

export default function BeforeWeGetStarted(props: I18nComponentsProps){
    const { t } = props;
    return(
        <div id="before-we-get-started">
            <h1>Before We Get Started</h1>
            <hr/>
            <div style={styles.content}>
                <p> {t("tutorial.common.beforeWeGetStarted.p1")}</p>
                <p> {t("tutorial.common.beforeWeGetStarted.p2")}</p>
                <p> {t("tutorial.common.beforeWeGetStarted.p3")}</p>
                <ul>
                    <li>{t("tutorial.common.beforeWeGetStarted.ul1.l1")} </li>
                    <li>{t("tutorial.common.beforeWeGetStarted.ul1.l2")} </li>
                    <li>{t("tutorial.common.beforeWeGetStarted.ul1.l3")} </li>
                    <li>{t("tutorial.common.beforeWeGetStarted.ul1.l4")}</li>
                </ul>
                <p> {t("tutorial.common.beforeWeGetStarted.p4")}</p>
                <strong style={styles.main_color}>
                    <ul>
                        <li>{t("tutorial.common.beforeWeGetStarted.ul2.l1")}</li> 
                        <li>{t("tutorial.common.beforeWeGetStarted.ul2.l2")}</li>
                        <li>{t("tutorial.common.beforeWeGetStarted.ul2.l3")}</li>
                    </ul>
                </strong>
                <p> {t("tutorial.common.beforeWeGetStarted.p5")}</p>
                <p> {t("tutorial.common.beforeWeGetStarted.p6")}</p>
                <p> {t("tutorial.common.beforeWeGetStarted.p7")}</p>
            </div>
            <hr/>
        </div>
    )
} 