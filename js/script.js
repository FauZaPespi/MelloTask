const buttonsClass = 'btn btn-primary w-20 mt-2';

function createTask(name) {
    const main = document.getElementById('tasks');
    const task = document.createElement('div');
    task.classList = "mb-4 task";
    task.id = "task";

    const header = document.createElement('div');
    header.classList = "d-flex justify-content-between";

    const title = document.createElement('h3');
    title.innerHTML = name;

    const date = document.createElement('p');
    const now = new Date();
    const day = now.toLocaleDateString('fr-FR', { weekday: 'long' });
    const time = now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    date.innerHTML = `${day}, ${time}`;

    const input = document.createElement('input');
    input.type = 'text';
    input.style.display = "none";

    function updateTitle() {
        const titleText = input.value || name;
        title.innerHTML = titleText;
        title.style.display = "block";
        date.style.display = "block";
        input.style.display = "none";
    }

    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            updateTitle();
            event.preventDefault();
        }
    });

    title.addEventListener('click', () => {
        askName(title, header, date, input);
    });

    const confirmButton = document.createElement('button');
    confirmButton.style.display = "none";

    const footer = document.createElement('div');
    footer.classList = "d-flex justify-content-end";
    footer.appendChild(confirmButton);

    const addButton = document.createElement('button');
    addButton.classList = buttonsClass;
    addButton.innerHTML = "+";
    addButton.addEventListener('click', () => {
        createTask("Exemple de liste pliable", "Faire une liste pliable très optimisée");
    });

    main.appendChild(task);
    task.appendChild(header);
    header.appendChild(title);
    header.appendChild(date);
    task.appendChild(input);
    task.appendChild(footer);
    footer.appendChild(addButton);

    let startX, startY;

    function onMouseDown(e) {
        startX = e.clientX;
        startY = e.clientY;
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    }

    function onMouseMove(e) {
        const moveX = e.clientX - startX;
        const moveY = e.clientY - startY;

        if (Math.abs(moveX) > Math.abs(moveY) && moveX < -100) {
            task.style.transform = `translateX(${moveX}px)`;
        }
    }

    function onMouseUp(e) {
        const endX = e.clientX;
        if (startX - endX > 100) {
            task.remove();
        } else {
            task.style.transform = "translateX(0)";
        }
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }

    task.addEventListener('mousedown', onMouseDown);

    task.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });

    task.addEventListener('touchmove', (e) => {
        const touch = e.touches[0];
        const moveX = touch.clientX - startX;
        const moveY = touch.clientY - startY;

        if (Math.abs(moveX) > Math.abs(moveY) && moveX < -100) {
            task.style.transform = `translateX(${moveX}px)`;
        }
    });

    task.addEventListener('touchend', (e) => {
        const endX = e.changedTouches[0].clientX;
        if (startX - endX > 100) {
            task.remove();
        } else {
            task.style.transform = "translateX(0)";
        }
    });
}

function askName(title, header, date, input) {
    input.style.display = "block";
    title.style.display = "none";
    date.style.display = "none";
    header.appendChild(input);
    input.focus();
}

function removeAll() {
    const tasks = document.querySelectorAll('.task')
    tasks.forEach(task => {
        task.remove()
    });
}