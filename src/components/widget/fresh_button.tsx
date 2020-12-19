/**** 
 * improve: 
 *  - [x] every button instance of this componet  must create its own isLoading and setIsLoading, this is ugly and unacceptable.
 *  - [ ] should provide css customize option for user
 *  - [ ] try export this as a standalone button for re-use
 */
import React, {useState, useEffect, useRef, CSSProperties} from "react";
import commonStyle from "./common_style";
import { useSpring, animated } from "react-spring";
import "./button.css";

export type Props = {
    custom_style?: CSSProperties
    isLoading?: boolean
    text: string
    onClick: () => void
}

const styles = {...commonStyle, ...{
    loader: {
        border: '4px solid rgba(60, 198, 138, 0.2)',
        borderLeft: '4px solid',
        animation: 'load 1s infinite linear',
        borderRadius: '50%',
        width: '25px',
        height: '25px',
        margin: '0 auto'
    },
    btn: {
        padding: '0.5rem 1rem',
        fontSize: '12px',
        color: 'white',
        borderRadius: '6px',
        border: '1px solid ' + commonStyle.main_color.color,
        outline:'none',
        backgroundColor: 'rgb(255,255,255, 0)',
        cursor: 'pointer'
    },
    btndiv: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },
    btn_hover: {
        padding: '0.5rem 1rem',
        fontSize: '12px',
        color: 'white',
        borderRadius: '6px',
        border: '1px solid ' + commonStyle.main_color.color,
        outline:'none',
        backgroundColor: commonStyle.main_color.color,
        cursor: 'pointer'
    }
}}

const Loader = () => <div style={styles.loader} />;

export default function FreshButton(props: Props){

    /* Capture the dimensions of the button before the loading happens
    so it doesn’t change size when showing the loader */
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const ref = useRef<HTMLButtonElement>(null);


    const isLoadingMissed = props.isLoading === undefined;

    const [showLoader, setShowLoader] = useState(false);
    const [isLoading, setIsLoading] = useState( isLoadingMissed ? false : props.isLoading);
    const [isHover, setIsHover] = useState(false);

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
    
    /*
    useEffect(() => {
        if (ref.current && ref.current.getBoundingClientRect().width) {
          setWidth(ref.current.getBoundingClientRect().width);
        }
        if (ref.current && ref.current.getBoundingClientRect().height) {
          setHeight(ref.current.getBoundingClientRect().height);
        }
      }, [props.text]);
    */

    const toogleHover = () => {
        setIsHover(!isHover);
    }

    const wh_style = width && height
    ? {
        width: `${width}px`,
        height: `${height}px`,
      }
    : {};
    const hover_style = isHover ? styles.btn_hover : styles.btn;
    const btn_style = {...hover_style, ...wh_style};
    const mystyle = props.custom_style === "undefined" ? {} : props.custom_style; 
    const final_style = {...btn_style, ...mystyle};

    return(
      <button style={final_style} onClick={extendedOnClick} onMouseEnter={toogleHover} onMouseLeave={toogleHover} ref={ref} >
      {showLoader ? (
            <animated.div style={fadeOutProps}>
              <Loader />
            </animated.div>
          ) : (
            <animated.div style={fadeInProps}>{props.text}</animated.div>
      )}
      </button>
    )
}