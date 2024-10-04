$('#excelReport').click(function () {
    let targetTable = document.getElementById('sortedtable');

    let clonedTable = targetTable.cloneNode(true);

    let rows = clonedTable.querySelectorAll('tr');
    rows.forEach(row => row.deleteCell(0));

    let hiddenRows = clonedTable.querySelectorAll('tr[style*="display: none"]');

    hiddenRows.forEach(row => row.style.display = null);

    let wb = XLSX.utils.table_to_book(clonedTable, {sheet: "sheet1"});


    let startDate = $('input[name="datepicker1"]').val()
    startDate = startDate.replaceAll(/[-/]/g, '.')
    let endDate = $('input[name="datepicker2"]').val()
    endDate = endDate.replaceAll(/[-/]/g, '.')

    let view = $('select[name="view"]').val();

    XLSX.writeFile(wb, `sales_${startDate}-${endDate}_${view}.xlsx`);
});
