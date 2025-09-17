window.addEventListener('load', () => {
    chrome.storage.local.get(['brand', 'listed'], (result) => {
        const brand = result.brand;
        const listed = result.listed;

        function setupBrand() {
            const matchingDiv = [...document.querySelectorAll('div')].find(div => div.textContent.trim().endsWith('Brand'));
            
            if(matchingDiv) {
                console.log(`matching div ${matchingDiv}`);
            } else {
                console.log('matching div not found');
            }
    
            const brandInput = matchingDiv.querySelector('input');
    
            if(brandInput) {
                console.log(`brand input found and setted to ${brand}`);
                brandInput.value = brand;
                brandInput.dispatchEvent(new Event('input', {bubbles: true}));
            } else {
                console.log('brand input not found');
            }
        }    

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
            const matchingDiv = [...document.querySelectorAll('div')].find(div => div.textContent.trim().endsWith('Brand'));
            
            if(matchingDiv) {
                const brandInput = matchingDiv.querySelector('input');
                if(brandInput) {
                    brandInput.value = brand;
                    brandInput.dispatchEvent(new Event('input', {bubbles: true}));
                }
            }
    
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
