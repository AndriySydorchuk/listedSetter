document.addEventListener('DOMContentLoaded', () => {
  const brandInput = document.getElementById('brandName');
  const listedInput = document.getElementById('listedNum');
  const saveBtn = document.getElementById('saveBtn');
  const status = document.getElementById('status');

  chrome.storage.local.get(['brand', 'listed'], (result) => {
    if (result.listed) {
      listedInput.value = result.listed;
    }
    if(result.brand) {
      brandInput.value = result.brand;
    }
  });

  saveBtn.addEventListener('click', () => {
    const brand = brandInput.value.trim();
    const listed = listedInput.value.trim().toUpperCase();

    chrome.storage.local.set({ brand: brand, listed: listed }, () => {
      status.textContent = 'saved';
      console.log(`brand saved ${brand}`);
      console.log(`listed saved ${listed}`);
      setTimeout(() => { status.textContent = ''; }, 1500);
    });
  });
});
