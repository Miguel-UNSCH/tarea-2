// Canvas
const canvas = document.getElementById('pieChart');
const ctx = canvas.getContext('2d');

function drawPieChart(values) {
    const colors = ['#FF5733', '#33FF57'];
    let total = values.reduce((acc, val) => acc + val, 0);
    let startAngle = 0;

    values.forEach((value, index) => {
        const sliceAngle = (value / total) * 2 * Math.PI;
        ctx.beginPath();
        ctx.moveTo(200, 200);
        ctx.arc(200, 200, 150, startAngle, startAngle + sliceAngle);
        ctx.closePath();
        ctx.fillStyle = colors[index];
        ctx.fill();
        startAngle += sliceAngle;
    });
}

drawPieChart([70, 30])


// localStorage
function saveData() {
    const input = document.getElementById('storage-input').value;
    localStorage.setItem('data', input);
    alert('Datos guardados');
}

function retrieveData() {
    const data = localStorage.getItem('data');
    document.getElementById('stored-data').innerText = data ? `Datos almacenados: ${data}` : 'No hay datos guardados';
}

// Geolocation
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        document.getElementById('location').innerText = 'La geolocalización no es compatible con este navegador.';
    }
}

function showPosition(position) {
    document.getElementById('location').innerText = `Latitud: ${position.coords.latitude}, Longitud: ${position.coords.longitude}`;
}

// Drag and Drop
const listItems = document.querySelectorAll('#sortable-list li');
let draggedItem = null;

listItems.forEach(item => {
    item.addEventListener('dragstart', function () {
        draggedItem = item;
        setTimeout(() => {
            item.classList.add('dragging');
        }, 0);
    });

    item.addEventListener('dragend', function () {
        setTimeout(() => {
            draggedItem.classList.remove('dragging');
            draggedItem = null;
        }, 0);
    });

    item.addEventListener('dragover', function (e) {
        e.preventDefault();
        const draggingItem = document.querySelector('.dragging');
        const afterElement = getDragAfterElement(this.parentNode, e.clientY);
        if (afterElement == null) {
            this.parentNode.appendChild(draggingItem);
        } else {
            this.parentNode.insertBefore(draggingItem, afterElement);
        }
    });
});

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('li:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

