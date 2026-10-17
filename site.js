(() => {
  const results = {
    unmodified: {title: 'Unaltered', icon: '✓', summary: 'This file matches its signed record.', explanation: 'The credential was verified and the file matches the record issued when it was sealed.'},
    tampered: {title: 'Tampered', icon: '×', summary: 'This file differs from its signed record.', explanation: 'The credential was verified, but the file no longer matches the signed record. LightSeal detected a change; it does not identify who made it or why.'},
    unknown: {title: 'Inconclusive', icon: '?', summary: 'There is not enough verifiable evidence.', explanation: 'The credential is missing, unreadable, or cannot be trusted. Compression or conversion can remove it. This result does not by itself establish that the file was tampered with.'}
  };
  document.querySelectorAll('[data-verdict]').forEach(button => {
    button.addEventListener('click', () => {
      const key = button.dataset.verdict, result = results[key];
      document.querySelectorAll('[data-verdict]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      document.querySelector('#result-band').className = 'result-band ' + key;
      document.querySelector('#result-icon').textContent = result.icon;
      document.querySelector('#result-title').textContent = result.title;
      document.querySelector('#result-summary').textContent = result.summary;
      document.querySelector('#result-explanation').textContent = result.explanation;
    });
  });
  const search = document.querySelector('#faq-search');
  if (!search) return;
  let category = 'all';
  const questions = [...document.querySelectorAll('.faq-item')];
  const filter = () => {
    const query = search.value.trim().toLocaleLowerCase();
    let count = 0;
    questions.forEach(question => {
      const matches = (category === 'all' || question.dataset.category === category) && question.textContent.toLocaleLowerCase().includes(query);
      question.hidden = !matches;
      if (matches) count++;
    });
    document.querySelector('#faq-count').textContent = document.documentElement.lang.startsWith('zh') ? '共 ' + count + ' 个问题' : count + (count === 1 ? ' question' : ' questions');
    document.querySelector('.no-results').hidden = count !== 0;
    document.querySelector('#faq-reset').hidden = category === 'all' && query === '';
  };
  search.addEventListener('input', filter);
  document.querySelectorAll('[data-category-filter]').forEach(button => {
    button.addEventListener('click', () => {
      category = button.dataset.categoryFilter;
      document.querySelectorAll('[data-category-filter]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      filter();
    });
  });
  document.querySelector('#faq-reset').addEventListener('click', () => {
    category = 'all'; search.value = '';
    document.querySelectorAll('[data-category-filter]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.categoryFilter === 'all')));
    filter(); search.focus();
  });
})();
