/**** 
 * improve: 
 *  - [x] every button instance of this componet  must create its own isLoading and setIsLoading, this is ugly and unacceptable.
 *  - [ ] should provide css customize option for user
 *  - [ ] try export this as a standalone button for re-use
 */
import React, {useState, useEffect, useRef} from "react";
import commonStyle from "./common_style";
import { useSpring, animated } from "react-spring";
import "./button.css";

export type Props = {
    isLoading?: boolean
    text: string
    onClick: () => void
}

const styles = {...commonStyle, ...{
    loader: {
        border: '4px solid rgba(255, 255, 255, 0.2)',
        borderLeft: '4px solid',
        animation: 'load 1s infinite linear',
        borderRadius: '50%',
        width: '25px',
        height: '25px'
    },
    btn: {
        padding: '1rem 2rem',
        fontSize: '16px',
        color: '#ffffff',
        borderRadius: '6px',
        backgroundColor: '#2080df'
    },
    btndiv: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    }
}}

const Loader = () => <div style={styles.loader} />;

export default function FreshButton(props: Props){

    const isLoadingMissed = props.isLoading === undefined;

    const [showLoader, setShowLoader] = useState(false);
    const [isLoading, setIsLoading] = useState( isLoadingMissed ? false : props.isLoading);

    const extendedOnClick = async () => {
      if(isLoadingMissed)setIsLoading(true);
      await props.onClick();
      if(isLoadingMissed)setIsLoading(false);
    }

    useEffect(() => {
        if(props.isLoading !== undefined)
          setIsLoading(props.isLoading);

        if (isLoading) {
          setShowLoader(true);
        }
    
        // Show loader a bits longer to avoid loading flash
        if (!isLoading && showLoader) {
          const timeout = setTimeout(() => {
            setShowLoader(false);
          }, 400);
    
          return () => {
            clearTimeout(timeout);
          };
        }
      }, [props.isLoading, isLoading, showLoader]);
  
    // Hooks used to fade in/out the loader or the button contents
    const fadeOutProps = useSpring({ opacity: showLoader ? 1 : 0 });
    const fadeInProps = useSpring({ opacity: showLoader ? 0 : 1 });

    return(
        <div>
            <button style={styles.btn} onClick={extendedOnClick} >
            {showLoader ? (
                  <animated.div style={fadeOutProps}>
                    <Loader />
                  </animated.div>
                ) : (
                  <animated.div style={fadeInProps}>{props.text}</animated.div>
            )}
            </button>
        </div>
    )
}