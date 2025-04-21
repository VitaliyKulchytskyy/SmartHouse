import React from "react";
import Typography from "@mui/material/Typography";

const ValueMonitor = ({ value, legend, min, max }) => {
    const calculateColor = (value, min, max) => {
        const ratio = (value - min) / (max - min);
        const red = Math.min(255, Math.round(255 * ratio));
        const green = Math.min(255, Math.round(255 * (1 - ratio)));
        return `rgb(${red}, ${green}, 0)`;
    };

    const gradientColor = calculateColor(value, min, max);

    return (
        <div className="flex flex-col items-center">
            <Typography
                variant="h3"
                className="font-bold"
                style={{ color: gradientColor }}
            >
                {value}
            </Typography>
            <Typography variant="body1" className="font-light text-gray-500">
                {legend}
            </Typography>
        </div>
    );
};

export default ValueMonitor;
