"use client";
import {  useRef, useState } from "react"
import { Suspense } from "react";
import { EmojiGrid } from "../emoji-grid";
import { SubmitButton } from "../emoji-form/submit-button";
// @ts-ignore
import SyntaxHighlighter from 'react-syntax-highlighter';
// @ts-ignore
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

interface PageContentProps extends React.PropsWithChildren {
  prompt?: string
}

export const PageContent = ({ children, prompt }: PageContentProps) => {
  const [inputValue, setInputValue] = useState('');
  const submitRef = useRef(null); 

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const  installMarkdown = `npm install emoji-motion
# or
yarn add emoji-motion
`;
  const  markdown = `import React from 'react';
import EmojiMotion from 'emoji-motion';
  
function App() {
  return <EmojiMotion emoji="😀" style={{ height: 250, width: 250 }} />;
}
`;
  const  example_markdown = `<EmojiMotion emoji="😀" variant="hover" style={{ height: 250, width: 250 }} />`;

  return (
    <>
      <div className="py-[15vh] sm:py-[20vh] flex flex-col items-center justify-center">
        <h1 className="font-medium text-4xl text-black mb-3 animate-in fade-in slide-in-from-bottom-3 duration-1000 ease-in-out">
          EmojiMotion
        </h1>
        <p className="text-gray-500 mb-12 text-base animate-in fade-in slide-in-from-bottom-4 duration-1200 ease-in-out">
          250+ animated emojies
        </p>
        <div className="max-w-md space-y-4 w-full animate-in fade-in slide-in-from-bottom-4 duration-1200 ease-in-out">
          <form className="bg-black rounded-xl shadow-lg h-fit flex flex-row px-1 items-center w-full">
            <input
              defaultValue={inputValue}
              onChange={handleInputChange}
              type="text"
              name="prompt"
              placeholder="smile"
              className="bg-transparent text-white placeholder:text-gray-400 ring-0 outline-none resize-none py-2.5 px-2 font-mono text-sm h-10 w-full transition-all duration-300"
            />
            <SubmitButton ref={submitRef} />
          </form>
          {children}
        </div>
      </div>
      <Suspense>
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Installation & Usage:
          </h3>
          <SyntaxHighlighter language="bash" style={atomOneDark}>
            {installMarkdown}
          </SyntaxHighlighter>
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Basic example: 
          </h4>
          <SyntaxHighlighter language="typescript" style={atomOneDark}>
            {markdown}
          </SyntaxHighlighter>
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              Using the variant Attribute: 
            </h4>
            <p className="leading-7">
            The variant attribute allows you to specify the type of animation for the emoji. The two supported variants are loop and hover:
            </p>
            <ul className="my-6 ml-6 list-disc">
              <li><b>loop</b>: The emoji animation loops continuously.</li>
              <li><b>hover</b>: The animation plays when the user hovers over the emoji.</li>
            </ul>
            Example usage:
            <SyntaxHighlighter language="typescript" style={atomOneDark}>
              {example_markdown}
            </SyntaxHighlighter>
        <EmojiGrid prompt={inputValue} />
      </Suspense>

    </>
  )
}