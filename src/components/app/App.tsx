import React, {useEffect, useState} from 'react';
import s from './App.module.css'
import './App.module.css';
import {mainData} from "./types";
import {Header} from "../header/Header";
import {Center} from "../center/Center";
import {Footer} from "../footer/Footer";
import {getInfo} from "../../helpers/helpers";

function App() {

    const [data, setData] = useState<mainData>()
    const inputRef = React.useRef<any>(null);

    useEffect(() => {
        getInfo('Moscow', true, setData)
    }, [])

    const [openSearch, setOpenSearch] = useState(false)

    return (
        <div className={s.mainBlock}
             onClick={(e) => e.target !== inputRef.current && setOpenSearch(false)}>
            <Header data={data}
                    setData={setData}
                    openSearch={openSearch}
                    setOpenSearch={setOpenSearch}
                    inputRef={inputRef}/>
            <Center data={data}/>
            <Footer data={data}/>
        </div>
    );
}

export default App;
