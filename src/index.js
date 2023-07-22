import React,{useRef, useState} from "react";
import {useEffect} from "react";
import './style.css'

const defaultToolbarConfig =  [
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

function Richtextbox({height = 250, width = 600, toolbarConfig = defaultToolbarConfig ,onChange= null}){



    const contentEditableRef = useRef(null);
    const targetRef = useRef(null);
    const [headerHeight,setHeaderHeight] =  useState(null)

    const [isOpen,setOpen] = useState(false)

    const useClickOutside = (ref, callback) => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                callback();
            }
        };

        useEffect(() => {
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }, [ref, callback]);
    };

    useClickOutside(targetRef, () => {
        setOpen(false);
    });
    function applyFormatting(command) {
        document.execCommand(command, false, null);
    }

    function insertHyperlink() {
        var selectedText = window.getSelection().toString();
        if (selectedText) {
            var url = prompt("Enter the URL:");

            document.execCommand('createLink', false, url);
        } else {
            alert('Please Select Text')
        }

    }

    function insertImage() {
        var imgSrc = prompt("Enter the URL:");

        if(imgSrc && imgSrc.trim()) {
            var confirmationAuto  = window.confirm("Image Size Auto")
            if(confirmationAuto) {
                var imgElement = `<img src=${imgSrc}>`;
                document.execCommand('insertHTML', false, imgElement);
            } else {
                var height = prompt("Height:");
                var width = prompt("Width");
                var imgElement = `<img src=${imgSrc} height=${height} width=${width}>`;
                document.execCommand('insertHTML', false, imgElement);
            }

        }


    }
    function changeTextColor(e) {
        document.execCommand('foreColor', false, e.target.value);
    }

    function changeTextBackgroundColor(e) {
        document.execCommand('hiliteColor', false, e.target.value);
    }
    function onChangeFontSize(e) {
        document.execCommand('fontSize', false, `${e.target.value}`);
    }
    const renderOption = (val) => {

        // if(val === 'FONTSIZE') {
        //     return  (
        //         <>
        //             <label>Font Size: </label>
        //         <select onChange={onChangeFontSize} >
        //            <option onClick={onChangeFontSize} value={'10pt'}>10pt</option>
        //             <option onClick={onChangeFontSize} value={'20pt'}>20pt</option>
        //             <option onClick={onChangeFontSize} value={'50pt'}>50pt</option>
        //             <option onClick={onChangeFontSize} value={'100pt'}>1000pt</option>
        //
        //         </select>
        //         </>
        //     )
        // }
        if(val === 'STRICKTHROUGH') {
            return (
                <button title={'Strikethrough'} onClick={() => {
                    applyFormatting('strikethrough');
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">

                        <path d="M161.3 144c3.2-17.2 14-30.1 33.7-38.6c21.1-9 51.8-12.3 88.6-6.5c11.9 1.9 48.8 9.1 60.1 12c17.1 4.5 34.6-5.6 39.2-22.7s-5.6-34.6-22.7-39.2c-14.3-3.8-53.6-11.4-66.6-13.4c-44.7-7-88.3-4.2-123.7 10.9c-36.5 15.6-64.4 44.8-71.8 87.3c-.1 .6-.2 1.1-.2 1.7c-2.8 23.9 .5 45.6 10.1 64.6c4.5 9 10.2 16.9 16.7 23.9H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H270.1c-.1 0-.3-.1-.4-.1l-1.1-.3c-36-10.8-65.2-19.6-85.2-33.1c-9.3-6.3-15-12.6-18.2-19.1c-3.1-6.1-5.2-14.6-3.8-27.4zM348.9 337.2c2.7 6.5 4.4 15.8 1.9 30.1c-3 17.6-13.8 30.8-33.9 39.4c-21.1 9-51.7 12.3-88.5 6.5c-18-2.9-49.1-13.5-74.4-22.1c-5.6-1.9-11-3.7-15.9-5.4c-16.8-5.6-34.9 3.5-40.5 20.3s3.5 34.9 20.3 40.5c3.6 1.2 7.9 2.7 12.7 4.3l0 0 0 0c24.9 8.5 63.6 21.7 87.6 25.6l0 0 .2 0c44.7 7 88.3 4.2 123.7-10.9c36.5-15.6 64.4-44.8 71.8-87.3c3.6-21 2.7-40.4-3.1-58.1H335.1c7 5.6 11.4 11.2 13.9 17.2z"/></svg>
                </button>
            )
        }
        if(val === 'BOLD') {
            return (
                <button title={'Bold'} onClick={() => {
                    applyFormatting('bold');
                }}>

                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512">
                        <path d="M0 64C0 46.3 14.3 32 32 32H80 96 224c70.7 0 128 57.3 128 128c0 31.3-11.3 60.1-30 82.3c37.1 22.4 62 63.1 62 109.7c0 70.7-57.3 128-128 128H96 80 32c-17.7 0-32-14.3-32-32s14.3-32 32-32H48V256 96H32C14.3 96 0 81.7 0 64zM224 224c35.3 0 64-28.7 64-64s-28.7-64-64-64H112V224H224zM112 288V416H256c35.3 0 64-28.7 64-64s-28.7-64-64-64H224 112z"/>
                    </svg>

                </button>

            )
        }
        if(val === 'ITALIC') {
            return (

                <button title={'Italic'} onClick={() => {
                    applyFormatting('italic');
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512">
                        <path d="M128 64c0-17.7 14.3-32 32-32H352c17.7 0 32 14.3 32 32s-14.3 32-32 32H293.3L160 416h64c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H90.7L224 96H160c-17.7 0-32-14.3-32-32z"/></svg>
                </button>

            )
        }
        if(val === 'UNDERLINE') {
            return (

                <button title={'Underline'}  onClick={() => {
                    applyFormatting('underline');
                }}> <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                    <path d="M16 64c0-17.7 14.3-32 32-32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H128V224c0 53 43 96 96 96s96-43 96-96V96H304c-17.7 0-32-14.3-32-32s14.3-32 32-32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H384V224c0 88.4-71.6 160-160 160s-160-71.6-160-160V96H48C30.3 96 16 81.7 16 64zM0 448c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32z"/></svg></button>


            )
        }
        if(val === 'LEFTALIGN') {
            return (

                <button  title={'Left alignment'} onClick={() => {
                    applyFormatting('justifyLeft');
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                        <path d="M288 64c0 17.7-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32H256c17.7 0 32 14.3 32 32zm0 256c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H256c17.7 0 32 14.3 32 32zM0 192c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></svg>
                </button>


            )
        }
        if(val === 'CENTERALIGN') {
            return (

                <button title={'Center alignment'}   onClick={() => {
                    applyFormatting('justifyCenter');
                }}>

                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                        <path d="M352 64c0-17.7-14.3-32-32-32H128c-17.7 0-32 14.3-32 32s14.3 32 32 32H320c17.7 0 32-14.3 32-32zm96 128c0-17.7-14.3-32-32-32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32-14.3 32-32zM0 448c0 17.7 14.3 32 32 32H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H32c-17.7 0-32 14.3-32 32zM352 320c0-17.7-14.3-32-32-32H128c-17.7 0-32 14.3-32 32s14.3 32 32 32H320c17.7 0 32-14.3 32-32z"/></svg>
                </button>

            )
        }
        if(val === 'RIGHTALIGN') {
            return (

                <button  title={'Right alignment'} onClick={() => {
                    applyFormatting('justifyRight');
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                        <path d="M448 64c0 17.7-14.3 32-32 32H192c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32zm0 256c0 17.7-14.3 32-32 32H192c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32zM0 192c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></svg>
                </button>

            )
        }
        if(val === 'JUSTIFYALIGN') {
            return (

                <button title={'Justify alignment'} onClick={() => {
                    applyFormatting('justifyFull');
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                        <path d="M448 64c0-17.7-14.3-32-32-32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32zm0 256c0-17.7-14.3-32-32-32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32-14.3 32-32zM0 192c0 17.7 14.3 32 32 32H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H32c-17.7 0-32 14.3-32 32zM448 448c0-17.7-14.3-32-32-32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32-14.3 32-32z"/></svg>
                </button>

            )
        }
        if(val === 'ORDERLIST') {
            return (

                <button  title={'Order list'} onClick={() => {
                    applyFormatting('insertOrderedList');
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                        <path d="M24 56c0-13.3 10.7-24 24-24H80c13.3 0 24 10.7 24 24V176h16c13.3 0 24 10.7 24 24s-10.7 24-24 24H40c-13.3 0-24-10.7-24-24s10.7-24 24-24H56V80H48C34.7 80 24 69.3 24 56zM86.7 341.2c-6.5-7.4-18.3-6.9-24 1.2L51.5 357.9c-7.7 10.8-22.7 13.3-33.5 5.6s-13.3-22.7-5.6-33.5l11.1-15.6c23.7-33.2 72.3-35.6 99.2-4.9c21.3 24.4 20.8 60.9-1.1 84.7L86.8 432H120c13.3 0 24 10.7 24 24s-10.7 24-24 24H32c-9.5 0-18.2-5.6-22-14.4s-2.1-18.9 4.3-25.9l72-78c5.3-5.8 5.4-14.6 .3-20.5zM224 64H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H224c-17.7 0-32-14.3-32-32s14.3-32 32-32zm0 160H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H224c-17.7 0-32-14.3-32-32s14.3-32 32-32zm0 160H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H224c-17.7 0-32-14.3-32-32s14.3-32 32-32z"/></svg>

                </button>

            )
        }
        if(val === 'UNORDERLIST') {
            return (

                <button title={'Unorder list'}  onClick={() => {
                    applyFormatting('insertUnorderedList');
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                        <path d="M40 48C26.7 48 16 58.7 16 72v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V72c0-13.3-10.7-24-24-24H40zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM16 232v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V232c0-13.3-10.7-24-24-24H40c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V392c0-13.3-10.7-24-24-24H40z"/></svg>

                </button>

            )
        }
        if(val === 'HYPERLINK') {
            return (
                <>
                    <button title={'Add Link'}  onClick={() => {

                        insertHyperlink()
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512">
                            <path d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z"/></svg>

                    </button>

                </>

            )
        }
        if(val === 'IMAGE') {
            return (

                <button title={'Add Image'}  onClick={() => {
                    insertImage()
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                        <path d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6h96 32H424c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"/></svg>

                </button>


            )
        }
        if(val === 'TEXTCOLOR') {
            return (
                <>
                    <button title={'Font color'} className={'textcolorbtn'} onClick={() => {
                        if(document.getElementById('textColor')) {
                            document.getElementById('textColor').click()

                        }
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.2" viewBox="0 0 19 20" width="19"
                             height="20">

                            <path id="Layer" fill-rule="evenodd" className="s0"
                                  d="m14.5 12.7h0.8c0.6 0 1 0.4 1 0.9 0 0.6-0.4 1-1 1h-2.9c-0.5 0-1-0.4-1-1 0-0.5 0.5-0.9 1-0.9h0.1l-0.6-1.5h-4.8l-0.6 1.5h0.1c0.5 0 1 0.4 1 0.9 0 0.6-0.5 1-1 1h-2.9c-0.6 0-1-0.4-1-1 0-0.5 0.4-0.9 1-0.9h0.8l4.1-11.1c0.1-0.3 0.5-0.6 0.9-0.6 0.4 0 0.8 0.3 0.9 0.6zm-5-7.9l-1.7 4.5h3.4z"/>
                            <path id="Layer 1" className="s1" d="m1 16.4h17v1.5h-17z"/>
                            <path id="Shape 1" className="s1" d="m65 5h100v100h-100z"/>
                        </svg>
                        <input type="color"  id={"textColor"}  onChange={changeTextColor} style={{visibility: "hidden",
                            height:'0px',
                            width:'0px',
                        }} />

                    </button>
                </>

            )
        }
        if(val === 'TEXTBACKGROUNDCOLOR') {
            return (
                <>

                    <button  title={'Font Background color'} onClick={() => {
                        if(document.getElementById('textBgColor')) {
                            document.getElementById('textBgColor').click()

                        }
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
                            <path d="M315 315l158.4-215L444.1 70.6 229 229 315 315zm-187 5l0 0V248.3c0-15.3 7.2-29.6 19.5-38.6L420.6 8.4C428 2.9 437 0 446.2 0c11.4 0 22.4 4.5 30.5 12.6l54.8 54.8c8.1 8.1 12.6 19 12.6 30.5c0 9.2-2.9 18.2-8.4 25.6L334.4 396.5c-9 12.3-23.4 19.5-38.6 19.5H224l-25.4 25.4c-12.5 12.5-32.8 12.5-45.3 0l-50.7-50.7c-12.5-12.5-12.5-32.8 0-45.3L128 320zM7 466.3l63-63 70.6 70.6-31 31c-4.5 4.5-10.6 7-17 7H24c-13.3 0-24-10.7-24-24v-4.7c0-6.4 2.5-12.5 7-17z"/></svg>
                        <input type="color"  id={"textBgColor"} onChange={changeTextBackgroundColor}  style={{visibility: "hidden",
                            height:'0px',
                            width:'0px',
                        }} />

                    </button>


                </>


            )
        }
        if(val === 'UNDO') {
            return (

                <button title={'Undo'} onClick={() => {

                    applyFormatting('undo')
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                        <path d="M48.5 224H40c-13.3 0-24-10.7-24-24V72c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2L98.6 96.6c87.6-86.5 228.7-86.2 315.8 1c87.5 87.5 87.5 229.3 0 316.8s-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3c-62.2-62.2-162.7-62.5-225.3-1L185 183c6.9 6.9 8.9 17.2 5.2 26.2s-12.5 14.8-22.2 14.8H48.5z"/></svg>
                </button>


            )
        }
        if(val === 'REDO') {
            return (

                <button title={'Redo'} onClick={() => {

                    applyFormatting('redo')
                }}>

                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                        <path d="M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z"/></svg>
                </button>



            )
        }


    }


    useEffect(() => {
        if(document.getElementById('richtextboxheader')) {
            const offsetHeight = document.getElementById('richtextboxheader').offsetHeight;
            setHeaderHeight(offsetHeight)

        }
    },[])
    return (


        <div className={'richtextboxmain'} style={{
            height: height + 'px',
            width: width + 'px'

        }}>
            <div className={'richtextboxheader'} id={'richtextboxheader'}>


                {
                    toolbarConfig.map((val) => {
                        return (

                            <span className={'btn seprator'}>
                                    {
                                        renderOption(val)
                                    }
                                    </span>

                        )
                    })
                }

            </div>
            {
                headerHeight ? (
                    <div id={'editablecontainarea'}
                         ref={contentEditableRef}
                         className={'editablecontainarea'}


                         style={{
                             height: (height - headerHeight) + 'px',
                             width: width + 'px'

                         }}
                         contentEditable={true}
                         onInput={() =>{
                             if(onChange) {
                                 const contentEditableDiv = contentEditableRef.current;
                                 const htmlContent = contentEditableDiv.innerHTML;
                                 onChange(htmlContent)

                             }


                         }}

                    >


                    </div>
                ) : ''
            }

        </div>


    )
}

export default Richtextbox;
