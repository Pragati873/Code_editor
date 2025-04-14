import {useParams} from "react-router-dom"
import React, { useRef, useState } from "react";
import "./index.scss"
import { EditorContainer } from "./EditorContainer";
export const PlaygroundScreen=()=>{
    const params=useParams();
    const [input,setInput]=useState('');
    const {fileId,folderId}=params;
    const [output,setOutput]=useState('');

    const importInput=(e)=>{
        const file=e.target.files[0];
        const fileType=file.type.includes("text")
        if(fileType){
           
            const fileReader=new FileReader();
            fileReader.readAsText(file);
            fileReader.onload=(e)=>{
                setInput(e.target.result)
            }
            }
        
        else{
            alert("Please choose a program file");
        }
    }
    const exportOutput=()=>{
        //download a txt file the contents for output textarea 
        const outputValue=output.trim();
        if(!outputValue){
            alert("Output is empty");
            return;
        }
        const blob=new Blob([outputValue],{type:"text/plain"})
        const url=URL.createObjectURL(blob);
        const link=document.createElement("a")
        link.href=url;
        link.download=`output.txt`;
        link.click();
    }
    return(
        <div className="playground-container">
            <div className="header-container">
                <img src="/logo512.png" className="logo"/>
            </div>
            <div className="content-container">
            <div className="editor-container">
                <EditorContainer fileId={fileId} folderderId={folderId}>, follder</EditorContainer>

            </div>
            <div className="input-output-container">
                <div className="input-header">
                   <b>Input:</b> 
                   <label htmlFor="input" className="icon-container">
               <span class="material-icons">
                cloud_upload
                </span>
                    <b className="">Import Input</b>
                   </label>
                   <input type="file" id="input" style={{display:'none'}} onChange={importInput}/>
                </div>

                <textarea value={input} onChange={(e)=>setInput(e.target.value)}></textarea>
            </div>
            <div className="input-output-container">
                <div className="input-header">
                    <b>Output:</b>
                    <button className="icon-container" onClick={exportOutput}>
                        <span className="material-icons">cloud_download</span>
                        <b>Export Output</b>
                    </button>
                </div>
                <textarea readOnly value={output} onChange={(e)=>setOutput(e.target.value)}></textarea>
                </div>
            </div>
        </div>
    );
      
}