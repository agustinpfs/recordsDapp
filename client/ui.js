document.addEventListener("DOMContentLoaded", () => {
    App.init();
});

/**
 * Record form
 */
const recordForm = document.querySelector("#recordForm"); //id del formulario

recordForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = recordForm["title"].value;
    const description = recordForm["description"].value;
    App.createRecord(title, description);
});