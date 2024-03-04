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

  const  markdown = `
import EmojiMotion from "emoji-motion";

<EmojiMotion emoji={😀} style={{ height: 250, width: 250 }}/>
`;

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
          <h2 className="border-b scroll-m-20 text-xl font-semibold tracking-tight">
            Installation & Usage:
          </h2>
          	
          <SyntaxHighlighter language="typescript" style={atomOneDark}>
            {markdown}
          </SyntaxHighlighter>
          {/* <CodeSnippet /> */}
        <EmojiGrid prompt={inputValue} />
      </Suspense>

    </>
  )
}