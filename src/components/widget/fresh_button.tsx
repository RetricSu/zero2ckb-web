import React, {useState, useEffect, useRef} from "react";
import {
    Button
} from "@material-ui/core";
import commonStyle from "./common_style";
import { useSpring, animated } from "react-spring";
import "./button.css";

export type Props = {
    isLoading: boolean
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

    const [showLoader, setShowLoader] = useState(false);

    useEffect(() => {
        if (props.isLoading) {
          setShowLoader(true);
        }
    
        // Show loader a bits longer to avoid loading flash
        if (!props.isLoading && showLoader) {
          const timeout = setTimeout(() => {
            setShowLoader(false);
          }, 400);
    
          return () => {
            clearTimeout(timeout);
          };
        }
      }, [props.isLoading, showLoader]);
  
    // Hooks used to fade in/out the loader or the button contents
    const fadeOutProps = useSpring({ opacity: showLoader ? 1 : 0 });
    const fadeInProps = useSpring({ opacity: showLoader ? 0 : 1 });

    return(
        <div>
            <button style={styles.btn} onClick={props.onClick} >
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