window.addEventListener('load', () => {
    chrome.storage.local.get('listed', (result) => {
    const listed = result.listed;

    if (!listed) {
        console.log('no listed setted in options');
        return;
    } else {
        console.log('listed loaded');
    }

    setTimeout(() => {
        const editsBtns = Array.from(document.querySelectorAll('button')).filter(btn => {
            return Array.from(btn.querySelectorAll('span')).some(span => span.textContent.trim() === 'Edit');
        });
    
        if(editsBtns) {
            console.log(editsBtns);
        } else {
            console.log('edit btns not selected');
        }

        editsBtns.forEach(editBtn => {
            editBtn.addEventListener('click', (e) => {
                console.log(e.target);
            });
        });
    }, 3000);
  });
});