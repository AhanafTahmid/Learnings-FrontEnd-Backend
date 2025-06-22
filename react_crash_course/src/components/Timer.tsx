import { useState, useEffect } from 'react';
// const Timer = () => {
//     const [seconds, setSeconds] = useState<number>(0);
//     // Effect runs after every render
//     useEffect(() => {
//         console.log('Component rendered, seconds:', seconds);
//     });
//     // Effect runs only once (on mount)
//     useEffect(() => {
//         console.log('Component mounted');
//     }, []); // Empty dependency array
//     // Effect runs when seconds changes
//     useEffect(() => {

//         document.title = `Timer: ${seconds}s`;
//     }, [seconds]); // Dependency array with seconds
//     return (
//         <div>
//             <h2>Timer: {seconds} seconds</h2>
//             <button onClick={() => setSeconds(seconds + 1)}>
//                 Increment
//             </button>
//         </div>
//     );
// };

// export default Timer;

//memory leaks

const Timer: React.FC = () => {
    const [windowSize, setWindowSize] = useState<{
        width: number;
        height: number;
    }>({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        // Add event listener
        window.addEventListener('resize', handleResize);
        console.log(handleResize);
        // Cleanup function - runs when component unmounts
        // or before the effect runs again
        // return () => {
        //     window.removeEventListener('resize', handleResize);
        // };
    }, []); // Empty dependency array - effect runs once
    return (
        <div>
            <h2>Window Size</h2>
            <p>Width: {windowSize.width}px</p>
            <p>Height: {windowSize.height}px</p>
        </div>

    );
};

export default Timer;