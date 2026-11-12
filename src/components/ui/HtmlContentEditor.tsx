import React, { useEffect, useRef, useState } from 'react';
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Heading3,
  Pilcrow,
  Link as LinkIcon,
  RemoveFormatting,
  Code2,
  Eye,
} from 'lucide-react';

interface HtmlContentEditorProps {
  label?: string;
  value: string;
  onChange: (html: string) => void;
  dir?: 'ltr' | 'rtl';
  placeholder?: string;
  helperText?: string;
  minHeightClass?: string;
}

/**
 * Reusable bilingual-ready rich HTML content editor with a Visual WYSIWYG toolbar
 * and raw HTML Source mode.
 */
export const HtmlContentEditor: React.FC<HtmlContentEditorProps> = ({
  label,
  value,
  onChange,
  dir = 'ltr',
  placeholder = 'Write formatted product description or paste HTML content...',
  helperText,
  minHeightClass = 'min-h-[150px]',
}) => {
  const [mode, setMode] = useState<'visual' | 'html'>('visual');
  const editorRef = useRef<HTMLDivElement>(null);
  const lastHtmlRef = useRef<string>(value || '');

  useEffect(() => {
    if (mode !== 'visual' || !editorRef.current) return;
    const normalized = value || '';
    if (editorRef.current.innerHTML !== normalized && normalized !== lastHtmlRef.current) {
      editorRef.current.innerHTML = normalized;
      lastHtmlRef.current = normalized;
    } else if (!editorRef.current.innerHTML && normalized) {
      editorRef.current.innerHTML = normalized;
      lastHtmlRef.current = normalized;
    }
  }, [value, mode, dir]);

  const syncFromDom = () => {
    if (!editorRef.current) return;
    const html = editorRef.current.innerHTML;
    lastHtmlRef.current = html;
    onChange(html);
  };

  const execCmd = (command: string, commandVal?: string) => {
    if (mode !== 'visual') return;
    editorRef.current?.focus();
    document.execCommand(command, false, commandVal);
    syncFromDom();
  };

  const handleInsertLink = () => {
    if (mode !== 'visual') return;
    const url = window.prompt('Enter link URL (e.g. https://... or /contact):', 'https://');
    if (url && url.trim()) {
      execCmd('createLink', url.trim());
    }
  };

  const switchToMode = (nextMode: 'visual' | 'html') => {
    if (nextMode === mode) return;
    setMode(nextMode);
    if (nextMode === 'visual') {
      requestAnimationFrame(() => {
        if (editorRef.current) {
          editorRef.current.innerHTML = value || '';
          lastHtmlRef.current = value || '';
        }
      });
    }
  };

  const isEmpty = !value || value.replace(/<[^>]*>/g, '').trim() === '';

  return (
    <div className="space-y-1.5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        {label ? (
          <label
            className={`text-xs font-semibold ${
              dir === 'rtl' ? 'text-[#F68E2D]' : 'text-white/70'
            }`}
          >
            {label}
          </label>
        ) : (
          <span />
        )}

        <div className="inline-flex items-center rounded-lg bg-black/40 border border-white/10 p-0.5">
          <button
            type="button"
            onClick={() => switchToMode('visual')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold flex items-center gap-1 transition-all cursor-pointer ${
              mode === 'visual'
                ? 'bg-[#F68E2D] text-white shadow'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <Eye className="w-3 h-3" />
            Visual Editor
          </button>
          <button
            type="button"
            onClick={() => switchToMode('html')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold flex items-center gap-1 transition-all cursor-pointer ${
              mode === 'html'
                ? 'bg-[#F68E2D] text-white shadow'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <Code2 className="w-3 h-3" />
            HTML Code
          </button>
        </div>
      </div>

      <div className="rounded-lg bg-black/30 border border-white/10 overflow-hidden focus-within:border-[#F68E2D] transition-colors">
        {mode === 'visual' && (
          <div className="flex flex-wrap items-center gap-1 px-2.5 py-1.5 bg-white/[0.04] border-b border-white/10">
            <button
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                execCmd('bold');
              }}
              className="p-1.5 rounded hover:bg-white/10 text-white/75 hover:text-white transition-colors cursor-pointer"
              title="Bold"
            >
              <Bold className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                execCmd('italic');
              }}
              className="p-1.5 rounded hover:bg-white/10 text-white/75 hover:text-white transition-colors cursor-pointer"
              title="Italic"
            >
              <Italic className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                execCmd('underline');
              }}
              className="p-1.5 rounded hover:bg-white/10 text-white/75 hover:text-white transition-colors cursor-pointer"
              title="Underline"
            >
              <Underline className="w-3.5 h-3.5" />
            </button>

            <span className="w-px h-4 bg-white/10 mx-1" />

            <button
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                execCmd('formatBlock', '<h3>');
              }}
              className="p-1.5 rounded hover:bg-white/10 text-white/75 hover:text-white transition-colors cursor-pointer"
              title="Subheading (H3)"
            >
              <Heading3 className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                execCmd('formatBlock', '<p>');
              }}
              className="p-1.5 rounded hover:bg-white/10 text-white/75 hover:text-white transition-colors cursor-pointer"
              title="Paragraph"
            >
              <Pilcrow className="w-3.5 h-3.5" />
            </button>

            <span className="w-px h-4 bg-white/10 mx-1" />

            <button
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                execCmd('insertUnorderedList');
              }}
              className="p-1.5 rounded hover:bg-white/10 text-white/75 hover:text-white transition-colors cursor-pointer"
              title="Bullet List"
            >
              <List className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                execCmd('insertOrderedList');
              }}
              className="p-1.5 rounded hover:bg-white/10 text-white/75 hover:text-white transition-colors cursor-pointer"
              title="Numbered List"
            >
              <ListOrdered className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                handleInsertLink();
              }}
              className="p-1.5 rounded hover:bg-white/10 text-white/75 hover:text-white transition-colors cursor-pointer"
              title="Insert Link"
            >
              <LinkIcon className="w-3.5 h-3.5" />
            </button>

            <span className="w-px h-4 bg-white/10 mx-1" />

            <button
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                execCmd('removeFormat');
              }}
              className="p-1.5 rounded hover:bg-white/10 text-white/75 hover:text-white transition-colors cursor-pointer"
              title="Clear Formatting"
            >
              <RemoveFormatting className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {mode === 'visual' ? (
          <div className="relative">
            {isEmpty && (
              <div
                className={`pointer-events-none absolute top-3 ${
                  dir === 'rtl' ? 'right-3 text-right' : 'left-3 text-left'
                } text-xs text-white/30`}
              >
                {placeholder}
              </div>
            )}
            <div
              ref={editorRef}
              contentEditable
              suppressContentEditableWarning
              dir={dir}
              onInput={syncFromDom}
              onBlur={syncFromDom}
              className={`${minHeightClass} max-h-72 overflow-y-auto px-3 py-2.5 text-xs text-white focus:outline-none leading-relaxed [&_p]:mb-2 [&_h3]:text-sm [&_h3]:font-bold [&_h3]:text-white [&_h3]:mb-1.5 [&_a]:text-[#F68E2D] [&_a]:underline [&_ul]:list-disc [&_ul]:my-1.5 [&_ol]:list-decimal [&_ol]:my-1.5 [&_li]:my-0.5 ${
                dir === 'rtl'
                  ? 'text-right [&_ul]:pr-5 [&_ol]:pr-5'
                  : 'text-left [&_ul]:pl-5 [&_ol]:pl-5'
              }`}
            />
          </div>
        ) : (
          <textarea
            dir={dir}
            value={value || ''}
            onChange={(e) => {
              lastHtmlRef.current = e.target.value;
              onChange(e.target.value);
            }}
            placeholder={placeholder}
            rows={7}
            className={`w-full ${minHeightClass} px-3 py-2.5 text-xs font-mono bg-transparent text-emerald-200 placeholder-white/30 focus:outline-none resize-y`}
          />
        )}
      </div>

      {helperText && <p className="text-[11px] text-white/40">{helperText}</p>}
    </div>
  );
};
