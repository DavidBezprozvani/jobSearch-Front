import React from 'react';
import { useTranslation } from "react-i18next";


const LandingPage = () => {

    const { t } = useTranslation('home');

    return (
        <>
            <h1>{t('welcome')}</h1>
            <h1>IN PROGRESS!</h1>
        </>
    )
}

export default LandingPage