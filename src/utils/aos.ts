"use client";

import { useEffect } from 'react'
import AOS from "aos";
import "aos/dist/aos.css";

function AosInitials() {
    useEffect(() => {
        AOS.init();
    }, []);


    return null;
}

export default AosInitials