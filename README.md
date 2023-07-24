

#### DEMO
[Demo react-richtextbox](https://stackblitz.com/edit/stackblitz-starters-pwfnqk?file=src%2FApp.tsx)




## Install Package
```sh
npm i react-richtextbox
```


The react-richtextbox npm package provides a powerful and customizable rich text box component for React applications. This component allows users to input and edit text with formatting options, similar to a basic text editor.

## Features
###### Rich Text Editing
Users can apply various text formatting options such as bold, italic, underline, bullet points, numbering, etc., using familiar toolbar buttons.

###### Customizable Styles
Easily customize the look and feel of the rich text box to match the design of your application.

##### HTML Content Support:
The component supports both input and output of content in HTML format, making it compatible with other components that use HTML content.

##### Image Resize:
The component supports inline image height width using  mouse drag.

###### Example
![react-richtextbox](https://media.giphy.com/media/nqViEnQtE2ctUNP5jm/giphy.gif)

Following toolbar config are default and optional
```jsx static
 const defaultoolbarConfig =  [
    'UNDO',
    'REDO',
    'BOLD',
    'ITALIC',
    'UNDERLINE',
    'STRICKTHROUGH',
    'LEFTALIGN',
    'CENTERALIGN',
    'RIGHTALIGN',
    'JUSTIFYALIGN',
    'ORDERLIST',
    'UNORDERLIST',
    'TEXTCOLOR',
    'TEXTBACKGROUNDCOLOR',
    'HYPERLINK',
    'IMAGE',
    'FONTSIZE'

];
```



```jsx static
import React from "react";
import React from "react";
import Richtextbox from "react-richtextbox";
const onChange = (htmlData) => {
    console.log(htmlData)
}

const toolbarConfig =  [
    'UNDO',
    'REDO',
    'BOLD',
    'ITALIC',
    'UNDERLINE',
    'STRICKTHROUGH',
    'LEFTALIGN',
    'CENTERALIGN',
    'RIGHTALIGN',
    'JUSTIFYALIGN',

];

function App() {
    return (
        <>
            <Richtextbox
                height={250} // optional
                width={600} // optional
                initialValue={`<h1>react-richtextbox<h1/>`} // optional
                toolbarConfig={toolbarConfig} // optional
                onChange={onChange} //optional
            />
        </>

    );
}

export default App;
```

