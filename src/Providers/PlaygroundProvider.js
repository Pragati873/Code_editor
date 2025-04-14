import { createContext,useContext, useEffect,useState } from "react";
import {v4} from 'uuid'
export const PlaygroundContext=createContext();

const initialData=[
   {
    id: v4(),
    title:'Spring Boot',
    files:[{
        id:v4(),
        title:'index',
        code:'cout<<"hello world"',
        language:'cpp'
    }]
   },
   {
   id: v4(),
   title:'Frontend',
   files:[{
       id:v4(),
       title:'index',
       code:'console.log("hello frontend")',
       language:'javascript'
   }]
}
];
 export const defaultCodes={
    ['cpp']:`
    #include <iostream>
    int main()
{
std::cout<<"Hello World";
return 0;
}`,
    ['javascript']:`console.log("hello js")`,
    ['python']:`print("hello python");`,
    "java":`
    public class Main
{
public static void main(String[] args) {
System.out.println("Hello World");
}
}`
}
export const PlaygroundProvider=({children})=>{
  const [folders, setFolders] = useState(() => {
    const localData = localStorage.getItem('data');
    try {
        const parsed = localData ? JSON.parse(localData) : initialData;
        if (!Array.isArray(parsed)) throw new Error("Invalid data structure");
        return parsed;
    } catch (error) {
        console.error("Error parsing localStorage data:", error);
        localStorage.setItem('data', JSON.stringify(initialData)); // 👈 reset here!
        return initialData;
    }
});

     
    
    const createNewPlayground=(newPlayground)=>{
        const {fileName, folderName,language}= newPlayground;
        const newFolders=[...folders];
        newFolders.push({
            id:v4(),
            title:folderName,
            files:[{
                id:v4(),
                title:fileName,
                code:defaultCodes[language],
                language
            }]
        })
        localStorage.setItem('data',JSON.stringify(newFolders));
        setFolders(newFolders);
    }
    const createNewFolder = (folderName) => {
        const newFolder = { id: v4(), title: folderName, files: [] };
        const updatedFolders = [...folders, newFolder];
        setFolders(updatedFolders);
        localStorage.setItem("data", JSON.stringify(updatedFolders));
    };

    const deleteFolder = (id) => {
        const updatedFoldersList = folders.filter((folderItem) => folderItem.id !== id);
        setFolders([...updatedFoldersList]);  
        localStorage.setItem('data', JSON.stringify(updatedFoldersList));
    };
    const editFolderTitle = (newFolderName, id) => {
        const updatedFoldersList = folders.map((folderItem) => {
          if (folderItem.id === id) {
            return {
              ...folderItem, // clone the object
              title: newFolderName // update title
            };
          }
          return folderItem; // unchanged folder
        });
      
        localStorage.setItem('data', JSON.stringify(updatedFoldersList));
        setFolders(updatedFoldersList);
      };
      
      const editFileTitle = (newFileName, folderId, fileId) => {
        const copiedFolders = [...folders];
        for (let i = 0; i < copiedFolders.length; i++) {
          if (folderId === copiedFolders[i].id) {
            const files = copiedFolders[i].files;
            for (let j = 0; j < files.length; j++) {
              if (files[j].id === fileId) {
                files[j].title = newFileName;
                break;
              }
            }
            break;
          }
        }
        localStorage.setItem('data', JSON.stringify(copiedFolders)); // fix here too
        setFolders(copiedFolders);
      };
      
      const deleteFile = (folderId, fileId) => {
        const updatedFolders = folders.map(folder => {
          if (folder.id === folderId) {
            const updatedFiles = folder.files.filter(file => file.id !== fileId);
            return { ...folder, files: updatedFiles };
          }
          return folder;
        });
      
        setFolders(updatedFolders);
        localStorage.setItem('data', JSON.stringify(updatedFolders));
      };


      const createPlayground=(folderId,file)=>{
        const copiedFolders=[...folders]
        for(let i=0;i<copiedFolders.length;i++){
          if(copiedFolders[i].id=== folderId){
            copiedFolders[i].files.push(file);
            break;
          }
        }
        localStorage.setItem('data',JSON.stringify(copiedFolders));
        setFolders(copiedFolders);
      }
      const getDefaultCode=(fileId,folderId)=>{
        for(let i=0;i<folders.length;i++){
          if(folders[i].id===folderId){
            for(let j=0;j<folders[i].files.length;j++){
              const curr=folders[i].files[j];
              if(fileId===folders[i].files[j].id){
                  return curr.code;
              }
            }
          }
        }
      }
      const getLanguage=(fileId,folderId)=>{
        for(let i=0;i<folders.length;i++){
          if(folders[i].id===folderId){
            for(let j=0;j<folders[i].files.length;j++){
              const curr=folders[i].files[j];
              if(fileId===folders[i].files[j].id){
                  return curr.language;
              }
            }
          }
        }
      }
      const updateLanguage=(fileId,folderId,language)=>{
        const newFolders=[...newFolders];
        for(let i=0;i<newFolders.length;i++){
          if(newFolders[i].id===folderId){
            for(let j=0;j<newFolders[i].files.length;j++){
              const curr=newFolders[i].files[j];
              if(fileId===newFolders[i].files[j].id){
                 newFolders[i].files[j].code=defaultCodes[language]
                 newFolders[i].files[j].language=language
              }
            }
          }
        }
        setFolders(newFolders);
      }
    useEffect(()=>{
        if(!localStorage.getItem('data'))
        {
            localStorage.setItem('data' ,JSON.stringify(folders))
        }
    },[])
   const playgroundFeatures={
    folders,
    createNewPlayground,
    createNewFolder,
    deleteFolder,
    editFolderTitle, 
    editFileTitle,
    deleteFile,
    createPlayground,
    getDefaultCode,
    getLanguage
   }
    return (
        <PlaygroundContext.Provider value={playgroundFeatures}>
        {children}
        </PlaygroundContext.Provider>
    );
}