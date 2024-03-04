"use client";
import { useEffect, useRef, useState } from "react"
import { SubmitButton } from "./submit-button";

interface EmojiFormProps {
  initialPrompt?: string
}

export function EmojiForm({ initialPrompt }: EmojiFormProps) {
  const [inputValue, setInputValue] = useState(''); // State to track input value
  const submitRef = useRef(null); // Ref for the submit button, if needed

  const handleInputChange = (e) => {
    setInputValue(e.target.value); // Update state with input value
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission action
    console.log('Submitted value:', inputValue); // Log or handle the submitted input value
    // Here you can also clear the input field if needed
    // setInputValue('');
  };
  return (
    <form className="bg-black rounded-xl shadow-lg h-fit flex flex-row px-1 items-center w-full" onSubmit={handleSubmit}>
      <input
        defaultValue={inputValue}
        onChange={handleInputChange}
        type="text"
        name="prompt"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            submitRef.current?.click();
          }
        }}
        className="bg-transparent text-white placeholder:text-gray-400 ring-0 outline-none resize-none py-2.5 px-2 font-mono text-sm h-10 w-full transition-all duration-300"
      />
      <SubmitButton ref={submitRef} />
    </form>
  )
}