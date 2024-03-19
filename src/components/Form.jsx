
import "./Form.css";
import React, { useState, useEffect, useRef } from 'react';
import MonacoEditor from 'react-monaco-editor';
import axios from 'axios';
const SubmissionForm = () => {
    const [language, setLanguage] = useState();
    const [code, setCode] = useState('');
    const [stdin, setStdin] = useState('asluh');
    const [stdout, setStdout] = useState('');
    const [username, setUsername] = useState('');
    

    function encodeToBase64(string) {
        return btoa(string);
      }

    function decodeFromBase64(encodedString) {
        return atob(encodedString);
    }

    const handleRun = async () => {
        const token = await handlePost();
        if (token) {
            Output(token);
        }


    }


    const Output = async (token) => {
        const options = {
            method: 'GET',
            url: `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
            params: {
                base64_encoded: 'true',
                fields: '*'
            },
            headers: {
                'X-RapidAPI-Key': '82b3aeacd3mshe010573867cdb84p137843jsn3e4fa42304d1',
                'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);

            console.log("FInal result: ",response.data);
        } catch (error) {
            console.error(error);
        }
    }
    const  handlePost = async () => {
        const cp = encodeToBase64(code);
        const inp = encodeToBase64(stdin);

        const options = {
            method: 'POST',
            url: 'https://judge0-ce.p.rapidapi.com/submissions',
            params: {
                base64_encoded: 'true',
                fields: '*'
            },
            headers: {
                'Content-Type': 'application/json',
                'X-RapidAPI-Key': '82b3aeacd3mshe010573867cdb84p137843jsn3e4fa42304d1',
                'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
            },
            data: {
                language_id: language,
                source_code: cp,
                stdin: inp
            }
        };

        try {
            const response = await axios.request(options);
            console.log(response.data);
            return response.data.token; 
        } catch (error) {
            console.error(error);
            return null;
        }

    };

    const handleName = (e) =>{
        setUsername(e.target.value);
    }
    const handleLanguageChange = (e) => {
        const lang = e.target.value;
      
        switch(lang) {
            case 'cpp':
                setLanguage(54); 
                break;
            case 'Java':
                setLanguage(62); 
                break;
            case 'JavaScript':
                setLanguage(63); 
                break;
            case 'python':
                setLanguage(71);
                break;
            default:
                setLanguage(null); 
        }
    }
    
    const handleInp = (e) => {
        setStdin(e.target.value);
    }
    const handleCodeChange = (newValue) => {
        setCode(newValue);
    };

    return (
        <div className='formPage'>
            <h1 className="formhead">CodeStocks</h1>
            <div className="formBox">
                <form action="" className='form'>
                    <div className="left">
                        <div className="innerLeft">
                            <input type="text" name='username' placeholder='UserName' className='name' onChange={handleName}/>
                            <input type="text" name='snippet' placeholder='Snippet Name' className='snipName' />
                            <select name="language" id="language" placeholder='Language' className='lang' onChange={handleLanguageChange} value={language}>
                                <option value="" selected hidden>Language</option>
                                <option value="cpp">C++</option>
                                <option value="Java">Java</option>
                                <option value="JavaScript">JavaScript</option>
                                <option value="python">Python</option>
                            </select>
                            <textarea name="input" id="input" cols="30" rows="10" placeholder='Stdin' className='inp' onChange={handleInp} value={stdin}></textarea>
                        </div>
                    </div>
                    <div className="right">
                        <MonacoEditor
                            width="100%"
                            outline="none"
                            border="none"
                            height={400}
                            language={language}
                            theme="vs-dark"
                            value={code}
                            
                            options={{
                                selectOnLineNumbers: true,
                                fontSize: 14,
                                minimap: {
                                    enabled: false
                                },
                                wordWrap: 'on'
                            }}
                            onChange={handleCodeChange}
                            
                            style={{ textAlign: 'left' }}
                        />
                        <div className="buttons">
                            <button type='button' onClick={handleRun}>Run</button>
                            <button type="Submit">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SubmissionForm