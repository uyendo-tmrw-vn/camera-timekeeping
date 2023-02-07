import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
    width: 640,
    height: 500,
    facingMode: "user"
};

const WebcamCapture = () => {

    const [listCapture, setListCapture] = useState([])
    const webcamRef = React.useRef(null);
    const divRef = useRef(null);

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
            <div className="relative">
                <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                />
                <button className="bg-[transparent] absolute w-full h-full left-0 top-0 right-0 flex p-2" onClick={capture}>Capture photo</button>
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