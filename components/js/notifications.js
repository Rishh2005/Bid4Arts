class NotificationSystem {
    constructor() {
        this.container = document.getElementById('notificationContainer');
        this.notifications = new Map();
        this.idCounter = 0;
    }

    show(type, title, message, duration = 5000) {
        const id = ++this.idCounter;
        const notification = this.createElement(type, title, message, id);
        
        this.container.appendChild(notification);
        this.notifications.set(id, {
            element: notification,
            timeout: setTimeout(() => this.remove(id), duration)
        });
        
        // Trigger entrance animation
        requestAnimationFrame(() => {
            notification.style.opacity = '1';
        });
        
        return id;
    }

    createElement(type, title, message, id) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.dataset.id = id;
        
        const iconMap = {
            success: '✓',
            error: '✕',
            warning: '⚠',
            info: 'i'
        };
        
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        
        notification.innerHTML = `
            <div class="notification-header">
                <div class="notification-icon">${iconMap[type]}</div>
                <div class="notification-content">
                    <div class="notification-title">${title}</div>
                    <div class="notification-message">${message}</div>
                </div>
                <button class="notification-close" onclick="notificationSystem.remove(${id})">&times;</button>
            </div>
            <div class="notification-timestamp">${timeString}</div>
            <div class="notification-progress"></div>
        `;
        
        return notification;
    }

    remove(id) {
        const notification = this.notifications.get(id);
        if (!notification) return;
        
        // Clear timeout if it exists
        if (notification.timeout) {
            clearTimeout(notification.timeout);
        }
        
        // Add removal animation
        notification.element.classList.add('removing');
        
        // Remove from DOM after animation
        setTimeout(() => {
            if (notification.element.parentNode) {
                notification.element.parentNode.removeChild(notification.element);
            }
            this.notifications.delete(id);
        }, 300);
    }

    clear() {
        this.notifications.forEach((notification, id) => {
            this.remove(id);
        });
    }
}

// Initialize notification system
const notificationSystem = new NotificationSystem();

// Helper function to show notifications
function showNotification(message, type = 'info') {
    let title;
    
    switch(type) {
        case 'success':
            title = 'Success!';
            break;
        case 'error':
            title = 'Error';
            break;
        case 'warning':
            title = 'Warning';
            break;
        default:
            title = 'Information';
    }
    
    notificationSystem.show(type, title, message);
}