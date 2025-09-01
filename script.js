
// Dashboard Data Structure
const dashboardData = {
    user: {
        name: "Totok Michael",
        email: "tmichael20@mail.com"
    },
    stats: {
        totalProjects: 24,
        endedProjects: 10,
        runningProjects: 12,
        pendingProjects: 2
    },
    meeting: {
        title: "Meeting with Arc Company",
        time: "02:00 pm - 04:00 pm"
    },
    projects: [
        { name: "Develop API Endpoints", dueDate: "Nov 28, 2024", icon: "⚡", color: "#3B82F6" },
        { name: "Onboarding Flow", dueDate: "Nov 28, 2024", icon: "💧", color: "#10B981" },
        { name: "Build Dashboard", dueDate: "Nov 30, 2024", icon: "📊", color: "#F59E0B" },
        { name: "Optimize Page Load", dueDate: "Dec 5, 2024", icon: "⚡", color: "#EF4444" },
        { name: "Cross-Browser Testing", dueDate: "Dec 6, 2024", icon: "🌐", color: "#8B5CF6" }
    ],
    teamMembers: [
        { name: "Alexandra Deff", task: "Github Project Repository", status: "Completed" },
        { name: "Edwin Adenike", task: "Integrate User Authentication System", status: "In Progress" },
        { name: "Isaac Oluwatemilorun", task: "Develop Search and Filter Functionality", status: "Pending" },
        { name: "David Oshodi", task: "Responsive Layout for Homepage", status: "In Progress" }
    ]
};

// Timer Class
class Timer {
    constructor() {
        this.time = 5048; // 01:24:08 in seconds
        this.isRunning = true;
        this.interval = null;
        this.init();
    }

    init() {
        this.updateDisplay();
        this.start();
        this.bindEvents();
    }

    start() {
        if (this.interval) return;
        this.interval = setInterval(() => {
            if (this.isRunning) {
                this.time++;
                this.updateDisplay();
            }
        }, 1000);
    }

    pause() {
        this.isRunning = false;
        document.getElementById('playBtn').textContent = '▶';
    }

    play() {
        this.isRunning = true;
        document.getElementById('playBtn').textContent = '⏸';
    }

    stop() {
        this.isRunning = false;
        this.time = 0;
        this.updateDisplay();
        document.getElementById('playBtn').textContent = '▶';
    }

    updateDisplay() {
        const hours = Math.floor(this.time / 3600);
        const minutes = Math.floor((this.time % 3600) / 60);
        const seconds = this.time % 60;
        
        const display = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        document.getElementById('timerDisplay').textContent = display;
    }

    bindEvents() {
        document.getElementById('playBtn').addEventListener('click', () => {
            if (this.isRunning) {
                this.pause();
            } else {
                this.play();
            }
        });

        document.getElementById('stopBtn').addEventListener('click', () => {
            this.stop();
        });
    }
}

// Search functionality
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        console.log('Searching for:', query);
        // Backend integration point for search
    });

    // Keyboard shortcut
    document.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'f') {
            e.preventDefault();
            searchInput.focus();
        }
    });
}

// Event Listeners
function initializeEventListeners() {
    // Add Project button
    document.getElementById('addProjectBtn').addEventListener('click', () => {
        console.log('Add project clicked');
        // Backend integration point
    });

    // Import Data button
    document.getElementById('importDataBtn').addEventListener('click', () => {
        console.log('Import data clicked');
        // Backend integration point
    });

    // Start Meeting button
    document.querySelector('.start-meeting-btn').addEventListener('click', () => {
        console.log('Start meeting clicked');
        // Backend integration point
    });

    // Menu items
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            document.querySelectorAll('.menu-item').forEach(mi => mi.classList.remove('active'));
            item.classList.add('active');
            
            console.log('Menu item clicked:', item.textContent.trim());
        });
    });
}

// API Functions for Backend Integration
const api = {
    updateStats: (newStats) => {
        // Update stat values with animation
        Object.keys(newStats).forEach(key => {
            const element = document.querySelector(`.stat-card:nth-child(${Object.keys(newStats).indexOf(key) + 1}) .stat-value`);
            if (element) {
                element.textContent = newStats[key];
            }
        });
    },

    updateUser: (userData) => {
        const userInfo = document.querySelector('.user-info');
        if (userInfo) {
            userInfo.querySelector('h4').textContent = userData.name;
            userInfo.querySelector('p').textContent = userData.email;
        }
    },

    updateMeeting: (meetingData) => {
        document.querySelector('.meeting-title').textContent = meetingData.title;
        document.querySelector('.meeting-time').textContent = `Time : ${meetingData.time}`;
    },

    updateProjects: (projects) => {
        const projectList = document.querySelector('.project-list');
        projectList.innerHTML = projects.map(project => `
            <div class="project-item">
                <div class="project-icon" style="background: ${project.color};">${project.icon}</div>
                <div class="project-details">
                    <h4>${project.name}</h4>
                    <p>Due date: ${project.dueDate}</p>
                </div>
            </div>
        `).join('');
    },

    updateTeamMembers: (members) => {
        // Implementation for updating team members
        console.log('Updating team members:', members);
    }
};

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    // Initialize timer
    new Timer();
    
    // Initialize search
    initializeSearch();
    
    // Initialize event listeners
    initializeEventListeners();
});

// Expose API for external use
window.DonezoDashboard = {
    api: api,
    data: dashboardData
};
