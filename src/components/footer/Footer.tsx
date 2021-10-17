import React from 'react';
import s from './Footer.module.css'
import {mainData} from "../app/types";

export const Footer: React.FC<{ data?: mainData }> = ({data}) => {
    return (
        <div className={s.footerBlock}>
            <div className={s.infoBlock}>
                <span className={s.headerText}>
                    Ветер
                </span>
                <span className={s.bottomText}>
                    {data?.wind?.speed} м/с
                </span>
            </div>
            <div className={s.infoBlock}>
                <span className={s.headerText}>
                    Давление
                </span>
                <span className={s.bottomText}>
                    {data?.main?.pressure} мм рт. ст.
                </span>
            </div>
            <div className={s.infoBlock}>
                <span className={s.headerText}>
                    Влажность
                </span>
                <span className={s.bottomText}>
                    {data?.main?.humidity}%
                </span>
            </div>
            <div className={s.infoBlock}>
                <span className={s.headerText}>
                    Ощущается как
                </span>
                <span className={s.bottomText}>
                    {data?.main?.feels_like && Math.round(data?.main?.feels_like)}°
                </span>
            </div>
        </div>
    );
}

