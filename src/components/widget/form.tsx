import React, {useState, useEffect} from "react";
import CodePiece from './code';

const styles = {
    form_box: {
        border: '1px solid white',
        padding: '20px'
    }
}

export default function Form(){

    const [input, setInput] = useState();

    const raw_tx_template = `{
        version: "0x0",
        cell_deps: [
          {
            out_point: {
              tx_hash:
                "...",
              index: "...",
            },
            dep_type: "dep_group",
          },
        ],
        header_deps: [],
        inputs: [
          {
            since: "0x0",
            previous_output: {
              tx_hash:
                "...",
              index: "...",
            },
          },
        ],
        outputs: [
          {
            capacity: "...",
            lock: {
              code_hash:
                "...",
              hash_type: "...",
              args: "...",
            },
          },
        ],
        outputs_data: ["..."]
};`
    
    const handleChange = function(){

    }

    const handleSubmit = function(){

    }

    return(
      <form onSubmit={handleSubmit} style={styles.form_box}>
        <CodePiece code={raw_tx_template} isContentEditable={true}></CodePiece>
        <input type="submit" value="Submit" />
      </form>
    )
}