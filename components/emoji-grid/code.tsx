 
import React from "react"; 
import { CopyBlock,dracula } from "react-code-blocks"; 

const CodeSnippet = () => {
const  markdown = `
import EmojiMotion from "emoji-motion";

<EmojiMotion emoji={😀} style={{ height: 250, width: 250 }}/>
`;
  return ( 
    <CopyBlock 
      text={markdown}
      language='typescript'
      theme={dracula}
      showLineNumbers={true}
      codeBlock
    />

  );
};

export default CodeSnippet;