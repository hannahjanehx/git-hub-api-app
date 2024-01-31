import { useEffect, useState } from 'react';
import '../App.css';

type inputProps = {
    labelText: string;
    value: string;
    submissionFunction: (input: string) => void;
  }

function Input({labelText, value, submissionFunction}: inputProps) {

    const [input, setInput] = useState<string>(value);

    const submitInput = () => {
        submissionFunction(input)
    }

    useEffect(() => {
        setInput(value)
    }, [value]);

    return (
        <div className="p-2">
            <label className='text-sm font-semibold leading-6 text-gray-900' htmlFor="searchInput">{labelText}</label>
            <input className='rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 m-1' name='searchInput' id='searchInput' type='text' onChange={(event) => setInput(event.target.value)} value={input}></input>
            <button className='rounded-md shadow-sm bg-gray-100 ring-1 ring-inset ring-gray-300 m-1 px-1.5' type='submit' onClick={submitInput}>Search</button>
        </div>
    );
}

export default Input;
