import React, { useState, useEffect } from 'react';
import { Editor, Toolbar } from '@wangeditor/editor-for-react';
import { IDomEditor, IEditorConfig, IToolbarConfig, createEditor, createToolbar } from '@wangeditor/editor';

function MyEditor() {

    // 及时销毁 editor ，重要！
  // useEffect(() => {
  //   return () => {
  //     if (editor == null) return
  //     editor.destroy()
  //     setEditor(null)
  //   }
  // }, [editor])

  // const [editor, setEditor] = useState<IDomEditor | null>(null)
  const [html, setHtml] = useState('<p>hello</p>')
 
  const toolbarConfig: Partial<IToolbarConfig> = {
    toolbarKeys :['color','uploadImage']
  }

  // 模拟 ajax 请求，异步设置 html
  useEffect(() => {
    setTimeout(() => {
      setHtml('<p>hello world</p>')
    }, 1500)
  }, [])
  let editorConfig  = {   // TS 语法
    placeholder: '请输入内容...',
    MENU_CONF:{},
    withCredentials:true,
  }as any
  
  editorConfig.MENU_CONF['color'] = {
    colors: ['#000', '#ffff', '#666']
  }
  editorConfig.MENU_CONF['fontFamily'] = {
    fontFamilyList: [
      // 元素支持两种形式
      //   1. 字符串；
      //   2. { name: 'xxx', value: 'xxx' }
  
      '黑体',
      '楷体',
      { name: '仿宋', value: '仿宋' },
      'Arial',
      'Tahoma',
      'Verdana'
    ]
  }
  editorConfig.MENU_CONF['emotion'] = {
    emotions: '😀 😃 😄 😁 😆 😅 😂 🤣 😊 😇 🙂 🙃 😉'.split(' ') // 数组
  }

  editorConfig.MENU_CONF['uploadImage'] = {
    server: 'http://localhost:8080/api/editorUpload',
    fieldName: '/editor/editorImage',
  }

  useEffect(() => {
    const editor = createEditor({ 
      selector:'#editor',
      config:editorConfig,
      mode:'default',
      html
    }) 
  
    createToolbar({
      selector:'#bar',
      config:toolbarConfig,
      editor
    })
  }, [])

 
  return (
    <div style={{ paddingTop: '50px', height: 'calc(100%-50px)', display: 'flex', flexDirection: 'column', position:'relative' }}>
      <div style={{ marginTop: '15px', height: '50%' }}>
        {html}
      </div>
      <div style={{ border: '1px solid #ccc', zIndex: 100, height: '50%' }}>
        {/* <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode="default"
          style={{ borderBottom: '1px solid #ccc' }}
        /> */}
        <div id='bar' style={{ zIndex: 10 }}></div>
        <div id='editor'  style={{ height: '500px', zIndex: -10 }}></div>
        <Editor
          defaultConfig={editorConfig}
          value={html}
          onCreated={()=>{}}
          onChange={editor => setHtml(editor.getHtml())}
          mode="default"
          style={{ height: '500px', overflowY: 'hidden', fontSize:'1.5rem' }}
        />
      </div>
    </div>
  )
}

export default MyEditor;