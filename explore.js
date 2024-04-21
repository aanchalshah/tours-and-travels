document.getElementById('readMoreBtn').addEventListener('click', function() {
    const expandedInfo = document.getElementById('expandedInfo');
    const infoPanel = document.querySelector('.info-panel');
    
    infoPanel.style.transform = 'translateY(100%)';
    setTimeout(() => {
        expandedInfo.style.display = 'block';
        infoPanel.style.display = 'none';
    }, 500);
});

document.getElementById('closeBtn').addEventListener('click', function() {
    const expandedInfo = document.getElementById('expandedInfo');
    const infoPanel = document.querySelector('.info-panel');
    
    expandedInfo.style.display = 'none';
    infoPanel.style.transform = 'translateY(0)';
    setTimeout(() => {
        infoPanel.style.display = 'block';
    }, 500);
});
