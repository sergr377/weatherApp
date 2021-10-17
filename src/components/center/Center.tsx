import React from 'react';
import s from './Center.module.css'
import {mainData} from "../app/types";
import {imgHandler} from "../../helpers/helpers";

export const Center: React.FC<{ data?: mainData }> = ({data}) => {

    function ucFirst(str: string) {
        if (!str) return str;
        return str[0].toUpperCase() + str.slice(1);
    }

    return (
        <div className={s.mainBlock}>
            {
                data?.weather?.map(item => {
                    return (
                        <>
                            <div className={s.tempBlock}>
                                <object type="image/svg+xml" data={imgHandler(item.icon)} width={'50%'}
                                        height={'50%'}> </object>
                                <span>{Math.round(data?.main?.temp)}°</span>
                            </div>
                            <span>{ucFirst(item.description)}</span>
                        </>
                    )
                })
            }

        </div>
    );
}

