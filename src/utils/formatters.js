function formatDate(date) {
    return new Date(date).toLocaleDateString("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}
function formatDateForInput(date) {
    const d = new Date(date);

    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export { formatDate, formatDateForInput };