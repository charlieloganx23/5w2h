let entries = [];

document.getElementById('form').addEventListener('keydown', function (e) {
  const currentIndex = Array.from(this.elements).indexOf(document.activeElement);

  if (e.key === 'Enter') {
    e.preventDefault();
    const nextIndex = currentIndex + 1;

    if (nextIndex < this.elements.length) {
      this.elements[nextIndex].focus();
    } else {
      submitForm();
    }
  }
});

function submitForm() {
  const what = document.getElementById('what');
  const why = document.getElementById('why');
  const where = document.getElementById('where');
  const when = document.getElementById('when');
  const who = document.getElementById('who');
  const how = document.getElementById('how');
  const howMuch = document.getElementById('how-much');
  const status = document.getElementById('status');

  if (!what.checkValidity() || !why.checkValidity() || !where.checkValidity() ||
      !when.checkValidity() || !who.checkValidity() || !how.checkValidity() ||
      !howMuch.checkValidity() || !status.checkValidity()) {
    alert('Por favor, preencha todos os campos obrigatórios.');
    return;
  }

  const entry = {
    What: what.value,
    Why: why.value,
    Where: where.value,
    When: when.value,
    Who: who.value,
    How: how.value,
    HowMuch: howMuch.value,
    Status: status.value
  };

  entries.push(entry);
  updateList();

  // Limpa os campos
  what.value = '';
  why.value = '';
  where.value = '';
  when.value = '';
  who.value = '';
  how.value = '';
  howMuch.value = '';
  status.value = '';
}

function updateList() {
  const list = document.getElementById('list');
  list.innerHTML = '';

  entries.forEach(entry => {
    const listItem = document.createElement('li');
    listItem.textContent = `O quê: ${entry.What}, Por quê: ${entry.Why}, Onde: ${entry.Where}, Quando: ${entry.When}, Quem: ${entry.Who}, Como: ${entry.How}, Quanto: ${entry.HowMuch}, Status: ${entry.Status}`;
    list.appendChild(listItem);
  });

  // Adicione a tabela abaixo da lista
  const tableContainer = document.getElementById('table-container');
  tableContainer.innerHTML = '';

  if (entries.length > 0) {
    const table = document.createElement('table');
    table.innerHTML = `
      <tr>
        <th>O quê</th>
        <th>Por quê</th>
        <th>Onde</th>
        <th>Quando</th>
        <th>Quem</th>
        <th>Como</th>
        <th>Quanto</th>
        <th>Status</th>
      </tr>
    `;

    entries.forEach(entry => {
      const row = table.insertRow();
      row.innerHTML = `
        <td>${entry.What}</td>
        <td>${entry.Why}</td>
        <td>${entry.Where}</td>
        <td>${entry.When}</td>
        <td>${entry.Who}</td>
        <td>${entry.How}</td>
        <td>${entry.HowMuch}</td>
        <td>${entry.Status}</td>
      `;
    });

    tableContainer.appendChild(table);
  }
}

function downloadTableAsWord() {
  const tableContainer = document.getElementById('table-container');
  const tableHtml = tableContainer.innerHTML;
  const blob = new Blob([tableHtml], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });

  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'tabela.docx';
  link.click();
}

function downloadTableAsExcel() {
  const tableContainer = document.getElementById('table-container');
  const sheet = XLSX.utils.table_to_sheet(tableContainer.querySelector('table'));
  const blob = XLSX.write(sheet, { bookType: 'xlsx', bookSST: true, type: 'blob' });

  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'tabela.xlsx';
  link.click();
}

function downloadTableAsText() {
  const tableContainer = document.getElementById('table-container');
  const tableText = tableContainer.innerText;

  const blob = new Blob([tableText], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'tabela.txt';
  link.click();
}
