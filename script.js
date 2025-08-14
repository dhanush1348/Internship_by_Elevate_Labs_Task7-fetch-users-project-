let allUsers = []; // Store all users for search

async function fetchUsers() {
    const container = document.getElementById('user-container');
    const errorMsg = document.getElementById('error-message');
    const loader = document.getElementById('loader');

    container.innerHTML = '';
    errorMsg.textContent = '';
    loader.style.display = 'block'; // Show loader

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const users = await response.json();
        allUsers = users; // Save for search
        loader.style.display = 'none'; // Hide loader

        displayUsers(users);

    } catch (error) {
        loader.style.display = 'none'; // Hide loader
        errorMsg.textContent = `❌ Failed to fetch data: ${error.message}`;
    }
}

function displayUsers(users) {
    const container = document.getElementById('user-container');
    container.innerHTML = '';

    if (users.length === 0) {
        container.innerHTML = '<p style="text-align:center;color:#555;">No users found.</p>';
        return;
    }

    users.forEach((user, index) => {
        const card = document.createElement('div');
        card.classList.add('user-card');
        card.style.animationDelay = `${index * 0.05}s`; // Stagger animation

        card.innerHTML = `
            <h3>${user.name}</h3>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>City:</strong> ${user.address.city}</p>
        `;

        card.addEventListener('click', () => openModal(user));

        container.appendChild(card);
    });
}

function openModal(user) {
    const modal = document.getElementById('userModal');
    const modalDetails = document.getElementById('modal-details');

    modalDetails.innerHTML = `
        <h2>${user.name}</h2>
        <p><strong>Username:</strong> ${user.username}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Phone:</strong> ${user.phone}</p>
        <p><strong>Website:</strong> <a href="http://${user.website}" target="_blank">${user.website}</a></p>
        <p><strong>Address:</strong> ${user.address.street}, ${user.address.suite}, ${user.address.city} - ${user.address.zipcode}</p>
        <p><strong>Company:</strong> ${user.company.name}</p>
    `;

    modal.style.display = 'block';
}

// Search filter
document.getElementById('searchInput').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredUsers = allUsers.filter(user =>
        user.name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm)
    );
    displayUsers(filteredUsers);
});

// Close modal on X click
document.querySelector('.close-btn').addEventListener('click', () => {
    document.getElementById('userModal').style.display = 'none';
});

// Close modal on outside click
window.addEventListener('click', (e) => {
    if (e.target === document.getElementById('userModal')) {
        document.getElementById('userModal').style.display = 'none';
    }
});

// Load data on start
fetchUsers();
