import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
    width: 640,
    height: 500,
    facingMode: "user"
};

const WebcamCapture = () => {

    const [listCapture, setListCapture] = useState([])
    const webcamRef = React.useRef(null);


    const capture = React.useCallback(
        () => {
            // console.log(222);
            const imageSrc = webcamRef.current.getScreenshot();
            console.log({ imageSrc });
            imageSrc && setListCapture(prev => [...prev, imageSrc])
        },
        [webcamRef]
    );

    useEffect(() => {
        if (listCapture) {
            console.log({ listCapture });
        }
    }, [listCapture])

    return (
        <div className="relative w-[640px] overflow-hidden">
            <div className="relative">
                <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                />
                <button className="absolute w-full h-full left-0 top-0 right-0 flex p-2" onClick={capture}>Capture photo</button>
            </div>
            <div className="flex overflow-x-auto">
                {
                    listCapture && listCapture.length > 0 ? listCapture.map((item, index) => {
                        return <img className="w-[100px]" key={index} src={item} />
                    }) : ''
                }
            </div>
        </div>
    );
};

export default WebcamCapture