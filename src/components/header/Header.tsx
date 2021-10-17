import React, {useEffect, useState} from 'react';
import s from './Header.module.css'
import {mainData} from "../app/types";
import {Input, Space} from 'antd';
import {getInfo, getPlace} from "../../helpers/helpers";

const {Search} = Input;

interface IHeader {
    data?: mainData
    setData: (val: mainData) => void
    setOpenSearch: (val: boolean) => void
    openSearch: boolean
    inputRef: any
}

export const Header: React.FC<IHeader> = ({
                                              data,
                                              setData,
                                              setOpenSearch,
                                              openSearch,
                                              inputRef,
                                          }) => {


    const [degree, setDegree] = useState(true)
    const [cityName, setCityName] = useState<string>('Moscow')

    useEffect(() => {
        getInfo(cityName, degree, (val) => {
            setOpenSearch(false)
            setData(val)
        })
    }, [degree])

    const onSearch = (name: string) => {
        getInfo(name, degree, (val) => {
            setOpenSearch(false)
            setData(val)
            setCityName(name)
        })
    }


    return (
        <div className={s.headerBlock}
             ref={inputRef}
             onClick={(e) => e.stopPropagation()}>
            <div className={s.leftBlock}>
                <span className={s.cityName}>
                    {data?.name}
                </span>
                {
                    openSearch ?
                        <Space direction="vertical">
                            <Search placeholder="Город"
                                    onSearch={onSearch}
                                    style={{width: 200}}/>
                        </Space> :
                        <span className={s.bottomText} onClick={() => setOpenSearch(true)}>
                            Сменить город
                        </span>
                }
            </div>
            <div className={s.rightBlock}>
                <span className={s.cityName} onClick={() => setDegree(!degree)}>
                    <span style={{opacity:degree ? 1 : 0.5}}>С</span> /<span style={{opacity:!degree ? 1 : 0.5}}> F</span>
                </span>
                <span className={s.bottomText} onClick={()=>{
                    navigator.geolocation.getCurrentPosition(position => {
                        const { latitude, longitude } = position.coords;
                        getPlace(latitude,longitude, (name) => getInfo(name, degree, (val) => {
                            setOpenSearch(false)
                            setData(val)
                            setCityName(name)
                        }))
                    });
                }}>
                    Моё местоположение
                </span>
            </div>
        </div>
    );
}
