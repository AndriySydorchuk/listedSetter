window.addEventListener('load', () => {
    chrome.storage.local.get('listed', (result) => {
    const listed = result.listed;

    setTimeout(() => {
        const editsBtns = Array.from(document.querySelectorAll('button')).filter(btn => {
            return Array.from(btn.querySelectorAll('span')).some(span => span.textContent.trim() === 'Edit');
        });

        editsBtns.forEach(editBtn => {
            editBtn.addEventListener('click', (e) => {

                setTimeout(() => {
                    const addSpecificSpan = Array.from(document.querySelectorAll('button span')).find(span => span.textContent.trim() === 'Add custom specific');
    
                    const addSpecificBtn = addSpecificSpan?.closest('button');

                    addSpecificBtn.addEventListener('click', (e) => {
                        
                        setTimeout(() => {
                            const nameInputs = document.querySelectorAll('input[placeholder="Name"]');
                            const listedTextInput = nameInputs[nameInputs.length - 1];
                            
                            listedTextInput.value = 'LISTED';
                            listedTextInput.dispatchEvent(new Event('input', { bubbles: true }));
                        }, 500);
                    });
                }, 3000);

                
            });
        });
    }, 3000);
  });
});