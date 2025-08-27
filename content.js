window.addEventListener('load', () => {
    chrome.storage.local.get('listed', (result) => {
    const listed = result.listed;

    if (!listed) {
        console.log('no listed setted in options');
        return;
    } else {
        console.log('listed loaded');
    }



  });
});