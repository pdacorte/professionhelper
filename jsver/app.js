// Initialize IndexedDB
let db;
const dbName = "dailiesDB";
const dbVersion = 1;

// Add this at the top of the file with other global variables
let currentChart = null;

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    initializeDB();
});

function initializeDB() {
    console.log("Initializing database...");
    const request = indexedDB.open(dbName, dbVersion);

    request.onerror = (event) => {
        console.error("Database error:", event.target.error);
    };

    request.onupgradeneeded = (event) => {
        console.log("Upgrading database...");
        db = event.target.result;
        
        // Create tasks object store
        if (!db.objectStoreNames.contains("tasks")) {
            const taskStore = db.createObjectStore("tasks", { keyPath: "id", autoIncrement: true });
            taskStore.createIndex("status", "status");
            taskStore.createIndex("type", "type");
            taskStore.createIndex("endDate", "endDate");
            console.log("Created tasks store and indexes");
        }
    };

    request.onsuccess = (event) => {
        console.log("Database initialized successfully");
        db = event.target.result;
        updateDisplay();
    };
}

// Helper Functions
function formatDate(date) {
    return new Date(date).toISOString().split('T')[0];
}

function getTodayDate() {
    return formatDate(new Date());
}

// Task Management
function addTask() {
    if (!db) {
        console.error("Database not initialized");
        return;
    }

    const taskInput = document.getElementById("task-input");
    const taskType = document.getElementById("task-type");
    
    // Input validation
    if (!taskInput.value.trim()) {
        alert("Please enter a task");
        return;
    }
    
    const task = {
        title: taskInput.value.trim(),
        type: taskType.value,
        status: false,
        startDate: getTodayDate(),
        endDate: null
    };

    console.log("Attempting to add task:", task);

    try {
        const transaction = db.transaction(["tasks"], "readwrite");
        const taskStore = transaction.objectStore("tasks");
        
        const request = taskStore.add(task);
        
        request.onsuccess = (event) => {
            console.log("Task added successfully, ID:", event.target.result);
            taskInput.value = "";
            updateDisplay();
        };

        request.onerror = (event) => {
            console.error("Error adding task:", event.target.error);
            alert("Error adding task. Please try again.");
        };

        transaction.oncomplete = () => {
            console.log("Transaction completed successfully");
        };

        transaction.onerror = (event) => {
            console.error("Transaction error:", event.target.error);
        };
    } catch (error) {
        console.error("Error in addTask:", error);
    }
}

function completeTask(taskId) {
    const transaction = db.transaction(["tasks"], "readwrite");
    const taskStore = transaction.objectStore("tasks");
    
    taskStore.get(taskId).onsuccess = (event) => {
        const task = event.target.result;
        task.status = true;
        task.endDate = getTodayDate();
        
        taskStore.put(task).onsuccess = () => {
            // If task is Non-Negotiable, create next day's task
            if (task.type === "Non-Negotiable") {
                const nextTask = {
                    title: task.title,
                    type: "Non-Negotiable",
                    status: false,
                    startDate: formatDate(new Date(new Date().getTime() + 86400000)),
                    endDate: null
                };
                taskStore.add(nextTask);
            }
            updateDisplay();
        };
    };
}

// Display Functions
function updateDisplay() {
    updateTodayInfo();
    updateOngoingTasks();
    updateCompletedTasks();
    updateStreak();
    updateLast7DaysOverview();
    updateChart();
}

function updateTodayInfo() {
    const today = new Date();
    const todayInfo = document.getElementById("today-info");
    
    const transaction = db.transaction(["tasks"], "readonly");
    const taskStore = transaction.objectStore("tasks");
    const index = taskStore.index("endDate");
    
    const todayStr = getTodayDate();
    const request = index.count(IDBKeyRange.only(todayStr));
    
    request.onsuccess = () => {
        const completedToday = request.result;
        todayInfo.innerHTML = `
            <h2>Today is the ${today.getDate()} of ${today.toLocaleString('default', { month: 'long' })}!</h2>
            <p>You have completed ${completedToday} tasks today.</p>
        `;
    };
}

function updateOngoingTasks() {
    if (!db) {
        console.error("Database not initialized");
        return;
    }

    const taskList = document.getElementById("ongoing-tasks");
    if (!taskList) {
        console.error("Could not find ongoing-tasks element");
        return;
    }
    
    console.log("Updating ongoing tasks...");
    taskList.innerHTML = "";
    
    try {
        const transaction = db.transaction(["tasks"], "readonly");
        const taskStore = transaction.objectStore("tasks");
        
        const request = taskStore.getAll();
        
        request.onsuccess = () => {
            const allTasks = request.result;
            console.log("All tasks:", allTasks);
            
            const tasks = allTasks.filter(task => !task.status);
            console.log("Filtered ongoing tasks:", tasks);
            
            if (tasks.length === 0) {
                taskList.innerHTML = '<p>No ongoing tasks</p>';
                return;
            }
            
            tasks.forEach(task => {
                const taskElement = document.createElement("div");
                taskElement.className = "task-item";
                taskElement.innerHTML = `
                    <input type="checkbox" onchange="completeTask(${task.id})">
                    <span>${task.title}</span>
                    <small>(${task.type})</small>
                `;
                taskList.appendChild(taskElement);
            });
        };

        request.onerror = (event) => {
            console.error("Error fetching tasks:", event.target.error);
            taskList.innerHTML = '<p>Error loading tasks</p>';
        };
    } catch (error) {
        console.error("Error in updateOngoingTasks:", error);
    }
}

