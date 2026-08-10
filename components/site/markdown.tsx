'use client';
import React from 'react';

function escapeHtml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function inline(text: string): string {
  let t = escapeHtml(text);
  // bold
  t = t.replace(/\*\*([^*]+)\*\*/g, '<strong class="text-white font-semibold">$1</strong>');
  // italic
  t = t.replace(/(^|[^\*])\*([^*]+)\*/g, '$1<em class="text-cyan-200">$2</em>');
  // inline code
  t = t.replace(/`([^`]+)`/g, '<code class="rounded bg-cyan-500/10 px-1.5 py-0.5 text-[0.85em] font-mono text-cyan-200">$1</code>');
  // block math $$ ... $$
  t = t.replace(/\$\$([^$]+)\$\$/g, (_, m) => `<div class="my-4 rounded-xl border border-cyan-400/15 bg-[#02040a] p-4 text-center"><code class="font-mono text-sm text-cyan-100">${escapeHtml(m).trim()}</code></div>`);
  // inline math $ ... $
  t = t.replace(/\$([^$]+)\$/g, '<code class="font-mono text-cyan-200 text-[0.9em]">$1</code>');
  return t;
}

export function Markdown({ content }: { content: string }) {
  const html = React.useMemo(() => renderMarkdown(content), [content]);
  return (
    <div
      className="prose-invert max-w-none text-[15px] leading-[1.75] text-muted-foreground"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function renderMarkdown(md: string): string {
  const lines = md.split('\n');
  const out: string[] = [];
  let i = 0;
  let inUl = false;
  let inOl = false;

  const closeLists = () => {
    if (inUl) { out.push('</ul>'); inUl = false; }
    if (inOl) { out.push('</ol>'); inOl = false; }
  };

  while (i < lines.length) {
    const line = lines[i];

    // code block
    if (line.trim().startsWith('```')) {
      closeLists();
      const buf: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) { buf.push(lines[i]); i++; }
      i++;
      out.push(`<pre class="my-5 rounded-xl border border-cyan-400/15 bg-[#02040a] p-4 overflow-x-auto"><code class="font-mono text-sm text-cyan-100">${escapeHtml(buf.join('\n'))}</code></pre>`);
      continue;
    }

    // headings
    if (line.startsWith('# ')) { closeLists(); out.push(`<h1 class="text-3xl font-bold text-white mt-8 mb-3 text-glow-soft">${inline(line.slice(2))}</h1>`); i++; continue; }
    if (line.startsWith('## ')) { closeLists(); out.push(`<h2 class="text-2xl font-bold text-white mt-7 mb-2">${inline(line.slice(3))}</h2>`); i++; continue; }
    if (line.startsWith('### ')) { closeLists(); out.push(`<h3 class="text-xl font-semibold text-white mt-5 mb-2">${inline(line.slice(4))}</h3>`); i++; continue; }

    // blockquote
    if (line.startsWith('> ')) { closeLists(); out.push(`<blockquote class="my-5 border-l-2 border-cyan-400/40 pl-4 italic text-cyan-100/90">${inline(line.slice(2))}</blockquote>`); i++; continue; }

    // ordered list
    if (/^\d+\.\s/.test(line)) {
      if (!inOl) { closeLists(); out.push('<ol class="my-4 space-y-2 list-decimal pl-6 marker:text-cyan-300">'); inOl = true; }
      out.push(`<li>${inline(line.replace(/^\d+\.\s/, ''))}</li>`);
      i++; continue;
    }
    // unordered list
    if (line.startsWith('- ') || line.startsWith('* ')) {
      if (!inUl) { closeLists(); out.push('<ul class="my-4 space-y-2 list-disc pl-6 marker:text-cyan-300">'); inUl = true; }
      out.push(`<li>${inline(line.slice(2))}</li>`);
      i++; continue;
    }

    // blank
    if (line.trim() === '') { closeLists(); i++; continue; }

    // paragraph
    closeLists();
    out.push(`<p class="my-3">${inline(line)}</p>`);
    i++;
  }
  closeLists();
  return out.join('\n');
}
