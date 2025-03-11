document.addEventListener("DOMContentLoaded", function() {
    let botaoDownload = document.getElementById("baixarEbook");

    if (botaoDownload) {
        botaoDownload.addEventListener("click", function(event) {
            event.preventDefault(); // Impede o comportamento padrão do link
            let link = document.createElement("a");
            link.href = "./Boas-vindas-ao-Mundo-do-Desenvolvimento-Web.pdf";
            link.download = "Boas-vindas-ao-Mundo-do-Desenvolvimento-Web.pdf";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }
});
