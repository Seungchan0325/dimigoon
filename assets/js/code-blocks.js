// Code block enhancement - prevent all duplicates
(function() {
  'use strict';
  
  // Use a more robust check to prevent multiple executions
  const INIT_FLAG = 'data-code-blocks-initialized';
  
  function initCodeBlocks() {
    // First, remove all existing buttons and labels
    document.querySelectorAll('.code-copy-btn, .code-language-label').forEach(el => el.remove());
    
    // Process each .highlighter-rouge block (the outer container) exactly once
    const codeBlocks = document.querySelectorAll('.highlighter-rouge');
    
    codeBlocks.forEach(function(outerBlock) {
      // Skip if already processed
      if (outerBlock.hasAttribute(INIT_FLAG)) {
        return;
      }
      
      // Mark as processed immediately
      outerBlock.setAttribute(INIT_FLAG, 'true');
      
      // Find the inner .highlight div (this is where we'll add our UI elements)
      const highlightDiv = outerBlock.querySelector('.highlight');
      if (!highlightDiv) {
        return;
      }
      
      // Ensure relative positioning for absolute positioned children
      highlightDiv.style.position = 'relative';
      
      // Find the code element
      const codeElement = highlightDiv.querySelector('code');
      if (!codeElement) {
        return;
      }
      
      // Create and add copy button
      const copyBtn = document.createElement('button');
      copyBtn.className = 'code-copy-btn';
      copyBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
      `;
      copyBtn.title = 'Copy code';
      copyBtn.setAttribute('aria-label', 'Copy code to clipboard');
      
      // Add copy functionality
      copyBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        copyToClipboard(codeElement.textContent);
        showCopySuccess(copyBtn);
      });
      
      highlightDiv.appendChild(copyBtn);
      
      // Add language label if applicable
      const classes = codeElement.className;
      let language = detectLanguage(classes);
      
      if (language) {
        const label = document.createElement('div');
        label.className = 'code-language-label';
        label.textContent = language;
        highlightDiv.appendChild(label);
      }
    });
  }
  
  function detectLanguage(classes) {
    if (classes.includes('language-cpp') || classes.includes('language-c++')) {
      return 'C++';
    } else if (classes.includes('language-python') || classes.includes('language-py')) {
      return 'Python';
    } else if (classes.includes('language-java')) {
      return 'Java';
    } else if (classes.includes('language-javascript') || classes.includes('language-js')) {
      return 'JavaScript';
    } else if (classes.includes('language-c')) {
      return 'C';
    } else if (classes.includes('language-html')) {
      return 'HTML';
    } else if (classes.includes('language-css')) {
      return 'CSS';
    } else if (classes.includes('language-bash') || classes.includes('language-shell')) {
      return 'Bash';
    }
    return '';
  }
  
  
  function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text);
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-9999px';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
  }
  
  function showCopySuccess(button) {
    const originalHTML = button.innerHTML;
    button.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="20,6 9,17 4,12"></polyline>
      </svg>
    `;
    button.style.color = '#10b981';
    
    setTimeout(() => {
      button.innerHTML = originalHTML;
      button.style.color = '';
    }, 2000);
  }
  
  // Initialize when DOM is ready, but only once
  function safeInit() {
    // Check if already initialized on document level
    if (document.documentElement.hasAttribute('data-code-blocks-ready')) {
      return;
    }
    document.documentElement.setAttribute('data-code-blocks-ready', 'true');
    initCodeBlocks();
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', safeInit);
  } else {
    safeInit();
  }
  
})();
