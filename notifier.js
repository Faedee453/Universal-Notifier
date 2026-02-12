(function() {
    // 1. Inject Styles immediately (Head usually exists even if Body doesn't)
    const style = document.createElement('style');
    style.textContent = `
        #uni-notifier-root {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 9999;
            display: flex;
            flex-direction: column;
            gap: 12px;
            pointer-events: none;
        }
        .uni-toast {
            width: 300px;
            background: white;
            padding: 16px;
            border-radius: 8px;
            box-shadow: 0 10px 15px rgba(0,0,0,0.1);
            border-left: 6px solid #007bff;
            pointer-events: auto;
            cursor: pointer;
            transform: translateX(130%);
            opacity: 0;
            transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), 
                        opacity 0.4s ease, 
                        margin-top 0.4s ease, 
                        max-height 0.4s ease,
                        padding 0.4s ease;
            overflow: hidden;
            max-height: 200px;
        }
        .uni-toast.active { transform: translateX(0); opacity: 1; }
        .uni-toast.exit { 
            transform: translateX(130%); 
            opacity: 0; 
            max-height: 0; 
            margin-top: -12px; 
            padding-top: 0; 
            padding-bottom: 0; 
        }
        .uni-toast-title { font-weight: bold; display: block; margin-bottom: 4px; font-size: 1.05rem; font-family: sans-serif; }
        .uni-toast-content { font-size: 0.9rem; color: #555; font-family: sans-serif; }
    `;
    document.head.appendChild(style);

    let container = null;

    // Internal helper to ensure the container exists before we use it
    const ensureContainer = () => {
        if (!container) {
            container = document.getElementById('uni-notifier-root');
            if (!container) {
                container = document.createElement('div');
                container.id = 'uni-notifier-root';
                document.body.appendChild(container);
            }
        }
    };

    // 2. The Global Function
    window.sendMessage = function(msgtitle, msgcontent) {
        // Ensure body exists before trying to append
        if (!document.body) {
            console.error("Uni-Notifier: Cannot send message, document.body not found.");
            return;
        }

        ensureContainer();

        const toast = document.createElement('div');
        toast.className = 'uni-toast';
        toast.innerHTML = `
            <span class="uni-toast-title">${msgtitle}</span>
            <div class="uni-toast-content">${msgcontent}</div>
        `;

        // FILO logic: Newest at the top
        container.prepend(toast);

        // Trigger animation
        requestAnimationFrame(() => {
            toast.classList.add('active');
        });

        const closeToast = () => {
            toast.classList.add('exit');
            // Remove from DOM after animation finishes
            toast.addEventListener('transitionend', () => {
                toast.remove();
            });
        };

        // Auto-remove after 5s
        const autoClose = setTimeout(closeToast, 5000);

        // Manual remove on click
        toast.onclick = () => {
            clearTimeout(autoClose);
            closeToast();
        };
    };
})();