document.addEventListener('DOMContentLoaded', () => {
  const listedInput = document.getElementById('listedNum');
  const saveBtn = document.getElementById('saveBtn');
  const status = document.getElementById('status');

  chrome.storage.local.get('listed', (result) => {
    if (result.listed) {
      listedInput.value = result.listed;
    }
  });

  saveBtn.addEventListener('click', () => {
    const listed = listedInput.value.trim().toUpperCase();

    chrome.storage.local.set({ listed: listed }, () => {
      status.textContent = 'saved';
      console.log(`listed saved ${listed}`);
      setTimeout(() => { status.textContent = ''; }, 1500);
    });
  });
});
