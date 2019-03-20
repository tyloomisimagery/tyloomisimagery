
$(async () => {
    const sheetId = '1YdWKrR8FgzwaQg18lvegrn_2ZKzBERi-jUPFWgCFI4Y';

    $.ajax({

        url : `https://spreadsheets.google.com/feeds/cells/${sheetId}/1/public/full?alt=json`,
        type : 'GET',
        dataType:'json',
        success : function(result) {              
            const sheet = getSheet(result);
            // console.log(sheet);
            updatePageWithData(sheet);
        },
        error : function(request,error) {
            alert('Failed to load website. Please try again');
        }
    });
});

function getSheet(result) {
    const sheetEntity = {};
    result.feed.entry.forEach(entry => {
        sheetEntity[entry.title.$t] = entry.content.$t;
    });

    return sheetEntity;
}

function updatePageWithData(sheetData) {
    // Header 
    $('#header-about').text(sheetData.A4);
    $('#header-portfolio').text(sheetData.B4);
    $('#header-pricing').text(sheetData.C4);
    $('#header-contact').text(sheetData.D4);

    // Carousel
    addCarouselImages(sheetData);

    // Links 
    $('#link-1').text(sheetData.A23);
    $('#link-1').attr('href', sheetData.C23);
    $('#link-2').text(sheetData.B23);
    $('#link-2').attr('href', sheetData.D23);

    // Social
    $('#social-email').attr('href', `mailto:${sheetData.A8}`);
    $('#social-instagram').attr('href', sheetData.A12);
    $('#social-facebook').attr('href', sheetData.B12);

    // Footer
    $('#email').text(sheetData.A8);
    $('#copyright-text').text(sheetData.B8);
    $('#copyright-date').text(new Date().getFullYear());

    // End
    $('.logo-loader').fadeOut(1000);
}

function addCarouselImages(sheetData) {
    const keys = Object.keys(sheetData).filter(key => key.includes('19'));
    keys.forEach((cell, index) => {
        $('#main-carousel').append(generateCarouselImage(sheetData[cell], index));
        $('#main-carousel-indicators').append(generateCarouselIndicators(sheetData[cell]));
    })

    $('#carouselExampleIndicators').carousel();
}

function generateCarouselImage(imgUrl, index) {
    // console.log(imgUrl);
    return `
    <div class="carousel-item ${!index ? 'active' : ''}">
    <img src="${imgUrl}" class="d-block w-100" alt="carousel image">
    </div>`;
}

function generateCarouselIndicators(index) {
    const html = `
    <li data-target="#carouselExampleIndicators" data-slide-to="${index}" ${!index ? 'class="active"' : ''}></li>`;

    return html;
}