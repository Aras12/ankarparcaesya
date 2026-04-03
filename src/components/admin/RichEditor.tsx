'use client'

import { useRef, useCallback, useEffect } from 'react'
import { Bold, Italic, Underline, List, ListOrdered, Link, Heading2, Heading3, AlignLeft, AlignCenter, Code, Undo, Redo, Type, Minus } from 'lucide-react'

interface Props {
  value: string
  onChange: (html: string) => void
  rows?: number
  placeholder?: string
}

export default function RichEditor({ value, onChange, rows = 10, placeholder }: Props) {
  const editorRef = useRef<HTMLDivElement>(null)
  const isInitialized = useRef(false)

  useEffect(() => {
    if (editorRef.current && !isInitialized.current) {
      editorRef.current.innerHTML = value || ''
      isInitialized.current = true
    }
  }, [value])

  // Dışarıdan value değişirse güncelle (sadece ilk yüklemede)
  useEffect(() => {
    if (editorRef.current && value !== undefined) {
      const currentHTML = editorRef.current.innerHTML
      if (currentHTML !== value && !editorRef.current.contains(document.activeElement)) {
        editorRef.current.innerHTML = value || ''
      }
    }
  }, [value])

  const exec = useCallback((command: string, val?: string) => {
    document.execCommand(command, false, val)
    editorRef.current?.focus()
    handleInput()
  }, [])

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }

  const insertLink = () => {
    const url = prompt('Link URL girin:', 'https://')
    if (url) exec('createLink', url)
  }

  const insertHeading = (tag: string) => {
    exec('formatBlock', tag)
  }

  const btnClass = "p-1.5 rounded hover:bg-gray-200 text-gray-600 hover:text-gray-900 transition-colors"
  const sepClass = "w-px h-6 bg-gray-300 mx-1"

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5 bg-gray-50 border-b border-gray-200">
        <button type="button" onClick={() => exec('undo')} className={btnClass} title="Geri Al"><Undo size={16} /></button>
        <button type="button" onClick={() => exec('redo')} className={btnClass} title="İleri Al"><Redo size={16} /></button>
        <div className={sepClass} />

        <button type="button" onClick={() => insertHeading('h2')} className={btnClass} title="Başlık 2"><Heading2 size={16} /></button>
        <button type="button" onClick={() => insertHeading('h3')} className={btnClass} title="Başlık 3"><Heading3 size={16} /></button>
        <button type="button" onClick={() => insertHeading('p')} className={btnClass} title="Paragraf"><Type size={16} /></button>
        <div className={sepClass} />

        <button type="button" onClick={() => exec('bold')} className={btnClass} title="Kalın"><Bold size={16} /></button>
        <button type="button" onClick={() => exec('italic')} className={btnClass} title="İtalik"><Italic size={16} /></button>
        <button type="button" onClick={() => exec('underline')} className={btnClass} title="Altı Çizili"><Underline size={16} /></button>
        <div className={sepClass} />

        <button type="button" onClick={() => exec('insertUnorderedList')} className={btnClass} title="Madde İşaretli Liste"><List size={16} /></button>
        <button type="button" onClick={() => exec('insertOrderedList')} className={btnClass} title="Numaralı Liste"><ListOrdered size={16} /></button>
        <div className={sepClass} />

        <button type="button" onClick={() => exec('justifyLeft')} className={btnClass} title="Sola Hizala"><AlignLeft size={16} /></button>
        <button type="button" onClick={() => exec('justifyCenter')} className={btnClass} title="Ortala"><AlignCenter size={16} /></button>
        <div className={sepClass} />

        <button type="button" onClick={insertLink} className={btnClass} title="Link Ekle"><Link size={16} /></button>
        <button type="button" onClick={() => exec('insertHorizontalRule')} className={btnClass} title="Yatay Çizgi"><Minus size={16} /></button>

        {/* HTML/Kaynak görünümü */}
        <button
          type="button"
          onClick={() => {
            if (editorRef.current) {
              const isSource = editorRef.current.getAttribute('data-source') === 'true'
              if (isSource) {
                editorRef.current.innerHTML = editorRef.current.innerText
                editorRef.current.setAttribute('data-source', 'false')
                editorRef.current.style.fontFamily = ''
                editorRef.current.style.whiteSpace = ''
              } else {
                editorRef.current.innerText = editorRef.current.innerHTML
                editorRef.current.setAttribute('data-source', 'true')
                editorRef.current.style.fontFamily = 'monospace'
                editorRef.current.style.whiteSpace = 'pre-wrap'
              }
            }
          }}
          className={`${btnClass} ml-auto text-xs font-mono`}
          title="HTML Kaynak Kodu"
        >
          <Code size={16} />
        </button>
      </div>

      {/* Editor area */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onBlur={handleInput}
        className="p-4 outline-none overflow-y-auto"
        style={{
          minHeight: `${(rows || 10) * 24}px`,
          maxHeight: '500px',
          lineHeight: '1.7',
          fontSize: '14px',
        }}
        data-placeholder={placeholder || 'İçerik yazın...'}
        suppressContentEditableWarning
      />

      <style jsx>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
        }
        [contenteditable] h2 { font-size: 1.4em; font-weight: 700; margin: 12px 0 6px; color: #1e293b; }
        [contenteditable] h3 { font-size: 1.2em; font-weight: 600; margin: 10px 0 4px; color: #334155; }
        [contenteditable] p { margin-bottom: 8px; }
        [contenteditable] a { color: #2563eb; text-decoration: underline; }
        [contenteditable] ul, [contenteditable] ol { padding-left: 20px; margin: 8px 0; }
        [contenteditable] li { margin-bottom: 4px; }
        [contenteditable] hr { border-top: 1px solid #e2e8f0; margin: 12px 0; }
        [contenteditable] strong { font-weight: 700; }
      `}</style>
    </div>
  )
}
