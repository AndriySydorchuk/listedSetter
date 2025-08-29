window.addEventListener('load', () => {
    chrome.storage.local.get('listed', (result) => {
        const listed = result.listed;

        function setupAddSpecificButton(addSpecificBtn) {
            if(addSpecificBtn.dataset.listenerAdded) return;

            addSpecificBtn.dataset.listenerAdded = 'true';
            addSpecificBtn.addEventListener('click', () => {
                setTimeout(() => {
                    const nameInputs = document.querySelectorAll('input[placeholder="Name"]');
                    const listedTextInput = nameInputs[nameInputs.length - 1];
                    
                    listedTextInput.value = 'LISTED';
                    listedTextInput.dispatchEvent(new Event('input', { bubbles: true }));

                    const allSpans = Array.from(document.querySelectorAll('span'));
                    const matchingSpans = allSpans.filter(span => span.textContent.trim().endsWith('Value(s)'));

                    const listedSpan = matchingSpans[matchingSpans.length - 1];
                    const parentDiv = listedSpan.closest('div');

                    listedSpan.click();

                    setTimeout(() => {
                        const listedValueInput = parentDiv.querySelector('input');
                        listedValueInput.value = listed;
                        listedValueInput.dispatchEvent(new Event('input', { bubbles: true }));
                    }, 300);
                }, 300);
            });
        }

        const observer = new MutationObserver(() => {
            const addSpecificSpan = Array.from(document.querySelectorAll('button span'))
                .find(span => span.textContent.trim() === 'Add custom specific');
            
            const addSpecificBtn = addSpecificSpan?.closest('button');
            
            if (addSpecificBtn) {
                setupAddSpecificButton(addSpecificBtn);
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });
    });
});
