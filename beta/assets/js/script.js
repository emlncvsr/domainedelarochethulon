$(document).ready(function () {
    const vinsData = [
        { name: "Régnié 2022", description: "Notre Régnié 2022 a remporté une médaille d'Or à la Saint Vincent de Mâcon.", img: "assets/img/bouteilles/regnie.jpg", price: "9,70 € TTC", temp: "15-17°", details: "Il se drape d’une robe rubis aux nuances violacées..." },
        { name: "Morgon 2022", description: "Notre Morgon 2022 a remporté une médaille d'Argent au Concours Général Agricole à Paris.", img: "assets/img/bouteilles/morgon.jpg", price: "10,20 € TTC", temp: "17-18°", details: "Le plus structuré de nos vins, il s'exprime souvent par l'alliance des fruits rouges et de la prune avec un coté poivré..." },
        { name: "Côte de Brouilly 2022", description: "Notre Côte de Brouilly 2022 a remporté une médaille d'Or au Concours International du Gamay.", img: "assets/img/bouteilles/cote-de-brouilly.jpg", price: "10,20 € TTC", temp: "17-18°", details: "Il se pare d'une robe profonde et intense d'un rouge grenat sombre..." },
        { name: "Beaujolais Villages \"Vieilles Vignes\" 2022", description: "D'une simplicité toute Beaujolaise, couvrant de nombreuses richesses...", img: "assets/img/bouteilles/beaujolais-villages.jpg", price: "8,20 € TTC", temp: "14-16°", details: "Issu de nos vignes les plus âgées (70 à 80 ans), s'accorde parfaitement avec les mets simples..." },
        { name: "Beaujolais Villages Nouveau 2024", description: "Vin festif par excellence, il satisfera votre palais par sa souplesse.", img: "assets/img/etiquettes/primeur.jpg", price: "8,20 € TTC", temp: "13-15°", details: "Nous le vinifions de façon à préserver au maximum ses arômes de raisin frais..." },
        { name: "Chardonnay 2023", description: "Le cépage Chardonnay apporte à 'la perle blanche' une belle harmonie entre les arômes de fleur blanche et de fruits à chair blanche.", img: "assets/img/bouteilles/chardonnay.jpg", price: "10,00 € TTC", temp: "", details: "Très agréable en apéritif comme avec des poissons ou viandes blanches..." },
        { name: "Eclat de Gamay", description: "Il ravit tous les palais, son fruité marqué, sa robe framboisée, sa fraîcheur et ses fines bulles font son grand succès.", img: "assets/img/bouteilles/eclat-de-gamay.jpg", price: "10,40 € TTC", temp: "5-7°", details: "A servir en apéritif ou avec un dessert." },
        { name: "Beaujolais Villages Rosé 2023", description: "Sa fraîcheur et ses arômes de petits fruits rouges et d'agrumes en font le vin estival par excellence...", img: "assets/img/bouteilles/rose.jpg", price: "8,20 € TTC", temp: "8-9°", details: "A apprécier entre amis. Le servir à 8-9°." },
    ];

    let currentVinIndex = 0;

    function displayVin(index) {
        const vin = vinsData[index];
        $('#vins-content').html(`
            <div class="vin-item">
                <h2>${vin.name}</h2>
                <img src="${vin.img}" alt="${vin.name}">
                <p>${vin.description}</p>
                <p><strong>Prix:</strong> ${vin.price}</p>
                <p><strong>Détails:</strong> ${vin.details}</p>
                <p><strong>Température de service:</strong> ${vin.temp}</p>
            </div>
        `);
    }

    function showNextVin() {
        currentVinIndex = (currentVinIndex + 1) % vinsData.length;
        displayVin(currentVinIndex);
    }

    function showPrevVin() {
        currentVinIndex = (currentVinIndex - 1 + vinsData.length) % vinsData.length;
        displayVin(currentVinIndex);
    }

    $('#prev-vin').click(showPrevVin);
    $('#next-vin').click(showNextVin);

    displayVin(currentVinIndex); // Initial display

    const docId = '1cR9KkZr-LvDjDtWwpea0QZueosnF2DC3SXfm9D_XOh0'; // Remplacez par l'ID de votre document Google Docs
    const token = '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'; // Remplacez par votre token GitHub

    $.ajax({
        url: `https://docs.googleapis.com/v1/documents/${docId}?fields=body`,
        headers: {
            Authorization: `Bearer ${token}`
        },
        success: function (response) {
            const content = response.body.content.map(block => block.paragraph.elements.map(el => el.textRun.content).join('')).join('\n');
            const sections = content.split('---');

            // Mettre à jour les sections du HTML
            $('#accueil-content').text(sections[0]);
            $('#exploitation-content').text(sections[1]);
            $('#salons-content').html(sections[2]);
            $('#actualites-content').html(sections[3]);
            $('#contact-content').html(sections[4]);

            // Mettre à jour les images des actualités
            const actualitesImages = [
                { text: "Notre Côte de Brouilly 2022 a remporté une médaille d'Or au Concours International du Gamay.", img: sections[3] },
                { text: "Notre Morgon 2022 a remporté une médaille d'Argent au Concours Général Agricole à Paris.", img: sections[4] },
                { text: "Notre Régnié 2022 a remporté une médaille d'Or à la Saint Vincent de Mâcon.", img: sections[5] }
            ];

            let actualitesContent = "";
            actualitesImages.forEach(actualite => {
                actualitesContent += `<div class="news-item"><p>${actualite.text}</p><img src="${actualite.img}" alt="Medal Image"></div>`;
            });

            $('#actualites-content').html(actualitesContent);

            // Mettre à jour les images de la vigne
            const vigneImages = [
                sections[6],
                sections[7],
                sections[8],
                sections[9],
                sections[10],
                sections[11],
                sections[12]
            ];

            vigneImages.forEach(src => {
                const imgElement = $('<img>').attr('src', src).attr('alt', 'Vigne');
                $('#vigne-content').append(imgElement);
            });
        }
    });
});
