import React, { useContext, useRef, useState } from "react"; 
import "./EditorContainer.scss";
import { Editor } from "@monaco-editor/react";
import { PlaygroundContext } from "../../Providers/PlaygroundProvider";

const editorOptions={
    fontSize:18,
    wordWrap:'on'
}
export const EditorContainer=({fileId,folderId})=>{ 
    const {getDefaultCode,getLanguage}=useContext(PlaygroundContext);
    const [code,setCode]=useState(()=>{
    return getDefaultCode(fileId,folderId);
    });
    const [language,setLanguage]=useState(()=>getLanguage);
    const [theme,setTheme]=useState('vs-dark');
    const codeRef=useRef(code);
    console.log(codeRef);
    const onChangeCode=(newCode)=>{
        //to do handle something with new code  
        codeRef.current=newCode;
    }
    const importCode=(event)=>{
        const file=event.target.files[0];
        const fileType=file.type.includes("text")
        if(fileType){
           
            const fileReader=new FileReader();
            fileReader.readAsText(file);
            fileReader.onload=function(value){
                const importedCode=value.target.result;
                setCode(importedCode);
                codeRef.current = importedCode;

            }
        }
        else{
            alert("Please choose a program file");
        }
    }
    const fileExtensionMapping={
        cpp:'cpp',
        javascript:'js',
        python:'py',
        java:'java'
    }
    const exportCode=()=>{
        const codeValue=codeRef.current?.trim();

        if(!codeValue){
            alert("Please type some code before exporting");
        }
        //1.create a blob 
        const codeBlob=new Blob([codeValue], {type:"text/plain"})
        //2. create the downloadable link with blob data
        const downloadUrl=URL.createObjectURL(codeBlob);
        //3. create a clickable link to download the blob
        const link=document.createElement("a");
        link.href=downloadUrl;
       
        link.download=`code.${fileExtensionMapping[language]}`
        link.click();
    }
    const onChangeLangauage=(e)=>{
        setLanguage(e.target.value);
    }
    const onChangeTheme=(e)=>{
        setTheme(e.target.value);
    }
    return (
        <div className="root-editor-container">
            <div className="editor-header">
                <div className="editor-left-container" >
                    <b className="title">{"title of the card"}</b>
                    <span className="material-icons"></span>
                    <button>Save code</button>
                </div>
                <div className="editor-right-container">
                    <select onChange={onChangeLangauage} value={language}>
                      <option value="cpp">cpp</option> 
                      <option value="javascript">javascript</option> 
                      <option value="java">java</option> 
                      <option value="python">python</option>  
                    </select>
                    <select onChange={onChangeTheme} value={theme}> 
                        <option value="vs-dark">vs-dark</option>
                        <option value="vs-light">vs-light</option>
                    </select>
                </div>
            </div>
            <div className="editor-body">
               <Editor
               language={language}
               height={"100%"}
               options={editorOptions}
               theme={theme}
               onChange={onChangeCode}
               value={code}
               />
            </div>
            <div className="editor-footer">
                <button className="btn">
                    <span className="material-icons">fullscreen</span>
                    <span>Full Screen</span>
                </button>
                <label htmlFor="import-code" className="btn">
                    <span className="material-icons">cloud_download</span>
                    <span >Import Code</span>
                    </label>
                <input type="file" id="import-code" style={{display:'none'}} onChange={importCode}></input>
                <button className="btn" onClick={exportCode}>
                    <span className="material-icons">cloud_upload</span>
                    <span>Export Code</span>
                </button>
                <button className="btn">
                    <span className="material-icons">play_arrow</span>
                    <span>Run Code</span>
                </button>
            </div>
        </div>
    );
}