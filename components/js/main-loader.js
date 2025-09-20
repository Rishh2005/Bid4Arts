document.addEventListener('DOMContentLoaded', function() {
    // Start the initial loading animation
    simulateInitialLoading();
});

// Simulate initial page loading with progress animation
function simulateInitialLoading() {
    const progressBar = document.getElementById('loader-progress');
    const percentage = document.getElementById('loader-percentage');
    let width = 0;
    
    const loadingInterval = setInterval(() => {
        if (width < 100) {
            width += Math.random() * 10;
            if (width > 100) width = 100;
            
            progressBar.style.width = Math.round(width) + '%';
            percentage.textContent = Math.round(width) + '% Complete';
            
            // Update loading text based on progress
            if (width < 30) {
                document.getElementById('loader-text').textContent = 'Loading Resources';
            } else if (width < 60) {
                document.getElementById('loader-text').textContent = 'Connecting to Services';
            } else if (width < 90) {
                document.getElementById('loader-text').textContent = 'Preparing Your Canvas';
            } else {
                document.getElementById('loader-text').textContent = 'Almost Ready';
            }
        } else {
            clearInterval(loadingInterval);
            
            // Initialize Firebase after the loading animation completes
            setTimeout(initializeApp, 500);
        }
    }, 100);
}