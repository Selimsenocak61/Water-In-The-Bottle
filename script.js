const smallCups = document.querySelectorAll('.cup-small');
const liters = document.getElementById('liters');
const percentage = document.getElementById('percentage');
const remained = document.getElementById('remained');

updateBigCup();

smallCups.forEach((cup, idx) => {
    cup.addEventListener('click', () => highlightCups(idx));
});

function highlightCups(idx) {
    // Eğer son bardağa tıklanıyorsa ve doluysa, son bir bardak geriye alınıyor
    if (idx === 7 && smallCups[idx].classList.contains("full")) idx--;
    // Eğer tıklanan bardak doluysa ve sonraki boşsa, bir önceki bardağa geri dönülüyor
    else if(smallCups[idx].classList.contains('full') && !smallCups[idx].nextElementSibling.classList.contains('full')) {
        idx--;
    }

    // Bardakları güncelle
    smallCups.forEach((cup, idx2) => {
        // Tıklanan bardaktan öncekileri dolu yap, sonrasını boş yap
        idx2 <= idx ? cup.classList.add('full') : cup.classList.remove('full');
    });

    updateBigCup();
}

function updateBigCup() {
    const fullCups = document.querySelectorAll('.cup-small.full').length;
    console.log(fullCups);
    const totalCups = smallCups.length;
    console.log(totalCups);
    
    // Doluluk yüzdesini ve dolu bardakların yüksekliğini güncelle
    if(fullCups === 0) {
        percentage.style.visibility = 'hidden';
        percentage.style.height = 0;
    } else {
        percentage.style.visibility = 'visible';
        percentage.style.height = `${fullCups / totalCups * 330}px`;
        percentage.innerText = `${(fullCups / totalCups * 100).toFixed(2)}%`; // Yüzdeyi 2 basamakla sınırla
    }

    // Kalan litresi güncelle
    if(fullCups === totalCups) {
        remained.style.visibility = 'hidden';
        remained.style.height = 0;
    } else {
        remained.style.visibility = 'visible';
        liters.innerText = `${(2 - (250 * fullCups / 1000)).toFixed(2)}L`; // Kalan litresi 2 basamakla sınırla
    }
}