function updateCompletedTasks() {
    const completedList = document.getElementById("completed-tasks");
    completedList.innerHTML = "";
    
    const transaction = db.transaction(["tasks"], "readonly");
    const taskStore = transaction.objectStore("tasks");
    
    // Get all tasks and filter for completed ones in JavaScript
    const request = taskStore.getAll();
    
    request.onsuccess = () => {
        const tasks = request.result
            .filter(task => task.status === true)  // Filter completed tasks
            .sort((a, b) => new Date(b.endDate) - new Date(a.endDate))
            .slice(0, 5);
            
        if (tasks.length === 0) {
            completedList.innerHTML = '<p>No completed tasks</p>';
            return;
        }
        
        tasks.forEach(task => {
            const taskElement = document.createElement("div");
            taskElement.className = "task-item";
            taskElement.innerHTML = `
                <span>${task.title}</span>
                <small>${task.endDate}</small>
            `;
            completedList.appendChild(taskElement);
        });
    };

    request.onerror = (event) => {
        console.error("Error fetching completed tasks:", event.target.error);
        completedList.innerHTML = '<p>Error loading completed tasks</p>';
    };
}

function updateStreak() {
    const transaction = db.transaction(["tasks"], "readonly");
    const taskStore = transaction.objectStore("tasks");
    const index = taskStore.index("endDate");
    
    let streak = 0;
    let currentDate = new Date();
    
    function checkDate(date) {
        const dateStr = formatDate(date);
        const request = index.count(IDBKeyRange.only(dateStr));
        
        request.onsuccess = () => {
            if (request.result > 0) {
                streak++;
                currentDate.setDate(currentDate.getDate() - 1);
                checkDate(currentDate);
            } else {
                document.getElementById("streak-count").textContent = `${streak} days`;
            }
        };
    }
    
    checkDate(currentDate);
}

function updateChart() {
    const ctx = document.getElementById('progress-chart').getContext('2d');
    
    // Destroy previous chart instance if it exists
    if (currentChart) {
        currentChart.destroy();
    }

    const transaction = db.transaction(["tasks"], "readonly");
    const taskStore = transaction.objectStore("tasks");
    const index = taskStore.index("endDate");
    
    // Get last 30 days
    const dates = Array.from({length: 30}, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - i);
        return formatDate(d);
    }).reverse();
    
    Promise.all(dates.map(date => 
        new Promise(resolve => {
            const request = index.count(IDBKeyRange.only(date));
            request.onsuccess = () => resolve(request.result);
        })
    )).then(counts => {
        const expectedDaily = 1; // Default expected tasks per day
        const expected = dates.map((_, i) => expectedDaily * (i + 1));
        const actual = counts.reduce((acc, curr, i) => {
            const prev = i > 0 ? acc[i-1] : 0;
            acc.push(prev + curr);
            return acc;
        }, []);
        
        // Create new chart and store the instance
        currentChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: dates,
                datasets: [{
                    label: 'Expected',
                    data: expected,
                    borderColor: '#3498db',
                    fill: false
                }, {
                    label: 'Actual',
                    data: actual,
                    borderColor: '#2ecc71',
                    fill: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    });
}

function updateLast7DaysOverview() {
    const transaction = db.transaction(["tasks"], "readonly");
    const taskStore = transaction.objectStore("tasks");
    const index = taskStore.index("endDate");
    
    // Get last 7 days
    const dates = Array.from({length: 7}, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - i);
        return formatDate(d);
    }).reverse();
    
    Promise.all(dates.map(date => 
        new Promise(resolve => {
            const request = index.count(IDBKeyRange.only(date));
            request.onsuccess = () => resolve({
                date: new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
                count: request.result
            });
        })
    )).then(results => {
        const overviewElement = document.getElementById("seven-day-overview");
        overviewElement.innerHTML = `
            <h3>Last 7 Days Overview</h3>
            <div class="day-overview">
                ${results.map(day => `
                    <div class="day-stat">
                        <div class="day-name">${day.date}</div>
                        <div class="task-count ${day.count > 0 ? 'positive' : 'zero'}">${day.count}</div>
                    </div>
                `).join('')}
            </div>
        `;
    });
} 