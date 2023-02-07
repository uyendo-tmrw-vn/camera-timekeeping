import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";

const WebcamDeviceId = () => {
    const [deviceId, setDeviceId] = React.useState({});
    const [devices, setDevices] = React.useState([]);

    const handleDevices = React.useCallback(
        mediaDevices =>
            setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
        [setDevices]
    );

    React.useEffect(
        () => {
            console.log(navigator?.mediaDevices);
            // navigator?.mediaDevices
        },
        [handleDevices]
    );

    return (
        <>
            <Webcam audio={false} videoConstraints={{ deviceId }} />
            <div>
                {devices.map((device, key) => (
                    <button
                        key={device.deviceId}
                        onClick={() => setDeviceId(device.deviceId)}
                    >
                        {device.label || `Device ${key + 1}`}
                    </button>
                ))}
            </div>
        </>
    );
};
export default WebcamDeviceId