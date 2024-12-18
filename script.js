//Toggle Dark/Light Mode
document.querySelector('.toggle-button').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    updateTextColor();  // Adjust text color when mode changes
    updateButtonText();  // Update button text based on the current mode
    showStatusMessage(); // Show status message with feedback on mode change
    updateHistory();     // Update history on mode change
});
// Update history on theme change
function updateHistory() {
    const newMode = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    modeHistory.push(newMode);
    currentHistoryIndex = modeHistory.length - 1;
    localStorage.setItem('theme', newMode); // Persist mode in localStorage
}

// Toggle project details visibility
function toggleDetails(id, button) {
    const details = document.getElementById(id);
    if (details.style.display === "block") {
        details.style.display = "none";
        button.textContent = "Show Details"; // Update button text
    } else {
        details.style.display = "block";
        button.textContent = "Hide Details"; // Update button text
    }
}

// Setting project details to be hidden initially and binding event listeners
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.project-details').forEach(details => {
        details.style.display = 'none'; // Hide details initially
    });

    document.querySelectorAll('.toggle-details-button').forEach(button => {
        const targetId = button.getAttribute('data-target'); // Get the target details ID
        button.textContent = "Show Details"; // Set initial button text
        button.addEventListener('click', () => toggleDetails(targetId, button)); // Bind click event
    });

    // Initialize tooltip for first-time users
    const tooltip = createTooltip();
    const button = document.querySelector('.toggle-button');
    button.parentElement.appendChild(tooltip);

    // Tooltip functionality
    button.addEventListener('mouseenter', () => showTooltip(tooltip, button));
    button.addEventListener('mouseleave', () => hideTooltip(tooltip));
    button.addEventListener('click', () => tooltip.remove()); // Remove tooltip after first click
});

// Create a tooltip element
function createTooltip() {
    const tooltip = document.createElement('div');
    tooltip.classList.add('tooltip');
    tooltip.textContent = "Dark mode reduces strain on your eyes by using a darker color scheme.";
    tooltip.style.position = "absolute";
    tooltip.style.backgroundColor = "#333";
    tooltip.style.color = "#fff";
    tooltip.style.padding = "8px";
    tooltip.style.borderRadius = "5px";
    tooltip.style.fontSize = "12px";
    tooltip.style.display = "none"; // Hidden by default
    tooltip.style.zIndex = "1000";
    return tooltip;
}

// Show tooltip on hover
function showTooltip(tooltip, button) {
    tooltip.style.display = "block";
    tooltip.style.top = `${button.offsetTop - 30}px`;
    tooltip.style.left = `${button.offsetLeft}px`;
}

// Hide tooltip
function hideTooltip(tooltip) {
    tooltip.style.display = "none";
}

// Update text color when switching between dark and light modes
function updateTextColor() {
    const elementsToChange = document.querySelectorAll('.change-color');
    elementsToChange.forEach(element => {
        if (document.body.classList.contains('dark-mode')) {
            element.style.color = '#fff'; // White text in dark mode
        } else {
            element.style.color = ''; // Default text color in light mode
        }
    });
}

// Update the toggle button text to reflect the current mode
function updateButtonText() {
    const button = document.querySelector('.toggle-button');
    if (document.body.classList.contains('dark-mode')) {
        button.textContent = 'Enable Light Mode';
    } else {
        button.textContent = 'Enable Dark Mode';
    }
}



// Display a status message to confirm mode change
function showStatusMessage() {
    const message = document.createElement('div');
    message.classList.add('status-message');
    if (document.body.classList.contains('dark-mode')) {
        message.textContent = 'Dark Mode On';
    } else {
        message.textContent = 'Light Mode On';
    }

    // Append message to the body and show it
    document.body.appendChild(message);
    message.style.display = 'block';
    message.style.opacity = '1'; // Make opacity a string

    // Hide the status message after a few seconds
    setTimeout(() => {
        message.style.opacity = '0'; // Make opacity a string
        setTimeout(() => {
            message.remove();  // Remove the message from the DOM after fade-out
        }, 300);  // Wait for fade-out to complete
    }, 2000);  // Show for 2 seconds
}

// Undo and Redo functionality for theme switch
let modeHistory = [localStorage.getItem('theme') || 'light'];
let currentHistoryIndex = 0;

// Persist mode on page load
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        updateButtonText(); // Update button text
    } else {
        document.body.classList.remove('dark-mode');
        updateButtonText(); // Update button text
    }
});

// Handle Ctrl+Z (Undo) and Ctrl+Y (Redo) for theme changes
document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.key === 'z') { // Ctrl+Z to Undo
        if (currentHistoryIndex > 0) {
            currentHistoryIndex--;
            const previousMode = modeHistory[currentHistoryIndex];
            document.body.classList.remove('dark-mode');
            if (previousMode === 'dark') {
                document.body.classList.add('dark-mode');
            }
            localStorage.setItem('theme', previousMode);
            updateButtonText();
        }
    }

    if (event.ctrlKey && event.key === 'y') { // Ctrl+Y to Redo
        if (currentHistoryIndex < modeHistory.length - 1) {
            currentHistoryIndex++;
            const nextMode = modeHistory[currentHistoryIndex];
            document.body.classList.remove('dark-mode');
            if (nextMode === 'dark') {
                document.body.classList.add('dark-mode');
            }
            localStorage.setItem('theme', nextMode);
            updateButtonText();
        }
    }
});

// Update history on theme change
document.querySelector('.toggle-button').addEventListener('click', () => {
    const newMode = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    modeHistory.push(newMode);
    currentHistoryIndex = modeHistory.length - 1;
    localStorage.setItem('theme', newMode);
});

// Toggle extra content in the Help section
document.getElementById('help-button').addEventListener('click', function () {
    // Check if the help content already exists
    const existingHelpContent = document.querySelector('#help-section .extra-help-content');

    if (existingHelpContent) {
        // If the content exists, remove it (hide it)
        existingHelpContent.remove();
    } else {
        // If the content doesn't exist, create and append it
        const helpContent = document.createElement('div');
        helpContent.classList.add('extra-help-content');
        helpContent.innerHTML = "<p>For additional assistance, reach out to me through my contact section or explore my portfolio for more information about my projects and experience!</p>";

        // Style the content based on the current mode (light/dark)
        const isDarkMode = document.body.classList.contains('dark-mode');

        if (isDarkMode) {
            helpContent.style.backgroundColor = "#444"; // Dark background for dark mode
            helpContent.style.color = "#f5f5f5"; // Light text for dark mode
        } else {
            helpContent.style.backgroundColor = "#f1f1f1"; // Light background for light mode
            helpContent.style.color = "#333"; // Dark text for light mode
        }

        helpContent.style.padding = "10px";
        helpContent.style.marginTop = "10px";
        helpContent.style.borderRadius = "5px";

        // Append the content to the help section
        document.getElementById('help-section').appendChild(helpContent);
    }
});

//Disclaimer Banner
function dismissDisclaimer() {
    document.querySelector('.disclaimer-banner').style.display = 'none';
}
