import React from 'react';
import Logo from './Logo';

const LoadingScreen = ({ val, progress }) => {
    const { textColor, backgroundColor, buttonColor } = val || {};

    return (
        <div
            style={{
                backgroundColor: backgroundColor,
                color: textColor
            }}
            className="fixed inset-0 z-9999 flex flex-col items-center justify-center"
        >
            <div className="flex flex-col items-center space-y-8">
                <Logo textColor={textColor} />
                <div className="text-center">
                    <h1 className="text-4xl font-bold uppercase tracking-wider mb-4">
                        Loading Your Sound
                    </h1>
                    <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div
                            style={{
                                backgroundColor: buttonColor,
                                width: `${progress}%`,
                                transition: 'width 0.3s ease'
                            }}
                            className="h-full"
                        ></div>
                    </div>
                    <p className="text-lg mt-4 opacity-75">
                        {Math.round(progress)}%
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoadingScreen;