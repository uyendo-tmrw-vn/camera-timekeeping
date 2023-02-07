import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";

const FACING_MODE_USER = "user";
const FACING_MODE_ENVIRONMENT = "environment";


const videoConstraints = {
    width: 640,
    height: 500,
    facingMode: FACING_MODE_USER
};

const WebcamCapture = () => {

    const [listCapture, setListCapture] = useState([])
    const webcamRef = React.useRef(null);
    const divRef = useRef(null);

    const [facingMode, setFacingMode] = React.useState(FACING_MODE_USER);

    const handleClick = React.useCallback(() => {
        setFacingMode(
            prevState =>
                prevState === FACING_MODE_USER
                    ? FACING_MODE_ENVIRONMENT
                    : FACING_MODE_USER
        );
    }, []);

    const capture = React.useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot();
            imageSrc && setListCapture(prev => [...prev, imageSrc])
        },
        [webcamRef]
    );

    useEffect(() => {
        if (listCapture) {
            divRef.current?.scrollIntoView({ behavior: 'smooth' });

        }
    }, [listCapture])

    return (
        <div className="relative w-screen overflow-hidden">
            <button onClick={handleClick}>Switch camera</button>
            <div className="relative">
                <Webcam
                    className="cursor-pointer"
                    onClick={capture}
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={{
                        ...videoConstraints,
                        facingMode
                    }}
                />
            </div>
            <div ref={divRef} className="flex overflow-x-auto">
                <div className="flex">
                    {
                        listCapture && listCapture.length > 0 ? listCapture.map((item, index) => {
                            return <img className="w-[100px]" key={index} src={item} />
                        }) : ''
                    }
                </div>
            </div>
        </div>
    );
};

export default WebcamCapture