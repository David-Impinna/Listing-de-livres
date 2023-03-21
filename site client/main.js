const table = document.querySelector("#tableauLivres");

var l1 = {
    nom : "L'algorithmique selon H2PROG",
    auteur : "Matthieu GASTON",
    pages : 200
}
var l2 = {
    nom : "La france du 19ème",
    auteur : "Albert PATRICK",
    pages : 500
}
var l3 = {
    nom : "La monde des animaux",
    auteur : "Marc Merlin",
    pages : 250
}
var l4 = {
    nom : "Le virus D'Asie",
    auteur : "Tya Milo",
    pages : 120
}

var biblio = [l1,l2,l3,l4];
afficherLivres();

function afficherLivres(){
    var tableauLivres = document.querySelector("#tableauLivres tbody");
    var livres = "";
    for (i = 0 ; i <= biblio.length -1 ; i++){
        livres += `<tr>
                <td>${biblio[i].nom}</td>
                <td>${biblio[i].auteur}</td>
                <td>${biblio[i].pages}</td>
                <td><button class="btn btn-warning" onClick="afficherFormModification(${i})">Modifier</button></td>
                <td><button class="btn btn-danger" onClick="supprimerLivre(${i})">Supprimer</button></td>
            <tr/>`;
    }
    tableauLivres.innerHTML = livres;
}

function ajoutFormulaire(){
    document.querySelector("#ajoutForm").removeAttribute("class");
    document.querySelector("#modifLivre").className = "d-none";
}

document.querySelector("#validationFormAjout").addEventListener("click", function(event){
    event.preventDefault();
    var titre = document.querySelector("#ajoutForm #titre").value;
    var auteur = document.querySelector("#ajoutForm #auteur").value;
    var pages = document.querySelector("#ajoutForm #pages").value;
    ajoutLivre(titre,auteur,pages);
    const formulaire = document.querySelector("#ajoutForm");
    formulaire.reset();
    formulaire.className = "d-none";
});

function ajoutLivre(titre,auteur,pages){
    var livre = {
        nom : titre,
        auteur : auteur,
        pages : pages
    }
    biblio.push(livre);
    afficherLivres();
}

function supprimerLivre(position){
    if(confirm("Voulez-vous vraiment supprimer ? ")){
        biblio.splice(position, 1);
        afficherLivres();
        //alert("suppression effectuée");
    } //else {
    //     alert("suppression annulée");
    // }
}

function afficherFormModification(position){
    document.querySelector("#ajoutForm").className = "d-none";

    document.querySelector("#modifLivre").removeAttribute("class");
    document.querySelector("#modifLivre #titre").value = biblio[position].nom;
    document.querySelector("#modifLivre #auteur").value = biblio[position].auteur;
    document.querySelector("#modifLivre #pages").value = biblio[position].pages;
    document.querySelector("#modifLivre #identifiant").value = position;
    console.log(position);
}

document.querySelector("#validationFormModif").addEventListener("click", function(e){
    e.preventDefault();
    var titre = document.querySelector("#modifLivre #titre").value;
    var auteur = document.querySelector("#modifLivre #auteur").value;
    var pages = document.querySelector("#modifLivre #pages").value;
    var positionLivre = document.querySelector("#modifLivre #identifiant").value;

    biblio[positionLivre].nom = titre;
    biblio[positionLivre].auteur = auteur;
    biblio[positionLivre].pages = pages;
    afficherLivres();
    document.querySelector("#modifLivre").className = "d-none";
})

