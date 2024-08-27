async function addItem(description) {
    const response = await fetch('https://y-48zr2nlqs-bragancas-projects.vercel.app/api/checklist', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description }),
    });

    const newItem = await response.json();
    renderChecklist();
}

async function toggleConfirm(itemId, confirmed) {
    await fetch(`https://y-48zr2nlqs-bragancas-projects.vercel.app/api/checklist/${itemId}/confirm`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ confirmed }),
    });

    renderChecklist();
}

async function deleteItem(itemId) {
    await fetch(`https://y-48zr2nlqs-bragancas-projects.vercel.app/api/checklist/${itemId}`, {
        method: 'DELETE',
    });

    renderChecklist();
}

async function renderChecklist() {
    try {
        const response = await fetch('https://y-48zr2nlqs-bragancas-projects.vercel.app');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const checklistItems = await response.json();

        const checklistElement = document.getElementById('checklist');
        checklistElement.innerHTML = '';

        let allConfirmed = true;

        checklistItems.forEach(item => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <input type="checkbox" ${item.confirmed ? 'checked' : ''} onclick="toggleConfirm('${item._id}', this.checked)">
                ${item.description}
                <button onclick="deleteItem('${item._id}')">Deletar</button>
            `;

            checklistElement.appendChild(listItem);

            if (!item.confirmed) {
                allConfirmed = false;
            }
        });

        const mainButton = document.getElementById('main-button');
        if (checklistItems.length === 0) {
            mainButton.classList.add('no-items');
            mainButton.classList.remove('active');
            mainButton.textContent = 'Nenhum item adicionado';
        } else {
            mainButton.classList.remove('no-items');
            mainButton.classList.add('active');
            mainButton.textContent = 'Verificar Checklist';
        }

        if (allConfirmed) {
            mainButton.style.backgroundColor = 'green';
        } else {
            mainButton.style.backgroundColor = 'red';
        }
    } catch (error) {
        console.error('Failed to fetch checklist:', error);
    }
}

async function handleAddItem() {
    const input = document.getElementById('item-input');
    const description = input.value.trim();
    if (description) {
        await addItem(description);
        input.value = ''; // Limpar o campo de input após adicionar
    }
}

async function handleCheckAll() {
    try {
        const response = await fetch('https://y-48zr2nlqs-bragancas-projects.vercel.app');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const checklistItems = await response.json();
        const allConfirmed = checklistItems.every(item => item.confirmed);

        const modalMessage = document.getElementById('modal-message');
        const modal = document.getElementById('modal');

        if (allConfirmed) {
            modalMessage.textContent = 'Todos os itens estão verificados. Tudo certo!';
            modalMessage.className = 'success';
            document.getElementById('main-button').style.backgroundColor = 'green';
        } else {
            modalMessage.textContent = 'Ainda faltam itens para serem verificados.';
            modalMessage.className = 'error';
            document.getElementById('main-button').style.backgroundColor = 'red';
        }

        modal.style.display = 'block';
    } catch (error) {
        console.error('Failed to check all items:', error);
    }
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}

// Fechar o modal quando o usuário clicar fora dele
window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

renderChecklist();
