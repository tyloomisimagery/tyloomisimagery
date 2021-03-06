
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

    // Mission Statement
    
    // Footer
    $('#email').text(sheetData.A8);
    $('#copyright-text').text(sheetData.B8);
    $('#copyright-date').text(new Date().getFullYear());

    // End
    $('.logo-loader').fadeOut(1000);
}

