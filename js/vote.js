function toggleCardSelection(card, category) {
    const pageId = getPageNumber(category);
    const selectedCards = document.querySelectorAll(`#page${pageId} .card.selected`);
    if (selectedCards.length >= 1 && !card.classList.contains('selected')) {
        Swal.fire({
            icon: 'error',
            title: 'ไม่สามารถโหวตได้',
            text: 'สามารถโหวตได้แค่ 1 ท่านเท่านั้น'
        });
        return;
    }
    card.classList.toggle('selected');
    updateConfirmButtonState(category);
}

function getPageNumber(category) {
    switch (category) {
        case 'male':
            return 1;
        case 'female':
            return 2;
        case 'lgbtq':
            return 3;
        default:
            return 1;
    }
}

function updateConfirmButtonState(category) {
    const pageId = getPageNumber(category);
    const selectedCards = document.querySelectorAll(`#page${pageId} .card.selected`);
    const confirmButton = document.getElementById('confirmButton' + category.charAt(0).toUpperCase() + category.slice(1));
    if (selectedCards.length === 0) {
        confirmButton.disabled = true;
        confirmButton.classList.add('disabled-button');
        confirmButton.classList.remove('hover-effect');
        confirmButton.textContent = 'ไม่สามารถโหวตได้';
    } else {
        confirmButton.disabled = false;
        confirmButton.classList.remove('disabled-button');
        confirmButton.classList.add('hover-effect');
        confirmButton.textContent = 'ยืนยันการเลือกนี้';
    }
}

function showPage(pageNumber) {
    var pages = document.querySelectorAll('.content-page');
    pages.forEach(function (page) {
        page.classList.remove('active-page');
    });
    document.getElementById('page' + pageNumber).classList.add('active-page');
}

document.addEventListener('DOMContentLoaded', function () {
    updateConfirmButtonState('male');
    updateConfirmButtonState('female');
    updateConfirmButtonState('lgbtq');
});

function confirmVote(category) {
    const confirmButton = document.getElementById('confirmButton' + category.charAt(0).toUpperCase() + category.slice(1));
    if (!confirmButton.disabled) {
        const selectedCard = document.querySelector(`#page${getPageNumber(category)} .card.selected .title p`).textContent.trim();
        Swal.fire({
            title: 'ยืนยันการโหวต',
            text: `คุณได้เลือก ${selectedCard}`,
            icon: 'success',
            confirmButtonText: 'ตกลง',
        });
    }
}

function noVote() {
    Swal.fire({
        title: 'ยืนยันการไม่โหวต',
        text: 'คุณไม่ประสงค์จะลงคะแนน',
        icon: 'warning',
        confirmButtonText: 'ตกลง'
    });
}
