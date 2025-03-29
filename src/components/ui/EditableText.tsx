"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"

interface TextStyle {
  fontFamily: string
  fontSize: string
  fontWeight: string
  color: string
}

export default function EditableText() {
  const [text, setText] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [showPanel, setShowPanel] = useState(false)
  const [style, setStyle] = useState<TextStyle>({
    fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    fontSize: "16px",
    fontWeight: "normal",
    color: "#37352f",
  })

  const textRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const lastCaretPosition = useRef<number>(0)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        textRef.current &&
        !textRef.current.contains(event.target as Node) &&
        panelRef.current &&
        !panelRef.current.contains(event.target as Node)
      ) {
        setIsEditing(false)
        setShowPanel(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleClick = () => {
    setIsEditing(true)
    setShowPanel(true)
  }

  const handleBlur = () => {
    if (text.trim() === "") {
      setIsEditing(false)
      setShowPanel(false)
    }
  }

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const newText = e.currentTarget.textContent || ""
    setText(newText)
    
    // Save caret position
    const selection = window.getSelection()
    if (selection && selection.rangeCount > 0) {
      lastCaretPosition.current = selection.getRangeAt(0).startOffset
    }
  }

  // Restore caret position after render
  useEffect(() => {
    if (textRef.current && isEditing) {
      const selection = window.getSelection()
      const range = document.createRange()
      const textNode = textRef.current.firstChild || textRef.current

      try {
        range.setStart(textNode, Math.min(lastCaretPosition.current, text.length))
        range.collapse(true)
        selection?.removeAllRanges()
        selection?.addRange(range)
      } catch (e) {
        console.error("Error setting caret position:", e)
      }
    }
  }, [text, isEditing])

  const updateStyle = (property: keyof TextStyle, value: string) => {
    setStyle((prevStyle) => ({ ...prevStyle, [property]: value }))
  }

  return (
    <div className="relative max-w-2xl mx-auto p-4">
      <div
        ref={textRef}
        className={`
          transition-all duration-200 ease-in-out
          min-h-[1.5em] p-1 rounded-sm
          ${isEditing ? "ring-1 ring-blue-200" : ""}
          ${!isEditing && !text ? "text-gray-400" : ""}
          hover:bg-gray-100 focus:bg-white focus:outline-none
        `}
        style={style}
        onClick={handleClick}
        onBlur={handleBlur}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
      >
        {text || (isEditing ? "" : "Click to edit...")}
      </div>

      {showPanel && (
        <div
          ref={panelRef}
          className="absolute mt-2 p-2 bg-white shadow-lg rounded-md transition-all duration-200 ease-in-out flex items-center space-x-2"
          style={{ top: "100%", left: "0" }}
        >
          <select
            value={style.fontFamily}
            onChange={(e) => updateStyle("fontFamily", e.target.value)}
            className="text-sm border-none focus:ring-0 focus:outline-none"
          >
            <option value="ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'">
              Sans-serif
            </option>
            <option value="ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif">Serif</option>
            <option value="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace">
              Monospace
            </option>
          </select>

          <select
            value={style.fontSize}
            onChange={(e) => updateStyle("fontSize", e.target.value)}
            className="text-sm border-none focus:ring-0 focus:outline-none"
          >
            {["12px", "14px", "16px", "18px", "20px", "24px", "30px", "36px"].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>

          <button
            onClick={() => updateStyle("fontWeight", style.fontWeight === "bold" ? "normal" : "bold")}
            className={`p-1 rounded ${style.fontWeight === "bold" ? "bg-gray-200" : ""}`}
          >
            B
          </button>

          <input
            type="color"
            value={style.color}
            onChange={(e) => updateStyle("color", e.target.value)}
            className="w-6 h-6 border-none p-0 bg-transparent"
          />
        </div>
      )}
    </div>
  )
}