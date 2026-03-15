
const editor = document.getElementById("editor");

document.querySelectorAll(".tool-btn").forEach(btn => {
    btn.addEventListener("mousedown", (e) => {
        e.preventDefault();
        const action = btn.dataset.action;
        if (action === "bold") {
            document.execCommand("bold");
        } else if (action === "italic") {
            document.execCommand("italic");
        } else if (action === "quote") {
            document.execCommand("formatBlock", false, "blockquote");
        } else if (action === "separate") {
            document.execCommand("insertHorizontalRule");
        } else if (action === "code") {
            const selection = window.getSelection();
            if (selection.rangeCount > 0) {
                const range = selection.getRangeAt(0);
                const codeEl = document.createElement("code");
                range.surroundContents(codeEl);
            }
        } else if (action === "table") {
            const cols = parseInt(prompt("Columnas:"));
            const rows = parseInt(prompt("Filas: "));

            if (!cols || !rows) return;

            const table = document.createElement("table");

            const thead = document.createElement("thead");
            const headerRow = document.createElement("tr");

            for (let i = 0; i < cols; i++) {
                const th = document.createElement("th");
                th.contentEditable = true;
                th.textContent = "";
                headerRow.appendChild(th);
            }

            thead.appendChild(headerRow);
            table.appendChild(thead);


            const tbody = document.createElement("tbody");

            for (let r = 0; r < rows; r++) {
                const row = document.createElement("tr");
                for (let c = 0; c < cols; c++) {
                    const td = document.createElement("td");
                    td.contentEditable = true;
                    td.textContent = "";
                    row.appendChild(td);
                }
                tbody.appendChild(row);
            }

            table.appendChild(tbody);

            document.execCommand("insertHTML", false, table.outerHTML);
        }
    })
})

document.getElementById("heading-select").addEventListener("mousedown", (e) => {})


document.getElementById("heading-select").addEventListener("change", function(e) {
    e.preventDefault();
    const value = this.value;
    if (value) {
        document.execCommand("formatBlock", false, value);
        this.value = "";
    }
})


document.getElementById("export").addEventListener("click", () => {
    const turndownService = new TurndownService();
    const html = document.getElementById("editor").innerHTML;
    const markdonw = turndownService.turndown(html);

    const blob = new Blob([markdonw], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const titulo = prompt("Introduce el titulo del documento");
    a.download = titulo + ".md";
    a.click();
    URL.revokeObjectURL(url);
})