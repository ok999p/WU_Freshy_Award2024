function toggleCardSelection(card, category) {
    const selectedCards = document.querySelectorAll('.card.selected');
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

function updateConfirmButtonState(category) {
    const selectedCards = document.querySelectorAll('.card.selected');
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

document.addEventListener('DOMContentLoaded', function () {
    updateConfirmButtonState('female');
});

function confirmVote(event, category) {
    event.preventDefault(); // ป้องกันการส่งฟอร์ม
    const confirmButton = document.getElementById('confirmButton' + category.charAt(0).toUpperCase() + category.slice(1));
    if (!confirmButton.disabled) {
        const selectedCardElement = document.querySelector('.card.selected .badge');
        if (selectedCardElement) {
            const selectedBadge = selectedCardElement.textContent.trim();
            Swal.fire({
                title: 'ยืนยันการโหวต',
                text: `คุณได้เลือก ${selectedBadge}`,
                icon: 'success',
                confirmButtonText: 'ตกลง'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "index.html"; // เปลี่ยนไปหน้า index
                }
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'เกิดข้อผิดพลาด',
                text: 'ไม่พบการ์ดที่เลือก กรุณาลองใหม่อีกครั้ง'
            });
        }
    }
}

function noVote(event) {
    event.preventDefault(); // ป้องกันการส่งฟอร์ม
    Swal.fire({
        title: 'ยืนยันการไม่โหวต',
        text: 'คุณไม่ประสงค์จะลงคะแนน',
        icon: 'warning',
        confirmButtonText: 'ตกลง'
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = "index.html"; // เปลี่ยนไปหน้า index
        }
    });
}
